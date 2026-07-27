//============ 表达式片段 ==========//
var expArray=[]
expArray.push("1.抖动控制器..wiggleControl")
expArray.push("2.循环..loopOutCycle")
expArray.push("3.首尾相接循环..loopOutPingpong")
expArray.push("4.随机0-1..random1")
expArray.push("5.随机范围..randomRange")
expArray.push("6.随机范围取整..randomRangeRound")
expArray.push("7.弹性EnW常用..enw_outElastic_All")
expArray.push("8.弹跳表达式..jump")
expArray.push("9.招财猫表达式..helloCat")
function exp_helloCat(layer){
    e1=layer.effect.addProperty("ADBE Slider Control");
    e1.name="频率";
    e1(1).setValue(2);
    e2=layer.effect.addProperty("ADBE Slider Control");
    e2.name="单次来回";
    e2(1).setValue(2);
    e3=layer.effect.addProperty("ADBE Slider Control");
    e3.name="间隔周期";
    e3(1).setValue(10);
    e4=layer.effect.addProperty("ADBE Slider Control");
    e4.name="幅度";
    e4(1).setValue(50);
    e5=layer.effect.addProperty("ADBE Checkbox Control");
    e5.name="振幅变小";
    e5(1).setValue(true);
    return 'var fru=effect("频率")(1)\nvar duration=2*Math.PI*effect("单次来回")(1)\nvar decrease=1-((time/(duration/fru))%1)\nif((time/(duration/fru))%(1+effect("间隔周期")(1))<=1){\n	Math.sin(time*fru)*effect("幅度")(1)*((effect("振幅变小")(1)==0)?1:decrease)\n}else 0';
}
function exp_jump(){
    return 'amp=0.1;\nfreq=10;\ndecay=2;\na=numKeys;\nn=nearestKey(time).index;\net=key(n).time;\nt=time-et;\nv=velocityAtTime(et-0.01);\nif  (t>0 & n>=a){\n    value+v*amp*Math.sin(t*freq)/Math.exp(t*decay);\n}\nelse{\n    value;\n}'
}
function exp_enw_outElastic_All(){
    return '// Ease and Wizz 2.0.4 : outElastic : All keyframes\n// Ian Haigh (http://ianhaigh.com/easeandwizz/)\n// Last built: 2013-07-05T11:46:51+10:00\n// some defaults\nvar p = 0.81;		// period for elastic\nvar a = 50;		// amplitude for elastic\nvar s = 1.70158;	// overshoot amount for "back"\nfunction easeandwizz_outElastic(t, b, c, d, a, p) {\n	if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;\n	if (!a || a < Math.abs(c)) { a=c; var s=p/4; }\n	else var s = p/(2*Math.PI) * Math.asin (c/a);\n	return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);\n}\nfunction easeAndWizz() {\n	var n = 0;\n	if (numKeys > 0) {\n		n = nearestKey(time).index;\n		if (key(n).time > time)	{ n-- }\n	}\n	try {\n		var key1 = key(n);\n		var key2 = key(n+1);\n	} catch(e) {\n		return null;\n	}\n	// determine how many dimensions the keyframes need\n	var dim = 1; // Its gotta have at least ONE dimension\n	try {\n		key(1)[1];\n		dim = 2;\n		key(1)[2];\n		dim = 3;\n	} catch(e) {}\n	t = time - key1.time;\n	d = key2.time - key1.time;\n	sX = key1[0];\n	eX = key2[0] - key1[0];\n	if (dim >= 2) {\n		sY = key1[1];\n		eY = key2[1] - key1[1];\n		if (dim >= 3) {\n			sZ = key1[2];\n			eZ = key2[2] - key1[2];\n		}\n	}\n	if ((time < key1.time) || (time > key2.time)) {\n		return value;\n	} else {\n		val1 =  easeandwizz_outElastic(t, sX, eX, d, a, p, s);\n		switch (dim) {\n			case 1:\n			     return val1;\n			     break;\n			case 2:\n			     val2 = easeandwizz_outElastic(t, sY, eY, d, a, p, s);\n			     return [val1, val2];\n			     break;\n			case 3:\n			     val2 = easeandwizz_outElastic(t, sY, eY, d, a, p, s);\n			     val3 = easeandwizz_outElastic(t, sZ, eZ, d, a, p, s);\n			     return [val1, val2, val3];\n			     break;\n			default:\n			     return null;\n		}\n	}\n}\n(easeAndWizz() || value);'
}
function exp_wiggleControl(layer){
    e1=layer.effect.addProperty("ADBE Slider Control");
    e1.name="抖动频度";
    e1(1).setValue(8);
    e2=layer.effect.addProperty("ADBE Slider Control");
    e2.name="抖动幅度";
    e2(1).setValue(50);
    return 'wiggle(effect("晃动几率")(1),effect("晃动幅度")(1))'
}
function exp_loopOutCycle(){
    return 'loopOut("cycle",0)'
}
function exp_loopOutPingpong(){
    return 'loopOut("pingpong",0)'
}
function exp_random1(){
    return 'random(1)'
}
function exp_randomRange(layer){
    e1=layer.effect.addProperty("ADBE Slider Control");
    e1.name="范围上限";
    e1(1).setValue(100);
    e2=layer.effect.addProperty("ADBE Slider Control");
    e2.name="范围下限";
    e2(1).setValue(-50);
    return 'random(effect("范围上限")(1)-effect("范围下限")(1))+effect("范围上限")(1)'
}
function exp_randomRangeRound(layer){
    return 'Math.round('+exp_randomRange(layer)+')'
}
