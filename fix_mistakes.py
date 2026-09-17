import re

file_path = "src/content/blog/how-to-measure-ai-agent-performance-and-roi.md"

with open(file_path, "r") as f:
    content = f.read()

def replace_mistake(match):
    li_attrs = match.group(1)
    mistake_text = match.group(2)
    # Highlight text with light red box
    highlighted = f'<span style="background: rgba(197, 34, 31, 0.1); padding: 2px 6px; border-radius: 4px; font-weight: 600;">{mistake_text}</span>'
    return f"<li{li_attrs}>{highlighted}"

# Regex
matches = re.findall(r'<li([^>]*)>\d+\.\s*(The [a-z]+ mistake)', content)
print("Matches found:", len(matches))
print("First match:", matches[0] if matches else "None")

new_content = re.sub(r'<li([^>]*)>\d+\.\s*(The [a-z]+ mistake)', replace_mistake, content)
print("Content changed:", new_content != content)

with open(file_path, "w") as f:
    f.write(new_content)

