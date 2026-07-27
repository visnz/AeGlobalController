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
