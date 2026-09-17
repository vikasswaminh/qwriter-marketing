import re

file_path = "src/content/blog/how-to-measure-ai-agent-performance-and-roi.md"

with open(file_path, "r") as f:
    content = f.read()

# We need to find the <h2 id="bringing-it-together" ...> tag
# and everything after it until </article>
pattern = r'(<h2 id="bringing-it-together".*?)(</article>)'
match = re.search(pattern, content, re.DOTALL)

if match:
    bringing_it_together_content = match.group(1)
    
    # The new structure:
    # </article>  <!-- close the main content box -->
    # </div> <!-- close the blog-content if it's there, wait let's just create a new box inside the same column -->
    # Actually, if we want it to be a separate box, we can just wrap it in a <section> with a white background.
    
    # Wait, in this blog, the `os-article-content` is inside `blog-content`. 
    # If we close `article`, we might need to put a new `<section>` or `<article>` inside the `blog-content`.
    # Let's wrap it like this:
    
    new_section = f"""</article>
<section style="background: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-top: 32px; border: 1px solid #E2E8F0;">
{bringing_it_together_content}
</section>
</article> <!-- Wait, the original had </article>, we need to put it back since we replaced it, or we just remove the original and add the section, then close what needs to be closed. Let's see: we matched up to </article>. So we should replace the match with </article> <section>...</section> -->
"""
    # But wait, replacing `<h2 ...>...</article>` with `</article> <section>...</section>` would leave it outside the article but inside the parent `div`.
    
    # Let's verify the replacement logic.
    replacement = f"""</article>
<section style="background: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-top: 32px; border: 1px solid #E2E8F0;">
{bringing_it_together_content}
</section>
"""
    new_content = content.replace(match.group(0), replacement)
    
    with open(file_path, "w") as f:
        f.write(new_content)
    print("Successfully separated the Bringing It Together section.")
else:
    print("Could not find the Bringing It Together section.")
