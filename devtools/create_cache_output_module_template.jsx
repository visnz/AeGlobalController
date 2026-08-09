// 辅助创建缓存所需的输出模块模板：OF_Cache_CineForm_RGBA16_Q4
// 用法：
// 1. 在 AE 中运行此脚本。
// 2. 如果没有该模板，脚本会创建一个临时合成并加入渲染队列，然后弹出提示。
// 3. 按提示在渲染队列里双击该合成的 Output Module，设置：
//    Format=QuickTime, Video Codec=GoPro CineForm, Depth=Trillions of Colors+ (RGBA 16bit), Quality=4。
// 4. 再次运行此脚本，它会将当前设置保存为模板并清理临时合成。

(function createCacheOutputModuleTemplate(){
    if(!app.project){
        alert("请先打开一个 AE 工程。");
        return;
    }

    var TEMPLATE_NAME = "OF_Cache_CineForm_RGBA16_Q4";
    var TEMP_COMP_NAME = "Visn_CacheTemplate_Setup";

    // 检查模板是否已存在
    var templates = [];
    try {
        // templates 可以通过任意 renderQueueItem 的 outputModule 读取
        var rq = app.project.renderQueue;
        if(rq.items.length > 0){
            templates = rq.item(1).outputModule(1).templates;
        }
    } catch(e){
        // 忽略
    }
    for(var i = 0; i < templates.length; i++){
        if(templates[i] === TEMPLATE_NAME){
            alert("模板 '" + TEMPLATE_NAME + "' 已经存在。");
            return;
        }
    }

    // 查找临时合成
    var tempComp = null;
    for(var i = 1; i <= app.project.items.length; i++){
        var item = app.project.items[i];
        if(item instanceof CompItem && item.name === TEMP_COMP_NAME){
            tempComp = item;
            break;
        }
    }

    // 查找对应的渲染队列项
    function findRQItemForComp(comp){
        if(!comp) return null;
        for(var i = 1; i <= app.project.renderQueue.items.length; i++){
            var rqItem = app.project.renderQueue.item(i);
            if(rqItem.comp && rqItem.comp.id === comp.id){
                return rqItem;
            }
        }
        return null;
    }

    var rqItem = findRQItemForComp(tempComp);

    if(!tempComp || !rqItem){
        // 第一阶段：创建临时合成和渲染队列项，提示用户去设置
        app.beginUndoGroup("Create Cache Output Module Template");
        try {
            if(tempComp) tempComp.remove();
            tempComp = app.project.items.addComp(TEMP_COMP_NAME, 100, 100, 1, 1, 30);
            rqItem = app.project.renderQueue.items.add(tempComp);
        } catch(e){
            alert("创建临时合成失败：\n" + e.toString());
            return;
        }
        app.endUndoGroup();

        alert("已创建临时合成 '" + TEMP_COMP_NAME + "' 并加入渲染队列。\n\n" +
              "请在渲染队列面板中双击该合成的 Output Module，按以下设置：\n" +
              "  Format: QuickTime\n" +
              "  Video Codec: GoPro CineForm\n" +
              "  Depth: Trillions of Colors+ (RGBA 16bit)\n" +
              "  Quality: 4\n\n" +
              "设置完成后，再次运行此脚本保存模板。");
        return;
    }

    // 第二阶段：保存模板并清理
    app.beginUndoGroup("Save Cache Output Module Template");
    try {
        var om = rqItem.outputModule(1);
        om.saveAsTemplate(TEMPLATE_NAME);

        rqItem.remove();
        tempComp.remove();

        alert("模板 '" + TEMPLATE_NAME + "' 已保存。\n现在可以在 Cache 功能中使用了。");
    } catch(e){
        alert("保存模板失败：\n" + e.toString() + "\n\n请确认已正确设置 QuickTime / GoPro CineForm / RGBA 16bit / Quality 4。");
    }
    app.endUndoGroup();
})();
