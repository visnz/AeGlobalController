var dictionary;
var dictionarykeys;
var dicInit=false;
var debugMode=true; // 纠错模式，打开时会出现运行时提示
var logObj;
var colorPanels=[]
UI(this,colorPanels);
var rd_ScriptLauncherData = new Object();
rd_ScriptLauncherData.scriptPath = "";
rd_ScriptLauncherData.scriptFiles = new Array();
var scriptManagerObj;
function UI(object,colorPanel){
    var myPalette = (object instanceof Panel)?object : new Window("palette","桶子工具箱", undefined, {resizeable: true})
    var content=""+
    "group {orientation:'column', alignment:['fill','fill'], spacing:5, "+
        "textme: Button {text:'桶子工具箱',alignment:['fill','top']},"+
        "outsideGroup: Group {text:'iconBtn功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "lineA: Panel {text:'脚本管理器', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
                    "tlistBox: ListBox { alignment:['fill','fill'], preferredSize:[100,200]},"+
                    "tfooter: Group { talignment:['fill','bottom'], "+
                        "tfolder: Button { text:'Folder', alignment:['left','center'] }, "+
                        "trefresh: Button { text:'刷新', alignment:['right','center'] }, "+
                    "},"+
                "},"+
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
                        "lineA: Panel {text:'Ease', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
                            "s3: Slider {text:'easeOut',alignment:['fill','top'], preferredSize:[60,25]}"+
                            "s2: Slider {text:'ease',alignment:['fill','top'], preferredSize:[60,25]}"+
                            "s1: Slider {text:'easeIn',alignment:['fill','top'], preferredSize:[60,25]}"+
                        "},"+
                        "lineB: Panel {text:'AnchorMove', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
                            "x: Slider {text:'x',alignment:['fill','top'], preferredSize:[60,25]}"+
                            "y: Slider {text:'y',alignment:['fill','top'], preferredSize:[60,25]}"+
                            "reset: Button { text:'Reset', preferredSize:[60,25] }, "+
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

        "logGroup: Panel {text:'调试器', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            //"textme: StaticText {text:''},"+
            "line2: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "log: EditText {text:'script start',properties:{multiline:true}, alignment:['fill','top'], preferredSize:[300,200]},"+
            "},"+
            "line3: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "textme: StaticText {text:'2. 开发者功能：',alignment:['fill','top']},"+
            "},"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                // "textme: StaticText {text:'Log面板'},"+
                "logTrigger: Button {text:'Log', alignment:['fill','top'], preferredSize:[50,25]},"+
                "clear: Button {text:'Clean', alignment:['fill','top'], preferredSize:[50,25]},"+
                "console: EditText {text:'', alignment:['fill','top'],properties:{multiline:false}, preferredSize:[300,30]},"+
                "run: Button {text:'AeRun', alignment:['fill','top'], preferredSize:[50,25]},"+
                "cmdexample: DropDownList{alignment:['fill','top'], preferredSize:[200,25]},"+
                "cmdrun: Button {text:'CmdRun', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+
        "},"+
        "testGroup3: Group {text:'iconBtn功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "textme: StaticText {text:'3. 测试版功能：',alignment:['fill','top']},"+
            "},"+
        "},"+
        "webGroup: Group {text:'web功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "preset: DropDownList{alignment:['fill','top'], preferredSize:[100,25]},"+
                "url: EditText {text:'url', alignment:['fill','top'],properties:{multiline:false}, preferredSize:[300,25]},"+
                "filter: EditText {text:'filter', alignment:['fill','top'],properties:{multiline:false}, preferredSize:[100,25]},"+
                "send: Button {text:'Get Web', alignment:['fill','top'], preferredSize:[30,25]},"+
            "},"+
        "},"+
        "randomGroup: Group {text:'web功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "preset: DropDownList{alignment:['fill','top'], preferredSize:[200,25]},"+
                // "param: EditText {text:'(input,param,here)', alignment:['fill','top'],properties:{multiline:false}, preferredSize:[200,25]},"+
                "generate: Button {text:'Generate', alignment:['fill','top'], preferredSize:[20,25]},"+
            "},"+
        "},"+
    "}"
    myPalette.grp = myPalette.add(content);
    myPalette.layout.layout(true);
    myPalette.grp.textme.onClick=function(){
        var res=prompt("本来想做个按钮跳转到网页可惜会线程阻塞卡死，请大哥大姐们复制，求点流量","http://v.guediao.top","气死了气死了[○･｀Д´･ ○]");
    }
    // var outsideGroup=myPalette.grp.outsideGroup.line1.add("scrollbar", [0,0,400,40]);
    scriptManagerObj=myPalette.grp.outsideGroup.line1.lineA
    scriptManagerObj.tfooter.tfolder.onClick = rd_ScriptLauncher_doSelectFolder;
    scriptManagerObj.tfooter.trefresh.onClick = rd_ScriptLauncher_doRefreshList;
    scriptManagerObj.tlistBox.onDoubleClick = rd_ScriptLauncher_doRun;
    scriptManagerObj.tlistBox.preferredSize.height = 150;
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
// #DEVPOINT#
    myPalette.grp.outsideGroup.line1.lineB.line0.apply.onClick=function(){
        var text=myPalette.grp.outsideGroup.line1.lineB.line0.listBox.selection.text
        log(text)
        eval("aggr_"+text.split("..")[1])
    }
    myPalette.grp.outsideGroup.line1.lineB.line3.lineA.s1.onChange = function buttons1(){
        OF_Motion2_inMotion(parseInt(myPalette.grp.outsideGroup.line1.lineB.line3.lineA.s1.value,10))}
    myPalette.grp.outsideGroup.line1.lineB.line3.lineA.s2.onChange = function buttons2(){
        OF_Motion2_makeMotion(parseInt(myPalette.grp.outsideGroup.line1.lineB.line3.lineA.s2.value,10))}
    myPalette.grp.outsideGroup.line1.lineB.line3.lineA.s3.onChange = function buttons3(){
        OF_Motion2_outMotion(parseInt(myPalette.grp.outsideGroup.line1.lineB.line3.lineA.s3.value,10))}
    myPalette.grp.outsideGroup.line1.lineB.line3.lineB.x.onChange = function buttons3(){
        OF_Motion2_moveAnchor(myPalette.grp.outsideGroup.line1.lineB.line3.lineB.x.value*2/100,myPalette.grp.outsideGroup.line1.lineB.line3.lineB.y.value*2/100)
    }
    myPalette.grp.outsideGroup.line1.lineB.line3.lineB.y.onChange = function buttons3(){
        OF_Motion2_moveAnchor(myPalette.grp.outsideGroup.line1.lineB.line3.lineB.x.value*2/100,myPalette.grp.outsideGroup.line1.lineB.line3.lineB.y.value*2/100)
    }
    myPalette.grp.outsideGroup.line1.lineB.line3.lineB.reset.onClick=function(){
        myPalette.grp.outsideGroup.line1.lineB.line3.lineB.x.value=50
        myPalette.grp.outsideGroup.line1.lineB.line3.lineB.y.value=50
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

    // rd_ScriptLauncher(myPalette.grp.outsideGroup.line1.scriptManager);
    // random面板
    myPalette.grp.randomGroup.line1.preset.add('item',"随机数生成器")
    myPalette.grp.randomGroup.line1.generate.onClick=function(){
        if(!myPalette.grp.randomGroup.line1.preset.selection)return
        var selectedPreset=myPalette.grp.randomGroup.line1.preset.selection.text
        // var param=myPalette.grp.randomGroup.line1.param.text
        // if(param[0]=="(")param=param.slice(1,param.length)
        // param=param.split[","]
        if(selectedPreset=="")return
        var result
        switch(selectedPreset){
            case "随机数生成器":{
                result=Math.random()
                break
            }
        }
        // var selectedPropertie=getSelectedPropertie()
        // log(selectedPropertie)
        // if(selectedPropertie&&selectedPropertie.canSetExpression){
        //     log(selectedPropertie.expression)
        //     selectedPropertie.expression=result
        // }
        // log(result)

    }

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
        log("new color pushed: "+res)

        // saveObjTo(colorQueue,"C:/temp/Aescript_visnlink_tempdata.json")
    }

    for(var i=0;i<15;i++){
        colorPanel[i] = myPalette.grp.colorGroup.line1.add("panel", [0,0,25,25]);
    }
    drawColortoPanel(colorPanel)


    // web界面
    myPalette.grp.webGroup.line1.preset.add('item',"预设（还没开发）")
    myPalette.grp.webGroup.line1.send.onClick=function(){
        if(myPalette.grp.webGroup.line1.url.text=="url"||myPalette.grp.webGroup.line1.filter.text=="filter")return;
        if(myPalette.grp.webGroup.line1.url.text!=""){
            var readState_body=redirect(myPalette.grp.webGroup.line1.url.text).body
            if(myPalette.grp.webGroup.line1.filter.text!=""){
                log(urlFilter(readState_body,myPalette.grp.webGroup.line1.filter.text))
            }else{
                log(readState_body)
            }
        }else{
            // log("web: preset part")
            // switch(myPalette.grp.webGroup.line1.preset.selection.text){
            //     // case "程序员老黄历":
            //     //     log("程序员老黄历")
            //     //     webFunc_getProgrammerCal(redirect("http://xuexinyu.com/mypages/coder.html").body)
            //     //     break;
            //     case "中午吃什么":
            //         log("中午吃什么")
            //         break;
            //     case "微博热搜":
            //         log("微博热搜")
            //         break;
            // }
        }
    }
    // log界面
    logObj=myPalette.grp.logGroup.line2.log
    // logObj.visible=false
    myPalette.grp.logGroup.line1.logTrigger.onClick=function(){
        logObj.visible=!logObj.visible
        myPalette.grp.logGroup.line1.clear=!myPalette.grp.logGroup.line1.clear
    }
    myPalette.grp.logGroup.line1.clear.onClick=function clearLog(){logObj.text=""}
    myPalette.grp.logGroup.line1.run.onClick=function (){
        var text=myPalette.grp.logGroup.line1.console.text
        log("console.run: "+text)
        if(text=="")return
        try{log(eval(myPalette.grp.logGroup.line1.console.text))}catch(e){alert(e)}
        
        myPalette.grp.logGroup.line1.console.text=""
    }
    myPalette.grp.logGroup.line1.cmdexample.add('item',"notepad")
    myPalette.grp.logGroup.line1.cmdexample.add('item',"calc")
    myPalette.grp.logGroup.line1.cmdexample.add('item',"mspaint")
    myPalette.grp.logGroup.line1.cmdexample.add('item','"C:\\Program Files\\Adobe\\Adobe After Effects CC 2018\\Support Files\\AfterFX.exe" -m')
    myPalette.grp.logGroup.line1.cmdrun.onClick=function (){
        if(!myPalette.grp.logGroup.line1.cmdexample.selection)return
        var text=myPalette.grp.logGroup.line1.cmdexample.selection.text
        var cmdrun="system.callSystem("+"\"cmd.exe /c \\\" "+text+" \\\"\""+");"
        log("console.cmdrun: "+cmdrun)
        try{log(eval(cmdrun))}catch(e){alert(e)}
    }
    // trans界面
    myPalette.grp.transGroup.line1.apply.onClick=function() {
        if(!myPalette.grp.transGroup.line1.listbox.selection)return
        var effect=myPalette.grp.transGroup.line1.listbox.selection.text
        if(effect=="")return
        log("Apply the effects: "+effect)
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
        log("========= result log keyword by '"+en+"' ==========")
        for (var k = 0; k <result.length;k++) {
            var text=result[k][1]+"【"+k+"】"+result[k][0]
            log(text)
            myPalette.grp.transGroup.line1.listbox.add('item',text)
        }
        log("========= result log keyword by '"+en+"' ==========")
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
        log("========= result log keyword by '"+en+"' ==========")
        for (var k = 0; k <result.length;k++) {
            var text=result[k][1]+"【"+k+"】"+result[k][0]
            log(text)
            myPalette.grp.transGroup.line1.listbox.add('item',text)
        }
        log("========= result log keyword by '"+en+"' ==========")
    }
    // 设置画面显示
    myPalette.layout.resize();
    // 设置完自适应调整
    myPalette.onResizing = myPalette.onResize = function() {this.layout.resize();};
    // 设置调整函数
    if (myPalette != null && myPalette instanceof Window) {
        myPalette.center()
        myPalette.show();
        log("panel inited")
    }
    
}

var help="hello"

// Lib part
function log(content){
    logObj.text=logObj.text+"\n[ "+(new Date().toTimeString().split(" ")[0])+" ]"+content
    return content;
}
function getCompIndex(targetComp) {
    for (var index = 1; index <= app.project.items.length; index++) {
		try {
			if(app.project.item(index).name==targetComp){
                return index;
            }
		} catch(e) {
			break;
		}
	}
}

function dicInitNow(){
    if(dicInit)return;
    dictionary=new Array();
    dictionary.push(["3D Channel Extract","3D 通道提取"]);
    dictionary.push(["Depth Matte","深度遮罩"]);
    dictionary.push(["Depth Of Field","景深效果"]);
    dictionary.push(["Fog 3D","雾化 3D"]);
    dictionary.push(["ID Matte","ID 蒙版"]);
    dictionary.push(["EXtractoR","EXtractoR"]);
    dictionary.push(["IDentifier","IDentifier"]);
    dictionary.push(["ID Matte","ID 蒙版"]);
    dictionary.push(["Bilateral Blur","双向模糊"]);
    dictionary.push(["Box Blur","方框模糊"]);
    dictionary.push(["Camera Lens Blur","摄像机镜头模糊"]);
    dictionary.push(["Channel Blur","通道模糊"]);
    dictionary.push(["Compound Blur","复合模糊"]);
    dictionary.push(["Directional Blur","定向模糊"]);
    dictionary.push(["Fast Blur","快速模糊"]);
    dictionary.push(["Gaussian Blur","高斯模糊"]);
    dictionary.push(["Lens Blur","镜头模糊"]);
    dictionary.push(["Radial Blur","径向模糊"]);
    dictionary.push(["Reduce Interlace Flicker","减少交错闪烁"]);
    dictionary.push(["Sharpen","锐化"]);
    dictionary.push(["Smart Blur","特殊模糊"]);
    dictionary.push(["Unsharp Mask","钝化蒙版"]);
    dictionary.push(["CC Cross Blur","CC 交叉模糊"]);
    dictionary.push(["CC Radial Blur","CC径向模糊效果"]);
    dictionary.push(["CC Radial Fast Blur","CC 径向快速模糊效果"]);
    dictionary.push(["CC Vector Blur","CC矢量模糊效果"]);
    dictionary.push(["Arithmetic","算术"]);
    dictionary.push(["Blend","混合"]);
    dictionary.push(["Calculations","计算"]);
    dictionary.push(["Channel Combiner","通道合成器"]);
    dictionary.push(["Compound Arithmetic","复合运算"]);
    dictionary.push(["Invert","反转"]);
    dictionary.push(["Minimax","最小值/最大值"]);
    dictionary.push(["Remove Color Matting","移除颜色遮罩"]);
    dictionary.push(["Set Channels","设置通道"]);
    dictionary.push(["Set Matte","设置遮罩"]);
    dictionary.push(["Shift Channels","转换通道"]);
    dictionary.push(["Solid Composite","纯色合成"]);
    dictionary.push(["CC Composite","CC合成"]);
    dictionary.push(["Auto Color and Auto Contrast","自动颜色和自动对比度"]);
    dictionary.push(["Auto Levels","自动色阶"]);
    dictionary.push(["Black & White","黑白"]);
    dictionary.push(["Brightness & Contrast","亮度和对比度"]);
    dictionary.push(["Broadcast Colors effect","广播颜色"]);
    dictionary.push(["Change Color effect","更改颜色"]);
    dictionary.push(["Change To Color effect","“更改为颜色”"]);
    dictionary.push(["Channel Mixer effect","通道混合器"]);
    dictionary.push(["Color Balance effect","颜色平衡"]);
    dictionary.push(["Color Balance (HLS) effect","颜色平衡 (HLS)"]);
    dictionary.push(["Color Link effect","颜色链接"]);
    dictionary.push(["Color Stabilizer effect","颜色稳定器"]);
    dictionary.push(["Colorama effect","色光"]);
    dictionary.push(["Curves effect","曲线"]);
    dictionary.push(["Equalize effect","色调均化"]);
    dictionary.push(["Exposure effect","曝光度"]);
    dictionary.push(["Gamma/Pedestal/Gain effect","灰度系数/基值/增益"]);
    dictionary.push(["Hue/Saturation effect","色相/饱和度"]);
    dictionary.push(["Leave Color effect","保留颜色"]);
    dictionary.push(["Levels","色阶"]);
    dictionary.push(["Levels (Individual Controls)","色阶（单独控件）"]);
    dictionary.push(["Photo Filter","照片滤镜"]);
    dictionary.push(["PS Arbitrary Map PS","任意映射"]);
    dictionary.push(["Selective Color","可选颜色"]);
    dictionary.push(["Shadow/Highlight","阴影/高光"]);
    dictionary.push(["Tint","色调"]);
    dictionary.push(["Tritone","三色调"]);
    dictionary.push(["Vibrance","自然饱和度"]);
    dictionary.push(["Video Limiter","视频限幅器"]);
    dictionary.push(["CC Color Neutralizer","CC 颜色中和剂"]);
    dictionary.push(["CC Color Offset","CC 色彩偏移"]);
    dictionary.push(["CC Kernel","CC 内核"]);
    dictionary.push(["CC Toner","CC 调色剂"]);
    dictionary.push(["Detail-preserving Upscale","保留细节放大"]);
    dictionary.push(["Bezier Warp","贝塞尔曲线变形"]);
    dictionary.push(["Bulge","凸出"]);
    dictionary.push(["Corner Pin","边角定位"]);
    dictionary.push(["Displacement Map","置换图"]);
    dictionary.push(["Liquify","液化"]);
    dictionary.push(["Magnify","放大"]);
    dictionary.push(["Mesh Warp","网格变形"]);
    dictionary.push(["Mirror","镜像"]);
    dictionary.push(["Offset","偏移"]);
    dictionary.push(["Optics Compensation","光学补偿"]);
    dictionary.push(["Polar Coordinates","极坐标"]);
    dictionary.push(["Reshape","改变形状"]);
    dictionary.push(["Ripple","波纹"]);
    dictionary.push(["Smear","漩涡条纹"]);
    dictionary.push(["Spherize","球面化"]);
    dictionary.push(["Transform","变换"]);
    dictionary.push(["Turbulent Displace","湍流置换"]);
    dictionary.push(["Twirl","旋转扭曲"]);
    dictionary.push(["Warp","变形"]);
    dictionary.push(["Warp Stabilizer","变形稳定器"]);
    dictionary.push(["Wave Warp","波形变形"]);
    dictionary.push(["CC Bend It","CC 区域弯曲"]);
    dictionary.push(["CC Bender","CC 层弯曲"]);
    dictionary.push(["CC Blobbylize","CC 融化"]);
    dictionary.push(["CC Flo Motion","CC 折叠运动"]);
    dictionary.push(["CC Griddler","CC 方格"]);
    dictionary.push(["CC Lens","CC 镜头"]);
    dictionary.push(["CC Page Turn","CC 翻页"]);
    dictionary.push(["CC Power Pin","CC 四角扯动"]);
    dictionary.push(["CC Ripple Pulse","CC 波纹脉冲"]);
    dictionary.push(["CC Slant","CC 倾斜"]);
    dictionary.push(["CC Smear","CC 漩涡条纹"]);
    dictionary.push(["CC Split","CC 胀裂"]);
    dictionary.push(["CC Split 2","CC 胀裂 2"]);
    dictionary.push(["CC Tiler","CC 平铺"]);
    dictionary.push(["Angle Control","角度控制"]);
    dictionary.push(["Checkbox Control","复选框控制"]);
    dictionary.push(["Color Control","颜色控制"]);
    dictionary.push(["Layer Control","图层控制"]);
    dictionary.push(["Point Control","点控制"]);
    dictionary.push(["Slider Control","滑块控制"]);
    dictionary.push(["4-Color Gradient","四色渐变"]);
    dictionary.push(["Advanced Lightning","高级闪电"]);
    dictionary.push(["Audio Spectrum","音频频谱"]);
    dictionary.push(["Audio Waveform","音频波形"]);
    dictionary.push(["Beam","光束效果"]);
    dictionary.push(["Cell Pattern","单元格图案"]);
    dictionary.push(["Checkerboard","棋盘"]);
    dictionary.push(["Circle","圆形"]);
    dictionary.push(["Ellipse","椭圆"]);
    dictionary.push(["Eyedropper Fill","吸管填充"]);
    dictionary.push(["Fill","填充"]);
    dictionary.push(["Fractal","分形"]);
    dictionary.push(["Grid","网格"]);
    dictionary.push(["Lens Flare","镜头光晕"]);
    dictionary.push(["Paint Bucket","油漆桶"]);
    dictionary.push(["Radio Waves","无线电波"]);
    dictionary.push(["Ramp","渐变"]);
    dictionary.push(["Scribble","涂抹"]);
    dictionary.push(["Stroke","描边"]);
    dictionary.push(["Vegas","勾画"]);
    dictionary.push(["Write-on","写入"]);
    dictionary.push(["CC Glue Gun","CC胶水喷枪"]);
    dictionary.push(["CC Light Burst 2.5","CC 光线缩放 2.5"]);
    dictionary.push(["CC Light Rays","CC 光束"]);
    dictionary.push(["CC Light Sweep","CC 光线扫描"]);
    dictionary.push(["CC Threads","CC 线状"]);
    dictionary.push(["Color Difference Key","颜色差值键"]);
    dictionary.push(["Color Key","颜色抠像"]);
    dictionary.push(["Color Range","颜色范围"]);
    dictionary.push(["Difference Matte","差值遮罩"]);
    dictionary.push(["Extract","提取"]);
    dictionary.push(["Inner/Outer Key 内部/","外部键"]);
    dictionary.push(["Linear Color Key","线性颜色键"]);
    dictionary.push(["Luma Key","亮度键"]);
    dictionary.push(["Spill Suppressor","溢出抑制器"]);
    dictionary.push(["Advanced Spill Suppressor","高级溢出抑制器"]);
    dictionary.push(["CC Simple Wire Removal","CC 简单去除钢丝"]);
    dictionary.push(["Keylight","Keylight"]);
    dictionary.push(["Roto Brush and Refine Matte Roto","笔刷和优化蒙版"]);
    dictionary.push(["Matte Choker","遮罩阻塞工具"]);
    dictionary.push(["Simple Choker","简单阻塞工具"]);
    dictionary.push(["mocha shape mocha","shape"]);
    dictionary.push(["Noise & Grain","杂色和颗粒"]);
    dictionary.push(["Add Grain","添加颗粒"]);
    dictionary.push(["Dust & Scratches","蒙尘与划痕"]);
    dictionary.push(["Fractal Noise","分形杂色"]);
    dictionary.push(["Match Grain","匹配颗粒"]);
    dictionary.push(["Median","中间值"]);
    dictionary.push(["Noise Alpha","杂色 Alpha"]);
    dictionary.push(["Noise HLS","杂色 HLS"]);
    dictionary.push(["Remove Grain","移除颗粒"]);
    dictionary.push(["Turbulent Noise","湍流杂色"]);
    dictionary.push(["3D Glasses 3D","眼镜"]);
    dictionary.push(["Bevel Alpha","斜面 Alpha"]);
    dictionary.push(["Bevel Edges","边缘斜面"]);
    dictionary.push(["Drop Shadow","投影"]);
    dictionary.push(["Radial Shadow","径向阴影"]);
    dictionary.push(["CC Cylinder","CC 圆柱体"]);
    dictionary.push(["CC Environment","CC 环境"]);
    dictionary.push(["CC Sphere","CC 球面"]);
    dictionary.push(["CC Spotlight","CC 点光源"]);
    dictionary.push(["Card Dance","卡片动画"]);
    dictionary.push(["Caustics","焦散"]);
    dictionary.push(["Foam","泡沫"]);
    dictionary.push(["Particle Playground","粒子运动场"]);
    dictionary.push(["Shatter","碎片"]);
    dictionary.push(["Wave World","波形环境"]);
    dictionary.push(["CC Ball Action","CC 滚珠操作"]);
    dictionary.push(["CC Bubbles","CC 气泡"]);
    dictionary.push(["CC Drizzle","CC 细雨滴"]);
    dictionary.push(["CC Hair","CC 毛发"]);
    dictionary.push(["CC Mr. Mercury","CC 水银滴落"]);
    dictionary.push(["CC Particle Systems II","CC 粒子仿真系统 II"]);
    dictionary.push(["CC Particle World","CC 粒子仿真环境"]);
    dictionary.push(["CC Pixel Polly","CC 像素多边形"]);
    dictionary.push(["CC Rainfall","CC 下雨"]);
    dictionary.push(["CC Scatterize","CC 散射"]);
    dictionary.push(["CC Snowfall","CC 下雪"]);
    dictionary.push(["CC Star Burst","CC 星爆"]);
    dictionary.push(["Brush Strokes","笔刷描边"]);
    dictionary.push(["Cartoon","卡通"]);
    dictionary.push(["Color Emboss","彩色浮雕"]);
    dictionary.push(["Emboss","浮雕"]);
    dictionary.push(["Find Edges","查找边缘"]);
    dictionary.push(["Glow","发光"]);
    dictionary.push(["Mosaic","马赛克"]);
    dictionary.push(["Motion Tile","动态拼贴"]);
    dictionary.push(["Posterize","色调分离"]);
    dictionary.push(["Roughen Edges","毛边"]);
    dictionary.push(["Scatter","散布"]);
    dictionary.push(["Strobe Light","闪光灯"]);
    dictionary.push(["Texturize","纹理化"]);
    dictionary.push(["Threshold","阈值"]);
    dictionary.push(["CC Block Load","CC 块装载"]);
    dictionary.push(["CC Burn Film","CC 胶片烧灼"]);
    dictionary.push(["CC Glass","CC 玻璃"]);
    dictionary.push(["CC Kaleida","CC 万花筒"]);
    dictionary.push(["CC Mr. Smoothie","CC 像素溶解"]);
    dictionary.push(["CC Plastic","CC 塑料"]);
    dictionary.push(["CC RepeTile","CC 重复拼贴"]);
    dictionary.push(["CC Threshold","CC 阈值"]);
    dictionary.push(["CC Threshold RGB","CC 阈值 RGB"]);
    dictionary.push(["Numbers","数字"]);
    dictionary.push(["Timecode","时间码"]);
    dictionary.push(["Echo","残影"]);
    dictionary.push(["Posterize Time","色调分离时间"]);
    dictionary.push(["Time Difference","时差"]);
    dictionary.push(["Time Displacement","时间置换"]);
    dictionary.push(["Timewarp","时间扭曲"]);
    dictionary.push(["CC Force Motion Blur","CC 强制运动模糊"]);
    dictionary.push(["CC Time Blend","CC 时间混合"]);
    dictionary.push(["CC Time Blend FX","CC 时间混合 FX"]);
    dictionary.push(["CC Wide Time","CC 宽泛时间"]);
    dictionary.push(["Block Dissolve","块溶解"]);
    dictionary.push(["Card Wipe","卡片擦除"]);
    dictionary.push(["Gradient Wipe","渐变擦除"]);
    dictionary.push(["Iris Wipe","光圈擦除"]);
    dictionary.push(["Linear Wipe","线性擦除"]);
    dictionary.push(["Radial Wipe","径向擦除"]);
    dictionary.push(["Venetian Blinds","百叶窗"]);
    dictionary.push(["CC Glass Wipe","CC 玻璃擦除"]);
    dictionary.push(["CC Grid Wipe","CC 网格擦除"]);
    dictionary.push(["CC Image Wipe","CC 图像擦除"]);
    dictionary.push(["CC Jaws","CC 锯齿"]);
    dictionary.push(["CC Light Wipe","CC 照明式擦除"]);
    dictionary.push(["CC Line Sweep","CC 直线擦除"]);
    dictionary.push(["CC Radial ScaleWipe","CC 径向缩放擦除"]);
    dictionary.push(["CC Scale Wipe","CC 缩放擦除"]);
    dictionary.push(["CC Twister","CC 龙卷风"]);
    dictionary.push(["CC WarpoMatic","CC 自动弯曲"]);
    dictionary.push(["Apply Color LUT","应用颜色 LUT"]);
    dictionary.push(["Cineon Converter Cineon","转换器"]);
    dictionary.push(["Color Profile Converter","颜色配置文件转换器"]);
    dictionary.push(["Grow Bounds","范围扩散"]);
    dictionary.push(["HDR Compander HDR","压缩扩展器"]);
    dictionary.push(["HDR Highlight Compression HDR","高光压缩"]);
    dictionary.push(["CC Overbrights","CC 过于鲜亮"]);
    // console.log(transENtoSC("擦除",1))
    // console.log(transENtoSC("wipe",0))
    dictionarykeys=new Array()
    for(var i=0;i<dictionary.length;i++){
        dictionarykeys.push(dictionary[i][0])
    }
    dicInit=true
    log("dicInit Done")
}
function addEffects(effectName){
    var layers=app.project.activeItem.selectedLayers
        if(!layers){log("no layers selected");return;}
    for(var i=0;i<layers.length;i++){
        try{
        layers[i].Effects.addProperty(effectName)
    }catch(e){
        log("no effects added")
        return false
    }}
    return true
}
function objInside(obj){
    var seen = []
    var keys = []
    JSON.stringify(obj, function(key, val) {
       if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
            keys.push(key)
        }
        return val;
    });
    var content=""
    for(var i=0;i<seen.length;i++){
        content+=keys[i]+"  :  "
        //alert(seen[i])
        //alert((typeof seen[i] == "object"))
        content+=seen[i].toString()+"\n"
    }
    return content
}
function objInsideSimple(obj){
    var seen = []
    JSON.stringify(obj, function(key, val) {
       if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    });
    return seen
}
function redirect(url) {
    url = url.replace(/([a-z]*):\/\/([-\._a-z0-9A-Z]*)(:[0-9]*)?\/?(.*)/, "$1/$2/$3/$4");
    url = url.split("/");
    if (url[2] == "undefined") {
        url[2] = "80"
    }
    var parsedURL = {
        protocol: url[0].toUpperCase(),
        host: url[1],
        port: url[2],
        path: ""
    };
    url = url.slice(3);
    parsedURL.path = url.join("/");
    if (parsedURL.port.charAt(0) == ":") {
        parsedURL.port = parsedURL.port.slice(1);
    }
    if (parsedURL.port != "") {
        parsedURL.port = parseInt(parsedURL.port);
    }
    if (parsedURL.port == "" || parsedURL.port < 0 || parsedURL.port > 65535) {
        parsedURL.port = 80;
    }
    parsedURL.path = parsedURL.path;
    var request = "GET /" + parsedURL.path + " HTTP/1.1\n" + "Host: " + parsedURL.host + "\n" + "User-Agent: Adobe ExtendScript\n" + "Accept: text/xml,text/*,*/*\n" + "Accept-Encoding:\n" + "Connection: close\n" + "Accept-Language: *\n" + "Accept-Charset: utf-8\n\n";
    var readState = {
        sector: 0,
        dataAvailable: true,
        line: "",
        buffer: "",
        headers: "",
        status: "",
        body: ""
    };
    socket = null;
    var socket = new Socket();
    if (!socket.open(parsedURL.host + ":" + parsedURL.port, "UTF-8")) {
        return false;
    }
    socket.write(request);
    var regEx = {
        status: /^\s*(?:HTTP\/\d\.\d\s)(\d+)\s*(.*)\s*$/
    };
    $.hiresTimer;
    while (!socket.eof) {
        if (($.hiresTimer / 1000000) > 2) {
            socket.close();
            socket = null;
            break;
            return false;
        }
        if (!socket.connected && !readState.dataAvailable) {
            socket.close();
            socket = null;
            break;
            return null;
        }
        readState.line = socket.readln();
        if (regEx.status.test(readState.line)) {
            var match = readState.line.match(regEx.status);
            readState.status = match[1] + " ::: " + match[2];
        }
        readState.buffer += readState.line + "\n";
        readState.dataAvailable = readState.buffer.length > 0;
    }
    socket.close();
    var b = readState.buffer.split("\n\n");
    readState.headers = b[0];
    readState.body = b.slice(1).join("\n");
    // log("readState.headers: "+readState.headers)
    log("readState.body: "+readState.body.length)
    return readState;
}
// function webFunc_getProgrammerCal(readState_body){
//     var startIn = readState_body.indexOf("<div class=\"date\">");
//     var endIn = readState_body.indexOf("<li>此页面代码非作者原创</li>", startIn);
//     readState_body = readState_body.substr(startIn, endIn - startIn);
//     log(readState_body.length)
//     log(readState_body)
//     // var readState_body=readState_body.split("\n")
    
//     var date=/今天是[0-9][0-9][0-9][0-9]年(1?)[0-9]月((1|2|3)?)[0-9]日\ 星期(日|一|二|三|四|五|六)/i;
//     log("Date:"+date.exec(readState_body))

// }
function urlFilter(readState_body,keyword){
    var result=[]
    var docu=readState_body.split("\n")
    for(var ind=0;ind<docu.length;ind++){
        var textToCompare=docu[ind]
        for (var i = 0; i < textToCompare.length; i++) {
            var com=0
            var tmpcheck=0
            for (var j = 0; j < keyword.length; j++) {
                if(new String(textToCompare[i]).toUpperCase()!=keyword[j].toUpperCase()){
                    i-=tmpcheck;
                    break;
                }
                com++;
                i++;
                tmpcheck++;
                if(com==keyword.length){
                    result.push(docu[ind])
                    log(docu[ind])
                }
            }
        }
    }
    return result
}

// function saveObjTo(obj,path){
//     var objs=JSON.stringify(obj)
//     var myFile = new File(path);
//     myFile.open("w");
//     myFile.write(objs);
//     myFile.close();
//     log("write successfully: "+path)
// }
// function loadObjFrom(path){
//     var myFile = new File(path);
//     myFile.open("r");
//     var objs=myFile.read();
//     // log("obj: "+objs)
//     var obj=JSON.parse(objs)
//     myFile.close();
//     // log("read successfully: "+path)
//     return obj
// }
// function getSelectedPropertie(){
//     if(!app.project.activeItem)return;
//     // log("activeItem: "+objInside(app.project.activeItem))
//     var properties=app.project.activeItem.selectedProperties
//     if(!properties){
//         log("activeItem.properties: "+objInside(properties))
//         if(properties.length==1){
//         // 判断已选中项目有已选中的属性
//             return properties[0]
//         }else{
//             //效果器的话，这个属性是一个组，第一个是效果组，第二个是具体效果
//             if(properties[0] instanceof PropertyGroup){
//                 return properties[1]
//             }
//         }
//     }
// }
//============ outfun ==========//
    //============ Motion 2 ==========//
    function OF_Motion2_inMotion(number2) {
        var i = 0;
        var j = 0;
        var k = 0;
        app.beginUndoGroup("Ease In");
        for (var i = 0; i < app.project.activeItem.selectedLayers.length; i += 1) {
            for (var j = 0; j < app.project.activeItem.selectedLayers[i].selectedProperties.length; j += 1) {
                if (app.project.activeItem.selectedLayers[i].selectedProperties[j].canVaryOverTime) {
                    for (var k = 0; k < app.project.activeItem.selectedLayers[i].selectedProperties[j].selectedKeys.length; k += 1) {
                        var prop = app.project.activeItem.selectedLayers[i].selectedProperties[j];
                        if (number2 < 1) {
                            prop.setInterpolationTypeAtKey(prop.selectedKeys[k], KeyframeInterpolationType.HOLD)
                        } else {
                            var easeIn = new KeyframeEase(0, number2);
                            var easeOut = new KeyframeEase(prop.keyOutTemporalEase(prop.selectedKeys[k])[0].speed, prop.keyOutTemporalEase(prop.selectedKeys[k])[0].influence);
                            if (!prop.isSpatial && prop.value.length == 3) {
                                prop.setTemporalEaseAtKey(prop.selectedKeys[k], [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut])
                            } else if (!prop.isSpatial && prop.value.length == 2) {
                                prop.setTemporalEaseAtKey(prop.selectedKeys[k], [easeIn, easeIn], [easeOut, easeOut])
                            } else {
                                prop.setTemporalEaseAtKey(prop.selectedKeys[k], [easeIn], [easeOut])
                            }
                        }
                    }
                }
            }
        }
        app.endUndoGroup();
    }
    function OF_Motion2_moveAnchor(row, col) {
        log("row="+row+"  col="+col)
        var mainComp = app.project.activeItem;
        var curTime = app.project.activeItem.time;
        var theLayers = app.project.activeItem.selectedLayers;
        for (var num = 0; num < theLayers.length; num += 1) {
            var theLayer = theLayers[num];
            x=Math.round(row/2*theLayer.sourceRectAtTime(curTime, false).width)
            y=Math.round(col/2*theLayer.sourceRectAtTime(curTime, false).height)
            log("theLayer.sourceRectAtTime(curTime, false).width="+theLayer.sourceRectAtTime(curTime, false).width)
            log("theLayer.sourceRectAtTime(curTime, false).height="+theLayer.sourceRectAtTime(curTime, false).height)
            log("x="+x+"  y="+y)

            if (theLayer instanceof TextLayer || theLayer instanceof ShapeLayer) {
                x += theLayer.sourceRectAtTime(curTime, false).left;
                y += theLayer.sourceRectAtTime(curTime, false).top;
            }
            
            if (theLayer.anchorPoint.isTimeVarying) {
                var theComp = app.project.activeItem;
                theLayer.anchorPoint.setValueAtTime(theComp.time, [x, y]);
            } else {
                var curAnchor = theLayer.anchorPoint.value;
                var xMove = (x - curAnchor[0]) * (theLayer.scale.value[0] / 100);
                var yMove = (y - curAnchor[1]) * (theLayer.scale.value[1] / 100);
                var posEx = false;
                if (theLayer.position.expressionEnabled) {
                    theLayer.position.expressionEnabled = false;
                    posEx = true;
                }
                var dupLayer = theLayer.duplicate();
                var oldParent = theLayer.parent;
                dupLayer.moveToEnd();
                if (dupLayer.scale.isTimeVarying) {
                    dupLayer.scale.setValueAtTime(app.project.activeItem.time, [100, 100])
                } else {
                    dupLayer.scale.setValue([100, 100])
                }
                theLayer.parent = dupLayer;
                theLayer.anchorPoint.setValue([x, y]);
                if (theLayer.position.isTimeVarying) {
                    var numKeys = theLayer.position.numKeys;
                    for (var k = 1; k <= numKeys; k += 1) {
                        curPos = theLayer.position.keyValue(k);
                        curPos[0] += xMove;
                        curPos[1] += yMove;
                        theLayer.position.setValueAtKey(k, curPos);
                    }
                } else {
                    curPos = theLayer.position.value;
                    theLayer.position.setValue([curPos[0] + xMove, curPos[1] + yMove, curPos[2]]);
                }
                theLayer.parent = oldParent;
                if (posEx) {
                    theLayer.position.expressionEnabled = true
                }
                dupLayer.remove();
            }
        }
    }
    function OF_Motion2_outMotion(number3) {
        var i = 0;
        var j = 0;
        var k = 0;
        app.beginUndoGroup("Ease Out");
        log(number3)
        for (var i = 0; i < app.project.activeItem.selectedLayers.length; i += 1) {
            for (var j = 0; j < app.project.activeItem.selectedLayers[i].selectedProperties.length; j += 1) {
                if (app.project.activeItem.selectedLayers[i].selectedProperties[j].canVaryOverTime) {
                    for (var k = 0; k < app.project.activeItem.selectedLayers[i].selectedProperties[j].selectedKeys.length; k += 1) {
                        var prop = app.project.activeItem.selectedLayers[i].selectedProperties[j];
                        if (number3 < 1) {
                            prop.setInterpolationTypeAtKey(prop.selectedKeys[k], KeyframeInterpolationType.BEZIER);
                            prop.setTemporalContinuousAtKey(prop.selectedKeys[k], true);
                            prop.setTemporalAutoBezierAtKey(prop.selectedKeys[k], true);
                        } else {
                            var easeOut = new KeyframeEase(0, number3);
                            var easeIn = new KeyframeEase(prop.keyInTemporalEase(prop.selectedKeys[k])[0].speed, prop.keyInTemporalEase(prop.selectedKeys[k])[0].influence);
                            if (!prop.isSpatial && prop.value.length == 3) {
                                prop.setTemporalEaseAtKey(prop.selectedKeys[k], [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut])
                            } else if (!prop.isSpatial && prop.value.length == 2) {
                                prop.setTemporalEaseAtKey(prop.selectedKeys[k], [easeIn, easeIn], [easeOut, easeOut])
                            } else {
                                prop.setTemporalEaseAtKey(prop.selectedKeys[k], [easeIn], [easeOut])
                            }
                        }
                    }
                }
            }
        }
        app.endUndoGroup();
    }
    function OF_Motion2_makeMotion(number){
        var i = 0;
        var j = 0;
        var k = 0;
        app.beginUndoGroup("Easy Ease");
        for (var i = 0; i < app.project.activeItem.selectedLayers.length; i += 1) {
            for (var j = 0; j < app.project.activeItem.selectedLayers[i].selectedProperties.length; j += 1) {
                if (app.project.activeItem.selectedLayers[i].selectedProperties[j].canVaryOverTime) {
                    for (var k = 0; k < app.project.activeItem.selectedLayers[i].selectedProperties[j].selectedKeys.length; k += 1) {
                        var prop = app.project.activeItem.selectedLayers[i].selectedProperties[j];
                        if (number < 1) {
                            prop.setInterpolationTypeAtKey(prop.selectedKeys[k], KeyframeInterpolationType.LINEAR)
                        } else {
                            var easeBoth = new KeyframeEase(0, number);
                            if (!prop.isSpatial && prop.value.length == 3) {
                                prop.setTemporalEaseAtKey(prop.selectedKeys[k], [easeBoth, easeBoth, easeBoth])
                            } else if (!prop.isSpatial && prop.value.length == 2) {
                                prop.setTemporalEaseAtKey(prop.selectedKeys[k], [easeBoth, easeBoth], [easeBoth, easeBoth])
                            } else {
                                prop.setTemporalEaseAtKey(prop.selectedKeys[k], [easeBoth])
                            }
                        }
                    }
                }
            }
        }
        app.endUndoGroup(); 
    }
    function OF_Motion2_createANull() {
        var mainComp = app.project.activeItem;
        if (!mainComp || !(mainComp instanceof CompItem)) {
            return false;
        } else {
            if (mainComp.selectedLayers.length < 1) {
                return false;
            }
        }
        OF_Motion2_removeParents();
    }
    function OF_Motion2_removeParents() {
        app.beginUndoGroup("Null");
        var theLayers = app.project.activeItem.selectedLayers;
        for (var num = 0; num < theLayers.length; num += 1) {
            var theLayer = theLayers[num];
            theLayer.parent = null;
        }
        OF_Motion2_nullToItem();
        app.endUndoGroup();
    }
    function OF_Motion2_nullToItem() {
        var activeItem = app.project.activeItem;
        if (activeItem !== null) {
            
            var selectedLayers = activeItem.selectedLayers;
            if (selectedLayers.length > 0) {
                
                minIndex = selectedLayers[0].index;
                xmin = xmax = selectedLayers[0].property("Position").value[0];
                ymin = ymax = selectedLayers[0].property("Position").value[1];
                var myComp = app.project.activeItem;
                if (myComp != null && myComp instanceof CompItem) {
                    
                    var myLayers = myComp.selectedLayers;
                    if (myLayers.length != 0) {
                        
                        var saveIn = myComp.duration;
                        var saveOut = 0;
                        var saveIndex = myComp.numLayers;
                        var newInpoint = myComp.duration;
                        var newOutpoint = 0;
                        var myIndex = myComp.numLayers;
                        for (var i = 0; i <= myLayers.length - 1; i += 1) {
                            currentLayer = myLayers[i];
                            saveIn = currentLayer.stretch < 0 ? currentLayer.outPoint : currentLayer.inPoint;
                            saveOut = currentLayer.stretch < 0 ? currentLayer.inPoint : currentLayer.outPoint;
                            saveIndex = currentLayer.index;
                            if (saveIn < newInpoint) {
                                newInpoint = saveIn
                            }
                            if (saveOut > newOutpoint) {
                                newOutpoint = saveOut
                            }
                            if (saveIndex < myIndex) {
                                myIndex = saveIndex
                            }
                        }
                         
    
                        activeItem.layers.addNull();
                        var newNull = activeItem.layer(1);
                        newNull.name = "NULL CONTROL";
                        newNull.source.width = 100
                        newNull.source.height = 100
                        newNull.inPoint = newInpoint;
                        newNull.outPoint = newOutpoint;
                        newNull.label = 9;
                        var ctr = 0;
                        
                        for (var num = 0; num < selectedLayers.length; num += 1) {
                            lay = selectedLayers[num];
                            ctr++;
                            OF_Motion2_minmaxX(lay.property("Position").value[0]);
                            OF_Motion2_minmaxY(lay.property("Position").value[1]);
                        }
                        
                        var xpos = ((xmax - xmin) / 2) + xmin;
                        var ypos = ((ymax - ymin) / 2) + ymin;
                        newNull.property("Position").setValue([xpos, ypos]);
                        newNull.anchorPoint.setValue([newNull.source.width / 2, newNull.source.height / 2]);
                        
                        for (var num = 0; num < selectedLayers.length; num += 1) {
                            var lay = selectedLayers[num];
                            lay.parent = newNull;
                            if (lay.index < minIndex) {
                                minIndex = lay.index
                            }
                        }
                    }
                    
                    function OF_Motion2_minmaxX(xIn) {
                        if (xIn > xmax) {
                            xmax = xIn
                        }
                        if (xIn < xmin) {
                            xmin = xIn
                        }
                    }
    
                    function OF_Motion2_minmaxY(yIn) {
                        if (yIn > ymax) {
                            ymax = yIn
                        }
                        if (yIn < ymin) {
                            ymin = yIn
                        }
                    }
                    newNull.moveBefore(myComp.layer(myIndex + 1));
                    newNull.label = 9;
                }
            }
        }
    }
    function OF_Motion2_blend(){
        var i = 0;
        if (!OF_Motion2_CheckPrereqs(true)) {
            return;
        }
        app.beginUndoGroup("Blend");
        var theLayers = app.project.activeItem.selectedLayers;
        for (var num = 0; num < theLayers.length; num += 1) {
            var theLayer = theLayers[num];
            var theProperty = theLayer.selectedProperties;
            for (var pro = 0; pro < theProperty.length; pro += 1) {
                var thisPropertyChoice = theProperty[pro];
                var firstParent = thisPropertyChoice.parentProperty;
                var thisRealName = firstParent.matchName;
                var matchNameChoice = thisPropertyChoice.parentProperty.name;
                var currentName = thisPropertyChoice.name;
                if (thisRealName === "ADBE Transform Group") {
                    presetName = currentName
                } else {
                    presetName = currentName + " - " + matchNameChoice
                }
                var smoothWidth = theLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
                smoothWidth.name = presetName + " - " + "Smoothness";
                smoothWidth.property("ADBE Slider Control-0001").expression = "clamp(value, 0, 100);";
                smoothWidth.property("ADBE Slider Control-0001").setValue(4);
                var smoothSample = theLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
                smoothSample.name = presetName + " - " + "Blend Precision";
                smoothSample.property("ADBE Slider Control-0001").expression = "clamp(value, 0, 100);";
                smoothSample.property("ADBE Slider Control-0001").setValue(25);
                var smoothSwitch = theLayer.property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
                smoothSwitch.name = presetName + " - " + "Blend On/Off";
                smoothSwitch.property("ADBE Checkbox Control-0001").setValue(1);
                var smoothExp = "range = effect(\"" + presetName + " - Smoothness\")(\"ADBE Slider Control-0001\") / 20;\n" + "samples = effect(\"" + presetName + " - Blend Precision\")(\"ADBE Slider Control-0001\") / 2;\n" + "on_off = effect(\"" + presetName + " - Blend On/Off\")(\"ADBE Checkbox Control-0001\");\n" + " \n" + "if (on_off == 1) {\n" + "\ttry { \n" + "\t\tsmooth(range, samples);\n" + "\t} catch (e$$4) { \n" + "\t\tsmooth(1, 1);\n" + "\t}\n" + "} else {\n" + "\tvalue = value;\n" + "}";
                if (thisPropertyChoice.canSetExpression) {
                    thisPropertyChoice.expression = smoothExp
                }
            }
        }
        app.endUndoGroup();
    }
    function OF_Motion2_burst(){
        var mainComp = app.project.activeItem;
        if (!mainComp || !(mainComp instanceof CompItem)) {
            return;
        }
        app.beginUndoGroup("Burst");
        var proj = app.project;
        if (proj !== null) {
            var eaLayer = app.project.activeItem.layers.addShape();
            eaLayer.name = "Burst";
            var createRectangle = eaLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
            createRectangle.name = "Rectangle 1";
            var createShape = createRectangle.addProperty("ADBE Vectors Group");
            createShape.addProperty("ADBE Vector Shape - Rect");
            createShape.addProperty("ADBE Vector Filter - Repeater");
            createShape.addProperty("ADBE Vector Graphic - Stroke");
            createShape.addProperty("ADBE Vector Graphic - Fill");
            createShape.addProperty("ADBE Vector Filter - Wiggler");
            createShape.property("ADBE Vector Shape - Rect").name = "Burst Piece 1";
            createShape.property("ADBE Vector Filter - Repeater").name = "Repeater 1";
            createShape.property("ADBE Vector Filter - Wiggler").name = "Wiggle Transform 1";
            var burstEffectPanel = eaLayer.property("ADBE Effect Parade");
            var ea_GlobalPos = burstEffectPanel.addProperty("ADBE Point Control");
            ea_GlobalPos.name = "Global Position";
            var numberCopies = burstEffectPanel.addProperty("ADBE Slider Control");
            numberCopies.name = "# of Copies";
            numberCopies.property("ADBE Slider Control-0001").setValue(9);
            var copyRevolution = burstEffectPanel.addProperty("ADBE Slider Control");
            copyRevolution.name = "Copies Revolution";
            copyRevolution.property("ADBE Slider Control-0001").setValue(360);
            var revolutionOffset = burstEffectPanel.addProperty("ADBE Slider Control");
            revolutionOffset.name = "Revolution Offset";
            revolutionOffset.property("ADBE Slider Control-0001").setValue(0);
            var accentOffset = burstEffectPanel.addProperty("ADBE Slider Control");
            accentOffset.name = "Burst Offset";
            accentOffset.property("ADBE Slider Control-0001").setValue(0);
            var globalDistance = burstEffectPanel.addProperty("ADBE Slider Control");
            globalDistance.name = "Distance from Center";
            globalDistance.property("ADBE Slider Control-0001").setValue(250);
            var linkSize = burstEffectPanel.addProperty("ADBE Checkbox Control");
            linkSize.name = "Link Width & Height";
            linkSize.property("ADBE Checkbox Control-0001").setValue(0);
            var accentWidth = burstEffectPanel.addProperty("ADBE Slider Control");
            accentWidth.name = "Burst Width";
            accentWidth.property("ADBE Slider Control-0001").setValue(20);
            var accentHeight = burstEffectPanel.addProperty("ADBE Slider Control");
            accentHeight.name = "Burst Height";
            accentHeight.property("ADBE Slider Control-0001").setValue(60);
            var strokeWidth = burstEffectPanel.addProperty("ADBE Slider Control");
            strokeWidth.name = "Stroke Width";
            strokeWidth.property("ADBE Slider Control-0001").setValue(8);
            var fillOn = burstEffectPanel.addProperty("ADBE Checkbox Control");
            fillOn.name = "Fill On | Off";
            fillOn.property("ADBE Checkbox Control-0001").setValue(1);
            var fillColor = eaLayer.property("ADBE Effect Parade").addProperty("ADBE Color Control");
            fillColor.name = "Fill Color";
            fillColor.property("ADBE Color Control-0001").setValue([0.976, 0.38, 0.709]);
            var strokeOn = eaLayer.property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
            strokeOn.name = "Stroke On | Off";
            strokeOn.property("ADBE Checkbox Control-0001").setValue(1);
            var strokeColor = burstEffectPanel.addProperty("ADBE Color Control");
            strokeColor.name = "Stroke Color";
            strokeColor.property("ADBE Color Control-0001").setValue([0.454, 0.733, 1]);
            var accentRoundness = burstEffectPanel.addProperty("ADBE Slider Control");
            accentRoundness.name = "Burst Roundness";
            accentRoundness.property("ADBE Slider Control-0001").setValue(30);
            var seqLinkSize = burstEffectPanel.addProperty("ADBE Checkbox Control");
            seqLinkSize.name = "Link Seq. Width & Height";
            seqLinkSize.property("ADBE Checkbox Control-0001").setValue(1);
            var seqWidth = burstEffectPanel.addProperty("ADBE Slider Control");
            seqWidth.name = "Sequential - Width";
            seqWidth.property("ADBE Slider Control-0001").setValue(0);
            var seqHeight = burstEffectPanel.addProperty("ADBE Slider Control");
            seqHeight.name = "Sequential - Height";
            seqHeight.property("ADBE Slider Control-0001").setValue(0);
            var sizeExpr = "x = effect(\"Burst Width\")(\"ADBE Slider Control-0001\");\ny = effect(\"Burst Height\")(\"ADBE Slider Control-0001\");\nlink = effect(\"Link Width & Height\")(\"ADBE Checkbox Control-0001\");\n \nif (link == 0) {\n\t[x,y];\n} else {\n\t[x,x];\n}";
            var positionExpr = "[content(\"Rectangle 1\").content(\"Burst Piece 1\").position[1], effect(\"Distance from Center\")(\"ADBE Slider Control-0001\")];\n";
            var roundExpr = "effect(\"Burst Roundness\")(\"ADBE Slider Control-0001\");\n";
            var strokeColorExpr = "effect(\"Stroke Color\")(\"ADBE Color Control-0001\");\n";
            var strokeVisibleExpr = "effect(\"Stroke On | Off\")(\"ADBE Checkbox Control-0001\") * 100;\n";
            var strokeWidthExpr = "effect(\"Stroke Width\")(\"ADBE Slider Control-0001\");\n";
            var fillColorExpr = "effect(\"Fill Color\")(\"ADBE Color Control-0001\");\n";
            var fillVisibleExpr = "effect(\"Fill On | Off\")(\"ADBE Checkbox Control-0001\") * 100;\n";
            var repeaterCopiesExpr = "effect(\"# of Copies\")(\"ADBE Slider Control-0001\");\n";
            var repeaterOffsetExpr = "effect(\"Revolution Offset\")(\"ADBE Slider Control-0001\");\n";
            var repeaterRevolutionExpr = "try {\n\tcopies = effect(\"# of Copies\")(\"ADBE Slider Control-0001\");\n\tdivision = effect(\"Copies Revolution\")(\"ADBE Slider Control-0001\");\n\tdivision / copies + (content(\"Rectangle 1\")\n\t\t.content(\"Repeater 1\")\n\t\t.offset);\n} catch(e$$4) {\n\tL = null;\n}\n";
            var globalPosExpr = "effect(\"Global Position\")(\"ADBE Point Control-0001\");\n";
            var zeroWiggle = "0";
            var accentPositionOffsetExpr = "[content(\"Rectangle 1\").content(\"Wiggle Transform 1\").transform.position[1], effect(\"Burst Offset\")(\"ADBE Slider Control-0001\")];\n";
            var sliderZeroLockExpr = "copies = effect(\"# of Copies\")(\"ADBE Slider Control-0001\");\nif (copies < 0){\ncopies = 0;\n}";
            var roundZeroLockExpr = "roundness = effect(\"Burst Roundness\")(\"ADBE Slider Control-0001\");\nif (roundness < 0) {\n\troundness = 0;\n}";
            var widthZeroLockExpr = "width = effect(\"Burst Width\")(\"ADBE Slider Control-0001\");\nif (width < 0) {\n\twidth = 0;\n}";
            var heightZeroLockExpr = "height = effect(\"Burst Height\")(\"ADBE Slider Control-0001\");\nif (height < 0) {\n\theight = 0;\n}";
            var seqSizeExpr = "x = 100 + effect(\"Sequential - Width\")(\"ADBE Slider Control-0001\");\ny = 100 + effect(\"Sequential - Height\")(\"ADBE Slider Control-0001\");\nlink = effect(\"Link Seq. Width & Height\")(\"ADBE Checkbox Control-0001\");\n \nif (link == 0) {\n\t[x,y];\n} else {\n\t[x,x];\n}";
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").expression = sizeExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Position").expression = positionExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Roundness").expression = roundExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Color").expression = strokeColorExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Opacity").expression = strokeVisibleExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Width").expression = strokeWidthExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").expression = fillColorExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Opacity").expression = fillVisibleExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Filter - Repeater").property("ADBE Vector Repeater Copies").expression = repeaterCopiesExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Filter - Wiggler").property("ADBE Vector Wiggler Transform").property("ADBE Vector Wiggler Rotation").expression = repeaterOffsetExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Filter - Repeater").property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").expression = repeaterRevolutionExpr;
            eaLayer.property("ADBE Transform Group").property("ADBE Position").expression = globalPosExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Filter - Wiggler").property("ADBE Vector Xform Temporal Freq").expression = zeroWiggle;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Filter - Wiggler").property("ADBE Vector Wiggler Transform").property("ADBE Vector Wiggler Position").expression = accentPositionOffsetExpr;
            eaLayer.property("ADBE Effect Parade").property(2).property("ADBE Slider Control-0001").expression = sliderZeroLockExpr;
            eaLayer.property("ADBE Effect Parade").property(15).property("ADBE Slider Control-0001").expression = roundZeroLockExpr;
            eaLayer.property("ADBE Effect Parade").property(8).property("ADBE Slider Control-0001").expression = widthZeroLockExpr;
            eaLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Filter - Repeater").property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Scale").expression = seqSizeExpr;
        }
        app.endUndoGroup();
    }
    function OF_Motion2_CheckPrereqs(doPropertyCheck) {
        var mainComp = app.project.activeItem;
        if (!mainComp || !(mainComp instanceof CompItem)) {
            return false;
        } else {
            if (mainComp.selectedLayers.length < 1) {
                return false;
            }
        }
        if (doPropertyCheck) {
            if (mainComp.selectedProperties.length < 1) {
                return false;
            }
        }
        return true;
    }
    function OF_Motion2_bounce() {
        var i = 0;
        if (!OF_Motion2_CheckPrereqs(true)) {
            return;
        }
        app.beginUndoGroup("Jump");
        var theLayers = app.project.activeItem.selectedLayers;
        for (var num = 0; num < theLayers.length; num += 1) {
            var theLayer = theLayers[num];
            var theProperty = theLayer.selectedProperties;
            for (var pro = 0; pro < theProperty.length; pro += 1) {
                var thisPropertyChoice = theProperty[pro];
                var firstParent = thisPropertyChoice.parentProperty;
                var thisRealName = firstParent.matchName;
                var matchNameChoice = thisPropertyChoice.parentProperty.name;
                var currentName = thisPropertyChoice.name;
                if (thisRealName === "ADBE Transform Group") {
                    presetName = currentName
                } else {
                    presetName = currentName + " - " + matchNameChoice
                }
                if (theLayer.property("ADBE Effect Parade").property(presetName + " - " + "Stretch") !== null) {
                    continue;
                }
                var bounceOvershoot = theLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
                bounceOvershoot.name = presetName + " - " + "Stretch";
                bounceOvershoot.property("ADBE Slider Control-0001").setValue(60);
                var bounceGravity = theLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
                bounceGravity.name = presetName + " - " + "Gravity";
                bounceGravity.property("ADBE Slider Control-0001").expression = "clamp(value, 0,100);";
                bounceGravity.property("ADBE Slider Control-0001").setValue(8);
                var bounceMaxJumps = theLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
                bounceMaxJumps.name = presetName + " - " + "Max Jumps";
                bounceMaxJumps.property("ADBE Slider Control-0001").expression = "clamp(value, 0,10);";
                bounceMaxJumps.property("ADBE Slider Control-0001").setValue(8);
                var bounceSwitch = theLayer.property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
                bounceSwitch.name = presetName + " - " + "Jump In/Out";
                bounceSwitch.property("ADBE Checkbox Control-0001").setValue(0);
                var jumpExp = "try {\nelastic = (effect(\"" + presetName + " - Stretch\")(\"ADBE Slider Control-0001\")) / 100;\n" + "gravity = (effect(\"" + presetName + " - Gravity\")(\"ADBE Slider Control-0001\")) * 100;\n" + "bounceMax = effect(\"" + presetName + " - Max Jumps\")(\"ADBE Slider Control-0001\");\n" + "on_off = effect(\"" + presetName + " - Jump In/Out\")(\"ADBE Checkbox Control-0001\");\n" + " \n" + "n = 0;\n" + "if (numKeys > 0) {\n" + "    n = nearestKey(time).index;\n" + "    if (key(n).time > time) {\n" + "        n--;\n" + "    }\n" + "}\n" + "if (n > 0) {\n" + "    t = time - key(n).time;\n" + "    v = -velocityAtTime(key(n).time - 0.001) * elastic;\n" + "    vl = length(v);\n" + "    if (value instanceof Array) {\n" + "        vu = (vl > 0) ? normalize(v) : [0, 0, 0];\n" + "    } else {\n" + "        vu = (v < 0) ? -1 : 1;\n" + "    }\n" + "    tCur = 0;\n" + "    segDur = 2 * vl / gravity;\n" + "    tNext = segDur;\n" + "    numberOfBounces = 1;\n" + "    while (tNext < t && numberOfBounces <= bounceMax) {\n" + "        vl *= elastic;\n" + "        segDur *= elastic;\n" + "        tCur = tNext;\n" + "        tNext += segDur;\n" + "        numberOfBounces++;\n" + "    }\n" + "    if (numberOfBounces <= bounceMax) {\n" + "        delta = t - tCur;\n" + "        inOutExp = vu * delta * (vl - gravity * delta / 2);\n" + "        if (on_off == 1) {\n" + "            value = value - inOutExp;\n" + "\t\t} else {\n" + "            value = value + inOutExp;\n" + "\t\t}\n" + "\t} else {\n" + "        value = value;\n" + "\t}\n" + "} else {\n" + "    value = value;\n" + "}\n" + "} catch (e$$4) {\n" + "value = value;\n" + "}";
                if (thisPropertyChoice.canSetExpression) {
                    thisPropertyChoice.expression = jumpExp
                }
            }
        }
        app.endUndoGroup();
    }
    function OF_Motion2_createVignRig(){
        var mainComp = app.project.activeItem;
        if (!mainComp || !(mainComp instanceof CompItem)) {
            return;
        }
        app.beginUndoGroup("Vignette");
        var currentComp = app.project.activeItem;
        var precompLayers = 1;
        var compName = currentComp.name;
        var compLayers = currentComp.layers;
        var vignWidth = app.project.activeItem.width;
        var vignHeight = app.project.activeItem.height;
        var newVignBaseName = "Vignette BG";
        var newVignAlphaName = "Vignette Alpha";
        var vignBase = app.project.activeItem.layers.addSolid([0, 0, 0], "Vignette BG", vignWidth, vignHeight, app.project.activeItem.pixelAspect);
        vignBase.name = newVignBaseName;
        var vignAlpha = app.project.activeItem.layers.addShape();
        vignAlpha.name = newVignAlphaName;
        var createCircle = vignAlpha.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        createCircle.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
        createCircle.property("ADBE Vectors Group").property("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([vignHeight, vignHeight]);
        createCircle.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
        createCircle.name = "Circle";
        var createOval = vignAlpha.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        createOval.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
        createOval.property("ADBE Vectors Group").property("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([vignWidth, vignHeight]);
        createOval.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
        createOval.name = "Ellipse";
        vignBase.trackMatteType = TrackMatteType.ALPHA_INVERTED;
        vignAlpha.property("ADBE Effect Parade").addProperty("ADBE Fast Blur");
        if (precompLayers) {
            var precompose_layers = [];
            precompose_layers[0] = vignBase.index;
            precompose_layers[1] = vignAlpha.index;
            var newPreCompName = "Vignette";
            var twoSidedPrecomp = compLayers.precompose(precompose_layers, newPreCompName, true);
            var thisIndex = twoSidedPrecomp.index;
            var twoSidedLayer = currentComp.selectedLayers[0];
            twoSidedLayer.collapseTransformation = true;
            twoSidedLayer.blendingMode = BlendingMode.CLASSIC_COLOR_BURN;
            twoSidedLayer.property("ADBE Transform Group").property("ADBE Opacity").setValue(85);
            var lockPositionExp = "xValue = thisComp.width / 2;\nyValue = thisComp.height / 2;\n \ntransform.position = [xValue, yValue];";
            var turnOnOff = "useColorOn = effect(\"Use Vignette On | Off\")(\"ADBE Checkbox Control-0001\");\nif (useColorOn == 0) {\nvalue = 0;\n} else {\nvalue = value;\n};";
            twoSidedLayer.property("ADBE Transform Group").property("ADBE Position").expression = lockPositionExp;
            if (twoSidedLayer("ADBE Effect Parade") !== null) {
                if (twoSidedLayer("ADBE Effect Parade").canAddProperty("ADBE Slider Control")) {
                    var useVign = twoSidedLayer("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
                    useVign.name = "Use Vignette On | Off";
                    useVign.property("ADBE Checkbox Control-0001").setValue(1);
                    var moveVign = twoSidedLayer("ADBE Effect Parade").addProperty("ADBE Point Control");
                    moveVign.name = "Vignette Position";
                    var featherSlider = twoSidedLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    featherSlider.name = "Vignette Feather";
                    featherSlider.property("ADBE Slider Control-0001").setValue(224);
                    featherSlider.property("ADBE Slider Control-0001").expression = "clamp(value, 0, 9999);";
                    var scaleSlider = twoSidedLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    scaleSlider.name = "Vignette Scale";
                    scaleSlider.property("ADBE Slider Control-0001").setValue(100);
                    var intensitySlider = twoSidedLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    intensitySlider.name = "Vignette Intensity";
                    intensitySlider.property("ADBE Slider Control-0001").setValue(20);
                    intensitySlider.property("ADBE Slider Control-0001").expression = "clamp(value, 0, 100);";
                    var circleChoiceSlider = twoSidedLayer("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
                    circleChoiceSlider.name = "Circle | Ellipse";
                    circleChoiceSlider.property("ADBE Checkbox Control-0001").setValue(0);
                }
            }
            var myIndex = compLayers.length;
            var thisNewName = newPreCompName + " " + myIndex;
            twoSidedLayer.name = thisNewName;
            twoSidedLayer.property("ADBE Transform Group").property("ADBE Opacity").expression = turnOnOff;
            var opacityExp = "opacity = comp(\"" + compName + "\").layer(\"" + thisNewName + "\").effect(\"Vignette Intensity\")(\"ADBE Slider Control-0001\");\n";
            var featherExp = "feather = comp(\"" + compName + "\").layer(\"" + thisNewName + "\").effect(\"Vignette Feather\")(\"ADBE Slider Control-0001\");\n";
            var scaleExp = "re_scale = comp(\"" + compName + "\").layer(\"" + thisNewName + "\").effect(\"Vignette Scale\")(\"ADBE Slider Control-0001\");\n" + "[re_scale, re_scale];";
            var positionExp = "newPos = comp(\"" + compName + "\").layer(\"" + thisNewName + "\").effect(\"Vignette Position\")(\"ADBE Point Control-0001\");\n";
            var useCircleExp = "on_off = comp(\"" + compName + "\").layer(\"" + thisNewName + "\").effect(\"Circle | Ellipse\")(\"ADBE Checkbox Control-0001\");\n" + "if (on_off == 1) {\n" + "value = 100;\n" + "} else {\n" + "value = 0;\n" + "};";
            var useEllipseExp = "on_off = comp(\"" + compName + "\").layer(\"" + thisNewName + "\").effect(\"Circle | Ellipse\")(\"ADBE Checkbox Control-0001\");\n" + "if (on_off == 1) {\n" + "value = 0;\n" + "} else {\n" + "value = 100;\n" + "};";
            twoSidedPrecomp.layer("Vignette BG").property("ADBE Transform Group").property("ADBE Opacity").expression = opacityExp;
            twoSidedPrecomp.layer("Vignette Alpha").property("ADBE Transform Group").property("ADBE Scale").expression = scaleExp;
            twoSidedPrecomp.layer("Vignette Alpha").property("ADBE Transform Group").property("ADBE Position").expression = positionExp;
            twoSidedPrecomp.layer("Vignette Alpha").property("ADBE Effect Parade").property("ADBE Fast Blur").property("ADBE Fast Blur-0001").expression = featherExp;
            twoSidedPrecomp.layer("Vignette Alpha").property("ADBE Root Vectors Group").property(1).property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity").expression = useCircleExp;
            twoSidedPrecomp.layer("Vignette Alpha").property("ADBE Root Vectors Group").property(2).property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity").expression = useEllipseExp;
        }
        app.endUndoGroup();
    }
    function OF_Motion2_stare(){
        if (!OF_Motion2_CheckPrereqs()) {
            return;
        }
        app.beginUndoGroup("Stare");
        var theLayers = app.project.activeItem.selectedLayers;
        for (var num = 0; num < theLayers.length; num += 1) {
            var theLayer = theLayers[num];
            var stareName = theLayer.rotation.name;
            if (theLayer.property("ADBE Effect Parade").property(stareName + " - " + "Stare Target") !== null) {
                return;
            }
            var stareTarget = theLayer.property("ADBE Effect Parade").addProperty("ADBE Layer Control");
            stareTarget.name = stareName + " - " + "Stare Target";
            stareTarget.property("ADBE Layer Control-0001").setValue(0);
            var stareOffset = theLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
            stareOffset.name = stareName + " - " + "Stare Calibrate";
            stareOffset.property("ADBE Slider Control-0001").expression = "clamp(value, -359, 359);";
            stareOffset.property("ADBE Slider Control-0001").setValue(0);
            var stareExp = "calibrate = effect(\"" + stareName + " - Stare Calibrate\")(\"ADBE Slider Control-0001\");\n" + "try {\n" + "\tdiffx = position[0] - effect(\"" + stareName + " - Stare Target\")(\"ADBE Layer Control-0001\")\n" + "\t\t.transform.position[0];\n" + "\tdiffy = position[1] - effect(\"" + stareName + " - Stare Target\")(\"ADBE Layer Control-0001\")\n" + "\t\t.transform.position[1];\n" + "\tif (diffx === 0) {\n" + "\t\tdiffx = 1;\n" + "\t}\n" + "\tsign = 1 + (-1 * (diffx / Math.abs(diffx))) * 90;\n" + "\tradDegExp = 1 + radians_to_degrees(Math.atan(diffy / diffx));\n" + "\tvalue = radDegExp + sign + calibrate;\n" + "} catch (e) {\n" + "\tL = null;\n" + "}\n";
            theLayer.rotation.expression = stareExp;
        }
        app.endUndoGroup();
    }
    function OF_Motion2_warp(){
        var i = 0;
        if (!OF_Motion2_CheckPrereqs()) {
            return;
        }
        app.beginUndoGroup("Warp");
        var theLayers = app.project.activeItem.selectedLayers;
        for (var num = 0; num < theLayers.length; num += 1) {
            var theLayer = theLayers[num];
            if (theLayer.property("ADBE Effect Parade").property("Warp Time") !== null) {
                continue;
            }
            var addWarp = theLayer.property("ADBE Effect Parade").addProperty("ADBE Echo");
            addWarp.name = "Warp Time";
            addWarp.property("ADBE Echo-0001").setValue(-0.006);
            addWarp.property("ADBE Echo-0002").setValue(16);
            addWarp.property("ADBE Echo-0005").setValue(2);
            var addEdgeSmooth = theLayer.property("ADBE Effect Parade").addProperty("ADBE Matte Choker");
            addEdgeSmooth.name = "Edge Smooth";
            addEdgeSmooth.property("ADBE Matte Choker-0001").setValue(24.5);
            addEdgeSmooth.property("ADBE Matte Choker-0002").setValue(66);
            var addObjectSmooth = theLayer.property("ADBE Effect Parade").addProperty("ADBE Simple Choker");
            addObjectSmooth.name = "Object Crush";
            addObjectSmooth.property("ADBE Simple Choker-0002").setValue(12);
        }
        app.endUndoGroup();
    }
    function OF_Motion2_rope(){
        var mainComp = app.project.activeItem;
        if (!mainComp || !(mainComp instanceof CompItem)) {
            return;
        }
        app.beginUndoGroup("Rope");
        var proj = app.project;
        var currentComp = app.project.activeItem;
        var compName = currentComp.name;
        var compLayers = currentComp.layers;
        var myLayers = currentComp.selectedLayers;
        var layer1 = myLayers[0];
        var layer2 = myLayers[1];
        var layer1Value = 0;
        var layer2Value = 0;
        if (myLayers.length >= 2) {
            layer1Value = layer1.index;
            layer2Value = layer2.index;
        } else {
            layer1Value = 0;
            layer2Value = 0;
        }
        var newBeamName = "Rope";
        var beamWidth = app.project.activeItem.width;
        var beamHeight = app.project.activeItem.height;
        var beam = app.project.activeItem.layers.addSolid([0.298, 0.811, 0.878], "Rope", beamWidth, beamHeight, app.project.activeItem.pixelAspect);
        beam.name = newBeamName;
        beam.label = 8;
        beam.moveToEnd();
        beam.shy = true;
        var beamEffect = beam.property("ADBE Effect Parade").addProperty("ADBE Laser");
        beamEffect.name = newBeamName + " - " + "Controls";
        beamEffect.property("ADBE Laser-0003").setValue(1);
        beamEffect.property("ADBE Laser-0005").setValue(2.5);
        beamEffect.property("ADBE Laser-0006").setValue(2.5);
        beamEffect.property("ADBE Laser-0007").setValue(0);
        beamEffect.property("ADBE Laser-0008").setValue([1, 1, 1, 1]);
        beamEffect.property("ADBE Laser-0009").setValue([1, 1, 1, 1]);
        var beamStart = beam.property("ADBE Effect Parade").addProperty("ADBE Layer Control");
        beamStart.name = newBeamName + " - " + "Start";
        beamStart.property("ADBE Layer Control-0001").setValue(layer1Value);
        var beamEnd = beam.property("ADBE Effect Parade").addProperty("ADBE Layer Control");
        beamEnd.name = newBeamName + " - " + "End";
        beamEnd.property("ADBE Layer Control-0001").setValue(layer2Value);
        var beamStartExp = "try {\n\ttarget = effect(\"" + newBeamName + " - Start\")(\"ADBE Layer Control-0001\");\n" + "\tfromComp(target.toComp(target.anchorPoint));\n" + "} catch (e$$4) {\n" + "    value = value; \n" + "}";
        var beamEndExp = "try {\n\ttarget = effect(\"" + newBeamName + " - End\")(\"ADBE Layer Control-0001\");\n" + "\tfromComp(target.toComp(target.anchorPoint));\n" + "} catch (e$$4) {\n" + "    value = value; \n" + "}";
        var layerLockExp = "xValue = thisComp.width / 2;\nyValue = thisComp.height / 2;\n \ntransform.position = [xValue, yValue];";
        beam.property("ADBE Effect Parade").property("ADBE Laser").property("ADBE Laser-0001").expression = beamStartExp;
        beam.property("ADBE Effect Parade").property("ADBE Laser").property("ADBE Laser-0002").expression = beamEndExp;
        beam.property("ADBE Transform Group").property("ADBE Position").expression = layerLockExp;
        app.endUndoGroup();
    }
    //============ KeyFast ==========//
    var slideAmountX,slideAmountY;
    var slideAmount = 500;
    var rotateBonus = 180;
    var myTimeBonusAmount=1
    var overshootCheckBoxAmount=0
    easeIn = new KeyframeEase(0, 10);
    easeOut = new KeyframeEase(0, 90);
    function OF_Keyfast_move(direct){
        myComp = app.project.activeItem;
        myTime = myComp.time;
        myLayer = myComp.selectedLayers;
        moveDirection = 5;
        fullSlide = false;
        if (myLayer.length < 1) {
            alert("Please select 1 or more layers");
        }
        slideAmountX = slideAmount;
        slideAmountY = slideAmount;
        if (direct == 3 || direct == 2) {
            slideAmountY = 0;
        }else{
            slideAmountX = 0;
        }
        if (direct == 3) {
            moveDirection = 1;
        }
        if (direct == 2) {
            moveDirection = -1;
        }
        if (direct == 1) {
            moveDirection = 2;
        }
        if (direct == 0) {
            moveDirection = 3;
        }
        app.beginUndoGroup("Move");
        log("OF_Keyfast_move, direct="+direct+" moveDirection="+moveDirection)
        log("OF_Keyfast_move, myLayer.length "+myLayer.length)
        for (i = 0; i < myLayer.length; i = i + 1) {
            if (direct == 3 || direct == 2) {
                slideDirection(i, myTime, slideAmountX, slideAmountY, 0, myLayer, moveDirection);
                log("OF_Keyfast_move: slideDirection")
                
            }else{
                slideDirection(i, myTime, slideAmountX, slideAmountY, 0, myLayer, moveDirection);
                log("OF_Keyfast_move: slideDirection")
            }
            log("OF_Keyfast_move"+myLayer[i]+","+myTime+","+slideAmountY+","+slideAmountX+","+moveDirection)
            easePlacedKeyframes(myLayer[i], myTime, slideAmountY, slideAmountX, moveDirection);
            if (myLayer[i].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == false) {
                myFirstKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(myTime);
                mySecondKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(myTime + myTimeBonusAmount);
                myOvershootKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(Number(myTime + myTimeBonusAmount));
                log("OF_Keyfast_move: linearKeys")
                linearKeys(myLayer, i, myFirstKeyframe, mySecondKeyframe, myOvershootKeyframe, fullSlide);
                log("OF_Keyfast_move: linearKeys done")
            }
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        app.endUndoGroup();
    }
    function linearKeys(passedLayer, passedNumber, keyOne, keyTwo, overshootKey) {
        try {
            passedLayer[passedNumber].property("ADBE Transform Group").property("ADBE Position").setSpatialTangentsAtKey(keyOne, [0, 0, 0], [0, 0, 0]);
            passedLayer[passedNumber].property("ADBE Transform Group").property("ADBE Position").setSpatialTangentsAtKey(keyTwo, [0, 0, 0], [0, 0, 0]);
        } catch (err) {
            alert(err.toString());
        }
    }
    function easePlacedKeyframes(layer, time, slideY, slideX, direction) {
        log("easePlacedKeyframes() 1r")
        if (layer.property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == false) {
            log("easePlacedKeyframes() 1a")
            myFirstKeyframe = layer.property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(time);
            mySecondKeyframe = layer.property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(time + myTimeBonusAmount);
            layer.property("ADBE Transform Group").property("ADBE Position").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
            layer.property("ADBE Transform Group").property("ADBE Position").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
            log("easePlacedKeyframes() 1b")
        }
        log("easePlacedKeyframes() 1d 2r")
        if (slideY !== 0) {
            log("easePlacedKeyframes() 2a")
            if (layer.property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == true) {
                myFirstKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_1").nearestKeyIndex(time);
                mySecondKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_1").nearestKeyIndex(time + myTimeBonusAmount);
                layer.property("ADBE Transform Group").property("ADBE Position_1").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
                layer.property("ADBE Transform Group").property("ADBE Position_1").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
            }
            log("easePlacedKeyframes() 2b")
        }
        log("easePlacedKeyframes() 2d 3r")
        if (direction == -1 || direction == 1) {
            log("easePlacedKeyframes() 3a")
            if (layer.property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == true) {
                myFirstKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_0").nearestKeyIndex(time);
                mySecondKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_0").nearestKeyIndex(time + myTimeBonusAmount);
                layer.property("ADBE Transform Group").property("ADBE Position_0").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
                layer.property("ADBE Transform Group").property("ADBE Position_0").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
            }
            log("easePlacedKeyframes() 3b")
        }
        log("easePlacedKeyframes() done")
    }
    function findOvershoot(layer, theTime, direction, fullSlideValue, layerNumKeys, commandCheck) {
        log("findOvershoot")
        myComp = app.project.activeItem;
        if (layer.property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == false) {
            firstLayerXPosition = layer.property("ADBE Transform Group").property("ADBE Position").value[0];
            firstLayerYPosition = layer.property("ADBE Transform Group").property("ADBE Position").value[1];
            layerPositions = layer.property("ADBE Transform Group").property("ADBE Position").valueAtTime(Number(theTime) + Number(myTimeBonusAmount), false);
            layerXPosition = layerPositions[0];
            layerYPosition = layerPositions[1];
            differenceX = layerXPosition - firstLayerXPosition;
            differenceY = layerYPosition - firstLayerYPosition;
            overshootXPosition = differenceX * (overshootAmount / 100);
            overshootYPosition = differenceY * (overshootAmount / 100);
            overshootTime = (myTimeBonusAmount / 3) * 2;
            if (fullSlideValue == false && direction == 1 || direction == -1) {
                layer.property("ADBE Transform Group").property("ADBE Position").setValueAtTime(theTime + overshootTime, [layerXPosition, layerYPosition] + [overshootXPosition, 0]);
            }
            if (fullSlideValue == false && direction == 2 || direction == 3) {
                layer.property("ADBE Transform Group").property("ADBE Position").setValueAtTime(theTime + overshootTime, [layerXPosition, layerYPosition] + [0, overshootYPosition]);
            }
            if (fullSlideValue == true && direction == 1 || direction == -1) {
                if (layerNumKeys === 0 && commandCheck == 0) {
                    layer.property("ADBE Transform Group").property("ADBE Position").setValueAtTime(theTime + overshootTime, [layerXPosition, layerYPosition] + [overshootXPosition, 0]);
                } else {
                    layer.property("ADBE Transform Group").property("ADBE Position").setValueAtTime(theTime + overshootTime, [firstLayerXPosition, firstLayerYPosition] - [overshootXPosition, 0]);
                }
            }
            if (fullSlideValue == true && direction == 2 || direction == 3) {
                if (layerNumKeys === 0 && commandCheck == 0) {
                    layer.property("ADBE Transform Group").property("ADBE Position").setValueAtTime(theTime + overshootTime, [layerXPosition, layerYPosition] + [0, overshootYPosition]);
                } else {
                    layer.property("ADBE Transform Group").property("ADBE Position").setValueAtTime(theTime + overshootTime, [firstLayerXPosition, firstLayerYPosition] - [0, overshootYPosition]);
                }
            }
            myOvershootKeyframe = layer.property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(Number(theTime + overshootTime));
            layer.property("ADBE Transform Group").property("ADBE Position").setTemporalEaseAtKey(myOvershootKeyframe, [easeIn], [easeOut]);
        }
        if (layer.property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == true) {
            firstLayerXPosition = layer.property("ADBE Transform Group").property("ADBE Position_0").value;
            firstLayerYPosition = layer.property("ADBE Transform Group").property("ADBE Position_1").value;
            layerPositions = layer.property("ADBE Transform Group").property("ADBE Position").valueAtTime(Number(theTime) + Number(myTimeBonusAmount), false);
            layerXPosition = layerPositions[0];
            layerYPosition = layerPositions[1];
            differenceX = layerXPosition - firstLayerXPosition;
            differenceY = layerYPosition - firstLayerYPosition;
            overshootXPosition = differenceX * (overshootAmount / 100);
            overshootYPosition = differenceY * (overshootAmount / 100);
            overshootTime = (myTimeBonusAmount / 3) * 2;
            if (fullSlideValue == false && direction == 1 || direction == -1) {
                layer.property("ADBE Transform Group").property("ADBE Position_0").setValueAtTime(theTime + overshootTime, layerXPosition + overshootXPosition);
            }
            if (fullSlideValue == false && direction == 2 || direction == 3) {
                layer.property("ADBE Transform Group").property("ADBE Position_1").setValueAtTime(theTime + overshootTime, layerYPosition + overshootYPosition);
            }
            if (fullSlideValue == true && Number(direction) == 1 || Number(direction) == -1) {
                if (layerNumKeys === 0 && commandCheck == 0) {
                    layer.property("ADBE Transform Group").property("ADBE Position_0").setValueAtTime(theTime + overshootTime, layerXPosition + overshootXPosition);
                } else {
                    layer.property("ADBE Transform Group").property("ADBE Position_0").setValueAtTime(theTime + overshootTime, firstLayerXPosition - overshootXPosition);
                }
                myOvershootKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_0").nearestKeyIndex(Number(theTime + overshootTime));
                layer.property("ADBE Transform Group").property("ADBE Position_0").setTemporalEaseAtKey(myOvershootKeyframe, [easeIn], [easeOut]);
            }
            if (fullSlideValue == true && Number(direction) == 2 || Number(direction) == 3) {
                if (layerNumKeys === 0 && commandCheck == 0) {
                    layer.property("ADBE Transform Group").property("ADBE Position_1").setValueAtTime(theTime + overshootTime, layerYPosition + overshootYPosition);
                } else {
                    layer.property("ADBE Transform Group").property("ADBE Position_1").setValueAtTime(theTime + overshootTime, firstLayerYPosition - overshootYPosition);
                }
            }
            if (direction == 1 || direction == -1) {
                myOvershootKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_0").nearestKeyIndex(Number(theTime + overshootTime));
                layer.property("ADBE Transform Group").property("ADBE Position_0").setTemporalEaseAtKey(myOvershootKeyframe, [easeIn], [easeOut]);
            } else {
                myOvershootKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_1").nearestKeyIndex(Number(theTime + overshootTime));
                layer.property("ADBE Transform Group").property("ADBE Position_1").setTemporalEaseAtKey(myOvershootKeyframe, [easeIn], [easeOut]);
            }
        }
    }
    function slideDirection(num, time, slideX, slideY, command, layer, direction) {
        log("slideDirection num="+num)
        log("slideDirection time="+time)
        log("slideDirection slideX="+slideX)
        log("slideDirection slideY="+slideY)
        log("slideDirection command="+command)
        // log("slideDirection layer="+layer)
        log("slideDirection direction="+direction)
        var posValue;
        if (layer[num].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == false && direction == 1 || direction == -1) {
            posValue = layer[num].property("ADBE Transform Group").property("ADBE Position").value;
            position = layer[num].property("ADBE Transform Group").property("ADBE Position");
            if (position.numKeys >= 1 || command == 1) {
                position.setValueAtTime(time, posValue);
                position.setValueAtTime(time + myTimeBonusAmount, posValue + [slideX * direction, slideY]);
            } else {
                position.setValueAtTime(time, posValue + [-slideX * direction, slideY]);
                position.setValueAtTime(time + myTimeBonusAmount, posValue);
            }
        }
        log("slideDirection 1r")
        if (layer[num].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == true && direction == 1 || direction == -1) {
            log("slideDirection 1a")
            positionValueX = layer[num].property("ADBE Transform Group").property("ADBE Position_0").value;
            positionX = layer[num].property("ADBE Transform Group").property("ADBE Position_0");
            if (positionX.numKeys >= 1 || command == 1) {
                positionX.setValueAtTime(time, positionValueX);
                positionX.setValueAtTime(time + myTimeBonusAmount, positionValueX + (slideX * direction));
            } else {
                positionX.setValueAtTime(time + myTimeBonusAmount, positionValueX);
                positionX.setValueAtTime(time, positionValueX + (-slideX * direction));
            }
            log("slideDirection 1b")
        }
        log("slideDirection 1d 2r")
        if (direction == 2) {
            directionMultiple = 1;
        }
        if (direction == 3) {
            directionMultiple = -1;
        }
        log("slideDirection 2d 3r")
        if (layer[num].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == false && direction == 2 || direction == 3) {
            // log("slideDirection 3a layer.length ="+layer.length+" ")
            // log("slideDirection 3a layer[0].name ="+layer[0].name)
            // log("slideDirection 3a layer[num].property(1) ="+objInside(layer[num].property("ADBE Transform Group")))
            // log("slideDirection 3a layer[num].property(2) ="+objInside(layer[num].property("ADBE Transform Group").property("ADBE Position").value))
            // log("slideDirection 3a  posValue:"+layer[num].property("ADBE Transform Group").property("ADBE Position").value)
            // log("slideDirection 3a  posValue length:"+layer[num].property("ADBE Transform Group").property("ADBE Position").value.length)
            // log("slideDirection 3a  posValue[0]:"+layer[num].property("ADBE Transform Group").property("ADBE Position").value[0])
            // log("slideDirection 3a  posValue[1]:"+layer[num].property("ADBE Transform Group").property("ADBE Position").value[1])
            // log("slideDirection 3a  posValue[2]:"+layer[num].property("ADBE Transform Group").property("ADBE Position").value[2])
            // var tmp=[layer[num].property("ADBE Transform Group").property("ADBE Position").value[0],layer[num].property("ADBE Transform Group").property("ADBE Position").value[1],layer[num].property("ADBE Transform Group").property("ADBE Position").value[2]]
            // log("slideDirection 3a layer[num].property(2) ="+objInside(layer[num].property("ADBE Transform Group").property("ADBE Position").value))
            // var tmp=objInside(layer[num].property("ADBE Transform Group").property("ADBE Position").value)
            // log("tmp="+tmp+"=  tmp.length="+tmp.length)
            // tmp=tmp.split(",")
            // log("tmp="+tmp+"=  tmp.length="+tmp.length)
            try{
            posValue = layer[num].property("ADBE Transform Group").property("ADBE Position").value;
            position = layer[num].property("ADBE Transform Group").property("ADBE Position");
            log("slideDirection 3a : posValue="+posValue+" position="+position)
            if (position.numKeys >= 1 || command == 1) {
                position.setValueAtTime(time, posValue);
                position.setValueAtTime(time + myTimeBonusAmount, posValue + [slideX, slideY * directionMultiple]);
            } else {
                position.setValueAtTime(time, posValue + [slideX, -slideY * directionMultiple]);
                position.setValueAtTime(time + myTimeBonusAmount, posValue);
            }
            }catch(e){log(e)}
            log("slideDirection 3b")
        }
        log("slideDirection 3d 4r")

        if (layer[num].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == true && direction == 2 || direction == 3) {
            log("slideDirection 4a")
            positionValueY = layer[num].property("ADBE Transform Group").property("ADBE Position_1").value;
            positionY = layer[num].property("ADBE Transform Group").property("ADBE Position_1");
            if (positionY.numKeys >= 1 || command == 1) {
                log("slideDirection 41a")
                positionY.setValueAtTime(time, positionValueY);
                positionY.setValueAtTime(time + myTimeBonusAmount, positionValueY + (slideY * directionMultiple));
                log("slideDirection 41b")
            } else {
                log("slideDirection 42a")
                positionY.setValueAtTime(time + myTimeBonusAmount, positionValueY);
                positionY.setValueAtTime(time, positionValueY + (-slideY * directionMultiple));
                log("slideDirection 42b")
            }
            log("slideDirection 4b")
        }
        log("slideDirection done")
        
    }
    function OF_Keyfast_fadeIn() {
        myComp = app.project.activeItem;
        myTime = myComp.time;
        myLayer = myComp.selectedLayers;
        if (myLayer.length < 1) {
            alert("Please select 1 or more layers");
        }
        app.beginUndoGroup("Fade in");
        for (i = 0; i < myLayer.length; i = i + 1) {
            if (myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").value === 0) {
                myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(myTime, 100);
            }
            myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(myTime + myTimeBonusAmount, [myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").value]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(myTime, 0);
            myFirstKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").nearestKeyIndex(myTime);
            mySecondKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").nearestKeyIndex(myTime + myTimeBonusAmount);
            myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        app.endUndoGroup();
    }
    function OF_Keyfast_fadeOut() {
        myComp = app.project.activeItem;
        myTime = myComp.time;
        myLayer = myComp.selectedLayers;
        if (myLayer.length < 1) {
            alert("Please select 1 or more layers");
        }
        app.beginUndoGroup("Fade out");
        for (i = 0; i < myLayer.length; i = i + 1) {
            myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(myTime, [myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").value]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(myTime + myTimeBonusAmount, 0);
            myFirstKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").nearestKeyIndex(myTime);
            mySecondKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").nearestKeyIndex(myTime + myTimeBonusAmount);
            myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Opacity").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        app.endUndoGroup();
    }
    function OF_Keyfast_scaleUp() {
        myComp = app.project.activeItem;
        myTime = myComp.time;
        myLayer = myComp.selectedLayers;
        if (myLayer.length < 1) {
            alert("Please select 1 or more layers");
        }
        app.beginUndoGroup("Scale");
        // log("OF_Keyfast_scaleUp(): myLayer.length: "+myLayer.length)
        for (i = 0; i < myLayer.length; i = i + 1) {
            // log("OF_Keyfast_scaleUp(): for")
            currentObjectWidth = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[0];
            currentObjectHeight = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[1];
            // log("OF_Keyfast_scaleUp(): for if 1r")
            if (currentObjectHeight > 0 || currentObjectWidth > 0 || currentObjectHeight < 0 || currentObjectWidth < 0) {
                log("OF_Keyfast_scaleUp(): for if 1a")
                myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime, [0, 0]);
                myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime + myTimeBonusAmount, [currentObjectWidth, currentObjectHeight]);
                log("OF_Keyfast_scaleUp(): for if 1b")
            }
            // log("OF_Keyfast_scaleUp(): for if 2r")
            if (currentObjectHeight === 0 || currentObjectWidth === 0) {
                log("OF_Keyfast_scaleUp(): for if 2a")
                myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime, [0, 0]);
                myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime + myTimeBonusAmount, [100, 100]);
                log("OF_Keyfast_scaleUp(): for if 2b")
            }
            // log("OF_Keyfast_scaleUp(): for if 3r")
            if (overshootCheckBoxAmount == 1) {
                // log("OF_Keyfast_scaleUp(): for if 3a")
                myComp.time = myTime + myTimeBonusAmount;
                currentObjectWidth = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[0];
                currentObjectHeight = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[1];
                fullSize = [currentObjectWidth, currentObjectHeight];
                overshootSize = fullSize + (fullSize * (overshootAmount / 100));
                myComp.time = myTime;
                overshootTime = (myTimeBonusAmount / 3) * 2;
                myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime + overshootTime, overshootSize);
                myBonusKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").nearestKeyIndex(myTime + overshootTime);
                myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setTemporalEaseAtKey(myBonusKeyframe, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
                // log("OF_Keyfast_scaleUp(): for if 3b")
            }
            // log("OF_Keyfast_scaleUp(): for if 3d")
            myFirstKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").nearestKeyIndex(myTime);
            mySecondKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").nearestKeyIndex(myTime + myTimeBonusAmount);
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setTemporalEaseAtKey(myFirstKeyframe, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setTemporalEaseAtKey(mySecondKeyframe, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
            // log("OF_Keyfast_scaleUp(): for")
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        app.endUndoGroup();
    }
    function OF_Keyfast_scaleDown() {
        myComp = app.project.activeItem;
        myTime = myComp.time;
        myLayer = myComp.selectedLayers;
        app.beginUndoGroup("Scale down");
        if (myLayer.length < 1) {
            alert("Please select 1 or more layers");
        }
        for (i = 0; i < myLayer.length; i = i + 1) {
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime, [myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[0], myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[1]]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime + myTimeBonusAmount, [0, 0]);
            if (overshootCheckBoxAmount == "true") {
                currentObjectWidth = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[0];
                currentObjectHeight = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[1];
                fullSize = [currentObjectWidth, currentObjectHeight];
                overshootSize = fullSize + (fullSize * (overshootAmount / 100));
                overshootTime = (myTimeBonusAmount / 3) * 2;
                myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime + overshootTime, overshootSize);
                myBonusKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").nearestKeyIndex(myTime + overshootTime);
                myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setTemporalEaseAtKey(myBonusKeyframe, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
            }
            myFirstKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").nearestKeyIndex(myTime);
            mySecondKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").nearestKeyIndex(myTime + myTimeBonusAmount);
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setTemporalEaseAtKey(myFirstKeyframe, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setTemporalEaseAtKey(mySecondKeyframe, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        app.endUndoGroup();
    }
    function OF_Keyfast_rotateLeft() {
        myComp = app.project.activeItem;
        myTime = myComp.time;
        myLayer = myComp.selectedLayers;
        if (myLayer.length < 1) {
            alert("Please select 1 or more layers");
        }
        app.beginUndoGroup("rotate left");
        for (i = 0; i < myLayer.length; i = i + 1) {
            myRotation = Number(myLayer[i].property("ADBE Transform Group").property("Rotation").value);
            if (myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").numKeys < 1) {
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime, myRotation + rotateBonus);
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime + myTimeBonusAmount, myRotation);
            } else {
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime, myRotation);
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime + myTimeBonusAmount, myRotation - rotateBonus);
            }
            if (overshootCheckBoxAmount == "true") {
                startRotation = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").value;
                myComp.time = myTime + myTimeBonusAmount;
                endRotation = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").value;
                rotationDifference = startRotation - endRotation;
                overshootRotation = endRotation - (rotationDifference * (overshootAmount / 100));
                myComp.time = myTime;
                overshootTime = (myTimeBonusAmount / 3) * 2;
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime + overshootTime, overshootRotation);
                myBonusKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").nearestKeyIndex(myTime + overshootTime);
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setTemporalEaseAtKey(myBonusKeyframe, [easeIn], [easeOut]);
            }
            myFirstKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").nearestKeyIndex(myTime);
            mySecondKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").nearestKeyIndex(myTime + myTimeBonusAmount);
            myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        app.endUndoGroup();
    }
    function OF_Keyfast_rotateRight() {
        myComp = app.project.activeItem;
        myTime = myComp.time;
        myLayer = myComp.selectedLayers;
        if (myLayer.length < 1) {
            alert("Please select 1 or more layers");
        }
        app.beginUndoGroup("rotate right");
        for (i = 0; i < myLayer.length; i = i + 1) {
            myRotation = myLayer[i].property("ADBE Transform Group").property("Rotation").value;
            if (myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").numKeys < 1) {
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime, myRotation - rotateBonus);
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime + myTimeBonusAmount, myRotation);
            } else {
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime, myRotation);
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime + myTimeBonusAmount, myRotation + rotateBonus);
            }
            if (overshootCheckBoxAmount == "true") {
                startRotation = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").value;
                myComp.time = myTime + myTimeBonusAmount;
                endRotation = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").value;
                rotationDifference = endRotation - startRotation;
                overshootRotation = endRotation + (rotationDifference * (overshootAmount / 100));
                myComp.time = myTime;
                overshootTime = (myTimeBonusAmount / 3) * 2;
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(myTime + overshootTime, overshootRotation);
                myBonusKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").nearestKeyIndex(myTime + overshootTime);
                myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setTemporalEaseAtKey(myBonusKeyframe, [easeIn], [easeOut]);
            }
            myFirstKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").nearestKeyIndex(myTime);
            mySecondKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").nearestKeyIndex(myTime + myTimeBonusAmount);
            myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Rotate Z").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        app.endUndoGroup();
    }
    function OF_Keyfast_timeReverse(){
        myComp = app.project.activeItem;
        myLayer = myComp.selectedLayers;
        if (myLayer.length < 1) {
            alert("Please select 2 or more keyframes to use time reverse on.");
        }
        app.executeCommand(3693);
        // easeKeyframes();
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
    }
    function OF_Keyfast_cloneKeys() {
        function firstKey(inputLayers) {
            if (inputLayers.length === undefined) {
                inputLayers = [inputLayers];
            }
            timesArray = [];
            for (y = 0; y < inputLayers.length; y = y + 1) {
                thisLayer = inputLayers[y];
                for (p = 0; p < thisLayer.selectedProperties.length; p = p + 1) {
                    selProp = thisLayer.selectedProperties[p];
                    if (selProp.selectedKeys === undefined) {
                        continue;
                    }
                    for (k = 0; k < selProp.selectedKeys.length; k = k + 1) {
                        keyTime = selProp.keyTime(selProp.selectedKeys[k]);
                        timesArray.push(keyTime);
                    }
                }
            }
            timesArray.sort(function(a, b) {
                return a - b;
            });
            return timesArray[0];
        }

        function eC(commandCode) {
            app.executeCommand(commandCode);
        }
        app.beginUndoGroup("Clone Keyframes");
        // counter();
        // if (operatingSystemCheck == 1) {
        //     if (ScriptUI.environment.keyboardState.metaKey === true) {
        //         alignKeyframes();
        //         return;
        //     }
        // } else {
        //     if (ScriptUI.environment.keyboardState.ctrlKey === true) {
        //         alignKeyframes();
        //         return;
        //     }
        // }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        myComp = app.project.activeItem;
        myLayers = myComp.selectedLayers;
        curTime = myComp.time;
        myProps = [];
        myKeys = [];
        pasteTimes = [];
        pasteDistance = myComp.time - firstKey(myLayers);
        newProps = [];
        newKeys = [];
        for (i = 0; i < myLayers.length; i = i + 1) {
            thisLayer = myLayers[i];
            if (thisLayer.selectedProperties.length === 0) {
                continue;
            }
            foundFirst = firstKey(thisLayer);
            if (foundFirst === undefined) {
                foundFirst = curTime;
            }
            pasteTimes.push(foundFirst + pasteDistance);
            myProps.push(thisLayer.selectedProperties);
            layerArrayForKeys = [];
            for (p = 0; p < thisLayer.selectedProperties.length; p = p + 1) {
                selProp = thisLayer.selectedProperties[p];
                layerArrayForKeys.push(selProp.selectedKeys);
            }
            myKeys.push(layerArrayForKeys);
        }
        app.executeCommand(2004);
        for (m = 0; m < myProps.length; m = m + 1) {
            thisLayersProps = myProps[m];
            for (p = 0; p < thisLayersProps.length; p = p + 1) {
                thisProp = thisLayersProps[p];
                selKeys = myKeys[m][p];
                if (selKeys === undefined) {
                    continue;
                } else {
                    for (k = 0; k < selKeys.length; k = k + 1) {
                        thisProp.setSelectedAtKey(selKeys[k], true);
                    }
                }
            }
            myComp.time = pasteTimes[m];
            eC(19);
            eC(20);
            for (i = 0; i < myComp.selectedProperties.length; i = i + 1) {
                prop = myComp.selectedProperties[i];
                if (prop.numKeys > 0 && prop.selectedKeys.length > 0) {
                    newProps.push(prop);
                    newKeys.push(prop.selectedKeys);
                }
            }
            eC(2004);
        }
        for (p = 0; p < newProps.length; p = p + 1) {
            for (k = 0; k < newKeys[p].length; k = k + 1) {
                newProps[p].setSelectedAtKey(newKeys[p][k], true);
            }
        }
        myComp.time = curTime;
        noKeys = 0;
        for (zz = 0; zz < myLayers.length; zz = zz + 1) {
            myLayers[zz].selected = true;
            if (myLayers[zz].selectedProperties.length > 0) {
                noKeys = noKeys + 1;
            }
        }
        if (noKeys === 0) {
            alert("Please select some keyframes to clone. :)");
        } else {
            for (zz = 0; zz < myLayers.length; zz = zz + 1) {
                myLayers[zz].selected = true;
            }
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        app.endUndoGroup();
    }
    function alignKeyframes() {
        function firstKey(inputLayers) {
            if (inputLayers.length === undefined) {
                inputLayers = [inputLayers];
            }
            for (y = 0; y < inputLayers.length; y = y + 1) {
                thisLayer = inputLayers[y];
                for (p = 0; p < thisLayer.selectedProperties.length; p = p + 1) {
                    selProp = thisLayer.selectedProperties[p];
                    if (selProp.selectedKeys === undefined) {
                        continue;
                    }
                    for (k = 0; k < selProp.selectedKeys.length; k = k + 1) {

                    }
                }
            }
        }

        function eC(commandCode) {
            app.executeCommand(commandCode);
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
        myComp = app.project.activeItem;
        myLayers = myComp.selectedLayers;
        curTime = myComp.time;
        myProps = [];
        myKeys = [];
        newProps = [];
        newKeys = [];
        for (i = 0; i < myLayers.length; i = i + 1) {
            thisLayer = myLayers[i];
            if (thisLayer.selectedProperties.length === 0) {
                continue;
            }
            foundFirst = firstKey(thisLayer);
            myProps.push(thisLayer.selectedProperties);
            layerArrayForKeys = [];
            for (p = 0; p < thisLayer.selectedProperties.length; p = p + 1) {
                selProp = thisLayer.selectedProperties[p];
                layerArrayForKeys.push(selProp.selectedKeys);
            }
            myKeys.push(layerArrayForKeys);
        }
        app.executeCommand(2004);
        for (m = 0; m < myProps.length; m = m + 1) {
            thisLayersProps = myProps[m];
            for (p = 0; p < thisLayersProps.length; p = p + 1) {
                thisProp = thisLayersProps[p];
                selKeys = myKeys[m][p];
                if (selKeys === undefined) {
                    continue;
                } else {
                    for (k = 0; k < selKeys.length; k = k + 1) {
                        thisProp.setSelectedAtKey(selKeys[k], true);
                    }
                }
                eC(19);
                eC(18);
                eC(20);
                eC(2004);
            }
            for (i = 0; i < myComp.selectedProperties.length; i = i + 1) {
                prop = myComp.selectedProperties[i];
                if (prop.numKeys > 0 && prop.selectedKeys.length > 0) {
                    newProps.push(prop);
                    newKeys.push(prop.selectedKeys);
                }
            }
            eC(2004);
        }
        for (p = 0; p < newProps.length; p = p + 1) {
            for (k = 0; k < newKeys[p].length; k = k + 1) {
                newProps[p].setSelectedAtKey(newKeys[p][k], true);
            }
        }
        for (m = 0; m < myProps.length; m = m + 1) {
            thisLayersProps = myProps[m];
            for (p = 0; p < thisLayersProps.length; p = p + 1) {
                thisProp = thisLayersProps[p];
                selKeys = myKeys[m][p];
                if (selKeys === undefined) {
                    continue;
                } else {
                    for (k = 0; k < selKeys.length; k = k + 1) {
                        thisProp.setSelectedAtKey(selKeys[k], true);
                    }
                }
            }
        }
        for (zz = 0; zz < myLayers.length; zz = zz + 1) {
            myLayers[zz].selected = true;
        }
        noKeys = 0;
        for (zz = 0; zz < myLayers.length; zz = zz + 1) {
            if (myLayers[zz].selectedProperties.length > 0) {
                noKeys = noKeys + 1;
            }
        }
        if (noKeys === 0) {
            alert("Please select some keyframes to align. :)");
        }
        if (app.activeViewer.type == ViewerType.VIEWER_COMPOSITION) {
            app.activeViewer.setActive();
        }
    }
    //============ 脚本管理器 ==========//
    function rd_ScriptLauncher_doSelectFolder() {
        var folder = Folder.selectDialog("选择AE脚本文件夹");
        if (folder != null) {
            rd_ScriptLauncherData.scriptPath = folder;
            log(folder.fsName)
            app.settings.saveSetting("redefinery", "rd_ScriptLauncher_scriptPath", folder.fsName);
            rd_ScriptLauncher_buildScriptsList(scriptManagerObj);
        }
    }
    function rd_ScriptLauncher_doRefreshList() {
        log(app.settings.getSetting("redefinery", "rd_ScriptLauncher_scriptPath"))
        rd_ScriptLauncher_buildScriptsList(scriptManagerObj);
    }
    function rd_ScriptLauncher_doRun() {
        var scriptSelected = scriptManagerObj.tlistBox.selection != null;
        if (scriptSelected) {
            var scriptIndex = scriptManagerObj.tlistBox.selection.index;
            var scriptFile = new File(rd_ScriptLauncherData.scriptFiles[scriptIndex].absoluteURI);
            if (scriptFile.exists) {
                $.evalFile(scriptFile)
            } else {
                alert("无法找到选定的脚本.", "脚本管理器")
            }
        }
    }
    function rd_ScriptLauncher_sortByName(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    }
    function rd_ScriptLauncher_getAEScripts(path) {
        var pathFiles = path.getFiles();
        var files = new Array();
        pathFiles.sort(rd_ScriptLauncher_sortByName);
        for (var i = 0; i < pathFiles.length; i += 1) {
            if (pathFiles[i] instanceof Folder) {
                if (pathFiles[i].name.match(/^\(.*\)$/)) {
                    continue;
                } else {
                    subfiles = rd_ScriptLauncher_getAEScripts(pathFiles[i]);
                    for (var j = 0; j < subfiles.length; j += 1) {
                        files[files.length] = subfiles[j]
                    }
                }
            } else {
                if (pathFiles[i].name.match(/\.(js|jsx|jsxbin)$/) && pathFiles[i].fsName != File($.fileName).fsName) {
                    files[files.length] = pathFiles[i]
                }
            }
        }
        return files;
    }
    function rd_ScriptLauncher_buildScriptsList(scriptManagerObj) {
        scriptManagerObj.tlistBox.removeAll();
        rd_ScriptLauncherData.scriptFiles = rd_ScriptLauncher_getAEScripts(rd_ScriptLauncherData.scriptPath);
        for (var i = 0; i < rd_ScriptLauncherData.scriptFiles.length; i += 1) {
            fullName = rd_ScriptLauncherData.scriptFiles[i].fsName;
            iconFile = File(fullName.replace(/.(js|jsx|jsxbin)$/, ".png"));
            fullName = fullName.substr(rd_ScriptLauncherData.scriptPath.fsName.length + 1);
            item =scriptManagerObj.tlistBox.add("item", fullName);
            if (iconFile.exists) {
                item.icon = iconFile
            }
        }
    }
    var gotScriptPath = false;
    function scriptManagerInit(){
        if (app.settings.haveSetting("redefinery", "rd_ScriptLauncher_scriptPath")) {
            rd_ScriptLauncherData.scriptPath = new Folder(app.settings.getSetting("redefinery", "rd_ScriptLauncher_scriptPath"));
            gotScriptPath = true;
        } else {
            var folder = Folder.selectDialog("选择AE脚本文件夹位置.");
            if (folder != null) {
                rd_ScriptLauncherData.scriptPath = folder;
                gotScriptPath = true;
                app.settings.saveSetting("redefinery", "rd_ScriptLauncher_scriptPath", folder.fsName);
            }
        }
        if (gotScriptPath) {
            rd_ScriptLauncher_buildScriptsList(scriptManagerObj)
        } else {
            alert("无法打开文件夹,因为无法找到.", "脚本管理器")
        }
    }
    scriptManagerInit();
    //============ 色板 ==========//
    function pushColortoPanel(colorPanels,colorFloatArray){
        for(var i=14;i>0;i--){
            eval('app.settings.saveSetting("visnlink", "colorPanelColors'+i+'",app.settings.getSetting("visnlink", "colorPanelColors'+(i-1)+'"))')
        }
        app.settings.saveSetting("visnlink", "colorPanelColors0",colorFloatArray.toString());
        drawColortoPanel(colorPanels)
    }
    function getAllColortoPanel(){
        var arr=[]
        if(!app.settings.haveSetting("visnlink", "colorPanelColors14")){
            for(var i=0;i<15;i++){
                eval('app.settings.saveSetting("visnlink", "colorPanelColors'+i+'",[0.01*'+i+',0.03*'+i+',0.06*'+i+'].toString())')
                arr.push([0.01*i,0.03*i,0.06*i])
                
            }
        }else{
            for(var i=0;i<15;i++){
                eval('arr.push((app.settings.getSetting("visnlink", "colorPanelColors'+i+'")).split(","))')
                for(var j=0;j<3;j++){
                    arr[i][j]=parseFloat(arr[i][j])
                }
            }
        }
        return arr
    }
    function drawColortoPanel(colorPanels){
        var colorQueue=getAllColortoPanel()
        for(var i=0;i<15;i++){
            colorPanels[i].graphics.backgroundColor = colorPanels[i].graphics.newBrush(colorPanels[i].graphics.BrushType.SOLID_COLOR,colorQueue[i]);
        }
    }
    //============ 集成脚本 ==========//
    function aggr_randomTransform(){
        eval("@JSXBIN@ES@2.0@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")
    }
    function aggr_textSplitor(){
        eval("@JSXBIN@ES@2.0@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hMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAjHjShShahAiHjSjPjVjQhAjbhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjNjFjUjIjPjEiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHnnneiChHhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjNjFjUjIjPjEiMjTjUhahAiEjSjPjQiEjPjXjOiMjJjTjUhAjbhAjQjSjPjQjFjSjUjJjFjThajbjJjUjFjNjThaEXRfjDfRBXYfeCfffnnnneMjdhMhAjIjFjMjQiUjJjQhahHEXRfjDfRBXgafeCfffnnnnekFhHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAjHjShThahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjBjCjPjVjUiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHXWfeCfnnnneiDhHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhWhVhMhShVidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjSjVjOiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHEXRfjDfRBXgbfeCfffnnnneiShHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhWhVhMhShVidhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAjdnftJiQnABXzCjHjShFfVgdfAEXzDjBjEjEhGfVgdfARBVhEfBffnfJiSnABXzJjTjFjMjFjDjUjJjPjOhHfXzJjNjFjUjIjPjEiMjTjUhIfXzDjHjShShJfXhFfVgdfAXZfeCfnfJiUnA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FjGjFjSjSjFjEiTjJjajFhaibhShYhQhMhRhWhQidhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjCjUjOjTiHjShahAiHjSjPjVjQhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjbhAhAhAhAhAhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjPjLiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2kYib2lZjF2iRjf2mZjahHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjWjJjTjJjUiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHiPiLhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAh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")
    }
    function aggr_layersShifter(){
        eval("@JSXBIN@ES@2.0@MyBbyBn0ABbGnABMGbyBnAIMhCbyBn0ADJhDnASzDjQjBjMBAdCzKjJjOjTjUjBjOjDjFjPjGCVzHjUjIjJjTiPjCjKDfEjzFiQjBjOjFjMEfnnVDfEEjzGiXjJjOjEjPjXFfREFeHjQjBjMjFjUjUjFFeG2iCic2nWjF2nUkV2lfje2iPiQ2nbjZjzJjVjOjEjFjGjJjOjFjEGfWzGiPjCjKjFjDjUHBzKjSjFjTjJjajFjBjCjMjFIFctftnftOhFbhGn0AWJhGnASzDjSjFjTJBCzBhLKCKCKCKCKCKnXzMjNjBjJjOiEjSjPjQiEjPjXjOLfjzHiTiMifiEjBjUjBMfelJjHjSjPjVjQhAjbhAKJJJJJjPjSjJjFjOjUjBjUjJjPjOhahAhHjDjPjMjVjNjOhHhAhMjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAKJJJJJjIjFjBjEjFjShahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhAhHjUjPjQhHidhMhAKJJJJJJjEjSjPjQjEjPjXjOhahAiEjSjPjQiEjPjXjOiMjJjTjUhAjbhAjQjSjPjQjFjSjUjJjFjThajbjJjUjFjNjThannne2jYCjdhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJjdhMhAKJJJJJjBjMjMiHjSjPjVjQjThahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahAhHjTjUjBjDjLhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjTjIjJjGjUhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahAhHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhMhAKJJJJJJJjTjIjJjGjUiJjOhahAiSjBjEjJjPiCjVjUjUjPjOhAjbhAjUjFjYjUhahAhHiGjJjSjTjUhAjJjOhAjQjPjJjOjUhAjUjPhAjUjJjNjFhAjNjBjSjLjFjShHjdhMhAKJJJJJJJjTjIjJjGjUiPjVjUhahAiSjBjEjJjPiCjVjUjUjPjOhAjbhAjUjFjYjUhahAhHiMjBjTjUhAjPjVjUhAjQjPjJjOjUhAjUjPhAjUjJjNjFhAjNjBjSjLjFjShHjdhMhAKJJJJJJJjUjJjNjFiPjGjGjTjFjUhahAiHjSjPjVjQhAjbhAKJJJJJJJJjPjSjJjFjOjUjBjUjJjPjOhahAhHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhMKJJJJJJJJjTjIjJjGjUiUjJjNjFiSiChahAiSjBjEjJjPiCjVjUjUjPjOhAjbhAjUjFjYjUhahAhHiTjIjJjGjUhHjdhMhAKJJJJJJJJjUjJjNjFiFiUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhRhQhQhHhAjdhMhAKJJJJJJJJjGjSjBjNjFiTjFjDiEjSjPjQjEjPjXjOhahAiEjSjPjQiEjPjXjOiMjJjTjUhAjbhAjQjSjPjQjFjSjUjJjFjThajbjJjUjFjNjThaXzQjGjSjBjNjFiTjFjDiEjSjPjQiEjPjXjONfjMfnnnne2ICjdhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJJJjdhMhAKJJJJJJjdhMhAKJJJJJJjTjUjBjHjHjFjShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahAhHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhMKJJJJJJJjDjVjSiUjJjNjFhahAiSjBjEjJjPiCjVjUjUjPjOhAjbhAjUjFjYjUhahAhH2mOiO2iTif2iNiS2nWjF2nUkVhHjdhMhAKJJJJJJJjPjSjJjHiJjOhahAiSjBjEjJjPiCjVjUjUjPjOhAjbhAjUjFjYjUhahAhH2nbjN2lAiS2hQiS2lQjT2iYib2iCic2nWjF2nUkVhHjdhMhAKJJJJJJJjUjJjNjFiPjGjGjTjFjUhahAiHjSjPjVjQhAjbhAKJJJJJJJJjPjSjJjFjOjUjBjUjJjPjOhahAhHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhMKJJJJJJJJjUjJjNjFiTiUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahAhH2jQjF2hciQhahHjdhMhAKJJJJJJJJjUjJjNjFiFiUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhRhQhQhHhAjdhMhAKJJJJJJJJjGjSjBjNjFiTjFjDiEjSjPjQjEjPjXjOhahAiEjSjPjQiEjPjXjOiMjJjTjUhAjbhAjQjSjPjQjFjSjUjJjFjThajbjJjUjFjNjThaXNfjMfnnnne2YBjdhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJJJjdhMhAKJJJJJJjdhMhAKJJJJJjdhMhAKJJJJJjGjPjPjUjFjShahAiHjSjPjVjQhAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhAhHjUjPjQhHidhMhAKJJJJJJjBjCjPjVjUhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2jTiR2kOiOhHhMhAjNjBjYjJjNjVjNiTjJjajFhaibhWhQhMhThQidhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJJjBjQjQjMjZhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2kUie2hIjVhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJjdhMhAKJJJJjdnftJiJnABXzDjHjSjQOfVBfAEXzDjBjEjEPfVBfARBVJfBffnfJiLnABXzJjTjFjMjFjDjUjJjPjOQfXzIjEjSjPjQjEjPjXjORfXzGjIjFjBjEjFjSSfXOfVBfAndAfJiMnABXzIjPjOiDjIjBjOjHjFTfXRfXSfXOfVBfAjzUjPjOiEjSjPjQiEjPjXjOiMjJjTjUiDjIjBjOjHjFUfnfJiOnABXzFjWjBjMjVjFVfXzLjTjIjJjGjUiUjJjNjFiSiCWfXzKjUjJjNjFiPjGjGjTjFjUXfXzFjTjIjJjGjUYfXzJjBjMjMiHjSjPjVjQjTZfXOfVBfAnctfJiPnABXQfXzQjGjSjBjNjFiTjFjDiEjSjPjQjEjPjXjOgafXXfXYfXZfXOfVBfAndAfJiRnABXzHjWjJjTjJjCjMjFgbfXzHjTjUjBjHjHjFjSgcfXZfXOfVBfAncffJiSnABXVfXzHjDjVjSiUjJjNjFgdfXgcfXZfXOfVBfAnctfJiTnABXQfXgafXXfXgcfXZfXOfVBfAndAfJiVnABXzHjPjOiDjMjJjDjLgefXzHjTjIjJjGjUiJjOgffXYfXZfXOfVBfAjzMjPjOiTjIjJjGjUiDjMjJjDjLhAfnfJiWnABXgefXzIjTjIjJjGjUiPjVjUhBfXYfXZfXOfVBfAjhAfnfJiXnABXgefXWfXXfXYfXZfXOfVBfAjhAfnfJiYnABXTfXzGjUjJjNjFiFiUhCfXXfXYfXZfXOfVBfAjzRjPjOiUjFjYjUiJjOjQjVjUiDjIjBjOjHjFhDfnfJiZnABXTfXhCfXXfXgcfXZfXOfVBfAjhDfnfJianABXgefXzFjBjQjQjMjZhEfXzGjGjPjPjUjFjShFfXOfVBfAjzSjPjOiBjQjQjMjZiCjVjUjUjPjOiDjMjJjDjLhGfnfJicnABXgefXzFjBjCjPjVjUhHfXhFfXOfVBfANyBnAMicbyBn0AHJidnASzDjEjMjHhIAEjFfRCFeHjQjBjMjFjUjUjFFeC2jTiR2kOiOftnftJienASJBne2hbGjHjSjPjVjQhAjbKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjBjCjPjVjUiQjOjMhahAiQjBjOjFjMhAjbhAjQjSjPjQjFjSjUjJjFjThajbhAjCjPjSjEjFjSiTjUjZjMjFhahHjTjVjOjLjFjOhHhAjdhMKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjBjCjPjVjUiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahH2gakB2hMjH2jFjH2kQjOjBjFjTjDjSjJjQjUjThOjDjPjNhAhAhAhAhAhAhAhAhAhAhA2iJjM2WiTjCjZ2BkA2jQkehAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhA2lOif2nBiP2jMiR2XiP2nXiT2ganf2mGkJ2kRkY2lekL2lBkL2Iie2BkA2jQkehAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhA2lQjF2jKjN2lOif2iaiThAhAhAhA2ganf2mGkJ2kRkY2lekL2lBkL2Iie2BkA2jQkehAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhA2nUkB2kbiS2kOiO2GiS2lLiO2jRif2mGkJ2hWiS2iciP2BhQ2mGkJ2kRkY2lekL2lBkL2iMkI2gaiO2nFjX2mGkL2Mnf2GiS2lLiO2iNiS2gfjH2mNjC2iEjE2BhQ2OiU2gfjH2DkM2jSkC2BhQiQiT2BhQiBiF2BhQiDhUiE2BhQhTjEjTjNjBjY2iJjb2lejc2mBiU2iZjF2Lja2ChQ2mTjC2ldib2gdjA2nUje2Mnf2iTjC2Aif2RkB2gejN2ChQhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhA2kYib2lZjF2iRjf2mZja2ganfjXjXjXhOhRhSjEhOjUjWhAhAhAhA2GiS2lLiOhN2hPiU2mRiThN2iTjC2Aif2RkB2gejNhHhMhAjQjSjPjQjFjSjUjJjFjThajbjNjVjMjUjJjMjJjOjFhajUjSjVjFjdhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhShYhQhMhRhWhQidhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjCjUjOjTiHjShahAiHjSjPjVjQhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjbhAhAhAhAhAhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjPjLiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2kYib2lZjF2iRjf2mZjahHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjWjJjTjJjUiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHiPiLhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdftJjOnABXzCjHjShJfVhIfAEXPfVhIfARBVJfBffnfJjRnABXgefXzIjWjJjTjJjUiCjUjOhKfXzGjCjUjOjTiHjShLfXhJfVhIfANyBnAMjRbyBn0ABJjSnAEXzFjDjMjPjTjFhMfjhIfnf0DzAhNCjTnfJjVnABXgefXzFjPjLiCjUjOhOfXhLfXhJfVhIfANyBnAMjVbyBn0AEJjWnASzDjVjSjMhPAneSjIjUjUjQhahPhPjXjXjXhOhRhSjEhOjUjWhPftJjYnASzDjDjNjEhQBneAftOjZbyjbn0ABOjbbyjdn0ABJjdnAShQBCKnCKnVhPfAehNiDhahPiQjSjPjHjSjBjNhAiGjJjMjFjThPiNjPjajJjMjMjBhAiGjJjSjFjGjPjYhPjGjJjSjFjGjPjYhOjFjYjFhAnnnntfAXzGjFjYjJjTjUjThRfEjzEiGjJjMjFhSfRBFehMiDhahPiQjSjPjHjSjBjNhAiGjJjMjFjThPiNjPjajJjMjMjBhAiGjJjSjFjGjPjYhPjGjJjSjFjGjPjYhOjFjYjFffbykBn0ABJkBnAShQBCKnCKnVhPfAehQiDhahPiQjSjPjHjSjBjNhAiGjJjMjFjThPiJjOjUjFjSjOjFjUhAiFjYjQjMjPjSjFjShPjJjFjYjQjMjPjSjFhOjFjYjFhAnnnntfACzChBhdhTEXzHjJjOjEjFjYiPjGhUfXzCjPjThVfjzBhEhWfRBFeDiXjJjOffnndyBbykGn0ABJkGnAShQBCKnCKCKnVhPfAeGjPjQjFjOhAhCnnneBhCnnntfgkJbyBn0ABJkLnAEXzKjDjBjMjMiTjZjTjUjFjNhXfjzGjTjZjTjUjFjNhYfRBVhQfBffABnzBjFhZnbyBn0ABJkPnAEjzFjBjMjFjSjUhafRBjhZfffAChP40BiAhQ4B0AiAACAhNCkRnfJkTnAEXzGjDjFjOjUjFjShbfVhIfAnfJkUnAEXzEjTjIjPjXhcfVhIfAnfAChI40BiAJ4B0AiAACAhNCkWnfJkYnAEXzGjMjBjZjPjVjUhdfXhdfVBfARBFctffJkZnAEXzGjSjFjTjJjajFhefXhdfVBfAnfJkanABXzKjPjOiSjFjTjJjajJjOjHhffVBfABXzIjPjOiSjFjTjJjajFiAfVBfANyBnAMkabyBn0ABJkanAEXhefXhdfezEjUjIjJjTiBfnf0DhNCkanfnfJkcnABXzEjUjFjYjUiCfXhCfXXfXYfXZfXOfVBfAneChRhQfJkdnABXiCfXhCfXXfXgcfXZfXOfVBfAneChRhQfOlAblBn0AHJlBnASzGjXjJjOiHjGjYiDCXzIjHjSjBjQjIjJjDjTiEfVBfAnftJlCnASzOjEjBjSjLiDjPjMjPjSiCjSjVjTjIiFDEXzGjOjFjXiQjFjOiGfViDfCRDXzLiTiPiMiJiEifiDiPiMiPiSiHfXzJiCjSjVjTjIiUjZjQjFiIfViDfCARDFdAFdAFdAfFdBffnftJlDnABXzPjGjPjSjFjHjSjPjVjOjEiDjPjMjPjSiJfXiEfXRfXSfXOfVBfAViFfDnfJlEnABXiJfXiEfXgafXXfXYfXZfXOfVBfAViFfDnfJlFnABXiJfXiEfXgafXXfXgcfXZfXOfVBfAViFfDnfJlGnABXiJfXiEfXhCfXXfXYfXZfXOfVBfAViFfDnfJlHnABXiJfXiEfXhCfXXfXgcfXZfXOfVBfAViFfDnfACzChdhdiKEXzFjGjMjPjPjSiLfjzEiNjBjUjIiMfRBEjzKjQjBjSjTjFiGjMjPjBjUiNfRBXzHjWjFjSjTjJjPjOiOfjzDjBjQjQiPfffffnndInAChTVBfAnnbnZlLnAVBf0AFB40BiAiF4D0AiAJ4B0AiAiD4C0AiAD40BhABEAzWjQjUifiTjIjJjGjUiMjBjZjFjSjTifjCjVjJjMjEiViJiQAlMMlObyBn0ABOlQblRn0ACJlRnABXgbfXgcfXZfXOfjzKjQjUjTjIjJjGjUiQjBjMiRfncffJlSnABXgbfXYfXZfXOfjiRfnctfACiKXzFjJjOjEjFjYiSfXQfeiBfnndAblVn0ACJlVnABXgbfXYfXZfXOfjiRfncffJlWnABXgbfXgcfXZfXOfjiRfnctf0DUAlYMlbbyBn0ABOlcbldn0ACJldnABXVfXgffXYfXZfXOfjiRfncffJlenABXVfXhBfXYfXZfXOfjiRfncffACiKXiCfeiBfnneFiTjIjJjGjUbymAn0ABJmAnABXVfXWfXXfXYfXZfXOfjiRfncff0DhAAmCMmFbyBn0ABOmGbymHn0ABJmHnABXiCfeiBfneChRhQfAEjzFjJjTiOjBiOiTfRBEjiNfRBXiCfeiBfffffbymJn0ABJmJnABXiCfeiBfEjiNfRBXiCfeiBfffnf0DhDAmLMmObyBn0ABOmQbymSn0ABOmSbymTn0ABJmTnABXiCfXhCfXXfXYfXZfXOfjiRfneChRhQfAEjiTfRBEjiNfRBXiCfXhCfXXfXYfXZfXOfjiRfffffbmVn0ACJmVnABXiCfXhCfXXfXYfXZfXOfjiRfEjiNfRBXiCfXhCfXXfXYfXZfXOfjiRfffnfJmWnAEjzLjTjIjJjGjUiMjBjZjFjSjTiUfnfACiKXiSfXQfXRfXSfXOfjiRfnndAbymZn0ABOmZbyman0ABJmanABXiCfXhCfXXfXgcfXZfXOfjiRfneChRhQfAEjiTfRBEjiNfRBXiCfXhCfXXfXgcfXZfXOfjiRfffffbmcn0ACJmcnABXiCfXhCfXXfXgcfXZfXOfjiRfEjiNfRBXiCfXhCfXXfXgcfXZfXOfjiRfffnfJmdnAEjzNjTjUjBjHjHjFjSiMjBjZjFjSjTiVfnf0DhGAnAMnFbyBn0ACJnHnASzKjBjDjUjJjWjFiJjUjFjNiWAXiWfXzHjQjSjPjKjFjDjUiXfjiPfnftOnIbynJn0ABJnJnAEjhafRBFehFiZjPjVhAjOjFjFjEhAjBjUhAjMjFjBjTjUhAjPjOjFhAjMjBjZjFjShAjTjFjMjFjDjUjFjEhOffAUzCjcjciYCiKViWfAnnbhzBhBiZCCViWfAjzIiDjPjNjQiJjUjFjNiafnnnnbnMn0ACJnMnASzOjTjFjMjFjDjUjFjEiMjBjZjFjSjTibBXibfViWfAnftOnNbynOn0ABJnOnAEjhafRBFehFiZjPjVhAjOjFjFjEhAjBjUhAjMjFjBjTjUhAjPjOjFhAjMjBjZjFjShAjTjFjMjFjDjUjFjEhOffACiKXzGjMjFjOjHjUjIicfXibfViWfAnndAbnRn0AEOnRbnSn0ADJnSnABjzPjFjBjSjMjJjFjTjUiJjOiQjPjJjOjUidfXzHjJjOiQjPjJjOjUiefXzBhQiffVibfBnfanTbnUn0ACJnUnABjzMjDjVjSjSjFjOjUiMjBjZjFjSjAfQhNfVibfBjzBjJjBfnfOnVbynWn0ABJnWnABjidfXiefjjAfnfACzBhcjCXiefjjAfjidfnnnAjjBfBXicfVibfBByBjCJnZnABjzOjUjJjNjFiEjJjGjGjFjSjFjOjDjFjDfCzBhNjEXzEjUjJjNjFjFfViWfAjidfnnnfACiKXVfXgffXYfXZfXOfjiRfnnctOnbbncn0AEJncnABjzOjMjBjUjFjTjUiPjVjUiQjPjJjOjUjGfXzIjPjVjUiQjPjJjOjUjHfXiffVibfBnfandbnen0ACJnenABjjAfQhNfVibfBjjBfnfOnfby2ABn0ABJ2ABnABjjGfXjHfjjAfnfACzBhejIXjHfjjAfjjGfnnnAjjBfBXicfVibfBByBjCJ2DBnABjjGfCjEjjGfXzNjGjSjBjNjFiEjVjSjBjUjJjPjOjJfViWfAnnnfJ2EBnABjjDfCjEXjFfViWfAjjGfnnnfACiKXVfXhBfXYfXZfXOfjiRfnnctO2GBby2HBn0ABO2HBby2IBn0ABJ2IBnABjjDfCzBhKjKEjiNfRBXiCfXhCfXXfXYfXZfXOfjiRfffXjJfViWfAnnnfACiKXQfXgafXXfXYfXZfXOfjiRfnndAby2KBn0ABJ2KBnABjjDfEjiNfRBXiCfXhCfXXfXYfXZfXOfjiRfffnfACiKXVfXWfXXfXYfXZfXOfjiRfnnctnJ2OBnAEXzOjCjFjHjJjOiVjOjEjPiHjSjPjVjQjLfjiPfRBFeViTjIjJjGjUhAiTjFjMjFjDjUjFjEhAiMjBjZjFjSjTffa2PBb2QBn0ACJ2QBnABjjAfQhNfVibfBjjBfnfJ2RBnABXzJjTjUjBjSjUiUjJjNjFjMfjjAfCKnjjDfnnntAjjBfAXicfVibfBByBjCJ2TBnAEXzMjFjOjEiVjOjEjPiHjSjPjVjQjNfjiPfnfACib4B0AiAiW40BiAACAiUA2WBM2gaBbyBn0ACJ2gbBnASiWAXiWfXiXfjiPfnftO2gcBby2gdBn0ABJ2gdBnAEjhafRBFehGiZjPjVhAjOjFjFjEhAjUjPhAjTjFjMjFjDjUhAjUjXjPhAjPjShAjNjPjSjFhAjMjBjZjFjSjThOffAUiYCiKViWfAnnbhiZCCViWfAjiafnnnnb2hABn0ACJ2hABnASibBXibfViWfAnftO2hBBby2hCBn0ABJ2hCBnAEjhafRBFehGiZjPjVhAjOjFjFjEhAjUjPhAjTjFjMjFjDjUhAjUjXjPhAjPjShAjNjPjSjFhAjMjBjZjFjSjThOffACjCXicfXibfViWfAnndCb2hFBn0AEJ2hFBnAEXjLfjiPfRBFeXiTjUjBjHjHjFjShAiTjFjMjFjDjUjFjEhAiMjBjZjFjSjTffO2hGBby2hHBn0ABJ2hHBnASzNjTjUjBjHjHjFjSiBjNjPjVjOjUjOCCjKEjiNfRBXiCfXhCfXXfXgcfXZfXOfjiRfffXjJfViWfAnnnftACiKXQfXgafXXfXgcfXZfXOfjiRfnndAby2hJBn0ABJ2hJBnASjOCEjiNfRBXiCfXhCfXXfXgcfXZfXOfjiRfffnftO2hMBby2hNBn0ABa2hNBb2hOBn0ACJ2hOBnABjjAfQhNfVibfBjjBfnfJ2hPBnABXjMfjjAfCKXjFfViWfACjKjjBfVjOfCnnnnnfAjjBfAXicfVibfBByBjCACiKXVfXgdfXgcfXZfXOfjiRfnnctby2hTBn0ABa2hTBb2hUBn0ACJ2hUBnABjjAfQhNfVibfBjjBfnfJ2hVBnABXjMfjjAfCKnCjKjjBfVjOfCnnnnntAjjBfAXicfVibfBByBjCJ2hYBnAEXjNfjiPfnfADib4B0AiAjO4C0AiAiW40BiAADAiVA2hbBM2iHBbyBn0ACJ2iIBnASzPjTjFjDjVjSjJjUjZiTjFjUjUjJjOjHjPAEXzNjHjFjUiQjSjFjGiBjTiMjPjOjHjQfXzLjQjSjFjGjFjSjFjOjDjFjTjRfjiPfRCFeRiNjBjJjOhAiQjSjFjGhAiTjFjDjUjJjPjOFehEiQjSjFjGifiTiDiSiJiQiUiJiOiHifiGiJiMiFifiOiFiUiXiPiSiLifiTiFiDiViSiJiUiZffnftZ2iJBnACiKVjPfAnndBABjP40BiAABAzRjJjTiTjFjDjVjSjJjUjZiQjSjFjGiTjFjUjSA2iKBLJInASMAEjHfntnftJKnAXzKjIjFjMjQiXjJjOjEjPjXjTfVMfAJMnABXLfVMfAneSibhC2iPiQ2nbjZ2JkQ2nJjC2kEjW2iCichChMhAhC2lEiO2ZkV2iPiQ2nbjZhCidfJNnABXNfVMfAneKibhC2hHiehChMhAhC2mSjZhCidfJPnABXzKjTjDjSjJjQjUiOjBjNjFjUfVMfAneUjQjUifiTjIjJjGjUiMjBjZjFjSjT2iCic2nWjF2nUkV2lfje2iPiQ2nbjZfJQnABXzNjTjDjSjJjQjUiWjFjSjTjJjPjOjVfVMfAneEjWhShOhSfJRnABXzLjTjDjSjJjQjUiUjJjUjMjFjWfVMfACKCKXjUfVMfAnneBhAXjVfVMfAnnnfJTnABXzLjTjUjSiIjFjMjQiCjUjOhRjXfVMfAneNiQjPjTjUhAjDjPjNjNjFjOjUjTfJUnABXzOjTjUjSiIjFjMjQiCjUjOhRiVjSjMjYfVMfAnegfjIjUjUjQhahPhPjCjMjPjHhOjTjJjOjBhOjDjPjNhOjDjOhPjZjLjDjNjHjajTfJZnABXzHjTjUjSiIjFjMjQjZfVMfAneC2jTiR2kOiOfO2iPBby2iQBn0ABJ2iQBnAEjhafRBFehRiUjIjJjThAjTjDjSjJjQjUhAjSjFjRjVjJjSjFjThAiBjGjUjFjShAiFjGjGjFjDjUjThAiDiThThAjPjShAjHjSjFjBjUjFjSffACjCEjiNfRBXiOfjiPfffnndIb2iTBn0ACJ2iTBnASiRBEjiQfRBVDfCffnftO2iUBby2iVBn0ABO2iVBb2iWBn0ACJ2iWBnAEXhbfViRfBnfJ2iXBnAEXhcfViRfBnfACCViRfBjFfnnnAChTViRfBnnbnADiR4B0AiAD40BhAM40BiABCAzOjQjUifiTjIjJjGjUiMjBjZjFjSjTjaA2ibBBJ2idBnAEjjafRBeiBfff0DhNByB")
    }
    function aggr_layerToGrid(){
        eval("@JSXBIN@ES@2.0@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")
    }
    function aggr_layerSplitor(){
        eval("@JSXBIN@ES@2.0@MyBbyBn0ABbFnABMFbyBnADMhMbyBn0ABZhOnAXzCjFjOBfVzGjTjUjSiWjBjSCf0ABC40BhAB0AzSjSjEifiTjMjJjDjFjSifjMjPjDjBjMjJjajFDAhPMhfbyBnABMiBbyBn0ADJiDnASzFjWjBjMjVjFEAEjzIjQjBjSjTjFiJjOjUFfRBXzEjUjFjYjUGfVzDjTjSjDHfBffnftOiFJiGnASEAVzGjNjJjOiWjBjMIfCnffAUzCjcjcJEjzFjJjTiOjBiOKfRBVEfAffCzBhcLVEfAVIfCnnnnOiHJiInASEAVzGjNjBjYiWjBjMMfDnffACzBheNVEfAVMfDnnnJiJnABXGfVHfBEXzIjUjPiTjUjSjJjOjHOfVEfAnfnfAEE40BiAH40BhAI4B0AhAM4C0AhADBAzSjSjEifiTjMjJjDjFjSifjMjJjNjJjUiOjVjNPAiKDJiMnASzDjQjBjMQAdCzKjJjOjTjUjBjOjDjFjPjGRVzHjUjIjJjTiPjCjKSfEjzFiQjBjOjFjMTfnnVSfEEjzGiXjJjOjEjPjXUfREFeHjQjBjMjFjUjUjFXzKjTjDjSjJjQjUiOjBjNjFVfjzNjSjEifiTjMjJjDjFjSiEjBjUjBWfjzJjVjOjEjFjGjJjOjFjEXfWzGiPjCjKjFjDjUYBzKjSjFjTjJjajFjBjCjMjFZFctftnftOiObiQn0AWJiQnASzDjSjFjTgaBCzBhLgbCgbCgbCgbCgbCgbCgbCgbCgbCgbCgbCgbCgbCgbCgbCgbnEjDfRBXzHjTjUjSiIjFjMjQgcfjWfffemcjHjSjPjVjQhAjbhAKJJJJJjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJjIjFjBjEjFjShahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjUjJjUjMjFhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2jTiR2kOiOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidjdhMhAKJJJhAhAhAhAhAhAhAhAhAhAhAhAhAhAjIjFjMjQhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHnnnekChHhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJjdhMhAKJJJJJjShRhahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjSjPjXjTiMjCjMhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHEjDfRBXzHjTjUjSiSjPjXjTgdfjWfffnnnnekChHhAjdhMhAKJJJJJJjSjPjXjThahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhUhHhMhAjDjIjBjSjBjDjUjFjSjThahUhAjdhMhAKJJJJJJjHjBjQhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHhAhAhHhAjdhMhAKJJJJJJjNjBjSjHjJjOiMjCjMhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHEjDfRBXzJjTjUjSiNjBjSjHjJjOgefjWfffnnnnekYhHhAjdhMhAKJJJJJJjNjBjSjHjJjOhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahUhAjdhMhAKJJJJJjdhMhAKJJJJJjShShahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjDjPjMjTiMjCjMhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHEjDfRBXzHjTjUjSiDjPjMjTgffjWfffnnnnekFhHhAjdhMhAKJJJJJJjDjPjMjThahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhThHhMhAjDjIjBjSjBjDjUjFjSjThahUhAjdhMhAKJJJJJJjHjBjQhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHhAhAhHhAjdhMhAKJJJJJJjSjPjVjOjEjOjFjTjTiMjCjMhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHEjDfRBXzMjTjUjSiSjPjVjOjEjOjFjTjThAfjWfffnnnnejJhHhAjdhMhAKJJJJJJjSjPjVjOjEjOjFjTjThahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahUhAjdhMhAKJJJJJjdhMhAKJJJJJjVjTjFiBjMjQjIjBiBjEjEhahAiDjIjFjDjLjCjPjYhAjbhAjUjFjYjUhahHEjDfRBXzOjTjUjSiVjTjFiBjMjQjIjBiBjEjEhBfjWfffnnnneiQhHhMhAjWjBjMjVjFhajUjSjVjFhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhAjdhMhAKJJJJJjQjBjSjFjOjUiUjPiOjVjMjMhahAiDjIjFjDjLjCjPjYhAjbhAjUjFjYjUhahHEjDfRBXzNjTjUjSiQjBjSjFjOjUiOjVjMjMhCfjWfffnnnnekBhHhMhAjWjBjMjVjFhajUjSjVjFhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhAjdhMhAKJJJJJjDjNjEjThahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKJJJJJJjTjMjJjDjFiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHEjDfRBXzIjTjUjSiTjMjJjDjFhDfjWfffnnnneUhHhAjdhMhAKJJJJJjdhMhAKJJJJjdnftJjPnABXzDjHjSjQhEfVQfAEXzDjBjEjEhFfVQfARBVgafBffnfJjSnASzGjXjJjOiHjGjYhGCXzIjHjSjBjQjIjJjDjThHfVQfAnftJjTnASzOjEjBjSjLiDjPjMjPjSiCjSjVjTjIhIDEXzGjOjFjXiQjFjOhJfVhGfCRDXzLiTiPiMiJiEifiDiPiMiPiShKfXzJiCjSjVjTjIiUjZjQjFhLfVhGfCARDFdAFdAFdAfFdBffnftJjUnABXzPjGjPjSjFjHjSjPjVjOjEiDjPjMjPjShMfXhHfXzEjSjPjXjThNfXzCjShRhOfXhEfVQfAVhIfDnfJjVnABXhMfXhHfXzGjNjBjSjHjJjOhPfXhOfXhEfVQfAVhIfDnfJjWnABXhMfXhHfXzEjDjPjMjThQfXzCjShShRfXhEfVQfAVhIfDnfJjXnABXhMfXh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OjFjTjDjBjQjFlOfRBFe2jPFhFhShShFjVhVhThZiGhFjVhXhShUhYhFjVhUiGhViDhFjVhYhQhQhViKjFjGjGjSjFjZhFhShQiShOhFhShQiBjMjNjBjTjPjMhOhFhShQhFhShQhFjVhWiDhUhZhFjVhVhThRhWjCjZhFjVhYhQhQhRhFjVhZiFhXhQhFhShQhFhShQhFjVhViChZhYhFjVhWhViChZhFjVhXiGhVhRhFjVhXiBiEhZhFjViGiGhRiBjXjXjXhOhRhSjEhOjUjWhFhShQhFhShQhFhShQhFhViDjOhFhShShFhShQhLhFhQiBhFhQhZhFhQhZhFhQhZhFhQiBhFhQhZhFhQhZhFhQhZhFhShShFhViDjOhFhShShFhShQhLhFhQiBhFhQhZhFhQhZhFhQhZhFhShShFjVhYiGiEhZhFjVhUiFhSiBhFjVhYhRhRiBhFjVhWhXhSiDhFjVhViDhQhWhFjVhXhVhRiGhFjVhWhShRhQhFjVhUiFhQhQhFjVhUiFhSiBhFjVhZhXhWhShFjVhWhXhXiGhFhShQhFjVhWhShRhRhFjVhUiFiFiDhFjVhVhTiFiGhFjVhUiFiFhVhFjVhWhShYiBhFjVhWhShUhQhFjVhZhQhQhZhFjVhWhSiFhZhFjVhXhWhYhUhFjVhViDhUhShFjVhUiFiFhVhFjVhXiGhVhRhFjVhWhYhTiDhFjVhXhWhYhUhFjVhViGhWhShFjVhViGhQiGhFjVhYiGiEiChFjVhYhYhUiDhFjVhVhShQhXhFjVhVhShXhShOhFhShQhFjVhVhXhShYhFjVhWiDiBhRhFjVhWhXhQhZhFjVhWhViDiChFjVhYiGhWiDhFjVhXhWhYhUhFjVhViDhUhShFjVhUiFhQiBhFjVhYiGiEhQhFjVhYhYhUiDhFjVhYhRhRiBhFjVhWhXhSiDhFhShQhFjVhWhVhUhYhFjVhWhXhZiDhFjVhWhXhQhQhFjVhVhZhXiEhOhFjVhVhZhYhShFjVhWhXhZiDhFjVhUiFhQhQhFjVhUiFhSiBhFjVhXhShThWhFjVhXhShWhZhFjVhUiGhVhThFjVhViDhUhShFjVhViEiGhShFjVhXiFiDiGhFjVhVhShRiChFjVhViFiGiBhFhSiDhFhShQhFjVhViChYhThFjVhViDhQhWhFjVhUiGhViDhFjVhUiFhTiBhFjVhXhVhRiGhFjVhWhShRhQhFjVhViDhUhShFjVhXhWhYhUhFjVhXhShThWhFjVhXhShWhZhFjVhUiGhVhThOhFhViDjOhFhShShFhShQhLhFhQiBhFhQhZhFhQhZhFhQhZhFhShShFhViDjOhFhShShFhShQhLhFhQiBhFhQhZhFhQhZhFhQhZhFhShShFjVhUiGhWhQhFjVhVhTiFiGhFjVhUiFiFhVhFjVhWhVhThZhFjVhVhTiEhYhFjVhZhViGhUhFjVhYiEiEiEhFjVhXhWhYhUhFjVhVhZhShXhFjVhViDhQiGhFjVhWhXhWhVhFjVhWhVhThZhFjVhVhTiEhYhFjVhXhVhRiGhFjVhWhShRhQhFjVhXhWhYhUhFjVhVhShQhXhFjVhXhShUhXhFjVhXhWhYhUhFjVhZhViGhUhFjVhYiEiEiEhFhShQhFjVhVhThVhVhFjVhUiGhUiEhFjVhUiFhTiBhFjVhVhQiDiGhFjVhXiEhShQhFhSiDhFhShQhFjVhVhYhZiFhFjVhVhSiBhQhFjVhVhXhQhWhFjVhYhZiEhShFjVhXhWhYhUhFjVhVhQhTiDhFjVhVhTiFiGhFjVhUiFiFhVhFjVhUiGhXiGhFjVhXhVhRiGhFjVhWhShRhQhFjVhXhWhYhUhFjVhViDhUhShFjVhVhRhXhXhFjVhWhXhQhZhFjVhVhXhQhWhFjVhYhZiEhShFhShQhOhFhViDjOhFhShShFhShQhLhFhQiBhFhQhZhFhQhZhFhQiBhFhQhZhFhQhZhFhQhZhFhShShFjVhWhTiEhQhFjVhXhZhTiBhFjViGiGhRiBhFjVhYiGiEhZhFjVhUiFhSiBhFjVhWhTiEhShFjVhUiFiGhWhFjVhZhXhQhQhFjVhYhZhYhRiBiFhFhShQjDjThThFjVhWhShRhWhFjVhYhQhQhVhFjVhWhWiGhUhFjVhZiBiEhYhFjVhXhShUhYhFjVhWhXhSiDhOhFhShQhFjVhUiGhWhQhFjVhUiFhViGhFjVhVhTiFiGhFjVhUiFiFhVhFjVhWhShYiBhFjVhYiGiEhZhFjVhUiFhSiBhFjVhYhRhRiBhFjVhWhXhSiDhFjVhWhVhTiFhFjVhVhXhShYiTjDjSjJjQjUjThFjVhWhVhYhXhFjVhUiFiGhWhFjVhVhZ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")
    }
    function aggr_stepByChange(){
        eval("@JSXBIN@ES@2.0@MyBbyBnACMDbyBn0AKJFnAEjzEjFjWjBjMBfRBEjzIjVjOjFjTjDjBjQjFCfRBFe2kGOhFhShQhPhPhFhShQiWjBjSjJjBjCjMjFhFhShQjVjTjFjEhFhShQjUjPhFhShQjLjFjFjQhFhShQjUjSjBjDjLhFhShQjPjGhFhShQhFhShXjUjIjJjThFhShXhFhShQjSjFjGjFjSjFjOjDjFhFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjWjBjShFhShQjEjJjTjUjSjJjCjVjUjFiMjBjZjFjSjThFhShQhFhTiEhFhShQjUjIjJjThFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQhFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQhPhPhFhShQiDjSjFjBjUjFhFhShQjBjOhFhShQjJjOjTjUjBjOjDjFhFhShQjPjGhFhShQjUjIjFhFhShQjVjUjJjMjThFhShQjDjMjBjTjThFhShQjUjPhFhShQjVjTjFhFhShQjJjUjThFhShQjGjVjOjDjUjJjPjOjThFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjWjBjShFhShQjVjUjJjMjThFhShQhFhTiEhFhShQjOjFjXhFhShQiEjJjTjUjSjJjCjVjUjFiMjBjZjFjSjTiVjUjJjMjThFhShYhFhShZhFhTiChFhQiEhFhQiBhFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQhPhPhFhShQiTjDjSjJjQjUhFhShQjJjOjGjPjThFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjTjDjSjJjQjUiNjJjOiTjVjQjQjPjSjUiWjFjSjTjJjPjOhFhShQhFhTiEhFhShQhFhShShZhOhQhFhShShFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjTjDjSjJjQjUiOjBjNjFhFhShQhFhTiEhFhShQhFhShShFjVhZhWhThVhFjVhVhShRhXhFjVhVhShQhWhFjVhZhRhUiEhFjVhViDhUhShOjKjTjYhFhShShFhTiChFhShQhFhShQhFhShQhFhShQhFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjTjDjSjJjQjUiWjFjSjTjJjPjOhFhShQhFhTiEhFhShQhFhShShShOhQhFhShShFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjTjDjSjJjQjUiUjJjUjMjFhFhShQhFhTiEhFhShQhFhShShFjVhZhWhThVhFjVhVhShRhXhFjVhVhShQhWhFjVhZhRhUiEhFjVhViDhUhShFjVhYhRhRiBhFjVhWhXhSiDhFhShShFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjTjDjSjJjQjUiDjPjQjZjSjJjHjIjUhFhShQhFhTiEhFhShQhFhShShFjVhViDhVhVhFjVhXiGiDhVhFjVhZiFhXhQhFjVhWiDhUhZhFjVhVhThRhWhFhShQhFhShQhFjVhWhRhRiGhFjVhYiDhShShFjVhVhThZiGhFjVhXhShUhYhFjVhUiGhViDhFjVhYhQhQhVhFhShQiDjIjBjSjMjFjThFhShQiCjPjSjEjFjOjBjWjFhFhShQhFhShShFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjTjDjSjJjQjUiIjPjNjFjQjBjHjFhFhShQhFhTiEhFhShQhFhShShFjVhVhThViBhFjVhViCiBhShFjVhVhXhThQhFjVhVhXhUhQhFhShQjIjUjUjQhFhTiBhPhPjCjMjPjHhOjTjJjOjBhOjDjPjNhOjDjOhPjZjLjDjNjHjajThFhShShFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjTjDjSjJjQjUiEjFjTjDjSjJjQjUjJjPjOhFhShQhFhTiEhFhShQhFhXiCjFjOhFhTiBhFhShQhFhShShFjVhYiGiEhZhFjVhUiFhSiBhFjVhYhRhRiBhFjVhWhXhSiDhFjVhVhRhUhRhFjVhYiCiChYhFjVhUiGhWhQhFjVhViCiGhZhFjVhZhQhQhZhFjVhWhSiFhZhFjVhXhWhYhUhFjVhViDhUhShFjVhYiGiEiChFjVhYhYhUiDhFjVhUiFhQhZhFjVhXiFiGhUhFjVhXiBhXiBhFjVhZhViGhUhFjVhXhWhYhUhFjVhVhShQhWhFjVhViFhQhThOhFhViDhFhViDjShFhViDhFhViDjShFjVhZhWhWhUhFjVhUiFhYhWhFjVhVhTiFiGhFjVhUiFiFhVhFjVhViCiGhZhFjVhUiGhUiEhFjVhXiGhWiFhFjVhYiGiEiChFjVhYhYhUiDhFjVhVhQhUiGhFjVhXhZiGiChFjVhYiCiCiFhFjVhXiGhWiFhFjVhUiFhUiChFjVhVhZhRhWhFhSiDhFjVhUiGhWhQhFjVhYiGiEhYhFjVhVhTiFiGhFjVhUiFiFhVhFjVhViCiGhZhFjVhWhShUhQhFjVhZhQhQhZhFjVhViDhUhShFjVhXhWhYhUhFjVhWhViDiChFjVhYiGhWiDhFjVhThQhQhRhFjVhXiGhShZhFjVhWhVhTiFhFjVhThQhQhRhFjVhUiFhQiEhFjVhZhQhQiGhFjVhWhWhQiFhFjVhViFiBhWhFhShQhFjVhYiGiEiChFjVhYhYhUiDhFjVhYiCiCiFhFjVhXiGhWiFhFhShQhFjVhVhUhQiDhFjVhWhViGhWhFjVhYiGiEhYhFjVhVhTiFiGhFjVhUiFiFhVhFjVhWiEiGiChFjVhVhSiBhQhFjVhZhWhYiGhFjVhWhXhTiBhFjVhVhQhTiDhOhFhViDhFhViDjShFhViDhFhViDjShFhShQhFhShQhFjVhWhVhThZhFjVhVhTiEhYhFhViDhFhShShFjVhVhWiFhQhFjVhWhVhXhQhFhViDhFhShShFjVhXhWhYhUhFjVhVhZhShXhFjVhViDhQiGhFjVhVhTiFiGhFjVhUiFiFhVhFjVhUiGhXiGhFjVhZhQhQhZhFjVhWhSiFhZhFjVhXhWhYhUhFjVhViDhUhShFjVhUiFiFhVhFjVhZhXhViFhFjVhXiFiCiGhFjVhWhQhShXhFjVhYiGiEiChFjVhYhYhUiDhFjVhVhQhUiGhFjVhXhZiGiChFhShQhOhFhShShFhSiDhFhShQjGjShFhTiBhFhShSiDjFhFhShQjTjDjSjJjQjUhFhShQjQjFjSjNjFjUhFhShQjEjFhFhShQjEjJjTjUjSjJjCjVjFjShFhShQjMjFjThFhShQjDjBjMjRjVjFjThFhShQjEjBjOjThFhShQjMhFhViDhFhViDhFhShXjFjTjQjBjDjFhFhShQhTiEhOhFhViDhFhViDjShFhViDhFhViDjSiFjOhFhShQjQjMjVjThFhShQjEjFhFhShQjQjPjVjWjPjJjShFhShQjEhFiFhZjDjBjMjFjShFhShQjMjBhFhShQjQjPjTjJjUjJjPjOhFhSiDhFhShQjWjPjVjThFhShQjQjPjVjWjFjahFhShQjEhFiFhZjDjBjMjFjShFhShQjMjBhFhShQjSjPjUjBjUjJjPjOhPjMhFhViDhFhViDhFhShXhFiFhZjDjIjFjMjMjFhPjMhFhViDhFhViDhFhShXjPjQjBjDjJjUhFiFhZhFhShQjFjUhFhShQjBjKjPjVjUjFjShFhShQjEjFhFhShQjMhFhViDhFhViDhFhShXjBjMhFiFhZjBjUjPjJjSjFhOhFhViDhFhViDjShFhViDhFhViDjSiMjFhFhShQjQjBjSjBjNhFiFhYjUjSjFhFhShQhFhViDhFhShShFhShQiGjBjDjUjFjVjShFhViDhFhShShFhShQjQjFjSjNjFjUhFhShQjEhFhViDhFhViDhFhShXjPjCjUjFjOjJjShFhShQjVjOhFhShQjEhFiFhZjDjBjMjBjHjFhFhShQjOjPjOhNjMjJjOhFiFhZjBjJjSjFhFhShQjFjOjUjSjFhFhShQjMjFjThFhShQjDjBjMjRjVjFjThOhFhShShFhXiEhFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjTjDjSjJjQjUiBjCjPjVjUhFhShQhFhTiEhFhShQhFhXiCjFjOhFhTiBjUjIjJjThOjTjDjSjJjQjUiOjBjNjFhFhShQhLhFhShQhFhShShFhSiDhFhShQjWhFhShShFhShQhLhFhShQjUjIjJjThOjTjDjSjJjQjUiWjFjSjTjJjPjOhFhShQhLhFhShQhFhShShFhViDhFhViDjShFhViDhFhViDjShFhShShFhShQhLhFhShQjUjIjJjThOjTjDjSjJjQjUiDjPjQjZjSjJjHjIjUhFhShQhLhFhShQhFhShShFhViDhFhViDjShFhShShFhShQhLhFhShQjUjIjJjThOjTjDjSjJjQjUiIjPjNjFjQjBjHjFhFhShQhLhFhShQhFhShShFhViDhFhViDjShFhViDhFhViDjShFhShShFhShQhLhFhShQjVjUjJjMjThOjMjPjDhFhShYjUjIjJjThOjTjDjSjJjQjUiEjFjTjDjSjJjQjUjJjPjOhFhShZhFhSiDhFhShQjGjShFhTiBjUjIjJjThOjTjDjSjJjQjUiOjBjNjFhFhShQhLhFhShQhFhShShFhSiDhFhShQjWhFhShShFhShQhLhFhShQjUjIjJjThOjTjDjSjJjQjUiWjFjSjTjJjPjOhFhShQhLhFhShQhFhShShFhViDhFhViDjShFhViDhFhViDjShFhShShFhShQhLhFhShQjUjIjJjThOjTjDjSjJjQjUiDjPjQjZjSjJjHjIjUhFhShQhLhFhShQhFhShShFhViDhFhViDjShFhShShFhShQhLhFhShQjUjIjJjThOjTjDjSjJjQjUiIjPjNjFjQjBjHjFhFhShQhLhFhShQhFhShShFhViDhFhViDjShFhViDhFhViDjShFhShShFhShQhLhFhShQjVjUjJjMjThOjMjPjDhFhShYjUjIjJjThOjTjDjSjJjQjUiEjFjTjDjSjJjQjUjJjPjOhFhShZhFhXiEhFhTiChFhShQhFhShQhFhShQhFhShQhFhShQhFhShQhFhShQhFhShQhFhQiEhFhQiBhFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQhPhPhFhShQiFjSjSjPjSjThFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjSjFjRjVjJjSjFjNjFjOjUiFjSjShFhShQhFhTiEhFhShQhFhXiCjFjOhFhTiBhFhShSiUjIjJjThFhShQjTjDjSjJjQjUhFhShQjSjFjRjVjJjSjFjThFhShQiBjGjUjFjShFhShQiFjGjGjFjDjUjThFhShQiDiThUhFhShQjPjShFhShQjMjBjUjFjShOhFhShShFhSiDhFhShQjGjShFhTiBhFhShSiDjFhFhShQjTjDjSjJjQjUhFhShQjOhFiFhZjDjFjTjTjJjUjFhFhShQiBjGjUjFjShFhShQiFjGjGjFjDjUjThFhShQiDiThUhFhShQjPjVhFhShQjTjVjQhFiFhZjSjJjFjVjShOhFhShShFhXiEhFhTiChFhShQhFhShQhFhShQhFhShQhFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjOjPiDjPjNjQiFjSjShFhShQhFhTiEhFhShQhFhXiCjFjOhFhTiBhFhShSiBhFhShQjDjPjNjQhFhShQjNjVjTjUhFhShQjCjFhFhShQjBjDjUjJjWjFhOhFhShShFhSiDhFhShQjGjShFhTiBhFhShSiVjOjFhFhShQjDjPjNjQjPjTjJjUjJjPjOhFhShQjEjPjJjUhFhShQhFiFiBjUjSjFhFhShQjBjDjUjJjWjFhOhFhShShFhXiEhFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjOjPiMjBjZjFjSjTiFjSjShFhShQhFhTiEhFhShQhFhXiCjFjOhFhTiBhFhShSiTjFjMjFjDjUhFhShQjBjUhFhShQjMjFjBjTjUhFhShQjUjXjPhFhShQjMjBjZjFjSjThOhFhShShFhSiDhFhShQjGjShFhTiBhFhShSiThFiFhZjMjFjDjUjJjPjOjOjFjahFhShQjBjVhFhShQjNjPjJjOjThFhShQjEjFjVjYhFhShQjDjBjMjRjVjFjThOhFhShShFhXiEhFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjEjVjSjJjOjHiQjSjPjDjFjTjTiFjSjShFhShQhFhTiEhFhShQhFhXiCjFjOhFhTiBhFhShSiBjOhFhShQjFjSjSjPjShFhShQjPjDjDjVjSjSjFjEhFhShQjXjIjJjMjFhFhShQjBjDjDjFjTjTjJjOjHhFhShQjUjSjBjOjTjGjPjSjNhFhShQjQjSjPjQjFjSjUjJjFjThFhShQjPjGhFhShQjTjFjMjFjDjUjFjEhFhShQjMjBjZjFjSjThOhFhShShFhSiDhFhShQjGjShFhTiBhFhShSiVjOjFhFhShQjFjSjSjFjVjShFhShQjThFhShXjFjTjUhFhShQjQjSjPjEjVjJjUjFhFhShQjMjPjSjThFhShQjEjFhFhShQjMhFhShXjBjDjDhFiFhYjThFhShQjBjVjYhFhShQjQjSjPjQjSjJhFiFhZjUhFiFhZjThFhShQjEjFhFhShQjUjSjBjOjTjGjPjSjNjBjUjJjPjOhFhShQjEjFjThFhShQjDjBjMjRjVjFjThFhShQjThFiFhZjMjFjDjUjJjPjOjOhFiFhZjThOhFhShShFhXiEhFhTiChFhQiEhFhQiBhFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQhPhPhFhShQiViJhFhShQjTjUjSjJjOjHjThFhShQhFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjBjCjPjVjUiCjUjOiOjBjNjFhFhShQhFhTiEhFhShQhFhShShFhTiGhFhShShFhTiChFhQiEhFhQiBhFhShQhFhShQhFhShQhFhShQjUjIjJjThOjSjVjOiCjUjOiOjBjNjFhFhShQhFhTiEhFhShQhFhXiCjFjOhFhTiBhFhShSiSjVjOhFhShShFhSiDhFhShQjGjShFhTiBhFhShShFiDhZjYhFiFhZjDjVjUjFjShFhShShFhXiEhFhTiChFhQiEhFhQiBhFhShQffffJLnABXzHjCjVjJjMjEiViJDfezEjUjIjJjTEfNyBnAMLbyBn0AhPJOnASzDjQjBjMFAdCzKjJjOjTjUjBjOjDjFjPjGGVzHjUjIjJjTiPjCjKHfCjzFiQjBjOjFjMIfnnVHfCEjzGiXjJjOjEjPjXJfREFeHjQjBjMjFjUjUjFXzLjTjDjSjJjQjUiUjJjUjMjFKfeEfjzJjVjOjEjFjGjJjOjFjELfWzGiPjCjKjFjDjUMBzKjSjFjTjJjajFjBjCjMjFNFctftnftJRnASzDjSjFjTOBne2iUhLjHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAjHjShRhahAiHjSjPjVjQhAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjBjCjPjVjUiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2jTiR2kOiOhHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhUhVhMhShQidhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAjQjOjMhahAiQjBjOjFjMhAjbhAjUjZjQjFhahHjUjBjCjCjFjEjQjBjOjFjMhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjQjOjMhRhahAiQjBjOjFjMhAjbhAjUjZjQjFhahHjUjBjChHhMhAjUjFjYjUhahH2iNiP2jOjfhHhMhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiPjGjGjTjFjUiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiYhA2iPiQ2nbjZhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiPjGjGjTjFjUiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiZhA2iPiQ2nbjZhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiPjGjGjTjFjUiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiahA2iPiQ2nbjZhahHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiPjGjGjTjFjUiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjNjJjOjWjBjMjVjFhahNhRhQhQhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiPjGjGjTjFjUiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiPjGjGjTjFjUiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjNjJjOjWjBjMjVjFhahNhRhQhQhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiPjGjGjTjFjUiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShThahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiPjGjGjTjFjUiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjNjJjOjWjBjMjVjFhahNhRhQhQhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiPjGjGjTjFjUiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShUhahAiHjSjPjVjQhAjbhAjBjMjJjHjOjNjFjOjUhahHjGjJjMjMhHhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjTjMjJjEjFjSiSjBjOjHjFiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2mRjO2iXiX2DkD2nUiWhHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjQjOjMhShahAiQjBjOjFjMhAjbhAjUjZjQjFhahHjUjBjChHhMhAjUjFjYjUhahH2mLjF2jMkPhHhMhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiSjPjUjBjUjJjPjOiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiYhA2mLjF2jMkPhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiSjPjUjBjUjJjPjOiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiZhA2mLjF2jMkPhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiSjPjUjBjUjJjPjOiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiahA2JkQ2nJjChahHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiSjPjUjBjUjJjPjOiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjNjJjOjWjBjMjVjFhahNhRhQhQhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiSjPjUjBjUjJjPjOiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiSjPjUjBjUjJjPjOiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjNjJjOjWjBjMjVjFhahNhRhQhQhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiSjPjUjBjUjJjPjOiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShThahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiSjPjUjBjUjJjPjOiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjNjJjOjWjBjMjVjFhahNhRhQhQhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiSjPjUjBjUjJjPjOiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShUhahAiHjSjPjVjQhAjbhAjBjMjJjHjOjNjFjOjUhahHjGjJjMjMhHhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjTjMjJjEjFjSiSjBjOjHjFiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2mRjO2iXiX2DkD2nUiWhHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjQjOjMhThahAiQjBjOjFjMhAjbhAjUjZjQjFhahHjUjBjChHhMhAjUjFjYjUhahH2hJjf2hejFhHhMhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiTjDjBjMjFiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiYhA2hJjf2hejF2iPiQ2nbjZhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiTjDjBjMjFiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiZhA2hJjf2hejF2iPiQ2nbjZhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjPjQjBjDjJjUjZiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahH2PkQ2OjG2iPiQ2nbjZhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjPjPiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjWjJjTjJjCjMjFhajGjBjMjTjFhMhAjUjFjYjUhahHjGjPjPhahHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiTjDjBjMjFiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjNjJjOjWjBjMjVjFhahNhRhQhQhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiTjDjBjMjFiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiTjDjBjMjFiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjNjJjOjWjBjMjVjFhahNhRhQhQhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiTjDjBjMjFiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShThahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjPjQjBjDjJjUjZiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjPjQjBjDjJjUjZiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShUhahAiHjSjPjVjQhAjbhAjBjMjJjHjOjNjFjOjUhahHjGjJjMjMhHhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjTjMjJjEjFjSiSjBjOjHjFiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2mRjO2iXiX2DkD2nUiWhHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjQjOjMhUhahAiQjBjOjFjMhAjbhAjUjZjQjFhahHjUjBjChHhMhAjUjFjYjUhahH2kPkW2hajH2iNiP2jOjfhHhMhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiSjBjOjEjPjNiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiYhA2kPkW2hajHhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiSjBjOjEjPjNiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiZhA2kPkW2hajHhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiSjBjOjEjPjNiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiahA2kPkW2hajHhahHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiSjBjOjEjPjNiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiSjBjOjEjPjNiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiSjBjOjEjPjNiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiSjBjOjEjPjNiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShThahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiSjBjOjEjPjNiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiSjBjOjEjPjNiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShUhahAiHjSjPjVjQhAjbhAjBjMjJjHjOjNjFjOjUhahHjGjJjMjMhHhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjTjMjJjEjFjSiSjBjOjHjFiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2mRjO2iXiX2DkD2nUiWhHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjQjOjMhVhahAiQjBjOjFjMhAjbhAjUjZjQjFhahHjUjBjChHhMhAjUjFjYjUhahH2kPkW2hajH2mLjF2jMkPhHhMhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiSjBjOjEjPjNiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiYhA2kPkW2hajHhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiSjBjOjEjPjNiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiZhA2kPkW2hajHhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhRhYidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiSjBjOjEjPjNiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiahA2kPkW2hajHhahHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiSjBjOjEjPjNiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjYiSjBjOjEjPjNiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiSjBjOjEjPjNiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjZiSjBjOjEjPjNiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShThahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiSjBjOjEjPjNiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjaiSjBjOjEjPjNiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShUhahAiHjSjPjVjQhAjbhAjBjMjJjHjOjNjFjOjUhahHjGjJjMjMhHhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjTjMjJjEjFjSiSjBjOjHjFiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2mRjO2iXiX2DkD2nUiWhHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjQjOjMhWhahAiQjBjOjFjMhAjbhAjUjZjQjFhahHjUjBjChHhMhAjUjFjYjUhahH2nAiW2jQjFhHhMhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjGjJjMjMhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjBjDjUjPjSiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahH2nAiW2jQjFhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhShQidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjPjPiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjWjJjTjJjCjMjFhajGjBjMjTjFhMhAjUjFjYjUhahH2iPiQ2nbjZhahHhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhNhRhMhShQidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjPjPiTjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjWjJjTjJjCjMjFhajGjBjMjTjFhMhAjUjFjYjUhahHiahA2kPkW2hajHhahHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShRhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjBjDjUjPjSiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjNjJjOjWjBjMjVjFhahQhOhXhVhMhAjNjBjYjWjBjMjVjFhahRhOhVhMhAjWjBjMjVjFhahRhOhQhMhAjTjUjFjQjEjFjMjUjBhahQhOhQhRhMhAjKjVjNjQjEjFjMjUjBhahQhOhShMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjBjDjUjPjSiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhRhOhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShShahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjPjPiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjWjJjTjJjCjMjFhajGjBjMjTjFhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjPjPiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjWjJjTjJjCjMjFhajGjBjMjTjFhMhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShThahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjPjPiTjDjMhahAiTjDjSjPjMjMjCjBjShAjbhAjWjJjTjJjCjMjFhajGjBjMjTjFhMhAjNjJjOjWjBjMjVjFhahNhRhQhQhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjGjPjPiFjUhahAiFjEjJjUiUjFjYjUhAjbhAjWjJjTjJjCjMjFhajGjBjMjTjFhMhAjUjFjYjUhahHhQhHhMhAjDjIjBjSjBjDjUjFjSjThahVhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjHjShShUhahAiHjSjPjVjQhAjbhAjBjMjJjHjOjNjFjOjUhahHjGjJjMjMhHhMhAjBjMjJjHjOiDjIjJjMjEjSjFjOhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjTjMjJjEjFjSiSjBjOjHjFiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2mRjO2iXiX2DkD2nUiWhHhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAhAhAhAhAjdhAKhAhAhAhAhAhAhAhAjdftJlKnABXzCjHjSPfVFfAEXzDjBjEjEQfVFfARBVOfBffnfJlMnABXzPjGjPjSjFjHjSjPjVjOjEiDjPjMjPjSRfXzIjHjSjBjQjIjJjDjTSfXzJjYiPjGjGjTjFjUiFjUTfXzEjHjShShRUfXzDjHjShSVfXzEjQjOjMhRWfXzDjQjOjMXfXPfVFfABXRfXSfXzJjZiPjGjGjTjFjUiFjUYfXzEjHjShShSZfXVfXWfXXfXPfVFfABXRfXSfXzJjaiPjGjGjTjFjUiFjUgafXzEjHjShShTgbfXVfXWfXXfXPfVFfABXRfXSfXzLjYiSjPjUjBjUjJjPjOiFjUgcfXUfXVfXzEjQjOjMhSgdfXXfXPfVFfABXRfXSfXzLjZiSjPjUjBjUjJjPjOiFjUgefXZfXVfXgdfXXfXPfVFfABXRfXSfXzLjaiSjPjUjBjUjJjPjOiFjUgffXgbfXVfXgdfXXfXPfVFfABXRfXSfXzIjYiTjDjBjMjFiFjUhAfXUfXVfXzEjQjOjMhThBfXXfXPfVFfABXRfXSfXzIjZiTjDjBjMjFiFjUhCfXZfXVfXhBfXXfXPfVFfABXRfXSfXzJjPjQjBjDjJjUjZiFjUhDfXgbfXVfXhBfXXfXPfVFfABXRfXSfXzJjYiSjBjOjEjPjNiFjUhEfXUfXVfXzEjQjOjMhUhFfXXfXPfVFfABXRfXSfXzJjZiSjBjOjEjPjNiFjUhGfXZfXVfXhFfXXfXPfVFfABXRfXSfXzJjaiSjBjOjEjPjNiFjUhHfXgbfXVfXhFfXXfXPfVFfABXRfXSfXhEfXUfXVfXzEjQjOjMhVhIfXXfXPfVFfABXRfXSfXhGfXZfXVfXhIfXXfXPfVFfABXRfXSfXhHfXgbfXVfXhIfXXfXPfVFfABXRfXSfXzIjGjBjDjUjPjSiFjUhJfXUfXVfXzEjQjOjMhWhKfXXfXPfVFfAEXzGjOjFjXiQjFjOhLfXSfVFfARDXzLiTiPiMiJiEifiDiPiMiPiShMfXzJiCjSjVjTjIiUjZjQjFhNfXSfVFfAARDFdAFdAFdAfFdBffnfnfnfnfnfnfnfnfnfnfnfnfnfnfnfnfJldnAEXzGjMjBjZj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")
    }
    function aggr_layersSelector(){
        eval("@JSXBIN@ES@2.0@MyBbyBn0AEJLnASzQiOjUjIiMjBjZjFjSiUjPiTjFjMjFjDjUByBndCftJOnASzEjQjSjPjKCyBXzHjQjSjPjKjFjDjUDfjzDjBjQjQEfnftJPnASzHjVjOjEjPiTjUjSFyBneSiOjUjIhAiMjBjZjFjShAiTjFjMjFjDjUjPjSftOQbRn0ACJRnASzGjNjZiDjPjNjQGyBXzKjBjDjUjJjWjFiJjUjFjNHfXDfjEfnftOTbVn0ACJVnASByBEjzGjQjSjPjNjQjUIfRCFeJ2jAiP2nTjA2gaiZ2Ric2iCic2JkQ2AiO2iCichfVBfyBffnffOXbZn0ADJZnAEXzOjCjFjHjJjOiVjOjEjPiHjSjPjVjQJfjEfRBVFfyBffOgabgbn0ACJgbnASzIjNjZiMjBjZjFjSjTKyBXzOjTjFjMjFjDjUjFjEiMjBjZjFjSjTLfVGfyBnftagdbygfn0ABOgfbyhAn0ABJhAnABXzIjTjFjMjFjDjUjFjEMfQzANfVKfyBjzBjJOfnctfACzChdhdPCzBhFQjOfVBfyBnnnndAbyhCn0ABJhCnABXMfQNfVKfyBjOfncffAjOfACzBhNRXzGjMjFjOjHjUjISfVKfyBnndBByBzChchdTACzChBhdUXSfXLfVGfyBnndAbhGn0ACJhGnASKyBXzGjMjBjZjFjSjTVfVGfyBnftahHbyhJn0ABOhJbyhKn0ABJhKnABXMfQNfVKfyBjOfnctfACPCQCRjOfnndBVBfyBnnnndAbyhMn0ABJhMnABXMfQNfVKfyBjOfncffAjOfBXSfVKfyBByBTJhQnAEXzMjFjOjEiVjOjEjPiHjSjPjVjQWfjEfnfAVBfyBnAUzChGhGXCUVGfyBnnbCzKjJjOjTjUjBjOjDjFjPjGYVGfyBjzIiDjPjNjQiJjUjFjNZfnnnnbyhTn0ABJhTnAEjzFjBjMjFjSjUgafRBFehPiQjMjFjBjTjFhAjTjFjMjFjDjUhAjBjOhAjBjDjUjJjWjFhAjDjPjNjQhAjUjPhAjVjTjFhAjUjIjJjThAjTjDjSjJjQjUffAVCfyBbyhYn0ABJhYnAEjgafRBFehPiQjMjFjBjTjFhAjPjQjFjOhAjBhAjQjSjPjKjFjDjUhAjGjJjSjTjUhAjUjPhAjVjTjFhAjUjIjJjThAjTjDjSjJjQjUhOffAFB40BiAC4B0AiAF4C0AiAG4D0AiAK4E0AiAAFANByB")
    }
    function aggr_randomLayersSelector(){
        eval("@JSXBIN@ES@2.0@MyBbyBnABMRbyBn0ABOSbTn0AGJTnASzIjNjZiMjBjZjFjSjTBAXzOjTjFjMjFjDjUjFjEiMjBjZjFjSjTCfjzGjNjZiDjPjNjQDfnftJUnABjzDjNjJjOEfndAfJVnABjzDjNjBjYFfCzBhNGXzGjMjFjOjHjUjIHfVBfAnndBnfJWnASzIjNjZiSjBjOjEjPjNIBEjzFiBjSjSjBjZJfntnftaXbYn0ACJYnABQzAKfVIfBjzBjJLfEXzFjSjPjVjOjEMfjzEiNjBjUjINfRBCzBhLOjEfCzBhKPCGjFfjEfnnEXzGjSjBjOjEjPjNQfjNfnfnnnnffnfJZnABXzIjTjFjMjFjDjUjFjERfQKfVBfAjLfncffAjLfACGXHfVBfAnndBByBzChchdSagbbygcn0ABJgcnABXRfQKfVBfAQKfVIfBjzBjKTfnctfAjTfACGXHfVIfBnndBByBSACzChBhdUXHfXCfjDfnndAbgfn0AGJgfnASBAXzGjMjBjZjFjSjTVfjDfnftJhAnABjEfndBfJhBnABjFfXHfVBfAnfJhCnASIBEjJfntnftahDbhEn0ACJhEnABQKfVIfBCGjLfnndBEXMfjNfRBCOjEfCPCGjFfjEfnnEXQfjNfnfnnnnffnfJhFnABXRfQKfVBfAjLfncffAjLfBXHfVBfAByBSahHbyhIn0ABJhInABXRfQKfVBfAQKfVIfBjTfnctfAjTfACGXHfVIfBnndBByBSACB40BiAI4B0AiAACAzSjTjFjMjFjDjUiSjBjOjEjPjNiMjBjZjFjSjTWAhLDJhOnASzEjQjSjPjKXyBXzHjQjSjPjKjFjDjUYfjzDjBjQjQZfnftJhPnASzHjVjOjEjPiTjUjSgayBneViSjBjOjEjPjNhAiMjBjZjFjShAiTjFjMjFjDjUjPjSftOhQbhRn0ACJhRnASDyBXzKjBjDjUjJjWjFiJjUjFjNgbfXYfjZfnftOhTbhVn0AEJhVnASzJjNjZiQjFjSjDjFjOjUgcyBndBftJhWnASzMjNjZiQjSjPjNjQjUiUjFjYjUgdyBnehT2jAiP2nTjA2kPkW2hajH2JkQ2nJjC2gaiZ2Ric2iCic2gfnfhAhAhAhAhAhA2kTkP2jFiRhR2gaiP2JkQ2nJjC2mdje2hHiZ2gaiZ2jQjF2iCichMhAhS2JkQ2nJjC2gaiZ2jQjF2iCichMhAhThA2JkQ2nJjC2Ric2jQjF2iCichMhU2JkQ2nJjC2kIif2Ric2iCicftJhYnASgcyBEjzGjQjSjPjNjQjUgefRCVgdfyBVgcfyBffnffOhabyhbn0ABOhbbhdn0ADJhdnAEXzOjCjFjHjJjOiVjOjEjPiHjSjPjVjQgffjZfRBVgafyBffahfbyiAn0ABJiAnAEjWfnfAjzBjHhAfACGEjzIjQjBjSjTjFiJjOjUhBfRBVgcfyBffnndBByBSJiCnAEXzMjFjOjEiVjOjEjPiHjSjPjVjQhCfjZfnfAUzChGhGhDCzChehdhEEjhBfRBVgcfyBffnndACSEjhBfRBVgcfyBffnndEnnbyiEn0ABJiEnAEjzFjBjMjFjSjUhFfRBFeL2nXkL2kTkP2jFiRhRhA2hQiShU2kEjW2jQjF2iXibhOffAVgcfyBnAUhDCUVDfyBnnbCzKjJjOjTjUjBjOjDjFjPjGhGVDfyBjzIiDjPjNjQiJjUjFjNhHfnnnnbyiIn0ABJiInAEjhFfRBFeO2jfiP2hIjV2mZkP2hKiO2gakB2hMjH2nXkL2mAjP2hbjN2AiO2hKiO2IiU2QjChOffAVXfyBbyiNn0ABJiNnAEjhFfRBFeP2jfiP2hIjV2mZkP2hKiO2gakB2hMjH2nXkL2iIiR2mAjP2hbjN2AiO2hKiO2nFid2LjahOffAFgc4D0AiAgd4E0AiAX40BiAga4B0AiAD4C0AiAAFAKByB")
    }
    function aggr_layersSortor(){
        eval("@JSXBIN@ES@2.0@MyBbyBn0ABbhUnABMhUbyBnADMjFbyBn0ABZjHnAXzCjFjOBfVzGjTjUjSiWjBjSCf0ABC40BhAB0AzWjSjEifiLjJjOjEjBiTjPjSjUjBifjMjPjDjBjMjJjajFDAjIMjYbyBn0ADJjanASzDjQjBjMEAdCzKjJjOjTjUjBjOjDjFjPjGFVzHjUjIjJjTiPjCjKGfEjzFiQjBjOjFjMHfnnVGfEEjzGiXjJjOjEjPjXIfREFeHjQjBjMjFjUjUjFXzKjTjDjSjJjQjUiOjBjNjFJfjzRjSjEifiLjJjOjEjBiTjPjSjUjBiEjBjUjBKfjzJjVjOjEjFjGjJjOjFjELfWzGiPjCjKjFjDjUMBzKjSjFjTjJjajFjBjCjMjFNFctftnftOjcbjen0ATJjenASzDjSjFjTOBCzBhLPCPCPCPCPCPCPCPCPCPCPCPCPCPnEjDfRBXzHjTjUjSiIjFjMjQQfjKfffenGjHjSjPjVjQhAjbhAKJJJJJjPjSjJjFjOjUjBjUjJjPjOhahHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJjIjFjBjEjFjShahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjCjPjLjFhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahH2jTiR2kOiOhHhMhAjNjBjYjJjNjVjNiTjJjajFhaibhWhQhMhShVidhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJJjIjFjMjQhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHnnnekWhHhMhAjNjBjYjJjNjVjNiTjJjajFhaibhWhQhMhShVidhMhAjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJjdhMhAKJJJJJjShRhahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjBjGjGjFjDjUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHEjDfRBXzJjTjUjSiBjGjGjFjDjURfjKfffnnnnehZhHhAjdhMhAKJJJJJJjBjGjGjFjDjUiPjQjUjThahAiEjSjPjQiEjPjXjOiMjJjTjUhAjbhAjQjSjPjQjFjSjUjJjFjThajbjJjUjFjNjThaEjDfRBXzNjTjUjSiBjGjGjFjDjUiPjQjUjTSfjKfffnnnnejejdhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhAjdhMhAKJJJJJjdhMhAKJJJJJjShShahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjPjSjEjFjSiCjZhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHEjDfRBXzKjTjUjSiPjSjEjFjSiCjZTfjKfffnnnnehahHhAjdhMhAKJJJJJJjPjSjEjFjSiCjZiPjQjUjThahAiEjSjPjQiEjPjXjOiMjJjTjUhAjbhAjQjSjPjQjFjSjUjJjFjThajbjJjUjFjNjThaEjDfRBXzOjTjUjSiPjSjEjFjSiCjZiPjQjUjTUfjKfffnnnnejcjdhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhAjdhMhAKJJJJJjdhMhAKJJJJJjShThahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAKJJJJJJjSjFjWjFjSjTjFhahAiDjIjFjDjLjCjPjYhAjbhAjUjFjYjUhahHEjDfRBXzLjTjUjSiSjFjWjFjSjTjFjEVfjKfffnnnnejDhHhAjdhMhAKJJJJJjdhMhAKJJJJJjDjNjEjThahAiHjSjPjVjQhAjbhAKJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjSjJjHjIjUhHhMhHjUjPjQhHidhMhAKJJJJJJjTjPjSjUiCjUjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHEjDfRBXzHjTjUjSiTjPjSjUWfjKfffnnnneUhHhAjdhMhAKJJJJJjdhMhAKJJJJjdnftJkZnABXzDjHjSjQXfVEfAEXzDjBjEjEYfVEfARBVOfBffnfJkcnASzGjXjJjOiHjGjYZCX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")
    }
    function aggr_bake(){
        eval("@JSXBIN@ES@2.0@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hMAAnnftJjPnABXhNfVhMfACLCLCLChEXhNfVzEjSjFjGhRiFfBXhNfVzEjSjFjGhSiGfCnnChEXhSfViFfBXhYfViGfCnnnnChEXhWfViFfBXhcfViGfCnnnnChEXhXfViFfBXiAfViGfCnnnnnfJjQnABXhSfVhMfACLCLCLChEXhNfViFfBXhSfViGfCnnChEXhSfViFfBXhZfViGfCnnnnChEXhWfViFfBXhdfViGfCnnnnChEXhXfViFfBXiBfViGfCnnnnnfJjRnABXhWfVhMfACLCLCLChEXhNfViFfBXhWfViGfCnnChEXhSfViFfBXhafViGfCnnnnChEXhWfViFfBXhefViGfCnnnnChEXhXfViFfBXiCfViGfCnnnnnfJjSnABXhXfVhMfACLCLCLChEXhNfViFfBXhXfViGfCnnChEXhSfViFfBXhbfViGfCnnnnChEXhWfViFfBXhffViGfCnnnnChEXhXfViFfBXiDfViGfCnnnnnfJjUnABXhYfVhMfACLCLCLChEXhYfViFfBXhNfViGfCnnChEXhZfViFfBXhYfViGfCnnnnChEXhafViFfBXhcfViGfCnnnnChEXhbfViFfBXiAfViGfCnnnnnfJjVnABXhZfVhMfACLCLCLChEXhYfViFfBXhSfViGfCnnChEXhZfViFfBXhZfViGfCnnnnChEXhafViFfBXhdfViGfCnnnnChEXhbfViFfBXiBfViGfCnnnnnfJjWnABXhafVhMfACLCLCLChEXhYfViFfBXhWfViGfCnnChEXhZfViFfBXhafViGfCnnnnChEXhafViFfBXhefViGfCnnnnChEXhbfViFfBXiCfViGfCnnnnnfJjXnABXhbfVhMfACLCLCLChEXhYfViFfBXhXfViGfCnnChEXhZfViFfBXhbfViGfCnnnnChEXhafViFfBXhffViGfCnnnnChEXhbfViFfBXiDfViGfCnnnnnfJjZnABXhcfVhMfACLCLCLChEXhcfViFfBXhNfViGfCnnChEXhdfViFfBXhYfViGfCnnnnChEXhefViFfBXhcfViGfCnnnnChEXhffViFfBXiAfViGfCnnnnnfJjanABXhdfVhMfACLCLCLChEXhcfViFfBXhSfViGfCnnChEXhdfViFfBXhZfViGfCnnnnChEXhefViFfBXhdfViGfCnnnnChEXhffViFfBXiBfViGfCnnnnnfJjbnABXhefVhMfACLCLCLChEXhcfViFfBXhWfViGfCnnChEXhdfViFfBXhafViGfCnnnnChEXhefViFfBXhefViGfCnnnnChEXhffViFfBXiCfViGfCnnnnnfJjcnABXhffVhMfACLCLCLChEXhcfViFfBXhXfViGfCnnChEXhdfViFfBXhbfViGfCnnnnChEXhefViFfBXhffViGfCnnnnChEXhffViFfBXiDfViGfCnnnnnfJjenABXiAfVhMfACLCLCLChEXiAfViFfBXhNfViGfCnnChEXiBfViFfBXhYfViGfCnnnnChEXiCfViFfBXhcfViGfCnnnnChEXiDfViFfBXiAfViGfCnnnnnfJjfnABXiBfVhMfACLCLCLChEXiAfViFfBXhSfViGfCnnChEXiBfViFfBXhZfViGfCnnnnChEXiCfViFfBXhdfViGfCnnnnChEXiDfViFfBXiBfViGfCnnnnnfJkAnABXiCfVhMfACLCLCLChEXiAfViFfBXhWfViGfCnnChEXiBfViFfBXhafViGfCnnnnChEXiCfViFfBXhefViGfCnnnnChEXiDfViFfBXiCfViGfCnnnnnfJkBnABXiDfVhMfACLCLCLChEXiAfViFfBXhXfViGfCnnChEXiBfViFfBXhbfViGfCnnnnChEXiCfViFfBXhffViGfCnnnnChEXiDfViFfBXiDfViGfCnnnnnfZkDnAVhMf0ADiF40BhAiG4B0AhAhM40BiACBAzOjNjBjUjSjJjYiNjVjMjUjJjQjMjZiHAkEMkGbyBn0AJJkInAShMAAnnftJkKnABjzFjUjIjFjUjBiIfhzBhNiJEXzEjBjTjJjOiKfjhIfRBXhWfVzDjNjBjUiLfBffnfJkLnABjzIjDjPjTiUjIjFjUjBiMfEXhPfjhIfRBjiIfffnfJkMnABjiIfhiJEjhJfRBjiIfffnfOkObkQn0AIJkQnABjzFjUjFjNjQiYiNfChGXhefViLfBjiMfnnnfJkRnABjzFjUjFjNjQiZiOfChGhiJXhafViLfBjiMfnnnfJkTnABjzDjQjIjJiPfEXzFjBjUjBjOhSiQfjhIfRCjiOfjiNfffnfJkUnABjiPfEjhJfRBjiPfffnfJkWnABjiNfChGXhNfVi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")
    }
    function aggr_scaleComposition(){
        eval("@JSXBIN@ES@2.1@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PiCjVjUjUjPjOhAjbhAjUjFjYjUhahHiOjFjXhAiDjPjNjQhAiIjFjJjHjIjUhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhAjdhMhAKJJJJJJJjUjFjYjUifjJjOjQjVjUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHhRhOhQhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAjQjSjFjGjFjSjSjFjEiTjJjajFhaibhYhQhMhShQidhAjdhMhAKJJJJJJjdhMhAKJJJJJJjDjNjEjThahAiHjSjPjVjQhAjbhAKJJJJJJJjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJJjPjLiCjVjUjUjPjOhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHiTjDjBjMjFhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJJjdhMhAKJJJJJjdftJldnABXzHjNjBjSjHjJjOjTiBfVhZfAAREFdKFdKFdKFdKfnfJlenABXzDjHjSjQiCfVhZfAEXzDjBjEjEiDfVhZfARBViAfBffnfJmBnASzGjXjJjOiHjGjYiECXzIjHjSjBjQjIjJjDjTiFfVhZfAnftJmCnASzOjEjBjSjLiDjPjMjPjSiCjSjVjTjIiGDEXzGjOjFjXiQjFjOiHfViEfCRDXzLiTiPiMiJiEifiDiPiMiPiSiIfXzJiCjSjVjTjIiUjZjQjFiJfViEfCARDFdAFdAFdAfFdBffnftJmDnABXzPjGjPjSjFjHjSjPjVjOjEiDjPjMjPjSiKfXiFfXCfXhGfXiCfVhZfAViGfDnfJmFnABXzHjPjOiDjMjJjDjLiLfXhBfXhGfXiCfVhZfAjGfnfJmGnABXiLfXhDfXhGfXiCfVhZfAjVfnfJmHnABXiLfXzMjIjFjJjHjIjUiCjVjUjUjPjOiMfXhGfXiCfVhZfAjXfnfJmKnABXzIjPjOiDjIjBjOjHjFiNfXCfXhGfXiCfVhZfAjhEfnfJmMnABXiLfXzIjPjLiCjVjUjUjPjOiOfXzEjDjNjEjTiPfXiCfVhZfAjhYfnfJmOnABXzKjPjOiSjFjTjJjajJjOjHiQfVhZfABXzIjPjOiSjFjTjJjajFiRfVhZfANyBnAMmObyBn0ABJmOnAEXzGjSjFjTjJjajFiSfXzGjMjBjZjPjVjUiTfeEfnf0DzAiUCmOnfnfACzChBhdiVVhZfAnnbnZmRnAVhZf0AFhZ40BiAiE4C0AiAiG4D0AiAiA4B0AiAha40BhABEAzOiCjVjJjMjEiBjOjEiTjIjPjXiViJiWAmSMmZbyBn0ABambbmcn0AFJmcnASzIjDjVjSiMjBjZjFjSiXBEXzFjMjBjZjFjSiYfVzHjUjIjFiDjPjNjQiZfDRBVzBjJiafAffnftJmdnASzJjXjBjTiMjPjDjLjFjEibCXzGjMjPjDjLjFjEicfViXfBnftJmenABXicfViXfBncffOmfbynAn0ABJnAnABXDfViXfBVzJjOjFjXiQjBjSjFjOjUidfEnfAUzChGhGieCiVViXfBVidfEnnCNXDfViXfBnnbnnnJnCnABXicfViXfBVibfCnfAViafABXzJjOjVjNiMjBjZjFjSjTiffViZfDByBzChchdjAAFia40BiAiZ40BhAid4B0AhAiX4B0AiAib4C0AiACDAhPAnEMnKbyBn0ABanMbnNn0ACJnNnASiXBEXiYfViZfERBViafAffnftOnObnPn0ACJnPnASzHjDjVjSiajPjPjNjBCXzEjajPjPjNjCfViXfBnftOnQbynRn0ABJnRnAEXhNfVjBfCRBCTXgdfVjBfCVzHjTjDjBjMjFiCjZjDfFnnffACNXzHjOjVjNiLjFjZjTjEfVjBfCnndAbynTn0ABanTbynUn0ABJnUnAEXzNjTjFjUiWjBjMjVjFiBjUiLjFjZjFfVjBfCRCVzBjKjGfDCTEXzIjLjFjZiWjBjMjVjFjHfVjBfCRBVjGfDffVjDfFnnffAVjGfDBXjEfVjBfCByBjAACNXzJjNjBjUjDjIiOjBjNjFjIfViXfBnneRiBiEiCiFhAiDjBjNjFjSjBhAiMjBjZjFjSnAViafABXiffViZfEByBjAAGia40BiAiZ40BhAiX4B0AiAjG4D0AiAjD4B0AhAjB4C0AiACEAhQAnZJJNnASLAneRiTjDjBjMjFhAiDjPjNjQjPjTjJjUjJjPjOftJQnASFBndBftJRnASCCnbftJSnAShBDnbftJTnAShDEnbftJUnASiMFnbftOnfb2ABn0ACJ2ABnAEjKfRCFehQiUjIjJjThAjTjDjSjJjQjUhAjSjFjRjVjJjSjFjThAiBjGjUjFjShAiFjGjGjFjDjUjThAiDiThThAjPjShAjMjBjUjFjShOVLfAffZ2BBnAnACZEjzKjQjBjSjTjFiGjMjPjBjUjJfRBXzHjWjFjSjTjJjPjOjKfjJfffnndInJ2EBnAShZGEjiWfRBVhafHffnftO2FBby2GBn0ABO2GBb2HBn0ACJ2HBnAEXzGjDjFjOjUjFjSjLfVhZfGnfJ2IBnAEXzEjTjIjPjXjMfVhZfGnfACPVhZfGjhcfnnb2KBn0ACJ2KBnAEXiTfXiTfVhZfGRBFctffJ2LBnAEXiSfXiTfVhZfGnfACiVVhZfGnnbby2OBn0ABJ2OBnAEjKfRCFehCiDjPjVjMjEhAjOjPjUhAjPjQjFjOhAjUjIjFhAjVjTjFjShAjJjOjUjFjSjGjBjDjFhOVLfAffAIL40BiAF4B0AiAC4C0AiAhZ4G0AiAhB4D0AiAhD4E0AiAiM4F0AiAha40BhABHAzQiTjDjBjMjFiDjPjNjQjPjTjJjUjJjPjOjNA2QBBJ2TBnAEjjNfRBeEfff0DiUByB")
    }
    function aggr_scaleSelectedLayers(){
        eval("@JSXBIN@ES@2.1@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");
    }
    function aggr_layersRenamer(){
        eval("@JSXBIN@ES@2.1@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EXzIjUjPiTjUjSjJjOjHiQfjiOfnfnnjiNfnnnfOlJbylKn0ABOlKblLn0ACJlLnASheDnctffJlOnAEjhWfRBFeViFjSjSjPjShahAiOjBjNjFhAjUjPjPhAjMjPjOjHhOffACzBheiRXhPfjiHfnndZnAChREjiJfRBXiKfjhVfffnndJnJlRnABjiFfneAfJlSnABjiGfneAfAXKfXVfVhffFnOlXbylXn0ABJlXnABXZfjiCfjiHfnfAhhEVhefDbylan0ABJlanABXhBfXIfVhffFneHhIiFiSiSiPiShJfAhhEVhefDnASiDEChOVhcfCnndBnftCzChehdiSViDfEnndATiDEyBtOlfbylfn0ABJlfnABXhBfXIfVhffFneAfAhhEVhefDnJmAnAEXzMjFjOjEiVjOjEjPiHjSjPjVjQiTfjhVfnfAGha4B0AiAhf40BhAhT40BiAhc4C0AiAhe4D0AiAiD4E0AiABFAgaAmFEJAnABjzEjWjFjSjTiUfneDhRhOhRfJBnASCyBEjzGiXjJjOjEjPjXiVfRDFeHjQjBjMjFjUjUjFChQChQnjiUfePiMjBjZjFjShAiSjFjOjBjNjFhAhIjWnnneBhJAREFd2hMBFdjEFd2kFCFd2kMBfftnftJCnASzBjXiWyBEjhAfnfnftODbyEn0ABJEnAEXiBfViWfyBnfACgfViWfyBnnbnACC40BiAiW4B0AiAACASByB");
    }
    function aggr_rampLight(){
        eval("@JSXBIN@ES@2.1@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tn0DidCjQnfJjRnABXicfXNfViGfDNyBnAMjRbyBn0ABOjSbyjTn0ABJjTnAEjiNfRCARCFdACiEjgdfnndCfARCjgbfCiEjgdfnndCfffAChKEjhDfnfnnctn0DidCjVnfJjWnABXicfXOfViGfDNyBnAMjWbyBn0ABOjXbyjYn0ABJjYnAEjiNfRCARCCiEjgbfnndCCiEjgdfnndCfARCjgbfjgdffffAChKEjhDfnfnnctn0DidCjanfJjbnABXicfXPfViGfDNyBnAMjbbyBn0ABOjcbyjdn0ABJjdnAEjiNfRCARCjgbfCiEjgdfnndCfARCFdACiEjgdfnndCfffAChKEjhDfnfnnctn0DidCjfnfJkAnABXicfXQfViGfDNyBnAMkAbyBn0ABOkBbykCn0ABJkCnAEjiNfRCARCFdAjgdffARCjgbfFdAfffAChKEjhDfnfnnctn0DidCkEnfJkFnABXicfXRfViGfDNyBnAMkFbyBn0ABOkGbykHn0ABJkHnAEjiNfRCARCCiEjgbfnndCjgdffARCCiEjgbfnndCFdAfffAChKEjhDfnfnnctn0DidCkJnfJkKnABXicfXSfViGfDNyBnAMkKbyBn0ABOkLbykMn0ABJkMnAEjiNfRCARCjgbfjgdffARCFdAFdAfffAChKEjhDfnfnnctn0DidCkOnfALhH4F0AiAgb4G0AiAgf4I0AiAhB4J0AiAgd4H0AiAiO40BiAiP4B0AiAI4C0AiAiZ40BhAiG4D0AiAU4E0AiABKAzJiSjBjNjQiMjJjHjIjUieAkPBJkQnAEjiefRBezEjUjIjJjTiffff0DidByB");
    }
    function aggr_360creator(){
        eval("@JSXBIN@ES@1.0@MyBbyBn0ABbWnABMWbyBnAJMiTbyBn0ADJiUnASzDjQjBjMBAdCzKjJjOjTjUjBjOjDjFjPjGCVzHjUjIjJjTiPjCjKDCjzFiQjBjOjFjMEnnVDCEjzGiXjJjOjEjPjXFRDFeHjQjBjMjFjUjUjFXzKjTjDjSjJjQjUiOjBjNjFGjzHiQiOifiEjBjUjBHjzJjVjOjEjFjGjJjOjFjEIftnftOiWbiXn0AMJiXnASzDjSjFjTJBCzBhLKCKCKCKCKCKCKCKCKCKnXzMjNjPjEjFiEjSjPjQiEjPjXjOLjHejMjHjSjPjVjQhAjbhAKJJJJJjPjSjJjFjOjUjBjUjJjPjOhahAhHjDjPjMjVjNjOhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjUjPjQhHidhMhAKJJJJJjNjPjEjFhahAiEjSjPjQiEjPjXjOiMjJjTjUhAjbhAjQjSjPjQjFjSjUjJjFjThajbjJjUjFjNjThannnemYjdhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidjdhMhAKJJJJJjBjOjHjMjFhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahAhHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjBjOjHjMjFiTiUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiQjBjOjPjSjBjNjBhAjBjOjHjMjFhahHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidjdhMhAKJJJJJJjBjOjHjMjFiFiUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHXzMjEjFjGjBjVjMjUiBjOjHjMjFMjHnnnnemThHhMhAjDjIjBjSjBjDjUjFjSjThahUjdhMhAKJJJJJjdhMhAKJJJJJjTjJjEjFjThahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahAhHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjTjJjEjFjTiTiUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiOjVjNjCjFjShAjPjGhAjTjJjEjFjThahHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidjdhMhAKJJJJJJjTjJjEjFjTiFiUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHXzMjEjFjGjBjVjMjUiTjJjEjFjTNjHnnnnemWhHhMhAjDjIjBjSjBjDjUjFjSjThahUjdhMhAKJJJJJjdhMhAKJJJJJjPjWjFjSjMjBjQhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahAhHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjPjWjFjSjMjBjQiTiUhahAiTjUjBjUjJjDiUjFjYjUhAjbhAjUjFjYjUhahHiTjJjEjFhAiPjWjFjSjMjBjQhahHhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidjdhMhAKJJJJJJjPjWjFjSjMjBjQiFiUhahAiFjEjJjUiUjFjYjUhAjbhAjUjFjYjUhahHXzLjTjJjEjFiPjWjFjSjMjBjQOjHnnnne2geBhHhMhAjDjIjBjSjBjDjUjFjSjThahUjdhMhAKJJJJJjdhMhAKJJJJJjMjJjHjIjUiTjIjBjEhahAiHjSjPjVjQhAjbhAjPjSjJjFjOjUjBjUjJjPjOhahAhHjSjPjXhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjUjPjQhHidhMhAKJJJJJJjMjJjHjIjUjTiDjIjFjDjLhahAiDjIjFjDjLjCjPjYhAjbhAjUjFjYjUhahHiBjDjDjFjQjUhAiMjJjHjIjUjThHhAjdhMhAKJJJJJJjTjIjBjEiDjIjFjDjLhahAiDjIjFjDjLjCjPjYhAjbhAjUjFjYjUhahHiTjIjBjEjPjXjThHhAjdhMKJJJJJjdhMhAKJJJJJjGjPjPjUjFjShahAiHjSjPjVjQhAjbhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhAhHjUjPjQhHidhMhAKJJJJJJjBjCjPjVjUhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHXzHjTjUjSiIjFjMjQPjHnnnnekShHhMhAjNjBjYjJjNjVjNiTjJjajFhaibhThVhMhShQidhMhAjBjMjJjHjOjNjFjOjUhaibhHjMjFjGjUhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJJjBjQjQjMjZhahAiCjVjUjUjPjOhAjbhAjUjFjYjUhahHiNjBjLjFhAiQjBjOjPjSjBjNjBhHhMhAjBjMjJjHjOjNjFjOjUhaibhHjGjJjMjMhHhMhHjDjFjOjUjFjShHidhAjdhMhAKJJJJJjdhMhAKJJJJjdnftJjRnABXzDjHjSjQQVBAEXzDjBjEjERVBARBVJBffnfJjSnABXzJjTjFjMjFjDjUjJjPjOSXzEjNjPjEjFTXQVBAndAfJjTnABXzNjQjSjFjGjFjSjSjFjEiTjJjajFUXzHjBjOjHjMjFiTiUVXzFjBjOjHjMjFWXQVBABXUXzJjPjWjFjSjMjBjQiTiUXXzHjPjWjFjSjMjBjQYXQVBAXUXzHjTjJjEjFjTiTiUZXzFjTjJjEjFjTgaXQVBAnfnfJjVnABXzIjPjOiDjIjBjOjHjFgbXzHjBjOjHjMjFiFiUgcXWXQVBAjzSjPjOiBjOjHjMjFiJjOjQjVjUiDjIjBjOjHjFgdnfJjWnABXgbXzHjTjJjEjFjTiFiUgeXgaXQVBAjzSjPjOiTjJjEjFjTiJjOjQjVjUiDjIjBjOjHjFgfnfJjXnABXgbXzJjPjWjFjSjMjBjQiFiUhAXYXQVBAjzUjPjOiPjWjFjSjMjBjQiJjOjQjVjUiDjIjBjOjHjFhBnfJjYnABXgbXTXQVBAjzUjPjOiNjPjEjFiEjSjPjQiEjPjXjOiDjIjBjOjHjFhCnfJjZnABXzHjPjOiDjMjJjDjLhDXzFjBjQjQjMjZhEXzGjGjPjPjUjFjShFXQVBAjzMjNjBjLjFiQjBjOjPjSjBjNjBhGnfJjanABXzHjFjOjBjCjMjFjEhHXYXQVBAncffJjcnABXhDXzFjBjCjPjVjUhIXhFXQVBANyBnAMjcbyBn0ABOjdJjdnAEXzEjTjIjPjXhJXzKjIjFjMjQiXjJjOjEjPjXhKjHnfACCXhKjHjFnnJjenAEjhKnf0DzAhLCjfnfOkCbykDn0ABJkDnABXzPjGjPjSjFjHjSjPjVjOjEiDjPjMjPjShMXzIjHjSjBjQjIjJjDjThNXTXQVBABXhMXhNXgcXWXQVBABXhMXhNXgeXgaXQVBABXhMXhNXhAXYXQVBAEXzGjOjFjXiQjFjOhOXhNVBARDXzLiTiPiMiJiEifiDiPiMiPiShPXzJiCjSjVjTjIiUjZjQjFhQXhNVBAARDFdAFdAFdAfFdBffnfnfnfnfACzChdhdhREXzFjGjMjPjPjShSjzEiNjBjUjIhTRBEjzKjQjBjSjTjFiGjMjPjBjUhURBXzHjWjFjSjTjJjPjOhVjzDjBjQjQhWffffnndInACzChBhdhXVBAnnbnZkKnAVB0ADB40BiAJ4B0AiAD40BhABCAzTjQjUifiQjBjOjPjSjBjNjBifjCjVjJjMjEiViJhYAkLMkNbyBn0ABOkObykPn0ABJkPnABXhHXYXzGjQjBjSjFjOjUhZezEjUjIjJjThancffAChRXzFjJjOjEjFjYhbXSehanndAbykRn0ABJkRnABXhHXYXhZehanctf0DhCAkTMkXbyBn0ABOkYJkYnABXzEjUjFjYjUhcehaXMjHnfAEjzFjJjTiOjBiOhdRBEjzIjQjBjSjTjFiJjOjUheRBXhcehaffffOkZJkZnABXhcehand2jIBfACzBhehfEjheRBXhcehaffnnd2jIBOkaJkanABXhcehandhcfACzBhciAEjheRBXhcehaffnndhcJkbnABXhcehaEjheRBXhcehaffnf0DgdAkcMkebyBn0ABOkfJkfnABXhcehaXNjHnfAEjhdRBEjheRBXhcehaffffOlAJlAnABXhcehandDfACiAEjheRBXhcehaffnndDJlBnABXhcehaEjheRBXhcehaffnf0DgfAlCMlEbyBn0ABOlFJlFnABXhcehaXOjHnfAEjhdRBEjheRBXhcehaffffOlGJlGnABXhcehandAfACiAEjheRBXhcehaffnndAJlHnABXhcehaEjheRBXhcehaffnf0DhBAlIMlLbyBn0ADJlNnASzMjDjBjOiSjVjOiTjDjSjJjQjUiBAnctftJlOnASzKjBjDjUjJjWjFiJjUjFjNiCBXiCXzHjQjSjPjKjFjDjUiDjhWnftOlQbylRn0ABJlRnAEjzFjBjMjFjSjUiERBFehViTjFjMjFjDjUhAjPjOjFhAjMjBjZjFjShAjJjOhAjBhAjDjPjNjQhAjCjFjGjPjSjFhAjSjVjOjOjJjOjHhAjUjIjJ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jSjFjOjDjFjThAjBjOjEhAjNjBjLjFhAjTjVjSjFhAhCiBjMjMjPjXhAiTjDjSjJjQjUjThAjUjPhAiXjSjJjUjFhAiGjJjMjFjThAjBjOjEhAiBjDjDjFjTjThAiOjFjUjXjPjSjLhChAjJjThAjDjIjFjDjLjFjEhOfJhZnABXPVHAneBhffJhanABXkWVHACKXlVVHAnnegahAlJhAhShQhQhWhNhShQhRhQhAiQjBjVjMhAiUjVjFjSjTjMjFjZnfJhbnABXkbVHAne2mWGiUjIjJjThAjTjDjSjJjQjUhAjDjPjOjWjFjSjUjThAjBhAjQjBjOjPjSjBjNjJjDhAjJjNjBjHjFhAjJjOjUjPhAjBhAhTiEhAjDjZjMjJjOjEjFjShAjUjIjBjUhAjDjBjOhAjCjFhAjVjTjFjEhAjBjThAjBhAjCjBjDjLjHjSjPjVjOjEhAjJjOhAjZjPjVjShAjDjPjNjQjPjTjJjUjJjPjOhOKKiIiPiXhAiUiPhAiViTiFhaKhRhOhAiEjSjPjQhAjBhAjQjBjOjPjSjBjNjJjDhAjJjNjBjHjFhAjJjOjUjPhAjZjPjVjShAjNjBjJjOhAjDjPjNjQhAjBjOjEhAjTjFjMjFjDjUhAjJjUhOhAiBhAjUjFjTjUhAjJjNjBjHjFhAjNjBjYjJjNjVjThOjKjQjHhAjJjThAjJjOjDjMjVjEjFjEhAjXjJjUjIhAjUjIjFhAjTjDjSjJjQjUhOKKhShOhAiDjIjPjPjTjFhAjUjIjFhAjTjDjSjJjQjUhAjTjFjUjUjJjOjHjThAhIjTjFjFhAjCjFjMjPjXhJhMhAjUjIjFjOhAjDjMjJjDjLhAiNjBjLjFhAiQjBjOjPjSjBjNjBhAjUjPhAjDjSjFjBjUjFhAjUjIjFhAjQjBjOjPjSjBjNjBhOKKhThOhAiBhAjDjBjNjFjSjBhAjXjJjMjMhAjCjFhAjBjEjEjFjEhAjJjGhAjUjIjFjSjFhAjJjTjOhHjUhAjPjOjFhAjBjMjSjFjBjEjZhOhAiVjTjFhAjUjIjFhAjDjBjNjFjSjBhAjDjPjOjUjSjPjMjThAjUjPhAjMjPjPjLhAjBjSjPjVjOjEhAjJjOjTjJjEjFhAjZjPjVjShAjQjBjOjPjSjBjNjBhOhAiVjTjFhAjUjIjFhAjDjBjNjFjSjBhHjThAiajPjPjNhAjQjSjPjQjFjSjUjZhAjUjPhAjDjIjBjOjHjFhAjUjIjFhAjGjJjFjMjEhAjPjGhAjWjJjFjXhOKKiUjIjFhAjSjFjTjVjMjUjJjOjHhAhTiEhAjDjZjMjJjOjEjFjShAjJjThAjTjDjBjMjFjEhAjUjPhAhShQhQhQhQhFhAjJjOhAjUjIjFhAjDjVjSjSjFjOjUhAjDjPjNjQhMhAjCjPjUjIhAjUjPhAjTjJjNjVjMjBjUjFhAjBhAjEjJjTjUjBjOjUhAjCjBjDjLjHjSjPjVjOjEhMhAjBjOjEhAjTjPhAjZjPjVhAjDjBjOhAjTjBjGjFjMjZhAjNjPjWjFhAjUjIjFhAjDjBjNjFjSjBhAjBjSjPjVjOjEhAjJjOhAhTiEhAjTjQjBjDjFhAjXjJjUjIjPjVjUhAjSjVjOjOjJjOjHhAjJjOjUjPhAjUjIjFhAjTjJjEjFjThOKKiOiPiSiNiBiMhAhPhAiBiMiUhAiNiPiEiFhahAiCjPjUjIhAjNjPjEjFjThAjTjIjPjVjMjEhAjGjJjYhAjJjTjTjVjFjThAjTjPjNjFhAjVjTjFjSjThAjIjBjEhAjXjJjUjIhAjSjFjOjEjFjShAjHjMjJjUjDjIjFjThAjJjOhAjQjSjFjWjJjPjVjThAjWjFjSjTjJjPjOjThOhAiOjPjSjNjBjMhAjJjThAjSjFjDjPjNjNjFjOjEjFjEhMhAjCjVjUhAjUjSjZhAjUjIjFhAjTjMjPjXjFjShAjUjPhAjSjFjOjEjFjShAiBjMjUhAjNjPjEjFhAjJjGhAjZjPjVhAjIjBjWjFhAjBjOjZhAjQjSjPjCjMjFjNjThAjXjJjUjIhAiOjPjSjNjBjMhAjNjPjEjFhOKKiQiBiOiPiSiBiNiBhAiBiOiHiMiFhahAiJjGhAjZjPjVhAjIjBjWjFhAjBhAjGjVjMjMhAjQjBjOjPjSjBjNjBhMhAjMjFjBjWjFhAjUjIjJjThAjBjUhAhThWhQhOhAiNjBjYjJjNjVjThOjKjQjHhAjJjThAjPjOjMjZhAjBhAhRhYhQhAjEjFjHjSjFjFhAjQjBjOjPjSjBjNjBhMhAjTjPhAjJjOhAjUjIjBjUhAjDjBjTjFhAjZjPjVhHjEhAjTjFjUhAjJjUhAjUjPhAhRhYhQhAjUjPhAjHjFjOjFjSjBjUjFhAjBhAjIjBjMjGhAjDjZjMjJjOjEjFjShOKKiOiViNiCiFiShAiPiGhAiTiJiEiFiThahAiUjIjFhAjDjZjMjJjOjEjFjShAjDjSjFjBjUjFjEhAjCjZhAjUjIjJjThAjTjDjSjJjQjUhAjJjTjOhHjUhAjDjVjSjWjFjEhMhAjJjUhHjThAjNjBjEjFhAjVjQhAjPjGhAjBhAjOjVjNjCjFjShAjPjGhAjGjMjBjUhAjTjJjEjFjThOhAiZjPjVhAjNjBjZhAjXjBjOjUhAjUjPhAjJjOjDjSjFjBjTjFhAjUjIjJjThAjWjBjMjVjFhAjJjGhAjZjPjVhAjTjFjFhAjEjJjTjUjPjSjUjJjPjOhAjBjUhAjUjIjFhAjKjPjJjOjThOhAiIjBjWjJjOjHhAjNjPjSjFhAjTjJjEjFjThAjXjJjMjMhAjJjOjDjSjFjBjTjFhAjSjFjOjEjFjShAjUjJjNjFjThOKKiTiJiEiFhAiPiWiFiSiMiBiQhahAiPjOjMjZhAjVjTjFjEhAjJjOhAiBjMjUhAjNjPjEjFhOhAiNjBjLjFjThAjUjIjFhAjDjZjMjJjOjEjFjShAjTjJjEjFjThAjJjOjUjFjSjTjFjDjUhAjUjPhAjQjSjFjWjFjOjUhAjHjBjQjThAjGjSjPjNhAjBjQjQjFjBjSjJjOjHhMhAjFjTjQjFjDjJjBjMjMjZhAjXjIjFjOhAiNjPjUjJjPjOhAiCjMjVjShAjJjThAjPjOhOhAiJjOjDjSjFjBjTjJjOjHhAjUjIjFhAjWjBjMjVjFhAjNjBjZhAjSjFjEjVjDjFhAjHjBjQjThAjXjIjFjOhAjUjIjFjSjFhHjThAjFjYjUjSjFjNjFhAjNjPjUjJjPjOhAjCjMjVjShMhAjCjVjUhAjJjUhAjXjJjMjMhAjCjFhAjTjMjPjXjFjShOhAiUjIjFhAjEjFjGjBjVjMjUhAjWjBjMjVjFhAjTjIjPjVjMjEhAjCjFhAjGjJjOjFhOKKiBiDiDiFiQiUhAiMiJiHiIiUiThAhPhAiTiIiBiEiPiXiThahAiDjIjPjPjTjFhAjXjIjFjUjIjFjShAjUjIjFhAjQjBjOjPjSjBjNjBhAjJjThAjBjGjGjFjDjUjFjEhAjCjZhAhTiEhAjMjJjHjIjUjThAjPjShAjTjIjBjEjPjXjThAjDjBjTjUhAjCjZhAjPjUjIjFjShAjMjBjZjFjSjThOKKiOjPjUjFhahAiUjIjJjThAjTjDjSjJjQjUhAjSjFjRjVjJjSjFjThAiBjGjUjFjShAiFjGjGjFjDjUjThAiDiThThAjPjShAjMjBjUjFjShOfJiPnABXkcVHAnelEhAiJjUhAjDjBjOhAjCjFhAjVjTjFjEhAjBjThAjBhAjEjPjDjLjBjCjMjFhAjQjBjOjFjMhAjCjZhAjQjMjBjDjJjOjHhAjUjIjFhAjTjDjSjJjQjUhAjJjOhAjBhAiTjDjSjJjQjUiViJhAiQjBjOjFjMjThAjTjVjCjGjPjMjEjFjShAjPjGhAjUjIjFhAiTjDjSjJjQjUjThAjGjPjMjEjFjShMhAjBjOjEhAjUjIjFjOhAjDjIjPjPjTjJjOjHhAjUjIjJjThAjTjDjSjJjQjUhAjGjSjPjNhAjUjIjFhAiXjJjOjEjPjXjThAjNjFjOjVhOfO2lBBby2lCBn0ABJ2lCBnAEjiERBFehPiUjIjJjThAjTjDjSjJjQjUhAjSjFjRjVjJjSjFjThAiBjGjUjFjShAiFjGjGjFjDjUjThAiDiThThAjPjShAjMjBjUjFjSffACiAEjhURBXhVjhWffnndIb2lEBn0ACJ2lEBnASiNBEjhYRBVDCffnftO2lFBby2lGBn0ABO2lGBb2lHBn0ACJ2lHBnAEXzGjDjFjOjUjFjSlaViNBnfJ2lIBnAEXhJViNBnfACCViNBjFnnby2lKBn0ABJ2lKBnAEXlFXlFViNBRBFctffAChXViNBnnbnADH40BiAD40BhAiN4B0AiABCAzLjQjUifiQjBjOjPjSjBjNjBlbA2lOBBJ2lQBnAEjlbRBehaff0DhLByB")
    }
// #DEVPOINT#