// 全局同步属性控制器v2.1.0  by 水桶
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
var alertMsg=true
var autoSync=false
var debugMode=false
function UI(object){
    var myPalette = (object instanceof Panel)?object : new Window("palette","控制器2.0", undefined, {resizeable: true})
    var content=""+
    "group {orientation:'column', alignment:['fill','fill'], spacing:5, "+
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
                // "button10: Button {text:'hasChanged', alignment:['fill','top'], preferredSize:[150,25]},"+
                "button6: Button {text:'全部创建', alignment:['fill','top'], preferredSize:[150,25]},"+
                "button8: Checkbox {text:'弹出提示', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+
            "line2: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                // "button10: Button {text:'hasChanged', alignment:['fill','top'], preferredSize:[150,25]},"+
                "button7: Button {text:'同步当前', alignment:['fill','top'], preferredSize:[150,25]},"+
                "button9: Checkbox {text:'自动同步', alignment:['fill','top'], preferredSize:[50,25]},"+
            "},"+


        "},"+

    "}"
    myPalette.grp = myPalette.add(content);
    myPalette.grp.add("statictext",undefined,"Made By 水桶")
    myPalette.grp.add("statictext",undefined,"更多：v.guediao.top")
    myPalette.grp.secondGroup.line1.button6.onClick=createAll
    myPalette.grp.secondGroup.line2.button7.onClick=sync
    myPalette.grp.secondGroup.line1.button8.value=true
    myPalette.grp.secondGroup.line2.button9.value=false
    myPalette.grp.secondGroup.line1.button8.onClick=changeAlertMsg
    myPalette.grp.secondGroup.line2.button9.onClick=changeAutoSync
    // myPalette.grp.secondGroup.button10.onClick=function (){alert(hasChanged())}
    myPalette.grp.mainGroup.button0.onClick=create2DPoint
    myPalette.grp.mainGroup.button1.onClick=create3DPoint
    myPalette.grp.mainGroup.button2.onClick=createCheckbox
    myPalette.grp.mainGroup.button3.onClick=createSlider
    myPalette.grp.mainGroup.button4.onClick=createAngle
    myPalette.grp.mainGroup.button5.onClick=createColor
    myPalette.layout.layout(true);
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
function create2DPoint(){
    if(app.project.activeItem.selectedLayers[0].name=="controlLayer")return
    app.beginUndoGroup("create Point");
    var properties=getSelectedPropertie()
    var controlLayer=app.project.activeItem.layers.byName("controlLayer")
    if(properties.expression!=""||!properties.canSetExpression){if(alertMsg)alert("无法创建或已有表达式");return;}
    if(properties.value.length==3||properties.value.length==2){
        controlLayer.Effects.addProperty("点控制")("点").setValue([properties.value[0],properties.value[1]]);
        var indexName=getCurProperNameFully()
        controlLayer("Effects")("点控制").name=indexName
        properties.expression='thisComp.layer("controlLayer").effect("'+indexName+'")("点")'
        if(alertMsg)alert("创建完毕")
    }
    app.endUndoGroup();
}
function create3DPoint(){
    if(app.project.activeItem.selectedLayers[0].name=="controlLayer")return
    app.beginUndoGroup("create 3D Point");
    var properties=getSelectedPropertie()
    var controlLayer=app.project.activeItem.layers.byName("controlLayer")
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
    for(var i=1;i<=count;i++){
        try{
            var eff=app.project.activeItem.layers.byName("controlLayer").Effects(i)
        }catch(e){
            break
        }
        var value=eff(effectProperType(eff)).value
        propers.push(value)
    }
    return propers
}
function hasChanged(){
    if(!app.project.activeItem)return undefined
    // if(app.project.activeItem.length!=1)return undefined
    if(!app.project.activeItem.layers.byName("controlLayer"))return undefined
    var count=app.project.activeItem.layers.byName("controlLayer")("Effects").numProperties
    if(!oldProper)return false
    if(count!=oldProper.length)return true
    for(var i=1;i<=count;i++){
        try{
            var eff=app.project.activeItem.layers.byName("controlLayer").Effects(i)
        }catch(e){
            break
        }
        var value=eff(effectProperType(eff)).value
        if(value.toString()!=oldProper[i-1].toString()){
            return true
        }
    }
    return false
}
app.scheduleTask('if(autoSync&&hasChanged())sync()',1000,true)
// app.scheduleTask('if(autoSync)sync()',1000,true)

function sync(){
    if(debugMode)alert("sync()")

    // var comps=getControlComps()
    if(!app.project.activeItem)return
    if(!app.project.activeItem.layers.byName("controlLayer"))return
    app.beginUndoGroup("Sync controller config");
    var activeViewer=app.activeViewer
    var createTimes=0
    var comps=getControlComps()
    // alert("获取效果原型"+objInside(effectProtype))
    var curComp=app.project.activeItem
    for(var i=0;i<comps.length;i++){
        if(comps[i]!=curComp){
        comps[i].layers.byName("controlLayer").remove()
        app.project.activeItem.layers.byName("controlLayer").copyToComp(comps[i])
        createTimes++
        // layers[i].Effects=effectProtype
        }
    }
    if(alertMsg)alert("同步到"+createTimes+"个")
    // app.project.activeItem.layers.byName("controlLayer").active
    activeViewer.setActive() 
    oldProper=record()
    app.endUndoGroup();
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