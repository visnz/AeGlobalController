// 源代码repo：https://github.com/visnz/AeGlobalController
// 作者QQ：864689103
// Bilibili ID：DDL水桶

UI(this);
var debugMode=true // 纠错模式，打开时会出现运行时提示
var logObj;
function UI(object){
    var myPalette = (object instanceof Panel)?object : new Window("palette","桶子工具箱", undefined, {resizeable: true})
    var content=""+
    "group {orientation:'column', alignment:['fill','fill'], spacing:5, "+
        "textme: StaticText {text:'桶子工具箱'},"+
            "mainGroup: Group {text:'控制抽取', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                    "textB: StaticText {text:'控制器'},"+
                    "button0: Button {text:'2D点', alignment:['fill','top'], preferredSize:[45,25]},"+
                    "button1: Button {text:'3D点', alignment:['fill','top'], preferredSize:[45,25]},"+
                    "button2: Button {text:'复选', alignment:['fill','top'], preferredSize:[45,25]},"+
                    "button3: Button {text:'滑块', alignment:['fill','top'], preferredSize:[45,25]},"+
                    "button4: Button {text:'角度', alignment:['fill','top'], preferredSize:[45,25]},"+
                    "button5: Button {text:'颜色', alignment:['fill','top'], preferredSize:[45,25]}"+
                "},"+
            "},"+
            "thirdGroup: Group {text:'功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
                "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                    "textme: StaticText {text:'  '},"+
                    "buttonA: Button {text:'填充', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "buttonB: Button {text:'快糊', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "buttonC: Button {text:'百叶', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "buttonD: Button {text:'线擦', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "buttonE: Button {text:'径擦', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "buttonF: Button {text:'圆形', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "buttonF1: Button {text:'方格', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "button41: Button {text:'投影', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "button42: Button {text:'棋盘', alignment:['fill','top'], preferredSize:[30,25]},"+
                "},"+
                "line4: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                    "textme: StaticText {text:'  '},"+
                    "button43: Button {text:'亮度/对比度', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "buttonN1: Button {text:'色相/饱和度', alignment:['fill','top'], preferredSize:[50,25]},"+
                    "button44: Button {text:'色阶', alignment:['fill','top'], preferredSize:[50,25]},"+
                    // "button44: Button {text:'线擦', alignment:['fill','top'], preferredSize:[30,25]},"+
                    // "button45: Button {text:'径渐', alignment:['fill','top'], preferredSize:[30,25]},"+
                    // "button46: Button {text:'圆形', alignment:['fill','top'], preferredSize:[30,25]},"+
                    // "button47: Button {text:'方格', alignment:['fill','top'], preferredSize:[30,25]},"+
                "},"+
                "line2: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                    "textme: StaticText {text:'  '},"+
                    "buttonG: Button {text:'分形杂色', alignment:['fill','top'], preferredSize:[50,25]},"+
                    "buttonH: Button {text:'湍流杂色', alignment:['fill','top'], preferredSize:[50,25]},"+
                    "buttonI: Button {text:'湍流置换', alignment:['fill','top'], preferredSize:[50,25]},"+
                "},"+
                "line3: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                    "textme: StaticText {text:'  '},"+
                    "tmpEffectA: EditText {text:'', alignment:['fill','top'], preferredSize:[150,25]},"+
                    "buttonJ: Button {text:'应用', alignment:['fill','top'], preferredSize:[50,25]},"+
                    "tmpEffectB: EditText {text:'', alignment:['fill','top'], preferredSize:[150,25]},"+
                    "buttonK: Button {text:'应用', alignment:['fill','top'], preferredSize:[50,25]},"+
                "},"+
            "},"+
            "fouthGroup: Group {text:'功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
                "textme: StaticText {text:''},"+
                "textme: StaticText {text:'其他脚本集成'},"+
                "line1: Group {text:'motion2', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                    "textme: StaticText {text:'Motion 2'},"+
                    "outfun1: Button {text:'Null', alignment:['fill','top'], preferredSize:[20,25]},"+
                    "outfun2: Button {text:'Jump', alignment:['fill','top'], preferredSize:[20,25]},"+
                    "s3: Slider {text:'easeOut',alignment:['fill','top'], preferredSize:[60,25]}"+
                    "s2: Slider {text:'ease',alignment:['fill','top'], preferredSize:[60,25]}"+
                    "s1: Slider {text:'easeIn',alignment:['fill','top'], preferredSize:[60,25]}"+
                "},"+
                "line2: Group {text:'keyfast', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                    "textme: StaticText {text:'KeyFast'},"+
                    "outfun1: Button {text:'FdIn', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "outfun2: Button {text:'FdOut', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "outfun3: Button {text:'ScUp', alignment:['fill','top'], preferredSize:[30,25]},"+
                    "outfun4: Button {text:'ScDwn', alignment:['fill','top'], preferredSize:[30,25]},"+
                    // "outfun5: Button {text:'↑', alignment:['fill','top'], preferredSize:[20,25]},"+
                    // "outfun6: Button {text:'↓', alignment:['fill','top'], preferredSize:[20,25]},"+
                    // "outfun7: Button {text:'←', alignment:['fill','top'], preferredSize:[20,25]},"+
                    // "outfun8: Button {text:'→', alignment:['fill','top'], preferredSize:[20,25]},"+
                    "},"+
            "},"+
            "logGroup: Group {text:'log功能', alignment:['fill','top'], orientation:'column', spacing:5 ,"+
                "textme: StaticText {text:''},"+
                "line1: Group {text:'功能', alignment:['fill','top'], orientation:'row', spacing:5 ,"+
                    "textme: StaticText {text:'Log面板'},"+
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
    // log界面
    logObj=myPalette.grp.logGroup.log
    logObj.visible=false
    myPalette.grp.logGroup.line1.logTrigger.onClick=function(){
        logObj.visible=!logObj.visible
        myPalette.grp.logGroup.line1.clear=!myPalette.grp.logGroup.line1.clear
    }
    myPalette.grp.logGroup.line1.clear.onClick=function clearLog(){logObj.text=""}
    myPalette.grp.mainGroup.line1.button0.onClick=function button0(){if(!addEffects("2D 点控制")){addEffects("点控制")}}
    myPalette.grp.mainGroup.line1.button1.onClick=function button1(){addEffects("3D 点控制")}
    myPalette.grp.mainGroup.line1.button2.onClick=function button2(){addEffects("复选框控制")}
    myPalette.grp.mainGroup.line1.button3.onClick=function button3(){addEffects("滑块控制")}
    myPalette.grp.mainGroup.line1.button4.onClick=function button4(){addEffects("角度控制")}
    myPalette.grp.mainGroup.line1.button5.onClick=function button5(){addEffects("颜色控制")}
    myPalette.grp.thirdGroup.line1.buttonA.onClick=function buttonA(){addEffects("填充")}
    myPalette.grp.thirdGroup.line1.buttonB.onClick=function buttonB(){if(!addEffects("快速方框模糊")){addEffects("快速模糊")}}
    myPalette.grp.thirdGroup.line1.buttonC.onClick=function buttonC(){addEffects("百叶窗")}
    myPalette.grp.thirdGroup.line1.buttonD.onClick=function buttonD(){addEffects("线性擦除")}
    myPalette.grp.thirdGroup.line1.buttonE.onClick=function buttonE(){addEffects("径向擦除")}
    myPalette.grp.thirdGroup.line1.buttonF.onClick=function buttonF(){addEffects("圆形")}
    myPalette.grp.thirdGroup.line1.buttonF1.onClick=function buttonF1(){addEffects("网格")}
    myPalette.grp.thirdGroup.line2.buttonG.onClick=function buttonG(){addEffects("分形杂色")}
    myPalette.grp.thirdGroup.line2.buttonH.onClick=function buttonH(){addEffects("湍流杂色")}
    myPalette.grp.thirdGroup.line2.buttonI.onClick=function buttonI(){addEffects("湍流置换")}
    myPalette.grp.thirdGroup.line4.buttonN1.onClick=function buttonN1(){addEffects("色相/饱和度")}
    myPalette.grp.thirdGroup.line3.buttonJ.onClick=function buttonJ(){addEffects(myPalette.grp.thirdGroup.line3.tmpEffectA.text)}
    myPalette.grp.thirdGroup.line3.buttonK.onClick=function buttonK(){addEffects(myPalette.grp.thirdGroup.line3.tmpEffectB.text)}
    myPalette.grp.thirdGroup.line1.button41.onClick=function button41(){addEffects("投影")}
    myPalette.grp.thirdGroup.line1.button42.onClick=function button42(){addEffects("棋盘")}
    myPalette.grp.thirdGroup.line4.button43.onClick=function button43(){addEffects("亮度和对比度")}
    myPalette.grp.thirdGroup.line4.button44.onClick=function button44(){addEffects("色阶")}
    myPalette.grp.fouthGroup.line1.outfun1.onClick=OF_Motion2_createANull
    myPalette.grp.fouthGroup.line1.outfun2.onClick=OF_Motion2_bounce
    myPalette.grp.fouthGroup.line1.s1.onChange = function buttons1(){OF_Motion2_inMotion(parseInt(myPalette.grp.fouthGroup.line1.s1.value,10))}
    myPalette.grp.fouthGroup.line1.s2.onChange = function buttons2(){OF_Motion2_makeMotion(parseInt(myPalette.grp.fouthGroup.line1.s2.value,10))}
    myPalette.grp.fouthGroup.line1.s3.onChange = function buttons3(){OF_Motion2_outMotion(parseInt(myPalette.grp.fouthGroup.line1.s3.value,10))}
    myPalette.grp.fouthGroup.line2.outfun1.onClick=OF_Keyfast_fadeIn
    myPalette.grp.fouthGroup.line2.outfun2.onClick=OF_Keyfast_fadeOut
    myPalette.grp.fouthGroup.line2.outfun3.onClick=OF_Keyfast_scaleUp
    myPalette.grp.fouthGroup.line2.outfun4.onClick=OF_Keyfast_scaleDown
    // myPalette.grp.fouthGroup.line2.outfun5.onClick=function outfun5(){OF_Keyfast_move(0)}
    // myPalette.grp.fouthGroup.line2.outfun6.onClick=function outfun6(){OF_Keyfast_move(1)}
    // myPalette.grp.fouthGroup.line2.outfun7.onClick=function outfun7(){OF_Keyfast_move(2)}
    // myPalette.grp.fouthGroup.line2.outfun8.onClick=function outfun8(){OF_Keyfast_move(3)}
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
function log(content){
    logObj.text=logObj.text+"\n[ "+(new Date().toTimeString().split(" ")[0])+" ]"+content
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

//============ outfun ==========//
    //============ KeyFast ==========//
    var slideAmountX,slideAmountY;
    var slideAmount = 500;
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
        app.endUndoGroup("Ease In");
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
        app.endUndoGroup("Ease Out");
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
        app.endUndoGroup("Easy Ease"); 
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