const posts = ['test'];
const feed = document.getElementById('blog-feed');

posts.forEach(async (slug) => {
  const res = await fetch(`./posts/${slug}.md`);
  if (!res.ok) return;

  const text = await res.text();
  const parts = text.split('---');
  const metadata = {};
  if (parts.length > 1) {
    parts[1].trim().split('\n').forEach(line => {
      const [key, ...val] = line.split(':');
      if (key) metadata[key.trim()] = val.join(':').trim().replace(/^"(.*)"$/, '$1');
    });
  }

  feed.innerHTML += `
    <article class="blog-card">
      ${metadata.thumbnail ? `<img src="${metadata.thumbnail}" class="thumb" alt="">` : ''}
      <div class="card-details">
        <h2><a href="./post.html?slug=${encodeURIComponent(slug)}">${metadata.title || 'Untitled'}</a></h2>
        <p class="post-date"><time datetime="${metadata.date || ''}">${metadata.date || ''}</time></p>
      </div>
      <p class="post-excerpt">${metadata.excerpt || ''}</p>
    </article>
    <hr>
  `;
});