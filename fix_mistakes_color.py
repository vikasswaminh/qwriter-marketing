import re

file_path = "src/content/blog/how-to-measure-ai-agent-performance-and-roi.md"

with open(file_path, "r") as f:
    content = f.read()

# Replace the specific span style to include color: #C5221F;
old_style = 'style="background: rgba(197, 34, 31, 0.1); padding: 2px 6px; border-radius: 4px; font-weight: 600;"'
new_style = 'style="background: rgba(197, 34, 31, 0.1); color: #C5221F; padding: 2px 6px; border-radius: 4px; font-weight: 600;"'

new_content = content.replace(old_style, new_style)

with open(file_path, "w") as f:
    f.write(new_content)

print("Updated text color to red.")
