# 桶子集成脚本（自家用）

![界面图](https://v.guediao.top/mygithub/AeGlobalController/panel.png)

## 功能简述

1. 脚本管理器：集成自常见脚本管理器，需要自选script文件夹，右边可刷新

![](https://v.guediao.top/mygithub/AeGlobalController/panel3.png)

2. 集成脚本

![集成脚本图](https://v.guediao.top/mygithub/AeGlobalController/panel2.png)

这里基本集成了业界流传的一些实用脚本（目前仅集成我个人用得较多的）。
这里所谓**集成**，是指**这一系列脚本已经内嵌在这个大的脚本之内**了

3. keyfast：是一个快速创建关键帧的脚本
    1. Fi = Fade in 创建透明度从0到当前目标值（默认100）的关键帧，Fo = Fade out
    2. Su = Scale up 创建缩放从0到当前目标值（默认100）的关键帧，Sd = Scale down
    3. Rl = Rotate left 旋转，Rr = Rotate right
    4. Cl = Clone，克隆已选中的关键帧
    5. Rv = Time Reverse，已选中的关键帧在时间上反转

4. motion2：可以参考[这里](https://www.zcool.com.cn/article/ZNDIwMzg4.html)，基本是原生功能
    1. Nul = Null 创建空物体作为已选图层的父级，可以作为控制器
    2. Buc = Bouce 弹跳表达式
    3. Bld = Blend 缓和表达式
    4. Bst = Brust 爆发效果
    5. Rop = Rope 连线效果
    6. Wap = Wrap 拖尾效果
    7. Str = Stare 注视关系
    8. Vig = 创建暗角

5. Ease 缓动功能（此部分也是拆分自motion2）：第一行是in参数，0~100，第二行是两者同时选，第三行是out。
6. AnchorMove 锚点移动（函数来自motion2，但是它本来只提供9宫格，我就改成了浮点函数，现在可以随意移动）。reset可以重新居中
7. 常用表达式片段（个人）。**可以自己在jsx文件的头部新增自己的表达式，定义功能**。

![](https://v.guediao.top/mygithub/AeGlobalController/panel4.png)


8. 色板：暂时没有拾色器，色板可长期存储，不过只有15个位，点击 push 可以推入新的颜色（通过#HEX）

9. 中英查找：这个是个人因为从中切换到英文版，一些效果器不知道英文叫什么，每次都要查很麻烦。（最大正向匹配法）

![](https://v.guediao.top/mygithub/AeGlobalController/panel5.png)

查找到后，可以在右边选择，按apply直接添加到已选图层

10. 调试器：提供log面板，同时也可以直接调用。调试器会直接调用``try{eval( $YOUR_INPUT$ )}catch(e){alert(e)}``函数

![](https://v.guediao.top/mygithub/AeGlobalController/panel6.png)

11. 本地调用：可以选择已经写好的内容直接调用os函数

![](https://v.guediao.top/mygithub/AeGlobalController/panel7.png)

从上到下内容依次是：记事本、计算器、画板，最后一个是**AE多开**

12. 测试版内容

包含了一个可以访问web的接口，可以输入http网址进行访问获取。filter可以进行内容筛选。

## usage

0. 下载jsx文件
1. 复制到``ScriptUI Panels``文件夹（如``C:\Program Files\Adobe\Adobe After Effects CC 2015.3\Support Files\Scripts\ScriptUI Panels``）
2. 重启Ae后于``工具栏-窗口``底部

## 关于我
- [个人网页](https://v.guediao.top)
- QQ: 864689103
- BilibiliID: DDL水桶
