function UI(object,colorPanel){
    var myPalette = (object instanceof Panel)?object : new Window("palette","桶子工具箱", undefined, {resizeable: true})

    // 顶层容器 + 分页按钮 + log
    var topContent=""+
    "group {orientation:'column', alignment:['fill','fill'], spacing:5, "+
        "tabRow: Group {alignment:['fill','top'], orientation:'row', spacing:5, "+
            "tabTools: Button {text:'工具', alignment:['fill','fill'], preferredSize:[80,25]}, "+
            "tabCache: Button {text:'缓存', alignment:['fill','fill'], preferredSize:[80,25]}"+
        "}, "+
        "panelContainer: Group {alignment:['fill','fill'], orientation:'stack', spacing:0}, "+
        "logGroup: Group {text:'log功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "logToggle: Button {text:'Log: OFF', alignment:['fill','top'], preferredSize:[100,20]},"+
            "logPanel: Panel {text:'Log', alignment:['fill','top'], visible:false, orientation:'column', spacing:5 ,"+
                "logText: EditText {text:'', alignment:['fill','fill'], properties:{multiline:true}, preferredSize:[200,120]}"+
            "}"+
        "}"+
    "}"
    myPalette.grp = myPalette.add(topContent);
    myPalette.layout.layout(true);

    // Tools 分页内容
    var toolsContent=""+
    "Group {orientation:'column', alignment:['fill','fill'], spacing:5, "+
        "outsideGroup: Group {text:'iconBtn功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "lineB: Panel {text:'集成脚本', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
                    "line0: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                        "listBox: DropDownList { alignment:['fill','fill'], preferredSize:[150,25]},"+
                        "apply: Button { text:'apply', preferredSize:[45,25] },"+
                    "},"+
                    "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                        "textme: StaticText {text:'tools'},"+
                        "Fi: Button { text:'Fi', preferredSize:[25,25] }, "+
                        "Fo: Button { text:'Fo', preferredSize:[25,25] }, "+
                        "Su: Button { text:'Su', preferredSize:[25,25] }, "+
                        "Sd: Button { text:'Sd', preferredSize:[25,25] }, "+
                        "Rl: Button { text:'Rl', preferredSize:[25,25] }, "+
                        "Rr: Button { text:'Rr', preferredSize:[25,25] }, "+
                        "Cl: Button { text:'Cl', preferredSize:[25,25] }, "+
                        "Rv: Button { text:'Rv', preferredSize:[25,25] }, "+
                        "Nul: Button { text:'Nul', preferredSize:[25,25] }, "+
                        "Vig: Button { text:'Vig', preferredSize:[25,25] }, "+
                    "},"+
                    "line2: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                        "textme: StaticText {text:'batch'},"+
                        "mb: Button { text:'MB', preferredSize:[30,25] }, "+
                        "ext: Button { text:'+30s', preferredSize:[35,25] }, "+
                    "},"+
                    "line3: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                        "line4: Group {text:'功能', alignment:['fill','top'], orientation:'column', spacing:0 ,"+
                            "lineA: Panel {text:'Ease', alignment:['fill','top'], orientation:'column', spacing:2 ,"+
                                "easeInRow: Group {alignment:['fill','top'], orientation:'row', spacing:2 ,"+
                                    "lab: StaticText {text:'in', preferredSize:[28,18]},"+
                                    "slider: Slider {minvalue:1, maxvalue:99, value:50, alignment:['fill','top'], preferredSize:[70,18]},"+
                                    "val: EditText {text:'50', alignment:['fill','top'], preferredSize:[30,18], properties:{multiline:false}}"+
                                "},"+
                                "easeRow: Group {alignment:['fill','top'], orientation:'row', spacing:2 ,"+
                                    "lab: StaticText {text:'both', preferredSize:[28,18]},"+
                                    "slider: Slider {minvalue:1, maxvalue:99, value:50, alignment:['fill','top'], preferredSize:[70,18]},"+
                                    "val: EditText {text:'50', alignment:['fill','top'], preferredSize:[30,18], properties:{multiline:false}}"+
                                "},"+
                                "easeOutRow: Group {alignment:['fill','top'], orientation:'row', spacing:2 ,"+
                                    "lab: StaticText {text:'out', preferredSize:[28,18]},"+
                                    "slider: Slider {minvalue:1, maxvalue:99, value:50, alignment:['fill','top'], preferredSize:[70,18]},"+
                                    "val: EditText {text:'50', alignment:['fill','top'], preferredSize:[30,18], properties:{multiline:false}}"+
                                "}"+
                            "},"+
                            "lineB: Panel {text:'AnchorMove', alignment:['fill','top'], orientation:'row', spacing:2 ,"+
                                "grid: Group {alignment:['left','top'], orientation:'column', spacing:0 ,"+
                                    "row0: Group {alignment:['left','top'], orientation:'row', spacing:0 ,"+
                                        "tl: Button {text:'┌', preferredSize:[22,18]},"+
                                        "tc: Button {text:'┬', preferredSize:[22,18]},"+
                                        "tr: Button {text:'┐', preferredSize:[22,18]}"+
                                    "},"+
                                    "row1: Group {alignment:['left','top'], orientation:'row', spacing:0 ,"+
                                        "ml: Button {text:'├', preferredSize:[22,18]},"+
                                        "mc: Button {text:'┼', preferredSize:[22,18]},"+
                                        "mr: Button {text:'┤', preferredSize:[22,18]}"+
                                    "},"+
                                    "row2: Group {alignment:['left','top'], orientation:'row', spacing:0 ,"+
                                        "bl: Button {text:'└', preferredSize:[22,18]},"+
                                        "bc: Button {text:'┴', preferredSize:[22,18]},"+
                                        "br: Button {text:'┘', preferredSize:[22,18]}"+
                                    "}"+
                                "},"+
                                "inputs: Group {alignment:['fill','top'], orientation:'column', spacing:2 ,"+
                                    "xRow: Group {alignment:['fill','top'], orientation:'row', spacing:2 ,"+
                                        "lab: StaticText {text:'x', preferredSize:[16,18]},"+
                                        "xVal: EditText {text:'50', alignment:['fill','top'], preferredSize:[36,18], properties:{multiline:false}}"+
                                    "},"+
                                    "yRow: Group {alignment:['fill','top'], orientation:'row', spacing:2 ,"+
                                        "lab: StaticText {text:'y', preferredSize:[16,18]},"+
                                        "yVal: EditText {text:'50', alignment:['fill','top'], preferredSize:[36,18], properties:{multiline:false}}"+
                                    "},"+
                                    "reset: Button {text:'Reset', preferredSize:[58,20]}"+
                                "}"+
                            "}"+
                        "},"+
                        "line5: Group {text:'功能', alignment:['fill','top'], orientation:'column', spacing:0 ,"+
                            "listBox: ListBox { alignment:['fill','fill'], preferredSize:[80,180]}"+
                        "}"+
                    "}"+
                "}"+
            "}"+
        "},"+
        "colorGroup: Panel {text:'色板', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'色板', alignment:['fill','top'], orientation:'row', spacing:5, preferredSize:[200,35] "+
            "}"+
        "},"+
        "transGroup: Group {text:'trans功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Panel {text:'中英查找', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "search: EditText {text:'', alignment:['fill','top'],properties:{multiline:false}, preferredSize:[100,30]},"+
                "sc2enB: Button {text:'SCtoEN', alignment:['fill','top'], preferredSize:[30,25]},"+
                "en2scB: Button {text:'ENtoSC', alignment:['fill','top'], preferredSize:[30,25]},"+
                "listbox: DropDownList{alignment:['fill','top'], preferredSize:[200,25]},"+
                "apply: Button {text:'Apply', alignment:['fill','top'], preferredSize:[30,25]}"+
            "}"+
        "}"+
    "}"
    var tp = myPalette.grp.panelContainer.add(toolsContent);

    // Cache 分页内容。逐个创建控件，避免复杂资源字符串解析失败。
    var cp = myPalette.grp.panelContainer.add("group");
    cp.orientation = "column";
    cp.alignment = ["fill", "top"];
    cp.spacing = 5;
    cp.visible = false;

    cp.actionRow = cp.add("group");
    cp.actionRow.orientation = "row";
    cp.actionRow.alignment = ["fill", "top"];
    cp.actionRow.spacing = 5;
    cp.actionRow.addComp = cp.actionRow.add("button", undefined, "添加当前合成");
    cp.actionRow.addComp.preferredSize = [105, 25];
    cp.actionRow.cacheAll = cp.actionRow.add("button", undefined, "开始缓存");
    cp.actionRow.cacheAll.preferredSize = [105, 25];
    cp.actionRow.refresh = cp.actionRow.add("button", undefined, "刷新");
    cp.actionRow.refresh.preferredSize = [65, 25];

    cp.templateRow = cp.add("group");
    cp.templateRow.orientation = "row";
    cp.templateRow.alignment = ["fill", "top"];
    cp.templateRow.spacing = 5;
    cp.templateRow.lab = cp.templateRow.add("statictext", undefined, "输出模板:");
    cp.templateRow.lab.preferredSize = [50, 20];
    cp.templateRow.template = cp.templateRow.add("edittext", undefined, "OF_Cache_CineForm_RGBA16_Q4");
    cp.templateRow.template.alignment = ["fill", "center"];
    cp.templateRow.template.preferredSize = [200, 20];

    cp.folderRow = cp.add("group");
    cp.folderRow.orientation = "row";
    cp.folderRow.alignment = ["fill", "top"];
    cp.folderRow.spacing = 5;
    cp.folderRow.lab = cp.folderRow.add("statictext", undefined, "缓存目录:");
    cp.folderRow.lab.preferredSize = [40, 20];
    cp.folderRow.path = cp.folderRow.add("statictext", undefined, "未设置");
    cp.folderRow.path.alignment = ["fill", "center"];
    cp.folderRow.path.preferredSize = [200, 20];
    cp.folderRow.setBtn = cp.folderRow.add("button", undefined, "设置");
    cp.folderRow.setBtn.preferredSize = [40, 20];
    cp.folderRow.openBtn = cp.folderRow.add("button", undefined, "打开");
    cp.folderRow.openBtn.preferredSize = [40, 20];

    cp.listLabel = cp.add("statictext", undefined, "缓存列表（双击切换，按顺序执行）");
    cp.listLabel.alignment = ["fill", "top"];
    cp.listLabel.preferredSize = [300, 18];
    cp.list = cp.add("listbox", undefined, undefined);
    cp.list.alignment = ["fill", "top"];
    cp.list.preferredSize = [300, 150];

    cp.btnRow = cp.add("group");
    cp.btnRow.orientation = "row";
    cp.btnRow.alignment = ["fill", "top"];
    cp.btnRow.spacing = 5;
    cp.btnRow.moveUp = cp.btnRow.add("button", undefined, "↑");
    cp.btnRow.moveUp.preferredSize = [45, 22];
    cp.btnRow.moveDown = cp.btnRow.add("button", undefined, "↓");
    cp.btnRow.moveDown.preferredSize = [50, 22];
    cp.btnRow.removeItem = cp.btnRow.add("button", undefined, "删除");
    cp.btnRow.removeItem.preferredSize = [60, 22];

    cp.status = cp.add("statictext", undefined, "缓存列表为空");
    cp.status.alignment = ["fill", "top"];
    cp.status.preferredSize = [300, 20];

    // 缓存输出模块模板名可编辑并持久化
    cp.templateRow.template.text = OF_Tools_getCacheOutputModuleTemplate();
    cp.templateRow.template.onChange = function(){
        OF_Tools_saveCacheOutputModuleTemplate(cp.templateRow.template.text);
    };

    myPalette.layout.layout(true);

    // 分页切换
    function switchTab(tab){
        if(tab === 'tools'){
            tp.visible = true;
            cp.visible = false;
            myPalette.grp.tabRow.tabTools.text = '● 工具';
            myPalette.grp.tabRow.tabCache.text = '缓存';
        } else {
            tp.visible = false;
            cp.visible = true;
            myPalette.grp.tabRow.tabTools.text = '工具';
            myPalette.grp.tabRow.tabCache.text = '● 缓存';
        }
        myPalette.layout.layout(true);
        myPalette.layout.resize();
        if(tab !== 'tools'){
            try { cp.list.active = true; } catch(e){}
        }
    }
    myPalette.grp.tabRow.tabTools.onClick = function(){ switchTab('tools'); };
    myPalette.grp.tabRow.tabCache.onClick = function(){ switchTab('cache'); };
    switchTab('tools');

    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"1.随机变换..randomTransform()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"2.文本拆分..textSplitor()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"3.图层时间偏移..layersShifter()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"4.层空间排列..layerToGrid()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"5.层空间分裂..layerSplitor()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"6.阵列步进..stepByChange()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"7.层隔行选择..layersSelector()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"8.层随机选择..randomLayersSelector()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"9.层排序..layersSortor()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"A.烘焙..bake()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"B.合成扩大..scaleComposition()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"C.图层扩大..scaleSelectedLayers()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"D.图层重命名..layersRenamer()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"E.渐变调光..rampLight()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"F.全景图创建..360creator()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"G.阴影材质..shadeIt()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"H.电路板集成..circuitFX()")
    tp.outsideGroup.line1.lineB.line0.listBox.add('item',"I.背景板集成..quadrateFX()")
// #DEVPOINT#
    tp.outsideGroup.line1.lineB.line0.apply.onClick=function(){
        if(!tp.outsideGroup.line1.lineB.line0.listBox.selection)return
        var text=tp.outsideGroup.line1.lineB.line0.listBox.selection.text
        eval("aggr_"+text.split("..")[1])
    }
    for(var a=0;a<expArray.length;a++){
        tp.outsideGroup.line1.lineB.line3.line5.listBox.add("item",expArray[a])
    }
    tp.outsideGroup.line1.lineB.line3.line5.listBox.onDoubleClick=function(){
        var scriptSelected = tp.outsideGroup.line1.lineB.line3.line5.listBox.selection != null;
        if (scriptSelected) {
            if(!app.project.activeItem)return
            if(!app.project.activeItem.selectedLayers)return
            app.beginUndoGroup("exp_add")
            var scriptIndex = tp.outsideGroup.line1.lineB.line3.line5.listBox.selection.index;
            for (var i = 0; i < app.project.activeItem.selectedLayers.length; i += 1) {
                for (var j = 0; j < app.project.activeItem.selectedLayers[i].selectedProperties.length; j += 1) {
                    app.project.activeItem.selectedLayers[i].selectedProperties[j].expression=eval("exp_"+expArray[scriptIndex].split("..")[1]+"(app.project.activeItem.selectedLayers[i])")
                }
            }
            app.endUndoGroup()
        }
    }

    var easePanel = tp.outsideGroup.line1.lineB.line3.line4.lineA;
    function clampEase(v){ v = parseInt(v,10)||1; return Math.max(1, Math.min(99, v)); }
    function bindEaseRow(row, fn){
        function apply(){ var v = clampEase(row.val.text); row.val.text = String(v); if(row.slider.value != v) row.slider.value = v; fn(v); }
        row.slider.onChange = function(){ row.val.text = String(row.slider.value); fn(row.slider.value); }
        row.val.onChange = apply;
    }
    bindEaseRow(easePanel.easeInRow, OF_Motion2_inMotion);
    bindEaseRow(easePanel.easeRow, OF_Motion2_makeMotion);
    bindEaseRow(easePanel.easeOutRow, OF_Motion2_outMotion);

    var anchorPanel = tp.outsideGroup.line1.lineB.line3.line4.lineB;
    function applyAnchor(){
        var x = parseInt(anchorPanel.inputs.xRow.xVal.text,10)||0;
        var y = parseInt(anchorPanel.inputs.yRow.yVal.text,10)||0;
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));
        anchorPanel.inputs.xRow.xVal.text = String(x);
        anchorPanel.inputs.yRow.yVal.text = String(y);
        OF_Motion2_moveAnchor(x*2/100, y*2/100);
    }
    function setAnchor(x,y){ anchorPanel.inputs.xRow.xVal.text = String(x); anchorPanel.inputs.yRow.yVal.text = String(y); applyAnchor(); }
    anchorPanel.grid.row0.tl.onClick = function(){ setAnchor(0,0); }
    anchorPanel.grid.row0.tc.onClick = function(){ setAnchor(50,0); }
    anchorPanel.grid.row0.tr.onClick = function(){ setAnchor(100,0); }
    anchorPanel.grid.row1.ml.onClick = function(){ setAnchor(0,50); }
    anchorPanel.grid.row1.mc.onClick = function(){ setAnchor(50,50); }
    anchorPanel.grid.row1.mr.onClick = function(){ setAnchor(100,50); }
    anchorPanel.grid.row2.bl.onClick = function(){ setAnchor(0,100); }
    anchorPanel.grid.row2.bc.onClick = function(){ setAnchor(50,100); }
    anchorPanel.grid.row2.br.onClick = function(){ setAnchor(100,100); }
    anchorPanel.inputs.xRow.xVal.onChange = applyAnchor;
    anchorPanel.inputs.yRow.yVal.onChange = applyAnchor;
    anchorPanel.inputs.reset.onClick = function(){ setAnchor(50,50); }

    tp.outsideGroup.line1.lineB.line1.Fi.onClick=OF_Keyfast_fadeIn
    tp.outsideGroup.line1.lineB.line1.Fo.onClick=OF_Keyfast_fadeOut
    tp.outsideGroup.line1.lineB.line1.Su.onClick=OF_Keyfast_scaleUp
    tp.outsideGroup.line1.lineB.line1.Sd.onClick=OF_Keyfast_scaleDown
    tp.outsideGroup.line1.lineB.line1.Rl.onClick=OF_Keyfast_rotateLeft
    tp.outsideGroup.line1.lineB.line1.Rr.onClick=OF_Keyfast_rotateRight
    tp.outsideGroup.line1.lineB.line1.Cl.onClick=OF_Keyfast_cloneKeys
    tp.outsideGroup.line1.lineB.line1.Rv.onClick=OF_Keyfast_timeReverse
    tp.outsideGroup.line1.lineB.line1.Nul.onClick=OF_Motion2_createANull
    tp.outsideGroup.line1.lineB.line1.Vig.onClick=OF_Motion2_createVignRig
    tp.outsideGroup.line1.lineB.line2.mb.onClick=OF_Tools_enableMotionBlur
    tp.outsideGroup.line1.lineB.line2.ext.onClick=OF_Tools_extendOutTime30s

    // log面板
    myPalette.grp.logGroup.logToggle.onClick=function(){
        var visible = !myPalette.grp.logGroup.logPanel.visible;
        myPalette.grp.logGroup.logPanel.visible = visible;
        myPalette.grp.logGroup.logToggle.text = visible ? "Log: ON" : "Log: OFF";
        myPalette.layout.layout(true);
        myPalette.layout.resize();
    }
    OF_Log_setPanel(myPalette.grp.logGroup.logPanel);

    // color面板
    var colorBtn=tp.colorGroup.line1.add("button",[0,0,100,25],"Push Color")
    colorBtn.onClick=function(){
        var res=prompt("hex color","#C0FFEE");
        if(!res)return;
        res=res[0]=="#"?res.split("#")[1]:res;
        res = parseInt(res,16);
        var r = ((res >> 16) & 255)/255;
        var g = ((res >> 8) & 255)/255;
        var b = (parseInt(res,10) & 255)/255;
        pushColortoPanel(colorPanel,[r,g,b])
    }

    for(var i=0;i<15;i++){
        colorPanel[i] = tp.colorGroup.line1.add("panel", [0,0,25,25]);
    }
    drawColortoPanel(colorPanel)

    // trans界面
    tp.transGroup.line1.apply.onClick=function() {
        if(!tp.transGroup.line1.listbox.selection)return
        var effect=tp.transGroup.line1.listbox.selection.text
        if(effect=="")return
        addEffects(effect.split("【")[0])
        addEffects(effect.split("】")[1])
    }
    tp.transGroup.line1.sc2enB.onClick=function() {
        var en=tp.transGroup.line1.search.text
        dicInitNow()
        var result=[]
        for(var ind = 0; ind < dictionarykeys.length; ind++ ){
            var textToCompare=dictionary[ind][1]
            for (var i = 0; i < textToCompare.length; i++) {
                var com=0
                var tmpcheck=0
                for (var j = 0; j < en.length; j++) {
                    if(new String(textToCompare[i]).toUpperCase()!=en[j].toUpperCase()){
                        i-=tmpcheck;
                        break;
                    }
                    com++;
                    i++;
                    tmpcheck++;
                    if(com==en.length){
                        result.push([dictionary[ind][1],dictionary[ind][0]])
                    }
                }
            }
        }
        tp.transGroup.line1.listbox.removeAll()
        for (var k = 0; k <result.length;k++) {
            var text=result[k][1]+"【"+k+"】"+result[k][0]
            tp.transGroup.line1.listbox.add('item',text)
        }
    }
    tp.transGroup.line1.en2scB.onClick=function() {
        var en=tp.transGroup.line1.search.text
        dicInitNow()
        var result=[]
        for(var ind = 0; ind < dictionarykeys.length; ind++ ){
            var textToCompare=dictionary[ind][0]
            for (var i = 0; i < textToCompare.length; i++) {
                var com=0
                var tmpcheck=0
                for (var j = 0; j < en.length; j++) {
                    if(new String(textToCompare[i]).toUpperCase()!=en[j].toUpperCase()){
                        i-=tmpcheck;
                        break;
                    }
                    com++;
                    i++;
                    tmpcheck++;
                    if(com==en.length){
                            result.push(dictionary[ind])
                    }
                }
            }
        }
        tp.transGroup.line1.listbox.removeAll()
        for (var k = 0; k <result.length;k++) {
            var text=result[k][1]+"【"+k+"】"+result[k][0]
            tp.transGroup.line1.listbox.add('item',text)
        }
    }

    // 缓存管理器直接嵌入 Cache 分页
    OF_Tools_initCachePanel(cp);

    // 设置画面显示
    myPalette.layout.resize();
    // 设置完自适应调整
    myPalette.onResizing = myPalette.onResize = function() {this.layout.resize();};
    // 设置调整函数
    if (myPalette != null && myPalette instanceof Window) {
        myPalette.center()
        myPalette.show();
    }
}
