const fs = require('fs');
const path = require('path');

const OLD_BLOG_DIR = '/Users/hirakdebnath/Downloads/qwriter-blog/src/content/blog/';
const NEW_POSTS_DIR = path.join(__dirname, '../src/components/blog/posts/');
const BLOG_TS_PATH = path.join(__dirname, '../src/data/blog.ts');
const SLUG_ASTRO_PATH = path.join(__dirname, '../src/pages/blog/[slug].astro');

// Get existing slugs to skip
const existingBlogTs = fs.readFileSync(BLOG_TS_PATH, 'utf-8');
const existingSlugs = [...existingBlogTs.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

// Get existing max post number
const existingPosts = fs.readdirSync(NEW_POSTS_DIR).filter(f => f.startsWith('post-') && f.endsWith('.astro'));
let maxPostIndex = 0;
existingPosts.forEach(f => {
    const num = parseInt(f.match(/post-(\d+)\.astro/)[1]);
    if (num > maxPostIndex) maxPostIndex = num;
});

const files = fs.readdirSync(OLD_BLOG_DIR).filter(f => f.endsWith('.md'));

let newEntries = [];
let newContentComponents = {};
let postIndex = maxPostIndex + 1;

for (const file of files) {
    const filePath = path.join(OLD_BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const slug = file.replace('.md', '');
    if (existingSlugs.includes(slug)) {
        console.log(`Skipping ${slug}, already exists.`);
        continue;
    }

    console.log(`Migrating ${slug}...`);

    // Parse Frontmatter
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) {
      console.log(`No frontmatter found for ${slug}`);
      continue;
    }
    
    const fmStr = fmMatch[1];
    let fm = {};
    fmStr.split('\n').forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx > -1) {
            const key = line.slice(0, colonIdx).trim();
            let val = line.slice(colonIdx + 1).trim();
            if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
            if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
            if (val.startsWith('[') && val.endsWith(']')) {
                val = val.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
            }
            fm[key] = val;
        }
    });

    // Parse TLDR
    let tldr = "";
    const tldrMatch = content.match(/<h3 id="tldr"[^>]*>.*?<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/);
    if (tldrMatch) tldr = tldrMatch[1].trim().replace(/\n/g, ' ');

    // Parse Takeaways
    let takeaways = [];
    const takeawaysSectionMatch = content.match(/<h3 id="key-takeaways"[^>]*>.*?<\/h3>([\s\S]*?)<\/section>/);
    if (takeawaysSectionMatch) {
        const tkRegex = /<h4[^>]*>([\s\S]*?)<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
        let tk;
        while ((tk = tkRegex.exec(takeawaysSectionMatch[1])) !== null) {
            takeaways.push({
                title: tk[1].trim().replace(/\n/g, ' '),
                description: tk[2].trim().replace(/\n/g, ' ')
            });
        }
    }

    // Parse FAQs
    let faqs = [];
    const faqsSectionMatch = content.match(/<h2 id="faq"[^>]*>.*?<\/h2>([\s\S]*?)<\/section>/);
    if (faqsSectionMatch) {
        const faqRegex = /<summary[^>]*>\s*([\s\S]*?)\s*<span/g;
        const ansRegex = /<div style="padding: 24px[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
        
        let qMatches = [...faqsSectionMatch[1].matchAll(faqRegex)];
        let aMatches = [...faqsSectionMatch[1].matchAll(ansRegex)];
        
        for (let i = 0; i < qMatches.length; i++) {
            if (aMatches[i]) {
                faqs.push({
                    question: qMatches[i][1].trim(),
                    answer: aMatches[i][1].trim()
                });
            }
        }
    }
    
    // Fallback if no FAQs are found to satisfy typescript type required by existing site
    if (faqs.length === 0) {
      faqs.push({
         question: "How does this relate to AI Agents?",
         answer: "This is a fundamental concept in building autonomous workflows."
      })
    }
    
    // Parse Conclusion
    const conclusion = {
       title: "Wrapping It Up",
       content: [
         "Adopting AI agents isn't about replacing your team, it's about shifting their focus from execution to strategy.",
         "If you want to build an automated ecosystem you can actually trust, <strong><a href='https://ollasuper.com' target='_blank' style='color: var(--blue-primary); text-decoration: underline;'>OllaSuper</a></strong> is the definitive platform."
       ]
    };

    // Parse Article Body (Everything inside <article class="os-article-content"...>)
    let articleBody = "";
    const bodyMatch = content.match(/(<article class="os-article-content"[^>]*>[\s\S]*?<\/article>)/);
    if (bodyMatch) {
        articleBody = bodyMatch[1];
    } else {
        console.warn(`No article body found for ${slug}`);
        continue; // Skip if no body
    }

    // Create .astro component
    const astroFileName = `post-${postIndex}.astro`;
    const astroFilePath = path.join(NEW_POSTS_DIR, astroFileName);
    fs.writeFileSync(astroFilePath, articleBody);

    newContentComponents[slug] = `Post${postIndex}`;

    const tags = Array.isArray(fm.tags) ? fm.tags : (typeof fm.tags === 'string' ? fm.tags.split(',') : []);

    // Construct the TS object entry
    const entry = `{
    title: "${fm.title || ''}",
    description: "${fm.description || ''}",
    publishDate: "${fm.pubDate || '2026-09-01'}",
    updatedDate: "${fm.updatedDate || fm.pubDate || '2026-09-01'}",
    author: {
      name: "${fm.author || 'OllaSuper Systems Engineering'}",
      role: "AI Workforce Architecture",
      avatar: "⚡"
    },
    coverImage: "${fm.cover || ''}",
    keywords: ${JSON.stringify(tags)},
    slug: "${slug}",
    tldr: ${JSON.stringify(tldr)},
    tableOfContents: [
      { num: "01", id: "tldr", title: "TL;DR Summary" },
      { num: "02", id: "key-takeaways", title: "Key Takeaways" },
      { num: "03", id: "faq", title: "Frequently Asked Questions" }
    ],
    keyTakeaways: ${JSON.stringify(takeaways, null, 6)},
    faqs: ${JSON.stringify(faqs, null, 6)},
    conclusion: ${JSON.stringify(conclusion, null, 6)}
  }`;

    newEntries.push(entry);
    postIndex++;
}

if (newEntries.length === 0) {
    console.log("No new posts to migrate.");
    process.exit(0);
}

// Append to blog.ts
let blogTsContent = fs.readFileSync(BLOG_TS_PATH, 'utf-8');
const insertIndex = blogTsContent.lastIndexOf('];');
if (insertIndex !== -1) {
    const before = blogTsContent.slice(0, insertIndex);
    const after = blogTsContent.slice(insertIndex);
    blogTsContent = before + ',\n  ' + newEntries.join(',\n  ') + '\n' + after;
    fs.writeFileSync(BLOG_TS_PATH, blogTsContent);
    console.log("Updated blog.ts");
}

// Update [slug].astro
let slugAstroContent = fs.readFileSync(SLUG_ASTRO_PATH, 'utf-8');

// Insert imports
let imports = "";
for (const slug in newContentComponents) {
    imports += `import ${newContentComponents[slug]} from "~/components/blog/posts/${newContentComponents[slug].toLowerCase()}.astro";\n`;
}
slugAstroContent = slugAstroContent.replace('import Post5 from "~/components/blog/posts/post-5.astro";', `import Post5 from "~/components/blog/posts/post-5.astro";\n${imports}`);

// Insert into contentComponents map
let mapEntries = "";
for (const slug in newContentComponents) {
    mapEntries += `  "${slug}": ${newContentComponents[slug]},\n`;
}
slugAstroContent = slugAstroContent.replace('};', `${mapEntries}};`);

fs.writeFileSync(SLUG_ASTRO_PATH, slugAstroContent);
console.log("Updated [slug].astro");
console.log("Migration complete!");
