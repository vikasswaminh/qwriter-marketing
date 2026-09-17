import re

file_path = "src/content/blog/how-to-measure-ai-agent-performance-and-roi.md"

with open(file_path, "r") as f:
    content = f.read()

# We want to match from <h2 id="faq"...> to </article>
pattern = r'(<h2 id="faq".*?)(</article>)'
match = re.search(pattern, content, re.DOTALL)

if match:
    faq_content = match.group(1)
    
    # Let's also center the FAQ heading
    faq_content = re.sub(
        r'(<h2 id="faq" class="os-h2" style=".*?)(">)',
        r'\1 text-align: center;\2',
        faq_content
    )
    
    replacement = f'''</article>
<section style="background: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-top: 32px; border: 1px solid #E2E8F0;">
{faq_content}
</section>
'''
    new_content = content.replace(match.group(0), replacement)
    
    with open(file_path, "w") as f:
        f.write(new_content)
    print("Successfully separated the FAQ section and centered its heading.")
else:
    print("Could not find the FAQ section.")
