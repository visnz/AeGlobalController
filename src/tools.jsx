//============ 批量工具 ==========//
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
