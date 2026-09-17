import re

file_path = "src/content/blog/how-to-measure-ai-agent-performance-and-roi.md"

with open(file_path, "r") as f:
    content = f.read()

# We need to find the <h2 id="bringing-it-together" ...> tag
# and everything after it until the <div style="text-align: center;">
pattern = r'(<h2 id="bringing-it-together"[^>]*>Bringing It Together</h2>)(.*?)(<div style="text-align: center;">\s*<a href="https://ollasuper.com/")'
match = re.search(pattern, content, re.DOTALL)

if match:
    # Constructing the new concise text
    h2_tag = '<h2 id="bringing-it-together" style="font-size: 28px; font-weight: 800; color: #0F172A; margin-top: 8px; margin-bottom: 16px; text-align: center;">Bringing It Together</h2>'
    new_p = '<p style="font-size: 1.1rem; line-height: 1.75; color: #334155; margin-bottom: 28px; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">Measuring AI agent performance requires moving past vanity metrics to focus on real business outcomes. By tracking task success rates, operational costs, and human oversight, you can build a transparent framework for calculating AI ROI. Platforms like OllaSuper streamline this process with deterministic evaluation and deep observability, ensuring your AI workforce delivers verifiable value built on absolute trust.</p>'
    
    replacement = f'{h2_tag}\n {new_p}\n {match.group(3)}'
    new_content = content.replace(match.group(0), replacement)
    
    with open(file_path, "w") as f:
        f.write(new_content)
    print("Successfully shortened the Bringing It Together section.")
else:
    print("Could not find the section to replace.")
