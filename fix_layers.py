import re

file_path = "src/content/blog/how-to-measure-ai-agent-performance-and-roi.md"

with open(file_path, "r") as f:
    content = f.read()

layers = [
    "1. Layer one",
    "2. Layer two",
    "3. Layer three",
    "4. Layer four"
]

for old_text in layers:
    layer_name = old_text.split(". ")[1]
    new_text = f'<span style="background: rgba(197, 34, 31, 0.1); color: #C5221F; padding: 2px 6px; border-radius: 4px; font-weight: 600;">{layer_name}</span>'
    content = content.replace(old_text, new_text)

with open(file_path, "w") as f:
    f.write(content)

print("Updated text highlighting for layers.")
