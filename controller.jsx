// 全局同步属性控制器v2.1.2  by 水桶
//         插件通过提供所有合成的控制器同步、对当前选中属性抽出放入控制器
//         来完成如运动统一、配色统一等进行统一控制的功能
//
// 源代码repo：https://github.com/visnz/AeGlobalController
// 作者QQ：864689103
// Bilibili ID：DDL水桶
//
// TODO 在该面板提供快捷链接
// 提供效果器快捷、类型快捷
UI(this);
var alertMsg=true   // AlertMsg提醒模式，打开时操作会有alert提示
var autoSync=false  // AutoSync自动同步模式，打开时每隔一段时间进行检查更新
var debugMode=false // 纠错模式，打开时会出现运行时提示
var logObj;
function UI(object){
    var myPalette = (object instanceof Panel)?object : new Window("palette","控制器2.1.2", undefined, {resizeable: true})
    var content=""+
    "group {orientation:'column', alignment:['fill','fill'], spacing:5, "+
    "textme: StaticText {text:'控制器'},"+
        "mainGroup: Group {text:'控制抽取', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
            "button0: Button {text:'2D点', alignment:['fill','top'], preferredSize:[45,25]},"+
            "button1: Button {text:'3D点', alignment:['fill','top'], preferredSize:[45,25]},"+
            "button2: Button {text:'复选', alignment:['fill','top'], preferredSize:[45,25]},"+
            "button3: Button {text:'滑块', alignment:['fill','top'], preferredSize:[45,25]},"+
            "button4: Button {text:'角度', alignment:['fill','top'], preferredSize:[45,25]},"+
            "button5: Button {text:'颜色', alignment:['fill','top'], preferredSize:[45,25]}"+
        "},"+
        "secondGroup: Group {text:'功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "button6: Button {text:'全部创建', alignment:['fill','top'], preferredSize:[150,25]},"+
                "button8: Checkbox {text:'弹出提示', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+
            "line2: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "button7: Button {text:'同步当前', alignment:['fill','top'], preferredSize:[150,25]},"+
                "button9: Checkbox {text:'自动同步', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+
        "},"+
        // "spGroup: Group {text:'分割线', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
        //     "aboutPnl: Panel { properties:{ borderStyle:'sunken' },"+
        //         // "aboutEt: EditText { text:'功能', properties:{multiline:true}, preferredSize:[280,160], alignment:['right','center'] },"+
                
        //     "},"+
        // "},"+
        "thirdGroup: Group {text:'功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "textme: StaticText {text:''},"+
            "textme: StaticText {text:'快捷效果器'},"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "buttonA: Button {text:'填充', alignment:['fill','top'], preferredSize:[30,25]},"+
                "buttonB: Button {text:'快糊', alignment:['fill','top'], preferredSize:[30,25]},"+
                "buttonC: Button {text:'百叶', alignment:['fill','top'], preferredSize:[30,25]},"+
                "buttonD: Button {text:'线渐', alignment:['fill','top'], preferredSize:[30,25]},"+
                "buttonE: Button {text:'径渐', alignment:['fill','top'], preferredSize:[30,25]},"+
                "buttonF: Button {text:'圆形', alignment:['fill','top'], preferredSize:[30,25]},"+
                "buttonF: Button {text:'方格', alignment:['fill','top'], preferredSize:[30,25]},"+
            "},"+
            "line2: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "buttonG: Button {text:'分形杂色', alignment:['fill','top'], preferredSize:[50,25]},"+
                "buttonH: Button {text:'湍流杂色', alignment:['fill','top'], preferredSize:[50,25]},"+
                "buttonI: Button {text:'湍流置换', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+
            "line3: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "textA: StaticText {text:'暂存A'},"+
                "tmpEffectA: EditText {text:'暂存效果器A', alignment:['fill','top'], preferredSize:[150,25]},"+
                "buttonJ: Button {text:'应用', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+
            "line4: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "textB: StaticText {text:'暂存B'},"+
                "tmpEffectB: EditText {text:'暂存效果器B', alignment:['fill','top'], preferredSize:[150,25]},"+
                "buttonK: Button {text:'应用', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+
        "},"+
        "fouthGroup: Group {text:'功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "textme: StaticText {text:''},"+
            "textme: StaticText {text:'其他脚本集成'},"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "textme: StaticText {text:'Motion 2'},"+
                "outfun1: Button {text:'Null', alignment:['fill','top'], preferredSize:[30,25]},"+
                "outfun2: Button {text:'Jump', alignment:['fill','top'], preferredSize:[30,25]},"+
            "},"+
        "},"+
        "logGroup: Group {text:'log功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
            "textme: StaticText {text:''},"+
            "textme: StaticText {text:'Log面板'},"+
            "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "logTrigger: Button {text:'log面板', alignment:['fill','top'], preferredSize:[50,25]},"+
                "clear: Button {text:'清除log', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+
            "log: EditText {text:'script start',properties:{multiline:true}, preferredSize:[300,200]},"+
            "},"+
        "},"+
    "}"
    // 创建面板
    myPalette.grp = myPalette.add(content);
    myPalette.grp.add("statictext",undefined,"Made By 水桶")
    myPalette.grp.add("statictext",undefined,"更多：v.guediao.top")
    logObj=myPalette.grp.logGroup.log
    logObj.visible=false
    myPalette.grp.logGroup.line1.logTrigger.onClick=function(){
        logObj.visible=!logObj.visible
        myPalette.grp.logGroup.line1.clear=!myPalette.grp.logGroup.line1.clear
    }
    // 链接事件
    myPalette.grp.logGroup.line1.clear.onClick=function clearLog(){logObj.text=""}
    myPalette.grp.secondGroup.line1.button6.onClick=createAll
    myPalette.grp.secondGroup.line2.button7.onClick=sync
    myPalette.grp.secondGroup.line1.button8.value=true
    myPalette.grp.secondGroup.line2.button9.value=false
    myPalette.grp.secondGroup.line1.button8.onClick=changeAlertMsg
    myPalette.grp.secondGroup.line2.button9.onClick=changeAutoSync
    myPalette.grp.mainGroup.button0.onClick=create2DPoint
    myPalette.grp.mainGroup.button1.onClick=create3DPoint
    myPalette.grp.mainGroup.button2.onClick=createCheckbox
    myPalette.grp.mainGroup.button3.onClick=createSlider
    myPalette.grp.mainGroup.button4.onClick=createAngle
    myPalette.grp.mainGroup.button5.onClick=createColor
    myPalette.grp.thirdGroup.line1.buttonA.onClick=function buttonA(){addEffects("填充")}
    myPalette.grp.thirdGroup.line1.buttonB.onClick=function buttonB(){if(!addEffects("快速方框模糊")){addEffects("快速模糊")}}
    myPalette.grp.thirdGroup.line1.buttonC.onClick=function buttonC(){addEffects("百叶窗")}
    myPalette.grp.thirdGroup.line1.buttonD.onClick=function buttonD(){addEffects("线性擦除")}
    myPalette.grp.thirdGroup.line1.buttonE.onClick=function buttonE(){addEffects("径向擦除")}
    myPalette.grp.thirdGroup.line1.buttonF.onClick=function buttonF(){addEffects("圆形")}
    myPalette.grp.thirdGroup.line1.buttonF.onClick=function buttonF(){addEffects("网格")}
    myPalette.grp.thirdGroup.line2.buttonG.onClick=function buttonG(){addEffects("分形杂色")}
    myPalette.grp.thirdGroup.line2.buttonH.onClick=function buttonH(){addEffects("湍流杂色")}
    myPalette.grp.thirdGroup.line2.buttonI.onClick=function buttonI(){addEffects("湍流置换")}
    myPalette.grp.thirdGroup.line3.buttonJ.onClick=function buttonI(){addEffects(myPalette.grp.thirdGroup.line3.tmpEffectA.text)}
    myPalette.grp.thirdGroup.line4.buttonK.onClick=function buttonI(){addEffects(myPalette.grp.thirdGroup.line4.tmpEffectB.text)}
    myPalette.grp.fouthGroup.line1.outfun1.onClick=OF_Motion2_createANull
    myPalette.grp.fouthGroup.line1.outfun2.onClick=OF_Motion2_bounce
    myPalette.layout.layout(true);
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
function addEffects(effectName){
    var layers=app.project.activeItem.selectedLayers
    for(var i=0;i<layers.length;i++){
        try{
        layers[i].Effects.addProperty(effectName)
    }catch(e){
        return false
    }}
    return true
}


function create2DPoint(){
    if(app.project.activeItem.selectedLayers[0].name=="controlLayer")return
    // 如果不存在控制图层则返回
    app.beginUndoGroup("create Point");
    // 创建undo组
    var properties=getSelectedPropertie()
    var controlLayer=app.project.activeItem.layers.byName("controlLayer")
    if(!controlLayer)createAll()
    if(properties.expression!=""||!properties.canSetExpression){if(alertMsg)alert("无法创建或已有表达式");return;}
    // 已有表达式的情况下防止碰撞
    if(properties.value.length==3||properties.value.length==2){
        controlLayer.Effects.addProperty("点控制")("点").setValue([properties.value[0],properties.value[1]]);
        // 属性值匹配情况下，创建控制器，修改为当前值
        var indexName=getCurProperNameFully()
        controlLayer("Effects")("点控制").name=indexName
        // 属性名生成
        properties.expression='thisComp.layer("controlLayer").effect("'+indexName+'")("点")'
        // 修改表达式
        if(alertMsg)alert("创建完毕")
    }
    app.endUndoGroup();
}
function create3DPoint(){
    if(app.project.activeItem.selectedLayers[0].name=="controlLayer")return
    app.beginUndoGroup("create 3D Point");
    var properties=getSelectedPropertie()
    var controlLayer=app.project.activeItem.layers.byName("controlLayer")
    if(!controlLayer)createAll()
    if(properties.expression!=""||!properties.canSetExpression){if(alertMsg)alert("无法创建或已有表达式");return;}
    if(properties.value.length==3){
        controlLayer.Effects.addProperty("3D 点控制")("3D 点").setValue(properties.value);
        var indexName=getCurProperNameFully()
        controlLayer("Effects")("3D 点控制").name=indexName
        properties.expression='thisComp.layer("controlLayer").effect("'+indexName+'")("3D 点")'
        if(alertMsg)alert("创建完毕")
    }
    app.endUndoGroup();
}
function createCheckbox(){
    if(app.project.activeItem.selectedLayers[0].name=="controlLayer")return
    app.beginUndoGroup("create Checkbox");
    var properties=getSelectedPropertie()
    var controlLayer=app.project.activeItem.layers.byName("controlLayer")
    if(!controlLayer)createAll()
    if(properties.expression!=""||!properties.canSetExpression){if(alertMsg)alert("无法创建或已有表达式");return;}
    if(!properties.value.length){
        controlLayer.Effects.addProperty("复选框控制")("复选框").setValue(properties.value);
        var indexName=getCurProperNameFully()
        controlLayer("Effects")("复选框控制").name=indexName
        properties.expression='thisComp.layer("controlLayer").effect("'+indexName+'")("复选框")'
        if(alertMsg)alert("创建完毕")
    }
    app.endUndoGroup();
}
function createSlider(){
    if(app.project.activeItem.selectedLayers[0].name=="controlLayer")return
    app.beginUndoGroup("create Slider");
    var properties=getSelectedPropertie()
    var controlLayer=app.project.activeItem.layers.byName("controlLayer")
    if(!controlLayer)createAll()
    if(properties.expression!=""||!properties.canSetExpression){if(alertMsg)alert("无法创建或已有表达式");return;}
    if(!properties.value.length){
        controlLayer.Effects.addProperty("滑块控制")("滑块").setValue(properties.value);
        var indexName=getCurProperNameFully()
        controlLayer("Effects")("滑块控制").name=indexName
        properties.expression='thisComp.layer("controlLayer").effect("'+indexName+'")("滑块")'
        if(alertMsg)alert("创建完毕")
    }
    app.endUndoGroup();
}
function createAngle(){
    if(app.project.activeItem.selectedLayers[0].name=="controlLayer")return
    app.beginUndoGroup("create Angle");
    var properties=getSelectedPropertie()
    var controlLayer=app.project.activeItem.layers.byName("controlLayer")
    if(!controlLayer)createAll()
    if(properties.expression!=""||!properties.canSetExpression){if(alertMsg)alert("无法创建或已有表达式");return;}
    if(!properties.value.length){
        controlLayer.Effects.addProperty("角度控制")("角度").setValue(properties.value);
        var indexName=getCurProperNameFully()
        controlLayer("Effects")("角度控制").name=indexName
        properties.expression='thisComp.layer("controlLayer").effect("'+indexName+'")("角度")'
        if(alertMsg)alert("创建完毕")
    }
    app.endUndoGroup();
}
function createColor(){
    if(app.project.activeItem.selectedLayers[0].name=="controlLayer")return
    app.beginUndoGroup("create Color");
    var properties=getSelectedPropertie()
    var controlLayer=app.project.activeItem.layers.byName("controlLayer")
    if(!controlLayer)createAll()
    if(properties.expression!=""||!properties.canSetExpression){if(alertMsg)alert("无法创建或已有表达式");return;}
    if(properties.value.length==4){
        controlLayer.Effects.addProperty("颜色控制")("颜色").setValue(properties.value);
        var indexName=getCurProperNameFully()
        controlLayer("Effects")("颜色控制").name=indexName
        properties.expression='thisComp.layer("controlLayer").effect("'+indexName+'")("颜色")'
        if(alertMsg)alert("创建完毕")
    }
    app.endUndoGroup();
}
function changeAlertMsg(){
    alertMsg=!alertMsg
}
function changeAutoSync(){
    autoSync=!autoSync
}
var oldProper
function record(){
    if(debugMode)alert("record()")
    var propers=[]
    if(!app.project.activeItem)return undefined
    var count=app.project.activeItem.layers.byName("controlLayer")("Effects").numProperties
    // 获取控制器属性的数量，较新版本不允许catch获取临界值
    for(var i=1;i<=count;i++){
        // 遍历尝试获取效果器
        try{
            var eff=app.project.activeItem.layers.byName("controlLayer").Effects(i)
        }catch(e){
            break
        }
        var value=eff(effectProperType(eff)).value
        propers.push(value)
        // 将属性值推入组
    }
    return propers
}
function hasChanged(){
    if(!app.project.activeItem)return undefined
    if(!app.project.activeItem.layers.byName("controlLayer"))return undefined
    var count=app.project.activeItem.layers.byName("controlLayer")("Effects").numProperties
    // 获取控制器属性的数量，较新版本不允许catch获取临界值
    if(!oldProper)return false
    // 暂存原型不存在则返回
    if(count!=oldProper.length)return true
    // 属性数量发生变化，触发更新
    for(var i=1;i<=count;i++){
        // 遍历尝试获取效果器
        try{
            var eff=app.project.activeItem.layers.byName("controlLayer").Effects(i)
        }catch(e){
            break
        }
        var value=eff(effectProperType(eff)).value
        if(value.toString()!=oldProper[i-1].toString()){
            // 逐个比较直，如果不一样则触发更新
            return true
        }
    }
    return false
}

var compCount=nowCompCount()
log("compCount="+compCount)

function nowCompCount(){
    var count=0
    for(var i=1;i<=app.project.items.length;i++){
        if(app.project.items[i] instanceof CompItem){
            count++
        }
    }
    // log("nowCompCount(): "+count)
    return count||0
}

function hadNewerComp_createAll(){
    if(nowCompCount()!=compCount){
        compCount=nowCompCount()
        createAll()
        syncFrom()
        log("hadNewerComp_createAll()")
    }
}

function syncFrom(){
    log("syncFrom(): ")
    if(!app.project.activeItem)return
    if(!app.project.activeItem.layers.byName("controlLayer"))return
    var activeViewer=app.activeViewer 
    // 记录当前活跃的窗口
    // 统计更新的合成数
    var comps=getControlComps()
    if(autoSync){
        app.project.activeItem.layers.byName("controlLayer").remove()
        comps[0].layers.byName("controlLayer").copyToComp(app.project.activeItem)
    }
    activeViewer.setActive() 
}

app.scheduleTask('hadNewerComp_createAll();if(autoSync&&hasChanged())sync()',1000,true)
// app.scheduleTask('if(autoSync)sync()',1000,true)

function sync(){
    // 同步函数
    log("sync()")
    if(!app.project.activeItem)return
    if(!app.project.activeItem.layers.byName("controlLayer"))return
    var activeViewer=app.activeViewer 
    // 记录当前活跃的窗口
    var createTimes=0 
    // 统计更新的合成数
    var comps=getControlComps()
    // 获取全部合成
    var curComp=app.project.activeItem
    for(var i=0;i<comps.length;i++){
        if(comps[i]!=curComp){
        comps[i].layers.byName("controlLayer").remove()
        app.project.activeItem.layers.byName("controlLayer").copyToComp(comps[i])
        // 移除旧控制器并添加新控制器
        createTimes++
        }
    }
    if(alertMsg)alert("同步到"+createTimes+"个")
    activeViewer.setActive() 
    // 激活原来活跃的面板
    oldProper=record()
    // 更新原型
}
function getControlComps(){
    var comps=[]
    for(var i=1;i<=app.project.items.length;i++){
        if(app.project.items[i] instanceof CompItem){
            comps.push(app.project.items[i])
        }
    }
    return comps
}
function createAll(){
    app.beginUndoGroup("create All Comp Controller");
    var comps=getControlComps()
    var createTimes=0
    var layers=[]
    for(var i=0;i<comps.length;i++){
        var controlLayer=comps[i].layers.byName("controlLayer")
        if(!controlLayer){
            // alert(comps[i].name+"not found")
            controlLayer=comps[i].layers.addNull()
            controlLayer.name="controlLayer"
            createTimes++
        }
        layers.push(controlLayer)
    }
    if(alertMsg)alert("全部创建完毕，共创建"+createTimes+"个")
    app.endUndoGroup();
    // return layers
}

//============ log ==========//
function log(content){
    logObj.text=logObj.text+"\n[ "+(new Date().toTimeString().split(" ")[0])+" ]"+content
}

//============ outfun ==========//
    //============ Motion 2 ==========//

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
        alert("OF_Motion2_nullToItem")
        var selectedLayers = activeItem.selectedLayers;
        if (selectedLayers.length > 0) {
            alert("OF_Motion2_nullToItem")
            minIndex = selectedLayers[0].index;
            xmin = xmax = selectedLayers[0].property("Position").value[0];
            ymin = ymax = selectedLayers[0].property("Position").value[1];
            var myComp = app.project.activeItem;
            if (myComp != null && myComp instanceof CompItem) {
                alert("OF_Motion2_nullToItem")
                var myLayers = myComp.selectedLayers;
                if (myLayers.length != 0) {
                    alert("OF_Motion2_nullToItem")
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
                     alert("OF_Motion2_nullToItem")

                    activeItem.layers.addNull();
                    var newNull = activeItem.layer(1);
                    newNull.name = "NULL CONTROL";
                    newNull.source.width = 100
                    newNull.source.height = 100
                    newNull.inPoint = newInpoint;
                    newNull.outPoint = newOutpoint;
                    newNull.label = 9;
                    var ctr = 0;
                    alert("OF_Motion2_nullToItem")
                    for (var num = 0; num < selectedLayers.length; num += 1) {
                        lay = selectedLayers[num];
                        ctr++;
                        OF_Motion2_minmaxX(lay.property("Position").value[0]);
                        OF_Motion2_minmaxY(lay.property("Position").value[1]);
                    }
                    alert("OF_Motion2_nullToItem")
                    var xpos = ((xmax - xmin) / 2) + xmin;
                    var ypos = ((ymax - ymin) / 2) + ymin;
                    newNull.property("Position").setValue([xpos, ypos]);
                    newNull.anchorPoint.setValue([newNull.source.width / 2, newNull.source.height / 2]);
                    alert("OF_Motion2_nullToItem")
                    for (var num = 0; num < selectedLayers.length; num += 1) {
                        var lay = selectedLayers[num];
                        lay.parent = newNull;
                        if (lay.index < minIndex) {
                            minIndex = lay.index
                        }
                    }
                }
                alert("OF_Motion2_nullToItem")
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



















//============ lib part ==========//
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
// 获取效果的类型，以文本返回
function effectProperType(effect){
    if(effect("点"))return "点"
    if(effect("3D 点"))return "3D 点"
    if(effect("颜色"))return "颜色"
    if(effect("复选框"))return "复选框"
    if(effect("滑块"))return "滑块"
    if(effect("角度"))return "角度"
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
function getCurProperNameFully(){
    var content="("+app.project.activeItem.name+")-("+app.project.activeItem.selectedLayers[0].name+")-("+app.project.activeItem.selectedProperties[0].name
    if(app.project.activeItem.selectedProperties.length!=1){
        content+=")-("+app.project.activeItem.selectedProperties[1].name
    }
    content+=")"
    return content
}