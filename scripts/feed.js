const posts = ['test'];
    const feed = document.getElementById('blog-feed');

    posts.forEach(async (slug) => {
      const res = await fetch(`./blog/posts/${slug}.md`);
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
          ${metadata.thumbnail ? `<img src="${metadata.thumbnail}" class="thumb" />` : ''}
          <div class="card-details">
            <span class="date">${metadata.date || ''}</span>
            <h2><a href="./post.html?slug=${slug}">${metadata.title || 'Untitled'}</a></h2>
            <p>${metadata.excerpt || ''}</p>
          </div>
        </article>
      `;
    });