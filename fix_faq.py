import re

file_path = "src/content/blog/how-to-measure-ai-agent-performance-and-roi.md"

with open(file_path, "r") as f:
    content = f.read()

# The FAQ section starts with <h2 id="faq"...> and ends with </article>
pattern = r'(<h2 id="faq"[^>]*>Frequently Asked Questions \(FAQ\)</h2>)\s*(.*?)\s*(</article>)'
match = re.search(pattern, content, re.DOTALL)

if match:
    faq_header = '<h2 id="faq" class="os-h2" style="margin-top: 40px; margin-bottom: 32px; color: var(--color-heading); font-size: 1.75rem; font-weight: 800;">Frequently Asked Questions (FAQ)</h2>'
    faq_items = match.group(2)
    
    # We will find all <p><strong>Q</strong><br>A</p>
    item_pattern = r'<p[^>]*><strong>(.*?)</strong><br>\s*(.*?)</p>'
    items = re.findall(item_pattern, faq_items, re.DOTALL)
    
    new_faq_html = faq_header + '\n<div >\n'
    for q, a in items:
        new_faq_html += f'''<details class="os-faq-item">
<summary>{q.strip()}</summary>
<div class="faq-content">
<p style="margin: 0;"> {a.strip()} </p>
</div>
</details>\n'''
    new_faq_html += '</div>\n'
    
    replacement = f'{new_faq_html}\n</article>'
    new_content = content.replace(match.group(0), replacement)
    
    with open(file_path, "w") as f:
        f.write(new_content)
    print("Successfully updated the FAQ section.")
else:
    print("Could not find the FAQ section.")
