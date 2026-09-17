import re

file_path = "src/content/blog/how-to-measure-ai-agent-performance-and-roi.md"

with open(file_path, "r") as f:
    content = f.read()

replacements = [
    "The first is full completion without any human touch.",
    "The second is completion with human correction.",
    "The third is outright failure."
]

for old_text in replacements:
    new_text = f'<span style="color: #C5221F; text-decoration: underline; font-weight: 600;">{old_text}</span>'
    content = content.replace(old_text, new_text)

with open(file_path, "w") as f:
    f.write(content)

print("Updated text highlighting.")
