function UI(object,colorPanel){
    var myPalette = (object instanceof Panel)?object : new Window("palette","桶子工具箱", undefined, {resizeable: true})
    var content=""+
    "group {orientation:'column', alignment:['fill','fill'], spacing:5, "+
        "title: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
            "textme: Button {text:'桶子工具箱',alignment:['fill','top'],preferredSize:[150,25]},"+
            "textme2: Button {text:'卡死反馈',alignment:['fill','top'],preferredSize:[30,25]},"+
        "},"+
        "outsideGroup: Group {text:'iconBtn功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "lineB: Panel {text:'集成脚本', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
                    "line0: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                        "listBox: DropDownList { alignment:['fill','fill'], preferredSize:[150,25]},"+
                        "apply: Button { text:'apply', preferredSize:[45,25] },"+
                    "},"+
                    "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                        "textme: StaticText {text:'keyfast'},"+
                        "Fi: Button { text:'Fi', preferredSize:[25,25] }, "+
                        "Fo: Button { text:'Fo', preferredSize:[25,25] }, "+
                        "Su: Button { text:'Su', preferredSize:[25,25] }, "+
                        "Sd: Button { text:'Sd', preferredSize:[25,25] }, "+
                        "Rl: Button { text:'Rl', preferredSize:[25,25] }, "+
                        "Rr: Button { text:'Rr', preferredSize:[25,25] }, "+
                        "Cl: Button { text:'Cl', preferredSize:[25,25] }, "+
                        "Rv: Button { text:'Rv', preferredSize:[25,25] }, "+
                    "},"+
                    "line2: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                        "textme: StaticText {text:'motion2'},"+
                        "Nul: Button { text:'Nul', preferredSize:[30,25] }, "+
                        "Buc: Button { text:'Buc', preferredSize:[30,25] }, "+
                        "Bld: Button { text:'Bld', preferredSize:[30,25] }, "+
                        "Bst: Button { text:'Bst', preferredSize:[30,25] }, "+
                        "Rop: Button { text:'Rop', preferredSize:[30,25] }, "+
                        "Wap: Button { text:'Wap', preferredSize:[30,25] }, "+
                        "Str: Button { text:'Str', preferredSize:[30,25] }, "+
                        "Vig: Button { text:'Vig', preferredSize:[30,25] }, "+
                    "},"+
                    "line3: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                        "line4: Group {text:'功能', alignment:['fill','top'], orientation:'column', spacing:0 ,"+
                            "lineA: Panel {text:'Ease', alignment:['fill','top'], orientation:'column', spacing:0 ,"+
                                "s3: Slider {text:'easeOut',alignment:['fill','top'], preferredSize:[60,25]}"+
                                "s2: Slider {text:'ease',alignment:['fill','top'], preferredSize:[60,25]}"+
                                "s1: Slider {text:'easeIn',alignment:['fill','top'], preferredSize:[60,25]}"+
                            "},"+
                            "lineB: Panel {text:'AnchorMove', alignment:['fill','top'], orientation:'row', spacing:0 ,"+
                                "lineX: Group {text:'AnchorMove', alignment:['fill','top'], orientation:'column', spacing:0 ,"+
                                    "x: Slider {text:'x',alignment:['fill','top'], preferredSize:[60,25]}"+
                                    "y: Slider {text:'y',alignment:['fill','top'], preferredSize:[60,25]}"+
                                "},"+
                                "lineY: Group {text:'AnchorMove', alignment:['fill','top'], orientation:'column', spacing:0 ,"+
                                    "reset: Button { text:'Reset', preferredSize:[50,50] }, "+
                                "},"+
                            "},"+
                        "},"+
                        "line5: Group {text:'功能', alignment:['fill','top'], orientation:'column', spacing:0 ,"+
                            "listBox: ListBox { alignment:['fill','fill'], preferredSize:[80,180]},"+
                        "},"+
                    "},"+
                "},"+
            "},"+
        "},"+
        "colorGroup: Panel {text:'色板', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'色板', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
            "},"+
        "},"+
        "transGroup: Group {text:'trans功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Panel {text:'中英查找', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "search: EditText {text:'', alignment:['fill','top'],properties:{multiline:false}, preferredSize:[100,30]},"+
                "sc2enB: Button {text:'SCtoEN', alignment:['fill','top'], preferredSize:[30,25]},"+
                "en2scB: Button {text:'ENtoSC', alignment:['fill','top'], preferredSize:[30,25]},"+
                "listbox: DropDownList{alignment:['fill','top'], preferredSize:[200,25]},"+
                "apply: Button {text:'Apply', alignment:['fill','top'], preferredSize:[30,25]},"+
            "},"+
        "},"+
    "}"
    myPalette.grp = myPalette.add(content);
    myPalette.layout.layout(true);
    myPalette.grp.title.textme.onClick=function(){
        var res=prompt("本来想做个按钮跳转到网页可惜会线程阻塞卡死，请大哥大姐们复制，求点流量","http://v.guediao.top","气死了气死了[○･｀Д´･ ○]");
    }
    myPalette.grp.title.textme2.onClick=function(){
        var res=prompt("整合多方脚本没来得及全面测试，感谢反馈，请提供：\n1. 当前脚本版本号（此次为2.1）\n2. 使用的场景（如：在对xx图层使用xx功能时）\n3. 期待的结果及实际结果（如：本应该xx结果xxx）","QQ号码：864689103","(*^▽^*)感谢你为这个破脚本改进提供帮助");
    }
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"1.随机变换..randomTransform()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"2.文本拆分..textSplitor()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"3.图层时间偏移..layersShifter()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"4.层空间排列..layerToGrid()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"5.层空间分裂..layerSplitor()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"6.阵列步进..stepByChange()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"7.层隔行选择..layersSelector()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"8.层随机选择..randomLayersSelector()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"9.层排序..layersSortor()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"A.烘焙..bake()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"B.合成扩大..scaleComposition()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"C.图层扩大..scaleSelectedLayers()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"D.图层重命名..layersRenamer()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"E.渐变调光..rampLight()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"F.全景图创建..360creator()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"G.阴影材质..shadeIt()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"H.电路板集成..circuitFX()")
    myPalette.grp.outsideGroup.line1.lineB.line0.listBox.add('item',"I.背景板集成..quadrateFX()")
// #DEVPOINT#
    myPalette.grp.outsideGroup.line1.lineB.line0.apply.onClick=function(){
        if(!myPalette.grp.outsideGroup.line1.lineB.line0.listBox.selection)return
        var text=myPalette.grp.outsideGroup.line1.lineB.line0.listBox.selection.text
        eval("aggr_"+text.split("..")[1])
    }
    for(var a=0;a<expArray.length;a++){
        myPalette.grp.outsideGroup.line1.lineB.line3.line5.listBox.add("item",expArray[a])
    }
    myPalette.grp.outsideGroup.line1.lineB.line3.line5.listBox.onDoubleClick=function(){
        var scriptSelected = myPalette.grp.outsideGroup.line1.lineB.line3.line5.listBox.selection != null;
        if (scriptSelected) {
            if(!app.project.activeItem)return
            if(!app.project.activeItem.selectedLayers)return
            app.beginUndoGroup("exp_add")
            var scriptIndex = myPalette.grp.outsideGroup.line1.lineB.line3.line5.listBox.selection.index;
            for (var i = 0; i < app.project.activeItem.selectedLayers.length; i += 1) {
                for (var j = 0; j < app.project.activeItem.selectedLayers[i].selectedProperties.length; j += 1) {
                    app.project.activeItem.selectedLayers[i].selectedProperties[j].expression=eval("exp_"+expArray[scriptIndex].split("..")[1]+"(app.project.activeItem.selectedLayers[i])")
                }
            }
            app.endUndoGroup()
        }
    }

    myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineA.s1.onChange = function buttons1(){
        OF_Motion2_inMotion(parseInt(myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineA.s1.value,10))}
    myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineA.s2.onChange = function buttons2(){
        OF_Motion2_makeMotion(parseInt(myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineA.s2.value,10))}
    myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineA.s3.onChange = function buttons3(){
        OF_Motion2_outMotion(parseInt(myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineA.s3.value,10))}
    myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineB.lineX.x.onChange = function buttons3(){
        OF_Motion2_moveAnchor(myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineB.lineX.x.value*2/100,myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineB.lineX.y.value*2/100)
    }
    myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineB.lineX.y.onChange = function buttons3(){
        OF_Motion2_moveAnchor(myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineB.lineX.x.value*2/100,myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineB.lineX.y.value*2/100)
    }
    myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineB.lineY.reset.onClick=function(){
        myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineB.lineX.x.value=50
        myPalette.grp.outsideGroup.line1.lineB.line3.line4.lineB.lineX.y.value=50
        OF_Motion2_moveAnchor(1,1)
    }

    myPalette.grp.outsideGroup.line1.lineB.line1.Fi.onClick=OF_Keyfast_fadeIn
    myPalette.grp.outsideGroup.line1.lineB.line1.Fo.onClick=OF_Keyfast_fadeOut
    myPalette.grp.outsideGroup.line1.lineB.line1.Su.onClick=OF_Keyfast_scaleUp
    myPalette.grp.outsideGroup.line1.lineB.line1.Sd.onClick=OF_Keyfast_scaleDown
    myPalette.grp.outsideGroup.line1.lineB.line1.Rl.onClick=OF_Keyfast_rotateLeft
    myPalette.grp.outsideGroup.line1.lineB.line1.Rr.onClick=OF_Keyfast_rotateRight
    myPalette.grp.outsideGroup.line1.lineB.line1.Cl.onClick=OF_Keyfast_cloneKeys
    myPalette.grp.outsideGroup.line1.lineB.line1.Rv.onClick=OF_Keyfast_timeReverse
    myPalette.grp.outsideGroup.line1.lineB.line2.Nul.onClick=OF_Motion2_createANull
    myPalette.grp.outsideGroup.line1.lineB.line2.Buc.onClick=OF_Motion2_bounce
    myPalette.grp.outsideGroup.line1.lineB.line2.Bld.onClick=OF_Motion2_blend
    myPalette.grp.outsideGroup.line1.lineB.line2.Bst.onClick=OF_Motion2_burst
    myPalette.grp.outsideGroup.line1.lineB.line2.Rop.onClick=OF_Motion2_rope
    myPalette.grp.outsideGroup.line1.lineB.line2.Wap.onClick=OF_Motion2_warp
    myPalette.grp.outsideGroup.line1.lineB.line2.Str.onClick=OF_Motion2_stare
    myPalette.grp.outsideGroup.line1.lineB.line2.Vig.onClick=OF_Motion2_createVignRig

    // color面板
    var colorBtn=myPalette.grp.colorGroup.line1.add("button",[0,0,100,25],"Push Color")
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
        colorPanel[i] = myPalette.grp.colorGroup.line1.add("panel", [0,0,25,25]);
    }
    drawColortoPanel(colorPanel)

    // trans界面
    myPalette.grp.transGroup.line1.apply.onClick=function() {
        if(!myPalette.grp.transGroup.line1.listbox.selection)return
        var effect=myPalette.grp.transGroup.line1.listbox.selection.text
        if(effect=="")return
        addEffects(effect.split("【")[0])
        addEffects(effect.split("】")[1])
    }
    myPalette.grp.transGroup.line1.sc2enB.onClick=function() {
        var en=myPalette.grp.transGroup.line1.search.text
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
        myPalette.grp.transGroup.line1.listbox.removeAll()
        for (var k = 0; k <result.length;k++) {
            var text=result[k][1]+"【"+k+"】"+result[k][0]
            myPalette.grp.transGroup.line1.listbox.add('item',text)
        }
    }
    myPalette.grp.transGroup.line1.en2scB.onClick=function() {
        var en=myPalette.grp.transGroup.line1.search.text
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
        myPalette.grp.transGroup.line1.listbox.removeAll()
        for (var k = 0; k <result.length;k++) {
            var text=result[k][1]+"【"+k+"】"+result[k][0]
            myPalette.grp.transGroup.line1.listbox.add('item',text)
        }
    }
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
