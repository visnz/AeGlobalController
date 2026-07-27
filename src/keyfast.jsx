//============ KeyFast ==========//
var slideAmountX,slideAmountY;
var slideAmount = 500;
var rotateBonus = 180;
var myTimeBonusAmount=1
var overshootCheckBoxAmount=0
easeIn = new KeyframeEase(0, 10);
easeOut = new KeyframeEase(0, 90);
function OF_Keyfast_move(direct){
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    for (i = 0; i < myLayer.length; i = i + 1) {
        slideDirection(i, myTime, slideAmountX, slideAmountY, 0, myLayer, moveDirection);
        easePlacedKeyframes(myLayer[i], myTime, slideAmountY, slideAmountX, moveDirection);
        if (myLayer[i].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == false) {
            myFirstKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(myTime);
            mySecondKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(myTime + myTimeBonusAmount);
            myOvershootKeyframe = myLayer[i].property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(Number(myTime + myTimeBonusAmount));
            linearKeys(myLayer, i, myFirstKeyframe, mySecondKeyframe, myOvershootKeyframe, fullSlide);
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
    if (layer.property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == false) {
        myFirstKeyframe = layer.property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(time);
        mySecondKeyframe = layer.property("ADBE Transform Group").property("ADBE Position").nearestKeyIndex(time + myTimeBonusAmount);
        layer.property("ADBE Transform Group").property("ADBE Position").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
        layer.property("ADBE Transform Group").property("ADBE Position").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
    }
    if (slideY !== 0) {
        if (layer.property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == true) {
            myFirstKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_1").nearestKeyIndex(time);
            mySecondKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_1").nearestKeyIndex(time + myTimeBonusAmount);
            layer.property("ADBE Transform Group").property("ADBE Position_1").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
            layer.property("ADBE Transform Group").property("ADBE Position_1").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
        }
    }
    if (direction == -1 || direction == 1) {
        if (layer.property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == true) {
            myFirstKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_0").nearestKeyIndex(time);
            mySecondKeyframe = layer.property("ADBE Transform Group").property("ADBE Position_0").nearestKeyIndex(time + myTimeBonusAmount);
            layer.property("ADBE Transform Group").property("ADBE Position_0").setTemporalEaseAtKey(myFirstKeyframe, [easeIn], [easeOut]);
            layer.property("ADBE Transform Group").property("ADBE Position_0").setTemporalEaseAtKey(mySecondKeyframe, [easeIn], [easeOut]);
        }
    }
}
function findOvershoot(layer, theTime, direction, fullSlideValue, layerNumKeys, commandCheck) {
    if(!app.project.activeItem)return
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
    if (layer[num].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == true && direction == 1 || direction == -1) {
        positionValueX = layer[num].property("ADBE Transform Group").property("ADBE Position_0").value;
        positionX = layer[num].property("ADBE Transform Group").property("ADBE Position_0");
        if (positionX.numKeys >= 1 || command == 1) {
            positionX.setValueAtTime(time, positionValueX);
            positionX.setValueAtTime(time + myTimeBonusAmount, positionValueX + (slideX * direction));
        } else {
            positionX.setValueAtTime(time + myTimeBonusAmount, positionValueX);
            positionX.setValueAtTime(time, positionValueX + (-slideX * direction));
        }
    }
    if (direction == 2) {
        directionMultiple = 1;
    }
    if (direction == 3) {
        directionMultiple = -1;
    }
    if (layer[num].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == false && direction == 2 || direction == 3) {
        try{
        posValue = layer[num].property("ADBE Transform Group").property("ADBE Position").value;
        position = layer[num].property("ADBE Transform Group").property("ADBE Position");
        if (position.numKeys >= 1 || command == 1) {
            position.setValueAtTime(time, posValue);
            position.setValueAtTime(time + myTimeBonusAmount, posValue + [slideX, slideY * directionMultiple]);
        } else {
            position.setValueAtTime(time, posValue + [slideX, -slideY * directionMultiple]);
            position.setValueAtTime(time + myTimeBonusAmount, posValue);
        }
        }catch(e){}
    }

    if (layer[num].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated == true && direction == 2 || direction == 3) {
        positionValueY = layer[num].property("ADBE Transform Group").property("ADBE Position_1").value;
        positionY = layer[num].property("ADBE Transform Group").property("ADBE Position_1");
        if (positionY.numKeys >= 1 || command == 1) {
            positionY.setValueAtTime(time, positionValueY);
            positionY.setValueAtTime(time + myTimeBonusAmount, positionValueY + (slideY * directionMultiple));
        } else {
            positionY.setValueAtTime(time + myTimeBonusAmount, positionValueY);
            positionY.setValueAtTime(time, positionValueY + (-slideY * directionMultiple));
        }
    }
}
function OF_Keyfast_fadeIn() {
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
    myComp = app.project.activeItem;
    myTime = myComp.time;
    myLayer = myComp.selectedLayers;
    if (myLayer.length < 1) {
        alert("Please select 1 or more layers");
    }
    app.beginUndoGroup("Scale");
    for (i = 0; i < myLayer.length; i = i + 1) {
        currentObjectWidth = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[0];
        currentObjectHeight = myLayer[i].property("ADBE Transform Group").property("ADBE Scale").value[1];
        if (currentObjectHeight > 0 || currentObjectWidth > 0 || currentObjectHeight < 0 || currentObjectWidth < 0) {
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime, [0, 0]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime + myTimeBonusAmount, [currentObjectWidth, currentObjectHeight]);
        }
        if (currentObjectHeight === 0 || currentObjectWidth === 0) {
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime, [0, 0]);
            myLayer[i].property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(myTime + myTimeBonusAmount, [100, 100]);
        }
        if (overshootCheckBoxAmount == 1) {
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
function OF_Keyfast_scaleDown() {
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
    myComp = app.project.activeItem;
    myLayer = myComp.selectedLayers;
    if (myLayer.length < 1) {
        alert("Please select 2 or more keyframes to use time reverse on.");
    }
    app.executeCommand(3693);
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
    app.beginUndoGroup("Clone Keyframes");
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
