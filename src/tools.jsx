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

//============ 自动缓存工具 ==========//
function OF_Tools_getSelectedComps(){
    var comps = [];
    if(app.project && app.project.activeItem && app.project.activeItem instanceof CompItem){
        comps.push(app.project.activeItem);
        return comps;
    }
    if(!app.project) return comps;
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(item instanceof CompItem && item.selected){
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

function OF_Tools_renderCompToMOV(comp, movPath){
    OF_Log("[render] 开始加入渲染队列：" + comp.name + " -> " + movPath);
    var rqItem = app.project.renderQueue.items.add(comp);
    var om = rqItem.outputModule(1);
    // 先套用模板，再设置输出路径，避免路径被模板重置
    if(!OF_Tools_applyCineFormRGBA16(om)){
        rqItem.remove();
        OF_Log("[render] 未找到模板，移除队列项");
        return;
    }
    om.file = new File(movPath);
    OF_Log("[render] 已设置输出路径：" + movPath);
    // 缓存操作需要在本次点击内完成渲染，之后才能立即导入 MOV。
    // 这里使用 AE 的同步渲染接口；用户点击 Start Cache 后会看到 AE 进入渲染状态。
    try {
        app.project.renderQueue.render();
    } catch(e){
        OF_Log("[render] 渲染失败：" + e.toString());
        throw e;
    }
    var renderedFile = new File(movPath);
    if(!renderedFile.exists){
        throw new Error("渲染结束但未找到输出文件：" + movPath);
    }
    OF_Log("[render] 渲染完成：" + movPath);
    return renderedFile;
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

function OF_Tools_cacheOneComp(targetComp, cacheFolderPath){
    OF_Log("[cacheOne] 开始处理：" + (targetComp ? targetComp.name : "null"));
    if(!targetComp || !(targetComp instanceof CompItem)){
        throw new Error("目标不是有效合成");
    }
    var sourceComp = OF_Tools_resolveCompForTree(targetComp);
    if(!sourceComp){
        throw new Error("找不到原始合成：" + (/_pre$/.test(targetComp.name) ? targetComp.name.slice(0, -4) : targetComp.name));
    }
    OF_Log("[cacheOne] 源合成：" + sourceComp.name);

    var cacheProjFolder = OF_Tools_getOrCreateCacheFolder();
    var precomp = OF_Tools_findOrCreatePrecomp(sourceComp, cacheProjFolder);
    OF_Log("[cacheOne] precomp：" + precomp.name);

    OF_Tools_replaceParentSource(sourceComp, precomp);
    OF_Tools_ensurePrecompLayers(precomp, sourceComp);

    var projectName = OF_Tools_getProjectNameForCache();
    var cacheRootFolder = new Folder(cacheFolderPath);
    if(!cacheRootFolder.exists) cacheRootFolder.create();
    var cacheDir = cacheRootFolder.fsName + "/" + projectName + "/Cache";
    var cacheDirFolder = new Folder(cacheDir);
    if(!cacheDirFolder.exists) cacheDirFolder.create();
    var movPath = cacheDirFolder.fsName + "/" + OF_Tools_sanitizeCacheName(sourceComp.name) + "_cache.mov";
    OF_Log("[cacheOne] 缓存路径：" + movPath);

    var rendered = false;
    try {
        rendered = !!OF_Tools_renderCompToMOV(sourceComp, movPath);
    } catch(e){
        OF_Log("[cacheOne] 渲染异常，启用原合成 fallback：" + e.toString());
    }

    if(rendered){
        OF_Log("[cacheOne] MOV 已生成，立即导入并替换");
        OF_Tools_importAndPlaceMOV(precomp, movPath, sourceComp);
    } else {
        OF_Log("[cacheOne] MOV 尚未生成，启用原合成作为 fallback");
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
    OF_Log("[cacheOne] 完成：" + sourceComp.name);
}

function OF_Tools_cacheCompList(comps, cacheFolderPath){
    OF_Log("[cacheList] 批量缓存 " + comps.length + " 个合成");
    for(var i = 0; i < comps.length; i++){
        OF_Tools_cacheOneComp(comps[i], cacheFolderPath);
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
    var cacheItems = [];

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
        // 原地更新文字，避免 removeAll/add 让焦点跳到其它按钮。
        if(panel.list.items[idx]) panel.list.items[idx].text = getListItemText(idx);
        panel.list.selection = panel.list.items[idx];
        try { panel.list.active = true; } catch(e){}
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
    };

    panel.folderRow.setBtn.onClick = function(){
        var p = OF_Tools_promptAndSaveCacheFolder();
        if(p){
            cachePath = p;
            panel.folderRow.path.text = cachePath;
            OF_Log("[CacheManager] 设置缓存目录：" + cachePath);
        }
    };

    panel.actionRow.refresh.onClick = function(){
        // Refresh 只重新读取缓存目录和项目中的 _pre 状态，不改变用户列表和顺序。
        cachePath = OF_Tools_getCacheFolderPath() || cachePath;
        panel.folderRow.path.text = cachePath ? cachePath : "未设置";
        refreshList(panel.list.selection ? panel.list.selection.index : -1);
    };

    panel.btnRow.moveUp.onClick = function(){
        var idx = panel.list.selection ? panel.list.selection.index : -1;
        if(idx <= 0) return;
        var tmp = cacheItems[idx - 1];
        cacheItems[idx - 1] = cacheItems[idx];
        cacheItems[idx] = tmp;
        refreshList(idx - 1);
    };

    panel.btnRow.moveDown.onClick = function(){
        var idx = panel.list.selection ? panel.list.selection.index : -1;
        if(idx < 0 || idx >= cacheItems.length - 1) return;
        var tmp = cacheItems[idx + 1];
        cacheItems[idx + 1] = cacheItems[idx];
        cacheItems[idx] = tmp;
        refreshList(idx + 1);
    };

    panel.btnRow.removeItem.onClick = function(){
        var idx = panel.list.selection ? panel.list.selection.index : -1;
        if(idx < 0) return;
        cacheItems.splice(idx, 1);
        refreshList(Math.min(idx, cacheItems.length - 1));
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

            app.beginUndoGroup("Auto Cache");
            try {
                OF_Tools_cacheCompList(toCache, cachePath);
                panel.status.text = "Cache complete";
            } catch(e) {
                OF_Log("[CacheManager] 错误：" + e.toString());
                alert("缓存出错：\n" + e.toString());
                panel.status.text = "Error";
            }
            app.endUndoGroup();
            refreshList();
        } catch(e) {
            OF_Log("[CacheManager] 回调异常：" + e.toString());
            alert("Cache Selected 回调异常：\n" + e.toString());
        }
    };

    refreshList();
    OF_Log("[CacheManager] Cache Panel 初始化完成");
}
