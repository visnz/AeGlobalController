//============ Motion 2 ==========//
function OF_Motion2_inMotion(number2) {
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
                        var easeOut = new KeyframeEase(prop.keyOutTemporalEase(prop.selectedKeys[k])[0].speed, Math.max(prop.keyOutTemporalEase(prop.selectedKeys[k])[0].influence,0.1));
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
    var mainComp = app.project.activeItem;
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
    var curTime = app.project.activeItem.time;
    var theLayers = app.project.activeItem.selectedLayers;
    for (var num = 0; num < theLayers.length; num += 1) {
        var theLayer = theLayers[num];
        x=Math.round(row/2*theLayer.sourceRectAtTime(curTime, false).width)
        y=Math.round(col/2*theLayer.sourceRectAtTime(curTime, false).height)

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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
    var i = 0;
    var j = 0;
    var k = 0;
    app.beginUndoGroup("Ease Out");
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

                        var easeIn = new KeyframeEase(prop.keyInTemporalEase(prop.selectedKeys[k])[0].speed, Math.max(prop.keyInTemporalEase(prop.selectedKeys[k])[0].influence,0.1));
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
    var theLayers = app.project.activeItem.selectedLayers;
    for (var num = 0; num < theLayers.length; num += 1) {
        var theLayer = theLayers[num];
        theLayer.parent = null;
    }
    OF_Motion2_nullToItem();
    app.endUndoGroup();
}
function OF_Motion2_nullToItem() {
    if(!app.project.activeItem)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
    if(!app.project.activeItem)return
    if(!app.project.activeItem.selectedLayers)return
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
