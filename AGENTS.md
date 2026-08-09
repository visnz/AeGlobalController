# AGENTS.md — AeGlobalController 开发指南

面向维护者（人类或 AI）的架构与约定说明。改代码前请先读 `README.md`（功能与部署说明）。

本仓库是 After Effects 的 ScriptUI Panel 脚本（自家用集成工具箱）。源码按功能拆分在
`src/` 下，`build.sh` 把它们按顺序拼接成根目录的 `visnlink.jsx`，后者才是真正复制进
AE 的产物。**改完 `src/` 后记得重新构建**，手改 `visnlink.jsx` 会被下次构建覆盖掉。

这是作者自用项目，约定以「建议」为主，不必死守——后面还会不断加新功能，怎么顺手怎么来。

## 架构总览

`src/` 各文件只声明全局函数（JSX 会整体提升），`ui.jsx` 负责搭 ScriptUI 面板并把按钮
`onClick` 接到对应函数；`main.jsx` 是入口，调用 `UI(this, colorPanels)` 拉起面板。

```
AeGlobalController/
├── visnlink.jsx      # 构建产物（build.sh 拼接生成）。重新构建会被覆盖。
├── build.sh          # 按固定顺序把 src/*.jsx 拼成 visnlink.jsx
├── src/
│   ├── expressions.jsx  # 表达式片段库：expArray + exp_* 函数
│   ├── dictionary.jsx   # 中英效果器字典（SC/EN 查找用）
│   ├── colorPanel.jsx   # 色板：通过 app.settings 持久化 15 个颜色位
│   ├── motion2.jsx      # Motion2 系：Ease / AnchorMove / Null / Bounce ...
│   ├── keyfast.jsx      # KeyFast 系：Fi/Fo/Su/Sd/Rl/Rr/Cl/Rv（现含 Nul/Vig）
│   ├── aggregators.jsx  # 集成脚本：aggr_* 函数（部分以 @JSXBIN@ 编译形式存在）
│   ├── tools.jsx        # 批量工具：OF_Tools_* 函数（如批量开 Motion Blur）
│   ├── ui.jsx           # 面板布局 + 按钮→处理函数接线（含 #DEVPOINT# 标记）
│   └── main.jsx         # 入口：UI(this, colorPanels)
└── devtools/jsxbin2jsx/ # JSXBIN↔JSX 互转工具（用于阅读/还原编译过的脚本）
```

拼接顺序（`build.sh` 里的 `ORDER`）：
`expressions → dictionary → colorPanel → motion2 → keyfast → aggregators → tools → ui → main`

一个值得留意的点：`expressions.jsx` 默认排在最前，因为 `UI()` 调用前要先构建好顶层
`expArray`（右侧表达式列表依赖它）。其余文件只含函数声明、会被提升，顺序其实无关，
所以调整顺序一般没事，但保持现状更省心。

## 命名约定（建议，非强制）

目前沿用的前缀习惯，新增函数照着用会更整齐，但自用项目不必强求：

- Motion2 处理函数：`OF_Motion2_*`（如 `OF_Motion2_bounce`、`OF_Motion2_moveAnchor`）
- KeyFast 处理函数：`OF_Keyfast_*`（如 `OF_Keyfast_fadeIn`、`OF_Keyfast_timeReverse`）
- 表达式片段：`exp_*`，并往 `expressions.jsx` 的 `expArray` push 一行 `"序号.说明..函数名"`
- 集成脚本：`aggr_*`，并往 `ui.jsx` 的 DropDownList 里 add 一项 `"序号.说明..函数名"`

UI 面板里聚合脚本靠 `eval("aggr_"+text.split("..")[1])` 派发，所以列表项的 `..` 后最好和函数名一致，
否则点 apply 找不到函数。

## 一些零散提醒

- **UI 接线**：按钮 `onClick` 大多接在 `ui.jsx` 末尾；新增面板按钮时在 `ui.jsx` 加控件并接好
  handler 比较顺手，但不强制把 UI 和逻辑分开——怎么方便怎么写。
- **色板持久化**：颜色用 `app.settings.saveSetting("visnlink", "colorPanelColorsN", ...)` 存储，
  读取走 `getAllColortoPanel()`。新增存储键用 `visnlink` 命名空间即可，避免和其他脚本冲突。
- **跨版本防御**：AE 不同版本 API 有差异，访问属性/特效前先用 `app.project.activeItem`、
  `selectedLayers`、`canVaryOverTime` 等判空，能少踩坑（参考 `motion2.jsx` 函数开头的 guard）。
- **编译脚本**：`aggregators.jsx` 里部分旧脚本是 `@JSXBIN@` 编译形式（不可读）。要改它们先用
  `devtools/jsxbin2jsx/jsxbin_to_jsx.exe` 还原成明文，改完按需再编译回 JSXBIN。
- **注释风格**：从别处集成的脚本，原作者的口语化中文注释可以保留，不必「润色」；修 bug 和
  结构调整分开提交会更清爽，但都看你。

## 如何新增功能（参考流程）

- **新增表达式片段**：在 `expressions.jsx` 里 `expArray.push("N.说明..函数名")` 并定义
  `function exp_函数名(layer){...}`；它会自动出现在面板右侧列表，双击即可加到选中图层属性。
- **新增集成脚本（aggregators）**：在 `aggregators.jsx` 定义 `function aggr_函数名(){...}`，
  并在 `ui.jsx` 的 `listBox` 里 `add('item', "N.说明..函数名")`；点 apply 走 `eval("aggr_"+...)`。
- **新增面板按钮/分区**：在 `ui.jsx` 的 `content` 字符串里加控件，再在文件末尾把 `onClick` 接到
  对应函数。注意 `content` 是手写的大字符串，嵌套分组层级要对齐，否则面板会画歪。

## 提交前写开发报告

自用项目虽宽松，但 **commit 前请在 `开发计划/` 下留一份开发报告**。报告里记下：

- 本次改了什么（需求 / 目标）
- 中间尝试了哪些方案、踩了什么坑、为什么最终选这个方案
- 实现摘要和待验证项

文件名建议：`开发计划/<主题>报告-YYYYMMDD.md`。这样后面回看或回滚时能找到当时的决策依据。

## 构建与部署

- 构建：`bash ./build.sh`（或 `sh build.sh`），生成根目录 `visnlink.jsx`。
- 部署：把 `visnlink.jsx` 复制到 AE 的 `ScriptUI Panels` 目录（如
  `C:\Program Files\Adobe\Adobe After Effects CC 2015.3\Support Files\Scripts\ScriptUI Panels`），
  重启 AE 后在 `窗口` 菜单底部打开。
- 没有单元测试/类型检查体系——本脚本跑在 AE 宿主运行时里，验证靠在 AE 内实测面板各项功能。

## 已知问题 / TODO

以 `README.md` 与运行反馈为准（作者留了 QQ 反馈入口）。集成多方脚本后未全面测试，新增/修改功能后
在 AE 内实测对应按钮与表达式即可，避免回归。
