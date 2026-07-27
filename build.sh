#!/usr/bin/env bash
# 把 src/ 下的模块按固定顺序拼接成根目录的 visnlink.jsx（用户实际复制进 AE ScriptUI Panels 的文件）。
# 顺序要求：expressions 必须在 main 之前（顶层 expArray 要在 UI() 调用前构建好），
# 其余文件均只含函数声明，会被整体提升（hoist），顺序无关。
set -e
cd "$(dirname "$0")"

ORDER=(
  src/expressions.jsx
  src/dictionary.jsx
  src/colorPanel.jsx
  src/motion2.jsx
  src/keyfast.jsx
  src/aggregators.jsx
  src/ui.jsx
  src/main.jsx
)

OUT=visnlink.jsx
> "$OUT"
for f in "${ORDER[@]}"; do
  cat "$f" >> "$OUT"
  echo >> "$OUT"
done

echo "built $OUT from ${#ORDER[@]} files"
