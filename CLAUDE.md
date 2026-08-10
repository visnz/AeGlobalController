# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

After Effects 的 ScriptUI Panel 脚本（作者自用集成工具箱），纯 JSX（ExtendScript）。没有包管理器、没有构建工具链、没有单测/类型检查——脚本直接跑在 AE 宿主 JS 运行时里，验证方式是把构建产物装进 AE 实测面板。

## 常用命令

```bash
./build.sh          # 或 bash build.sh / sh build.sh
```

把 `src/*.jsx` 按固定顺序拼接成根目录的 `visnlink.jsx`，这是唯一的构建步骤。没有其它 lint/test/typecheck 命令。

**改完 `src/` 下任何文件后必须重新跑一遍 `build.sh`**——`visnlink.jsx` 是构建产物，手改它会在下次构建时被覆盖，不要直接编辑。

部署：把构建出的 `visnlink.jsx` 复制到 AE 的 `ScriptUI Panels` 目录（如 `...\Adobe After Effects .../Support Files/Scripts/ScriptUI Panels`），重启 AE 后在「窗口」菜单底部打开面板测试。

## 架构

### 拼接顺序即“加载顺序”

`build.sh` 中的 `ORDER` 决定了 `visnlink.jsx` 里各文件的先后：

```
expressions → dictionary → colorPanel → motion2 → keyfast → aggregators → tools → ui → main
```

`expressions.jsx` 必须排最前，因为它在顶层（非函数内）构建 `expArray` 数组，而 `ui.jsx` 里的面板需要在初始化时读取这个数组填充右侧表达式列表。其余文件基本只声明全局函数，JSX 引擎会整体提升（hoist），调整顺序一般不会出问题，但没必要去动。`main.jsx` 必须最后，它是唯一的顶层执行入口：`UI(this, colorPanels)`。

### 各文件职责

- `src/expressions.jsx` — 表达式片段库。每个片段是一个 `exp_<名字>(layer)` 函数 + `expArray.push("序号.说明..函数名")`。双击面板右侧列表项会 `eval("exp_"+函数名+"(...)")` 把返回的表达式字符串赋给选中图层属性的 `.expression`。
- `src/dictionary.jsx` — 中英效果器字典，配合面板的中英查找（最大正向匹配法）。
- `src/colorPanel.jsx` — 色板。15 个颜色位，通过 `app.settings.saveSetting("visnlink", "colorPanelColorsN", ...)` 持久化，读取走 `getAllColortoPanel()`。
- `src/motion2.jsx` — Motion2 系列处理函数，命名前缀 `OF_Motion2_*`（Ease、AnchorMove、Null、Bounce 等）。
- `src/keyfast.jsx` — KeyFast 快速关键帧系列，命名前缀 `OF_Keyfast_*`（Fi/Fo/Su/Sd/Rl/Rr/Cl/Rv，以及 Nul/Vig）。
- `src/aggregators.jsx` — “集成脚本”，每个是一个 `aggr_<名字>()` 函数。**部分是从其它脚本移植来的 `@JSXBIN@` 编译形式（不可读的二进制字符串字面量）**，改这类脚本前要先用 `devtools/jsxbin2jsx/jsxbin_to_jsx.exe` 还原成明文再改，改完按需重新编译。
- `src/tools.jsx` — 批量工具，命名前缀 `OF_Tools_*`（如批量开 Motion Blur、批量延长出点、以及“自动缓存”功能：把合成渲染成 MOV 再导入替换为预合成层，用于降低复杂工程的实时预览负担）。自动缓存相关函数：`OF_Tools_cacheOneComp`/`cacheCompList`（渐进渲染+导入主流程）、`OF_Tools_renderCompToMOV`/`importAndPlaceMOV`（渲染与导入去重）、`OF_Tools_getCacheFolderPath`/`promptAndSaveCacheFolder`（缓存根目录持久化，同样走 `app.settings` 的 `visnlink` 命名空间）、`OF_Tools_initCachePanel`（面板里的手动缓存列表，用户维护顺序和启用状态，不做依赖树自动扫描）。
- `src/ui.jsx` — 唯一的 ScriptUI 面板布局文件。`content` 是一个手写的大字符串（嵌套分组要对齐缩进，否则面板会画歪），随后在文件末尾把各控件的 `onClick`/`onDoubleClick` 接到对应的处理函数。面板顶部有 Tools / Cache 两个 tab（`switchTab('tools'|'cache')`），Cache tab 对应上面的自动缓存功能。文件中段有一行 `// #DEVPOINT#` 注释标记集成脚本列表和 apply 按钮的位置，新增 aggregator 时通常在这附近改。
- `src/main.jsx` — 入口，仅调用 `UI(this, colorPanels)`。

### 集成脚本（aggregators）的分发机制

面板的 listBox 每一项文本格式是 `"序号.说明..函数名"`；点击 apply 按钮会执行：

```js
eval("aggr_" + text.split("..")[1])
```

所以新增一个集成脚本时，`ui.jsx` 里 `add('item', ...)` 的字符串在 `..` 之后必须和 `aggregators.jsx` 里定义的 `aggr_函数名` 完全一致，否则点 apply 会找不到函数（`eval` 静默失败或抛错）。

### 命名约定

- Motion2 处理函数：`OF_Motion2_*`
- KeyFast 处理函数：`OF_Keyfast_*`
- 批量工具：`OF_Tools_*`
- 集成脚本：`aggr_*`
- 表达式片段：`exp_*`

这些是习惯，不是强制规则——自用项目怎么顺手怎么来，但新增函数照着前缀写会让面板列表和代码更容易对应。

### 跨 AE 版本防御

不同 AE 版本 API 有差异，访问图层/特效属性前先判空（参考 `motion2.jsx` 里各函数开头的写法），常用判空点：`app.project.activeItem`、`selectedLayers`、`canVaryOverTime`。

### `devtools/jsxbin2jsx/`

Windows 可执行工具，用于把 `aggregators.jsx` 里内嵌的 `@JSXBIN@...` 编译字符串还原成可读 JSX（或反向编译）。只有涉及这些编译脚本时才需要用到。

## 提交前流程

Commit 前需要在 `开发计划/` 目录下留一份开发报告，文件名格式 `开发计划/<主题>报告-YYYYMMDD.md`，内容包含：本次改了什么/为什么、中间尝试过的方案和踩的坑、实现摘要、待验证项。这是找回历史决策依据的唯一途径（没有 issue tracker / PR 描述之类的外部记录）。
