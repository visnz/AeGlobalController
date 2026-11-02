# Linear Dodge → Add 批量工具报告

日期：2026-11-02

## 需求 / 目标

在 Tools 分页的 batch 行新增一个按钮，把当前合成窗口里选中的图层（含预合成内部，递归）混合模式为 Linear Dodge（线性减淡）的全部改成 Add（相加）。

入口是**时间线窗口（当前合成窗口）里选中的图层**，不是 Project 面板的选中项。

## 实现摘要

- `src/tools.jsx`：新增 `OF_Tools_linearDodgeToAdd()`。
  - 取 `app.project.activeItem`（当前合成）与 `selectedLayers`（时间线选中图层）。
  - 递归处理：`processLayerRecursive` 改图层混合模式，遇到预合成层（`layer.source instanceof CompItem`）递归进入 `processCompRecursive` 处理内部所有图层。
  - 用 `visited` 记录已进入的合成 id，防止循环嵌套（A 套 B、B 套 A）无限递归。
  - `BlendingMode.LINEARDODGE` → `BlendingMode.ADD`，try/catch 包裹以兼容无 blendingMode 的图层类型（如相机/灯光/音频等）。
  - 全程一个 `app.beginUndoGroup`，可一键撤销；用 `OF_Log` 记录改动数量。
- `src/ui.jsx`：
  - batch 行（line2）新增按钮 `lda`，文本 `LD→A`，preferredSize [40,25]。
  - 文件末尾接线 `tp.outsideGroup.line1.lineB.line2.lda.onClick=OF_Tools_linearDodgeToAdd`。
- 已 `bash ./build.sh` 重新生成 `visnlink.jsx`。

## 踩的坑

1. **`build.sh` 在 Windows 下跑失败**：报 `set: -\r: invalid option`。根因是 git `core.autocrlf=true`，checkout 时把 `build.sh` 从 LF 转成 CRLF，bash 不认 `\r`。临时处理：用 PowerShell 把 `build.sh` 转回 LF 再跑。但 autocrlf=true 下次 checkout 会再次变回 CRLF，属持续性问题。
   - 根治建议：在 `.gitattributes` 里加 `*.sh text eol=lf`（或本机 `git config core.autocrlf input`）。
2. **覆盖 AE 目录里的 `visnlink.jsx` 报「文件正由另一进程使用」**：AE 面板打开时会锁定脚本文件。所以热重载顺序必须严格是「关面板 → 复制覆盖 → 从窗口菜单重开」，顺序不能乱。

## 待验证

1. AE 里关面板 → 把根目录 `visnlink.jsx` 复制到 AE 2024 `ScriptUI Panels` 目录 → 从窗口菜单重开面板，确认 batch 行出现 `LD→A` 按钮。
2. 在时间线选中若干图层（其中含 Linear Dodge 的层、以及预合成层），点 `LD→A`，确认选中层与预合成内部所有 Linear Dodge 都变成 Add，且 Log 面板显示改动数量。
3. 撤销（Ctrl+Z）能一次性还原全部改动。
4. 含循环嵌套（A 套 B、B 套 A）的工程不会卡死。
