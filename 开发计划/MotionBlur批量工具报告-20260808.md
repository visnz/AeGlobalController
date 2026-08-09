# 批量开启 Motion Blur 工具开发报告

日期：2026-08-08

## 需求

在 `Tools` 下方新增一行工具按钮，第一个功能是：**批量开启当前活跃合成及其所有嵌套合成内全部图层的 Motion Blur（动态模糊）**。

## 方案调研

通过 After Effects ExtendScript 文档确认：

- `AVLayer.motionBlur`（Boolean，读写）：控制单个图层的动态模糊开关。
- `CompItem.motionBlur`（Boolean，读写）：控制合成总开关；只有合成总开关打开，图层上的动态模糊才会实际渲染。
- 预合成层本身也是 `AVLayer`，有 `source` 属性；当 `layer.source instanceof CompItem` 时，可递归进入内部。
- 为了避免循环引用导致死循环，用 `visited` 对象按 `comp.id` 去重。

## 实现

新增文件：`src/tools.jsx`

```javascript
function OF_Tools_enableMotionBlur(){
    if(!app.project || !app.project.activeItem) return;
    var comp = app.project.activeItem;
    if(!(comp instanceof CompItem)) return;

    app.beginUndoGroup("Enable Motion Blur");
    var visited = {};
    enableMotionBlurRecursive(comp, visited);
    app.endUndoGroup();

    function enableMotionBlurRecursive(c, visited){
        if(!c || !(c instanceof CompItem) || visited[c.id]) return;
        visited[c.id] = true;
        c.motionBlur = true;
        for(var i = 1; i <= c.numLayers; i++){
            var layer = c.layer(i);
            if(!layer) continue;
            try { layer.motionBlur = true; } catch(e){}
            if(layer.source && layer.source instanceof CompItem){
                enableMotionBlurRecursive(layer.source, visited);
            }
        }
    }
}
```

说明：
- 先打开合成总开关 `c.motionBlur`，再遍历图层。
- 用 `try/catch` 兜底，避免 Camera / Light 等非 `AVLayer` 类型报错中断。
- 递归时记录 `visited[comp.id]`，防止嵌套循环导致死循环。

## 改动文件

- `src/tools.jsx`：新增，存放批量工具函数。
- `build.sh`：在 `ORDER` 中加入 `src/tools.jsx`（位于 `aggregators.jsx` 之后、`ui.jsx` 之前）。
- `src/ui.jsx`：
  - 在 `line1`（tools 行）下方新增 `line2`（batch 行），放一个 `MB` 按钮。
  - 按钮 `onClick` 绑定到 `OF_Tools_enableMotionBlur`。

## 构建

```bash
bash ./build.sh
# 输出：built visnlink.jsx from 9 files
```

## 待验证

- 打开一个含预合成的合成，点击 `MB` 按钮。
- 检查当前合成所有图层的 Motion Blur 开关是否全部打开。
- 进入预合成内部，检查内部图层开关是否也全部打开。
- 检查合成总开关是否被打开。
- 尝试当前活跃项不是合成（如选中素材）时，脚本不报错。

## 备注

- 这是 Tools 批量工具行的第一个按钮，后续同类功能（如批量开启 Collapse Transformation、批量设置帧混合等）可以继续往 `src/tools.jsx` 里加函数，并在 `ui.jsx` 的 `line2` 追加按钮。
- 当前 `MB` 按钮文本较短，后续如果按钮变多，可以考虑改成图标或更短的缩写。
