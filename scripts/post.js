document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug') || 'test';

  try {
    const res = await fetch(`./posts/${slug}.md`);
    if (!res.ok) throw new Error('Post not found');
    
    const text = await res.text();
    const parts = text.split('---');

    // Parse Frontmatter metadata
    const metadata = {};
    if (parts.length > 1) {
      parts[1].trim().split('\n').forEach(line => {
        const [key, ...val] = line.split(':');
        if (key) metadata[key.trim()] = val.join(':').trim().replace(/^"(.*)"$/, '$1');
      });
    }

    // Populate Page Elements
    document.getElementById('post-title').innerText = metadata.title || 'Untitled';
    const dateElement = document.getElementById('post-date');
    dateElement.innerText = metadata.date || '';
    dateElement.dateTime = metadata.date || '';

    // Render Markdown Body to HTML
    const markdownBody = parts.slice(2).join('---');
    document.getElementById('post-body').innerHTML = marked.parse(markdownBody);
  } catch (error) {
    document.getElementById('post-title').innerText = 'Post Not Found';
    console.error('Error loading post:', error);
  }
});