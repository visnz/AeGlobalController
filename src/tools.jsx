//============ 批量工具 ==========//

var _visnLogPanel = null;
function OF_Log_setPanel(panel){ _visnLogPanel = panel; }
function OF_Log(msg){
    if(!_visnLogPanel) return;
    var timeStr = "";
    try { timeStr = new Date().toTimeString().split(" ")[0]; } catch(e){}
    _visnLogPanel.logText.text += timeStr + " " + msg + "\n";
}

function OF_Tools_enableMotionBlur(){
    if(!app.project || !app.project.activeItem) return;
    var comp = app.project.activeItem;
    if(!(comp instanceof CompItem)) return;

    app.beginUndoGroup("Enable Motion Blur");
    var visited = {};
    enableMotionBlurRecursive(comp, visited);
    app.endUndoGroup();

    function enableMotionBlurRecursive(c, visited){
        if(!c || !(c instanceof CompItem) || visited[c.id]) return;
        visited[c.id] = true;
        // 打开合成总开关，否则单图层开关开了也不渲染
        c.motionBlur = true;
        for(var i = 1; i <= c.numLayers; i++){
            var layer = c.layer(i);
            if(!layer) continue;
            // 预合成层本身也是 AVLayer，先开它自己的开关
            try { layer.motionBlur = true; } catch(e){}
            // 递归进入预合成内部
            if(layer.source && layer.source instanceof CompItem){
                enableMotionBlurRecursive(layer.source, visited);
            }
        }
    }
}

function OF_Tools_extendOutTime30s(){
    if(!app.project || !app.project.activeItem) return;
    var comp = app.project.activeItem;
    if(!(comp instanceof CompItem)) return;

    app.beginUndoGroup("Extend OutTime +30s");
    var visited = {};
    extendCompRecursive(comp, visited);
    app.endUndoGroup();

    function extendCompRecursive(c, visited){
        if(!c || !(c instanceof CompItem) || visited[c.id]) return;
        visited[c.id] = true;
        // 先延长合成时长，再延长图层出点，避免出点被旧时长限制
        c.duration += 30;
        for(var i = 1; i <= c.numLayers; i++){
            var layer = c.layer(i);
            if(!layer) continue;
            try { layer.outPoint += 30; } catch(e){}
            if(layer.source && layer.source instanceof CompItem){
                extendCompRecursive(layer.source, visited);
            }
        }
    }
}

// 把选中图层（含预合成内部，递归）的混合模式 Linear Dodge 改成 Add。
// 入口是当前合成窗口里选中的图层，不是 Project 面板的选中项。
function OF_Tools_linearDodgeToAdd(){
    if(!app.project || !app.project.activeItem) return;
    var comp = app.project.activeItem;
    if(!(comp instanceof CompItem)) return;
    if(!comp.selectedLayers || comp.selectedLayers.length === 0){
        OF_Log("[Blend] 当前合成没有选中图层，请先在时间线里选中要处理的对象");
        return;
    }

    // AE 的混合模式枚举名不稳定（BlendingMode.LINEARDODGE 在 AE 2024 里是 undefined），
    // 直接用实测数值：NORMAL=5212 ADD=5220 SCREEN=5222 Linear Dodge=5223
    var BM_ADD = 5220;          // Add（相加）
    var BM_LINEAR_DODGE = 5223; // Linear Dodge（线性减淡）

    OF_Log("[Blend] ==== 开始：合成[" + comp.name + "] 选中 " + comp.selectedLayers.length + " 个图层 ====");
    OF_Log("[Blend] 目标：Linear Dodge=" + BM_LINEAR_DODGE + " → Add=" + BM_ADD);

    app.beginUndoGroup("Linear Dodge → Add");
    var visited = {};
    var changed = 0;
    var scanned = 0;      // 扫描过的图层总数
    var compEntered = 0;  // 进入过的预合成总数
    var selected = comp.selectedLayers;  // 缓存，递归进入预合成时 selectedLayers 可能变化
    for(var i = 0; i < selected.length; i++){
        processLayerRecursive(selected[i], visited);
    }
    app.endUndoGroup();
    OF_Log("[Blend] ==== 结束：扫描图层 " + scanned + " 个，命中修改 " + changed + " 个，进入预合成 " + compEntered + " 个 ====");

    function processLayerRecursive(layer, visited){
        if(!layer) return;
        scanned++;
        try {
            var bm = layer.blendingMode;
            var srcDesc = "";
            if(layer.source && layer.source instanceof CompItem){
                srcDesc = "预合成[" + layer.source.name + "]";
            } else if(layer.source){
                srcDesc = "素材源";
            } else {
                srcDesc = "无源(纯色/文本等)";
            }
            OF_Log("[Blend] 扫描#" + scanned + " [" + layer.name + "] 源=" + srcDesc
                + " blendingMode=" + bm
                + " 命中LD=" + (bm == BM_LINEAR_DODGE));
            if(bm == BM_LINEAR_DODGE){
                layer.blendingMode = BM_ADD;
                changed++;
                OF_Log("[Blend]    → 已修改 [" + layer.name + "] Linear Dodge → Add");
            }
        } catch(e){
            OF_Log("[Blend] 扫描#" + scanned + " [" + layer.name + "] 读取blendingMode异常: " + e);
        }
        if(layer.source && layer.source instanceof CompItem){
            processCompRecursive(layer.source, visited);
        }
    }
    function processCompRecursive(c, visited){
        if(!c || !(c instanceof CompItem)) return;
        if(visited[c.id]){
            OF_Log("[Blend]    → 预合成 [" + c.name + "] 已处理过，跳过（防循环引用）");
            return;
        }
        visited[c.id] = true;
        compEntered++;
        OF_Log("[Blend]    → 进入预合成 [" + c.name + "]，共 " + c.numLayers + " 层");
        for(var j = 1; j <= c.numLayers; j++){
            processLayerRecursive(c.layer(j), visited);
        }
    }
}

//============ 自动缓存工具 ==========//
// 缓存队列持久化用的内部 marker comp：不是真正参与合成，只用它的 layer 顺序/enabled
// 状态编码队列，靠这个名字识别，避免被当成普通合成误处理。
var OF_TOOLS_CACHE_QUEUE_COMP_NAME = "_OF_CacheQueue";
function OF_Tools_isCacheQueueDataComp(comp){
    return !!comp && (comp instanceof CompItem) && comp.name === OF_TOOLS_CACHE_QUEUE_COMP_NAME;
}

function OF_Tools_getSelectedComps(){
    var comps = [];
    if(app.project && app.project.activeItem && app.project.activeItem instanceof CompItem
        && !OF_Tools_isCacheQueueDataComp(app.project.activeItem)){
        comps.push(app.project.activeItem);
        return comps;
    }
    if(!app.project) return comps;
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(item instanceof CompItem && item.selected && !OF_Tools_isCacheQueueDataComp(item)){
            comps.push(item);
        }
    }
    return comps;
}

function OF_Tools_resolveCompForTree(comp){
    if(!comp || !(comp instanceof CompItem)) return null;
    if(!/_pre$/.test(comp.name)) return comp;
    var baseName = comp.name.slice(0, -4);
    // 优先本地解析：查看 precomp 内部是否有原合成层
    for(var i = 1; i <= comp.numLayers; i++){
        var layer = comp.layer(i);
        if(layer && layer.source && layer.source instanceof CompItem && layer.source.name === baseName){
            return layer.source;
        }
    }
    // 全局回退
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(item instanceof CompItem && item.name === baseName) return item;
    }
    return null;
}

function OF_Tools_collectCompDependencies(comp, result, visited, depth){
    if(!comp || !(comp instanceof CompItem)) return;
    var realComp = OF_Tools_resolveCompForTree(comp);
    if(!realComp){ OF_Log("[collect] 无法解析源合成：" + (comp ? comp.name : "null")); return; }
    var id = realComp.id;
    if(visited[id]){
        if(depth > visited[id].depth) visited[id].depth = depth;
        return;
    }
    visited[id] = {comp: realComp, depth: depth, checked: true};
    result.push(visited[id]);
    OF_Log("[collect] 加入依赖树：" + realComp.name + " (depth=" + depth + ")");
    for(var i = 1; i <= realComp.numLayers; i++){
        var layer = realComp.layer(i);
        if(layer && layer.source && layer.source instanceof CompItem){
            OF_Tools_collectCompDependencies(layer.source, result, visited, depth + 1);
        }
    }
}

function OF_Tools_getDepthSortedComps(allItems){
    var arr = [];
    for(var i = 0; i < allItems.length; i++) arr.push(allItems[i]);
    arr.sort(function(a, b){
        if(b.depth !== a.depth) return b.depth - a.depth;
        return a.comp.name.localeCompare(b.comp.name);
    });
    return arr;
}

function OF_Tools_findPrecompByName(name){
    if(!app.project) return null;
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(item instanceof CompItem && item.name === name) return item;
    }
    return null;
}

function OF_Tools_getOrCreateCacheFolder(){
    if(!app.project) return null;
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(item instanceof FolderItem && item.name === "Cache") return item;
    }
    return app.project.items.addFolder("Cache");
}

// 缓存队列持久化用的内部合成：只找不建（读取路径调用），找不到直接返回 null。
function OF_Tools_findCacheQueueComp(){
    if(!app.project) return null;
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(OF_Tools_isCacheQueueDataComp(item)) return item;
    }
    return null;
}

// 顶层加一个警戒文字层，提醒这是 visnlink 插件用的内部数据，不要手动删除/改名/移动。
// 每次保存都会整体重建这个合成的层，所以警戒层也要在重建时一起加回去。
var OF_TOOLS_CACHE_QUEUE_WARNING_TEXT = "⚠ visnlink Cache 队列数据\r请勿删除/改名/移动";
var OF_TOOLS_CACHE_QUEUE_WARNING_NAME = "⚠ 请勿删除 - Cache 队列数据";
function OF_Tools_addCacheQueueWarningLayer(markerComp){
    try {
        var warningLayer = markerComp.layers.addText(OF_TOOLS_CACHE_QUEUE_WARNING_TEXT);
        warningLayer.name = OF_TOOLS_CACHE_QUEUE_WARNING_NAME;
        try { warningLayer.locked = true; } catch(e){}
        try { warningLayer.label = 2; } catch(e){}
    } catch(e){
        OF_Log("[CacheManager] 添加警戒层失败：" + e.toString());
    }
}

function OF_Tools_getOrCreateCacheQueueComp(){
    if(!app.project) return null;
    var existing = OF_Tools_findCacheQueueComp();
    var cacheFolder = OF_Tools_getOrCreateCacheFolder();
    if(existing){
        if(cacheFolder && existing.parentFolder !== cacheFolder){
            try { existing.parentFolder = cacheFolder; } catch(e){}
        }
        return existing;
    }
    var markerComp = app.project.items.addComp(OF_TOOLS_CACHE_QUEUE_COMP_NAME, 4, 4, 1, 1 / 30, 30);
    if(markerComp){
        if(cacheFolder) markerComp.parentFolder = cacheFolder;
        try { markerComp.comment = "OF Cache Tool internal data — do not rename, move, or delete."; } catch(e){}
    }
    return markerComp;
}

function OF_Tools_findOrCreatePrecomp(sourceComp, parentFolder){
    var preName = sourceComp.name + "_pre";
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(item instanceof CompItem && item.name === preName) return item;
    }
    var precomp = app.project.items.addComp(preName, sourceComp.width, sourceComp.height, sourceComp.pixelAspect, sourceComp.duration, sourceComp.frameRate);
    if(precomp && parentFolder) precomp.parentFolder = parentFolder;
    return precomp;
}

function OF_Tools_replaceParentSource(sourceComp, precomp){
    if(!app.project) return;
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(!(item instanceof CompItem)) continue;
        if(item === precomp) continue;
        if(OF_Tools_isCacheQueueDataComp(item)) continue;
        for(var j = 1; j <= item.numLayers; j++){
            var layer = item.layer(j);
            if(layer && layer.source && layer.source === sourceComp){
                try { layer.replaceSource(precomp, true); } catch(e){}
            }
        }
    }
}

function OF_Tools_ensurePrecompLayers(precomp, sourceComp){
    // 确保底层有原合成层，且 enabled=false
    var sourceLayer = null;
    for(var i = 1; i <= precomp.numLayers; i++){
        var layer = precomp.layer(i);
        if(layer && layer.source && layer.source === sourceComp){
            sourceLayer = layer;
            break;
        }
    }
    if(!sourceLayer){
        sourceLayer = precomp.layers.add(sourceComp);
    }
    sourceLayer.moveToBeginning();
    try { sourceLayer.enabled = false; } catch(e){}

    // 移除已有的缓存 MOV 层
    for(var i = precomp.numLayers; i >= 1; i--){
        var layer = precomp.layer(i);
        if(layer && layer.source && /_cache\.mov$/i.test(layer.source.name)){
            layer.remove();
        }
    }
}

function OF_Tools_getCacheOutputModuleTemplate(){
    if(app.settings.haveSetting("visnlink", "cacheOutputModuleTemplate")){
        return app.settings.getSetting("visnlink", "cacheOutputModuleTemplate");
    }
    return "OF_Cache_CineForm_RGBA16_Q4";
}

function OF_Tools_saveCacheOutputModuleTemplate(name){
    if(!name) name = "OF_Cache_CineForm_RGBA16_Q4";
    app.settings.saveSetting("visnlink", "cacheOutputModuleTemplate", name);
}

function OF_Tools_applyCineFormRGBA16(om){
    // 只套用用户预存的精确模板，避免被默认 Lossless 覆盖
    var templateName = OF_Tools_getCacheOutputModuleTemplate();
    try {
        om.applyTemplate(templateName);
        OF_Log("[render] 成功套用输出模块模板 " + templateName);
        return true;
    } catch(e){ OF_Log("[render] 套用模板失败：" + e.toString()); }
    alert("未找到输出模块模板 '" + templateName + "'。\n请在 AE 渲染队列里手动创建一个输出模块：Format=QuickTime, Codec=GoPro CineForm, Depth=Trillions of Colors+ (RGBA 16bit), Quality=4，然后保存为同名模板；或在 Cache 面板修改模板名称。");
    return false;
}

// 只加入渲染队列并配置输出路径，不触发渲染。拆开是为了让批量缓存能把所有
// 合成一次性都加进队列，再统一调用一次 render()（见 OF_Tools_renderQueueItemsBatch）。
function OF_Tools_enqueueRenderItem(comp, movPath){
    OF_Log("[render] 加入渲染队列：" + comp.name + " -> " + movPath);
    var rqItem = app.project.renderQueue.items.add(comp);
    var om = rqItem.outputModule(1);
    // 先套用模板，再设置输出路径，避免路径被模板重置
    if(!OF_Tools_applyCineFormRGBA16(om)){
        rqItem.remove();
        OF_Log("[render] 未找到模板，移除队列项");
        return null;
    }
    om.file = new File(movPath);
    OF_Log("[render] 已设置输出路径：" + movPath);
    return rqItem;
}

// 一次性渲染传入的这批队列项。AE 的"文件已存在/该文件正被工程使用"确认框是跟着
// render() 这次调用走的：把本轮要缓存的所有合成都先加入队列、再只调用一次 render()，
// 弹窗会连续出现，用户可以连续点掉；如果像之前那样每个合成单独调一次 render()，
// 每次调用都会各自触发一轮独立的确认框，没法一口气点完。
// 队列里可能还残留用户自己手动加入/未清理的其它项，临时关闭它们，只渲染这一批，
// 结束后恢复原状（不影响用户自己维护的渲染队列）。
function OF_Tools_renderQueueItemsBatch(rqItems){
    if(!rqItems.length) return;
    var pausedItems = [];
    var allItems = app.project.renderQueue.items;
    for(var i = 1; i <= allItems.length; i++){
        var qi = allItems[i];
        var isOurs = false;
        for(var j = 0; j < rqItems.length; j++){
            if(rqItems[j] === qi){ isOurs = true; break; }
        }
        if(!isOurs && qi.render){
            pausedItems.push(qi);
            qi.render = false;
        }
    }
    if(pausedItems.length){
        OF_Log("[render] 临时跳过队列里其它 " + pausedItems.length + " 个已排队项");
    }

    OF_Log("[render] 开始批量渲染 " + rqItems.length + " 项，如有覆盖确认框请依次点掉");
    var renderErr = null;
    try {
        app.project.renderQueue.render();
    } catch(e){
        renderErr = e;
    }

    for(var k = 0; k < pausedItems.length; k++){
        try { pausedItems[k].render = true; } catch(e){}
    }

    if(renderErr){
        // 不在这里 throw：批量渲染里某一项出错或被用户中途 Stop，不代表其它项也失败，
        // 每一项各自的成败交给调用方按 rqItem.status 逐个判断。
        OF_Log("[render] 批量渲染过程中出现异常（可能是部分项被中止）：" + renderErr.toString());
    }
    OF_Log("[render] 批量渲染调用结束");
}

function OF_Tools_importAndPlaceMOV(precomp, movPath, sourceComp){
    OF_Log("[import] 尝试导入 MOV：" + movPath);
    var movFile = new File(movPath);
    if(!movFile.exists){
        throw new Error("缓存文件未生成：" + movPath);
    }
    // 重复缓存时复用已有 FootageItem，避免 AE 对同一个 MOV 重复弹导入选项。
    var footage = null;
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(item instanceof FootageItem && item.file){
            try {
                if(item.file.fsName === movFile.fsName){
                    footage = item;
                    break;
                }
            } catch(e){}
        }
    }
    if(!footage){
        var io = new ImportOptions(movFile);
        footage = app.project.importFile(io);
        OF_Log("[import] 导入成功：" + footage.name);
    } else {
        OF_Log("[import] 复用已有素材：" + footage.name);
    }
    var cacheFolder = OF_Tools_getOrCreateCacheFolder();
    if(cacheFolder) footage.parentFolder = cacheFolder;

    var movLayer = precomp.layers.add(footage);
    // 缓存层放在最顶层，原合成层放在最底层并禁用。
    movLayer.moveToBeginning();
    try { movLayer.solo = true; } catch(e){}

    // 把原合成层再确保移到底层
    var sourceLayer = null;
    for(var i = 1; i <= precomp.numLayers; i++){
        var layer = precomp.layer(i);
        if(layer && layer.source && layer.source === sourceComp){
            sourceLayer = layer;
            break;
        }
    }
    if(sourceLayer){
        sourceLayer.moveToEnd();
        try { sourceLayer.enabled = false; } catch(e){}
    }
}

// 摘除工程里所有指向 movPath 的素材项（FootageItem），为重新渲染同一路径让路。
// 用文件的 fsName 精确匹配，而不是名字，避免误删同名但不同路径的素材。
function OF_Tools_removeExistingCacheFootage(movPath){
    if(!app.project) return;
    var target = new File(movPath);
    for(var i = app.project.items.length; i >= 1; i--){
        var item = app.project.items[i];
        if(item instanceof FootageItem && item.file){
            try {
                if(item.file.fsName === target.fsName){
                    OF_Log("[cacheOne] 移除旧缓存素材项：" + item.name);
                    item.remove();
                }
            } catch(e){}
        }
    }
}

function OF_Tools_sanitizeCacheName(name){
    var result = name || "Untitled";
    try { result = decodeURI(result); } catch(e){}
    try { result = decodeURIComponent(result); } catch(e){}
    result = result.replace(/[\\\/\:\*\?\"\<\>\|]/g, "_");
    return result || "Untitled";
}

function OF_Tools_getProjectNameForCache(){
    if(app.project && app.project.file){
        return OF_Tools_sanitizeCacheName(app.project.file.name.replace(/\.aepx?$/i, ""));
    }
    return "Untitled";
}

// 缓存流程第一阶段：建/找 precomp、替换引用、把旧缓存素材/文件挪开，只算好输出
// 路径，不做渲染。渲染统一挪到 OF_Tools_cacheCompList 里一次性批量处理。
function OF_Tools_prepCacheEntry(targetComp, cacheFolderPath){
    OF_Log("[cacheOne] 开始处理：" + (targetComp ? targetComp.name : "null"));
    if(!targetComp || !(targetComp instanceof CompItem)){
        throw new Error("目标不是有效合成");
    }
    var sourceComp = OF_Tools_resolveCompForTree(targetComp);
    if(!sourceComp){
        throw new Error("找不到原始合成：" + (/_pre$/.test(targetComp.name) ? targetComp.name.slice(0, -4) : targetComp.name));
    }
    OF_Log("[cacheOne] 源合成：" + sourceComp.name);

    var projectName = OF_Tools_getProjectNameForCache();
    var cacheRootFolder = new Folder(cacheFolderPath);
    if(!cacheRootFolder.exists) cacheRootFolder.create();
    var cacheDir = cacheRootFolder.fsName + "/" + projectName + "/Cache";
    var cacheDirFolder = new Folder(cacheDir);
    if(!cacheDirFolder.exists) cacheDirFolder.create();
    var movPath = cacheDirFolder.fsName + "/" + OF_Tools_sanitizeCacheName(sourceComp.name) + "_cache.mov";
    OF_Log("[cacheOne] 缓存路径：" + movPath);

    // 准备阶段（建 precomp / 替换引用）单独开合一个 undo group，不要让它跨越
    // 后面的 renderQueue.render()：渲染是同步且不可撤销的操作，如果 undo group
    // 横跨渲染调用，AE 会报 "Undo group mismatch, will attempt to fix"。
    var precomp;
    app.beginUndoGroup("Auto Cache Prep: " + sourceComp.name);
    try {
        var cacheProjFolder = OF_Tools_getOrCreateCacheFolder();
        precomp = OF_Tools_findOrCreatePrecomp(sourceComp, cacheProjFolder);
        OF_Log("[cacheOne] precomp：" + precomp.name);
        OF_Tools_replaceParentSource(sourceComp, precomp);
        OF_Tools_ensurePrecompLayers(precomp, sourceComp);
        // 重复缓存同一个合成时，工程里还留着上一次导入的同路径素材项。
        // 渲染前把它从工程里摘掉，否则 AE 发现输出路径"正被工程内某素材占用"，
        // 会弹出确认覆盖的对话框。
        OF_Tools_removeExistingCacheFootage(movPath);
    } finally {
        app.endUndoGroup();
    }

    // 素材项摘掉了，但磁盘上的旧文件还在；同名文件仍然存在的话 AE 还是会弹"文件已存在，是否覆盖"。
    // 这里不直接删掉旧文件，而是先改名备份成 .bak：如果本次渲染失败，旧缓存不会丢；
    // 只有等新文件成功渲染并导入之后，才真正删掉这个备份（见 OF_Tools_importCacheEntry）。
    // 上一步刚把引用它的 FootageItem 从工程里摘除，但 AE 内部是否已经释放文件句柄不确定，
    // 如果改名失败（很可能是文件被占用），退回直接删除；两者都失败就保留旧文件，
    // 后果只是这一次 render() 时 AE 会弹出覆盖确认框，不影响正确性。
    var bakName = OF_Tools_sanitizeCacheName(sourceComp.name) + "_cache.mov.bak";
    var bakPath = cacheDirFolder.fsName + "/" + bakName;
    var hasBak = false;
    try {
        var staleFile = new File(movPath);
        if(staleFile.exists){
            var oldBak = new File(bakPath);
            if(oldBak.exists){
                try { oldBak.remove(); } catch(e){}
            }
            if(staleFile.rename(bakName)){
                hasBak = true;
                OF_Log("[cacheOne] 旧缓存文件已备份为：" + bakName);
            } else {
                OF_Log("[cacheOne] 旧缓存文件改名备份失败，尝试直接删除：" + movPath);
                try { staleFile.remove(); } catch(e2){ OF_Log("[cacheOne] 删除旧缓存文件也失败（可能被占用）：" + e2.toString()); }
            }
        }
    } catch(e){ OF_Log("[cacheOne] 处理旧缓存文件异常：" + e.toString()); }

    return {
        sourceComp: sourceComp,
        precomp: precomp,
        movPath: movPath,
        bakPath: bakPath,
        hasBak: hasBak,
        rqItem: null
    };
}

// 缓存流程第二阶段：根据渲染结果导入 MOV 并切层，或者渲染失败时启用原合成 fallback
// 并还原备份。entry 来自 OF_Tools_prepCacheEntry，rendered 由调用方按渲染队列项的
// 最终状态判断好后传入。
function OF_Tools_importCacheEntry(entry, rendered){
    var sourceComp = entry.sourceComp;
    var precomp = entry.precomp;
    var movPath = entry.movPath;
    app.beginUndoGroup("Auto Cache Import: " + sourceComp.name);
    try {
        if(rendered){
            OF_Log("[cacheOne] MOV 已生成，立即导入并替换：" + sourceComp.name);
            OF_Tools_importAndPlaceMOV(precomp, movPath, sourceComp);
            // 新缓存已经成功导入，旧的 .bak 备份可以删掉了。
            if(entry.hasBak){
                try {
                    var bakFile = new File(entry.bakPath);
                    if(bakFile.exists) bakFile.remove();
                } catch(e){ OF_Log("[cacheOne] 删除旧缓存备份失败：" + e.toString()); }
            }
        } else {
            OF_Log("[cacheOne] MOV 尚未生成，启用原合成作为 fallback：" + sourceComp.name);
            // 本次渲染失败：把之前改名保留的旧缓存文件还原回去，避免丢失上一轮的缓存。
            if(entry.hasBak){
                try {
                    var bakFileRestore = new File(entry.bakPath);
                    if(bakFileRestore.exists && bakFileRestore.rename(OF_Tools_sanitizeCacheName(sourceComp.name) + "_cache.mov")){
                        OF_Log("[cacheOne] 渲染失败，已还原旧缓存文件：" + sourceComp.name);
                    }
                } catch(e){ OF_Log("[cacheOne] 还原旧缓存备份失败：" + e.toString()); }
            }
            var sourceLayer = null;
            for(var i = 1; i <= precomp.numLayers; i++){
                var layer = precomp.layer(i);
                if(layer && layer.source && layer.source === sourceComp){
                    sourceLayer = layer;
                    break;
                }
            }
            if(sourceLayer){
                try { sourceLayer.enabled = true; } catch(e){}
            }
        }
    } finally {
        app.endUndoGroup();
    }
    OF_Log("[cacheOne] 完成：" + sourceComp.name);
}

function OF_Tools_cacheCompList(comps, cacheFolderPath){
    OF_Log("[cacheList] 批量缓存 " + comps.length + " 个合成，准备阶段（建 precomp / 备份旧文件）...");
    var entries = [];
    for(var i = 0; i < comps.length; i++){
        try {
            entries.push(OF_Tools_prepCacheEntry(comps[i], cacheFolderPath));
        } catch(e){
            OF_Log("[cacheList] 准备失败，跳过 " + (comps[i] ? comps[i].name : "?") + "：" + e.toString());
        }
    }
    if(!entries.length){
        OF_Log("[cacheList] 没有可渲染的合成，结束");
        return;
    }

    // 把这一批全部一次性加进渲染队列，再统一调用一次 render()：这样如果 AE 弹出
    // 覆盖确认框，会在这一次调用里连续出现，用户可以一口气点掉，而不是每个合成
    // 各自单独触发一轮"脚本调 render() -> 弹窗 -> 等确认"。
    OF_Log("[cacheList] 准备完成，一次性加入渲染队列 " + entries.length + " 项并开始渲染");
    for(var j = 0; j < entries.length; j++){
        try {
            entries[j].rqItem = OF_Tools_enqueueRenderItem(entries[j].sourceComp, entries[j].movPath);
        } catch(e){
            OF_Log("[cacheList] 加入渲染队列失败：" + entries[j].sourceComp.name + " -> " + e.toString());
        }
    }
    var queuedRqItems = [];
    for(var k = 0; k < entries.length; k++){
        if(entries[k].rqItem) queuedRqItems.push(entries[k].rqItem);
    }
    OF_Tools_renderQueueItemsBatch(queuedRqItems);

    OF_Log("[cacheList] 渲染阶段结束，开始逐项导入");
    for(var m = 0; m < entries.length; m++){
        var entry = entries[m];
        var rendered = false;
        if(entry.rqItem){
            try { rendered = (entry.rqItem.status === RQItemStatus.DONE); } catch(e){}
            try { entry.rqItem.remove(); } catch(e){}
        }
        if(rendered){
            try { rendered = new File(entry.movPath).exists; } catch(e){ rendered = false; }
        }
        try {
            OF_Tools_importCacheEntry(entry, rendered);
        } catch(e){
            OF_Log("[cacheList] 导入阶段异常：" + entry.sourceComp.name + " -> " + e.toString());
        }
    }
    OF_Log("[cacheList] 全部缓存完成");
}

function OF_Tools_getCacheFolderPath(){
    if(!app.settings.haveSetting("visnlink", "cacheFolderPath")) return null;
    var path = app.settings.getSetting("visnlink", "cacheFolderPath");
    if(!path) return null;
    var f = new Folder(path);
    if(!f.exists) return null;
    return path;
}

function OF_Tools_promptAndSaveCacheFolder(){
    var f = Folder.selectDialog("选择缓存根目录");
    if(!f) return null;
    app.settings.saveSetting("visnlink", "cacheFolderPath", f.fsName);
    return f.fsName;
}

function OF_Tools_openCacheFolder(){
    var cachePath = OF_Tools_getCacheFolderPath();
    if(!cachePath){
        alert("请先点击 设置 指定缓存根目录");
        return;
    }
    // 优先直达当前工程实际写入缓存文件的子目录，不存在（还没缓存过）则回退到根目录。
    var projectCacheDir = new Folder(cachePath + "/" + OF_Tools_getProjectNameForCache() + "/Cache");
    var target = projectCacheDir.exists ? projectCacheDir : new Folder(cachePath);
    if(!target.exists){
        alert("目录不存在：" + target.fsName);
        return;
    }
    target.execute();
}

// entry.comp 可能是已经从工程里删除的 Item：删除后原引用仍然是个对象，
// 但访问它的属性会抛异常，用这个判断代替直接判空。
function OF_Tools_isCompValid(comp){
    if(!comp) return false;
    try {
        var _ = comp.id;
        return comp instanceof CompItem;
    } catch(e){
        return false;
    }
}

// 缓存队列现在直接存成工程内嵌的 marker comp（见上面 OF_Tools_getOrCreateCacheQueueComp），
// 不再依赖 app.settings：跨工程路径变化、跨会话都靠原生 Save/Open 保证，不用自己维护
// key/序列化格式。
function OF_Tools_saveCacheQueueForProject(cacheItems){
    if(!app.project) return;
    app.beginUndoGroup("Update Cache Queue");
    try {
        var markerComp = OF_Tools_getOrCreateCacheQueueComp();
        if(!markerComp){
            OF_Log("[CacheManager] 无法创建缓存队列数据合成，保存失败");
            return;
        }
        for(var i = markerComp.numLayers; i >= 1; i--){
            try {
                var oldLayer = markerComp.layer(i);
                // 警戒层是 locked 的，locked 状态下 remove() 可能直接失败——
                // 删之前先解锁，否则旧警戒层会一直留着，每次保存都多加一条新的。
                try { oldLayer.locked = false; } catch(e2){}
                oldLayer.remove();
            } catch(e){}
        }
        // layers.add() 每次都插到最顶层，倒序添加才能让最终顶到底的顺序
        // 与 cacheItems 数组从前到后的顺序一致。
        for(var j = cacheItems.length - 1; j >= 0; j--){
            var entry = cacheItems[j];
            if(!OF_Tools_isCompValid(entry.comp)) continue;
            var layer = markerComp.layers.add(entry.comp);
            try { layer.enabled = !!entry.enabled; } catch(e){}
        }
        // 最后加警戒层，让它落在最顶层。
        OF_Tools_addCacheQueueWarningLayer(markerComp);
        OF_Log("[CacheManager] 保存缓存队列 " + cacheItems.length + " 项到 " + markerComp.name);
    } catch(e){
        OF_Log("[CacheManager] 保存缓存队列失败：" + e.toString());
    } finally {
        app.endUndoGroup();
    }
}

function OF_Tools_loadCacheQueueForProject(){
    var result = [];
    var markerComp = OF_Tools_findCacheQueueComp();
    if(!markerComp) return result;
    for(var j = 1; j <= markerComp.numLayers; j++){
        try {
            var layer = markerComp.layer(j);
            if(!layer) continue;
            var source = layer.source;
            // 警戒文字层没有 .source（不是合成引用），isCompValid 会自然把它过滤掉。
            if(!OF_Tools_isCompValid(source)) continue;
            result.push({comp: source, enabled: !!layer.enabled});
        } catch(e){}
    }
    OF_Log("[CacheManager] 从缓存队列数据合成读取 " + result.length + " 项");
    return result;
}

function OF_Tools_initCachePanel(panel){
    OF_Log("[CacheManager] 初始化 Cache Panel（手动列表模式）");
    if(!app.project){
        panel.status.text = "请先打开一个工程";
        return;
    }

    var cachePath = OF_Tools_getCacheFolderPath();
    panel.folderRow.path.text = cachePath ? cachePath : "未设置";
    OF_Log("[CacheManager] 缓存目录：" + cachePath);
    // Cache 页面现在是用户手动维护的扁平列表：不再自动扫描依赖树。
    // 每一项保存真实的 CompItem 引用、启用状态和用户调整后的顺序。
    // 列表跟随工程文件持久化（见 OF_Tools_saveCacheQueueForProject），重开工程后会自动恢复。
    var cacheItems = OF_Tools_loadCacheQueueForProject();
    OF_Log("[CacheManager] 从工程配置恢复缓存队列 " + cacheItems.length + " 项");

    function persist(){
        OF_Tools_saveCacheQueueForProject(cacheItems);
    }

    function getListItemText(index){
        var entry = cacheItems[index];
        if(!entry) return "";
        var prefix = entry.enabled ? "[x]" : "[ ]";
        var preName = entry.comp.name + "_pre";
        var cachedLabel = OF_Tools_findPrecompByName(preName) ? " [pre]" : "";
        return (index + 1) + ". " + prefix + " " + entry.comp.name + cachedLabel;
    }

    function refreshList(selectedIndex){
        panel.list.removeAll();
        for(var i = 0; i < cacheItems.length; i++){
            panel.list.add("item", getListItemText(i));
        }
        if(selectedIndex !== undefined && selectedIndex >= 0 && selectedIndex < panel.list.items.length){
            panel.list.selection = panel.list.items[selectedIndex];
        }
        panel.status.text = cacheItems.length ? (cacheItems.length + " 个合成") : "缓存列表为空";
        try { panel.list.active = true; } catch(e){}
    }

    panel.list.onDoubleClick = function(){
        var idx = panel.list.selection ? panel.list.selection.index : -1;
        if(idx < 0) return;
        cacheItems[idx].enabled = !cacheItems[idx].enabled;
        // 直接改 ListItem.text 在这个宿主上不会立刻重绘（要等下一次无关的焦点切换才刷新），
        // 改用跟其它按钮一致的 refreshList，靠 removeAll/add 强制重绘。
        refreshList(idx);
        persist();
    };

    panel.actionRow.addComp.onClick = function(){
        var comps = OF_Tools_getSelectedComps();
        if(!comps || comps.length === 0){
            alert("请先在 AE 中打开或选择一个合成");
            return;
        }
        var added = 0;
        for(var i = 0; i < comps.length; i++){
            var exists = false;
            for(var j = 0; j < cacheItems.length; j++){
                if(cacheItems[j].comp.id === comps[i].id){ exists = true; break; }
            }
            if(!exists){
                cacheItems.push({comp: comps[i], enabled: true});
                added++;
            }
        }
        OF_Log("[CacheManager] 添加合成 " + added + " 个");
        refreshList(cacheItems.length - 1);
        persist();
    };

    panel.folderRow.setBtn.onClick = function(){
        var p = OF_Tools_promptAndSaveCacheFolder();
        if(p){
            cachePath = p;
            panel.folderRow.path.text = cachePath;
            OF_Log("[CacheManager] 设置缓存目录：" + cachePath);
        }
    };

    panel.folderRow.openBtn.onClick = function(){
        OF_Tools_openCacheFolder();
    };

    panel.actionRow.refresh.onClick = function(){
        // Refresh：重新读取缓存目录、项目中的 _pre 状态，并清掉已经在工程里被删除的合成条目
        // （按 id 校验而不是 name，因为工程里可能存在同名的不同合成）。
        cachePath = OF_Tools_getCacheFolderPath() || cachePath;
        panel.folderRow.path.text = cachePath ? cachePath : "未设置";
        var removed = 0;
        for(var i = cacheItems.length - 1; i >= 0; i--){
            if(!OF_Tools_isCompValid(cacheItems[i].comp)){
                cacheItems.splice(i, 1);
                removed++;
            }
        }
        if(removed){
            OF_Log("[CacheManager] Refresh 清除失效条目 " + removed + " 个");
            persist();
        }
        refreshList(panel.list.selection ? panel.list.selection.index : -1);
    };

    panel.btnRow.moveUp.onClick = function(){
        var idx = panel.list.selection ? panel.list.selection.index : -1;
        if(idx <= 0) return;
        var tmp = cacheItems[idx - 1];
        cacheItems[idx - 1] = cacheItems[idx];
        cacheItems[idx] = tmp;
        refreshList(idx - 1);
        persist();
    };

    panel.btnRow.moveDown.onClick = function(){
        var idx = panel.list.selection ? panel.list.selection.index : -1;
        if(idx < 0 || idx >= cacheItems.length - 1) return;
        var tmp = cacheItems[idx + 1];
        cacheItems[idx + 1] = cacheItems[idx];
        cacheItems[idx] = tmp;
        refreshList(idx + 1);
        persist();
    };

    panel.btnRow.removeItem.onClick = function(){
        var idx = panel.list.selection ? panel.list.selection.index : -1;
        if(idx < 0) return;
        cacheItems.splice(idx, 1);
        refreshList(Math.min(idx, cacheItems.length - 1));
        persist();
    };

    panel.actionRow.cacheAll.onClick = function(){
        OF_Log("[CacheManager] 点击 Start Cache");
        try {
            if(!cachePath){
                alert("请先点击 Set 设置缓存目录");
                return;
            }
            var toCache = [];
            for(var i = 0; i < cacheItems.length; i++){
                if(cacheItems[i].enabled) toCache.push(cacheItems[i].comp);
            }
            OF_Log("[CacheManager] 勾选合成数：" + toCache.length);
            if(toCache.length === 0){
                alert("没有勾选任何合成");
                return;
            }
            OF_Log("[CacheManager] 按列表顺序开始缓存（渲染并立即导入）");
            panel.status.text = "正在渲染并导入...";

            // 注意：这里不整体包一个 undo group。每个合成自己的编辑操作已经在
            // OF_Tools_prepCacheEntry / OF_Tools_importCacheEntry 内部分段开合 undo
            // group，且都不跨越 render()；如果外层再包一层横跨多个合成的渲染循环，
            // 同样会触发 Undo group mismatch。OF_Tools_cacheCompList 内部会把这一批
            // 合成的渲染统一合并成一次 render() 调用，让覆盖确认框能连续点掉。
            try {
                OF_Tools_cacheCompList(toCache, cachePath);
                panel.status.text = "Cache complete";
            } catch(e) {
                OF_Log("[CacheManager] 错误：" + e.toString());
                alert("缓存出错：\n" + e.toString());
                panel.status.text = "Error";
            }
            refreshList();
            persist();
        } catch(e) {
            OF_Log("[CacheManager] 回调异常：" + e.toString());
            alert("Cache Selected 回调异常：\n" + e.toString());
        }
    };

    refreshList();
    OF_Log("[CacheManager] Cache Panel 初始化完成");
}
