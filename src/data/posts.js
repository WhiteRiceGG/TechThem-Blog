// Vite's import.meta.glob allows us to load all .md files in the directory
const postFiles = import.meta.glob("@/src/content/posts/*.md", { query: '?raw', import: 'default', eager: true });

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const yamlBlock = match[1];
  const body = match[2];
  const data = {};

  yamlBlock.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim().replace(/^["'](.*)["']$/, "$1");
      
      // Handle array-like strings [a, b, c]
      if (value.startsWith("[") && value.endsWith("]")) {
        data[key.trim()] = value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/^["'](.*)["']$/, "$1"));
      } else {
        data[key.trim()] = value;
      }
    }
  });

  return { data, content: body };
}

export const posts = Object.entries(postFiles).map(([path, rawContent]) => {
  const { data, content } = parseFrontmatter(rawContent);
  const id = path.split("/").pop()?.replace(".md", "") || Math.random().toString(36).substr(2, 9);

  return {
    id,
    title: data.title || "Untitled",
    date: data.date || "2024-01-01",
    excerpt: data.excerpt || "",
    readingTime: data.readingTime || "1 min",
    tags: data.tags || [],
    content: content.trim(),
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
