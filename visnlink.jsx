

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
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:0 ,"+
                "lineA: Panel {text:'脚本管理器', alignment:['fill','top'], orientation:'column', spacing:0 ,"+
                    "tlistBox: ListBox { alignment:['fill','fill'], preferredSize:[100,200]},"+
                    "tfooter: Group { talignment:['fill','bottom'], "+
                        "tfolder: Button { text:'Folder', alignment:['left','center'] }, "+
                        "trefresh: Button { text:'刷新', alignment:['right','center'] }, "+
                    "},"+
                "},"+
                "lineB: Panel {text:'集成脚本', alignment:['fill','top'], orientation:'column', spacing:0 ,"+
                    "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:0 ,"+
                        "Fi: Button { text:'Fi', preferredSize:[25,25] }, "+
                        "Fo: Button { text:'Fo', preferredSize:[25,25] }, "+
                        "Su: Button { text:'Su', preferredSize:[25,25] }, "+
                        "Sd: Button { text:'Sd', preferredSize:[25,25] }, "+
                        "Rl: Button { text:'Rl', preferredSize:[25,25] }, "+
                        "Rr: Button { text:'Rr', preferredSize:[25,25] }, "+
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
            "line3: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:0 ,"+
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
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:0 ,"+
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
    myPalette.grp.outsideGroup.line1.lineB.line1.Fi.onClick=OF_Keyfast_fadeIn
    myPalette.grp.outsideGroup.line1.lineB.line1.Fo.onClick=OF_Keyfast_fadeOut
    myPalette.grp.outsideGroup.line1.lineB.line1.Su.onClick=OF_Keyfast_scaleUp
    myPalette.grp.outsideGroup.line1.lineB.line1.Sd.onClick=OF_Keyfast_scaleDown
    myPalette.grp.outsideGroup.line1.lineB.line1.Rl.onClick=OF_Keyfast_rotateLeft
    myPalette.grp.outsideGroup.line1.lineB.line1.Rr.onClick=OF_Keyfast_rotateRight

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