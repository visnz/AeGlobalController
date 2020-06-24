

UI(this);
var dictionary;
var dictionarykeys;
var dicInit=false;
var debugMode=true; // 纠错模式，打开时会出现运行时提示
var logObj;
function UI(object){
    var myPalette = (object instanceof Panel)?object : new Window("palette","桶子工具箱", undefined, {resizeable: true})
    var content=""+
    "group {orientation:'column', alignment:['fill','fill'], spacing:5, "+
        "textme: StaticText {text:'桶子工具箱'},"+
        "colorGroup: Group {text:'color功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:0 ,"+
            "},"+
        "},"+
        "transGroup: Group {text:'trans功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "search: EditText {text:'', alignment:['fill','top'],properties:{multiline:false}, preferredSize:[100,30]},"+
                "sc2enB: Button {text:'SCtoEN', alignment:['fill','top'], preferredSize:[30,25]},"+
                "en2scB: Button {text:'ENtoSC', alignment:['fill','top'], preferredSize:[30,25]},"+
                "listbox: DropDownList{alignment:['fill','top'], preferredSize:[200,25]},"+
                "apply: Button {text:'Apply', alignment:['fill','top'], preferredSize:[30,25]},"+
            "},"+
        "},"+
        "logGroup: Group {text:'log功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            //"textme: StaticText {text:''},"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                // "textme: StaticText {text:'Log面板'},"+
                "logTrigger: Button {text:'Log', alignment:['fill','top'], preferredSize:[50,25]},"+
                "clear: Button {text:'Clean', alignment:['fill','top'], preferredSize:[50,25]},"+
                "console: EditText {text:'', alignment:['fill','top'],properties:{multiline:false}, preferredSize:[300,30]},"+
                "run: Button {text:'AeRun', alignment:['fill','top'], preferredSize:[50,25]},"+
                "cmdexample: DropDownList{alignment:['fill','top'], preferredSize:[200,25]},"+
                "cmdrun: Button {text:'CmdRun', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+
            "line2: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "log: EditText {text:'script start',properties:{multiline:true}, alignment:['fill','top'], preferredSize:[300,200]},"+
            "},"+
        "},"+
    "}"
    myPalette.grp = myPalette.add(content);
    myPalette.layout.layout(true);
    // color面板
    var btn=myPalette.grp.colorGroup.line1.add("button",[0,0,100,25],"Push Color")
    btn.onClick=function(){
        var res=prompt("hex color","#C0FFEE");
        res=res[0]=="#"?res.split("#")[1]:res;
        res = parseInt(res,16);
        var r = ((res >> 16) & 255)/255;
        var g = ((res >> 8) & 255)/255;
        var b = (parseInt(res,10) & 255)/255;
        colorQueue.push([r,g,b])
        for(var i=colorQueue.length-1;;i--){
            var index=colorQueue.length-1-i
            colorPanels[index].graphics.backgroundColor = colorPanels[index].graphics.newBrush(colorPanels[index].graphics.BrushType.SOLID_COLOR,colorQueue[i]);
            if(index>=15)break;
        }
        log("new color pushed: "+res)
    }
    var colorQueue=[]
    var colorPanels=[]
    for(var i=0;i<16;i++){
        colorPanels[i] = myPalette.grp.colorGroup.line1.add("panel", [0,0,25,25], i);
        colorQueue.push([0.01*i,0.03*i,0.06*i])
        colorPanels[i].graphics.backgroundColor = colorPanels[i].graphics.newBrush(colorPanels[i].graphics.BrushType.SOLID_COLOR,colorQueue[i]);
    }  
    colorQueue=colorQueue.reverse()

    // log界面
    logObj=myPalette.grp.logGroup.line2.log
    // logObj.visible=false
    myPalette.grp.logGroup.line1.logTrigger.onClick=function(){
        logObj.visible=!logObj.visible
        myPalette.grp.logGroup.line1.clear=!myPalette.grp.logGroup.line1.clear
    }
    myPalette.grp.logGroup.line1.clear.onClick=function clearLog(){logObj.text=""}
    myPalette.grp.logGroup.line1.run.onClick=function run(){
        log("console.run: "+myPalette.grp.logGroup.line1.console.text)
        log(eval(myPalette.grp.logGroup.line1.console.text))
        myPalette.grp.logGroup.line1.console.text=""
    }
    myPalette.grp.logGroup.line1.cmdexample.add('item',"notepad")
    myPalette.grp.logGroup.line1.cmdexample.add('item',"calc")
    myPalette.grp.logGroup.line1.cmdexample.add('item',"mspaint")
    myPalette.grp.logGroup.line1.cmdexample.add('item','"C:\\Program Files\\Adobe\\Adobe After Effects CC 2018\\Support Files\\AfterFX.exe" -m')
    myPalette.grp.logGroup.line1.cmdrun.onClick=function run(){
        var text=myPalette.grp.logGroup.line1.console.text
        if(text=="")text=myPalette.grp.logGroup.line1.cmdexample.selection.text
        var cmdrun="system.callSystem("+"\"cmd.exe /c \\\" "+text+" \\\"\""+");"
        log("console.cmdrun: "+cmdrun)
        log(eval(cmdrun))
        myPalette.grp.logGroup.line1.console.text=""
    }
    // trans界面
    myPalette.grp.transGroup.line1.apply.onClick=function() {
        var effect=myPalette.grp.transGroup.line1.listbox.selection.text
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

var help=function(){
    log("hello world")
}

// Lib part
function log(content){
    logObj.text=logObj.text+"\n[ "+(new Date().toTimeString().split(" ")[0])+" ]"+content
    return content;
}
function getSelectedPropertie(){
    var properties=app.project.activeItem.selectedProperties
    if(app.project.activeItem&&properties!=""){
        if(properties.length==1){
        // 判断已选中项目有已选中的属性
            return properties[0]
        }else{
            //效果器的话，这个属性是一个组，第一个是效果组，第二个是具体效果
            if(properties[0] instanceof PropertyGroup){
                return properties[1]
            }
        }
    }
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
    for(var i=0;i<layers.length;i++){
        try{
        layers[i].Effects.addProperty(effectName)
    }catch(e){
        log("no effects added")
        return false
    }}
    return true
}
// function transENtoSC(en,invert){
//     dicInitNow()
//     log("transENtoSC param: ",en)
//     var result=new Array();
//     for(var ind = 0; ind < dictionarykeys.length; ind++ ){
//         var textToCompare=dictionary[ind][invert?1:0]
//         // console.log(now, "dictionary.get(now.value): "+dictionary.get(now.value),"   textToCompare: ",textToCompare)
//         for (var i = 0; i < textToCompare.length; i++) {
//             var com=0
//             var tmpcheck=0
//             for (var j = 0; j < en.length; j++) {
//                 if(new String(textToCompare[i]).toUpperCase()!=en[j].toUpperCase()){
//                     i-=tmpcheck;
//                     break;
//                 }
//                 com++;
//                 i++;
//                 tmpcheck++;
//                 if(com==en.length){
//                     if(invert){
//                         result.push([dictionary[ind][1],dictionary[ind][0]])
//                     }else{
//                         result.push(dictionary[ind])
//                     }
//                 }
//             }
//         }
//     }
//     log(result)
//     return result
// }
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
