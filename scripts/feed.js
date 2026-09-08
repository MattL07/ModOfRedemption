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
		<article class="post-card">
			<div class="post-card-details">
				<h2 class="post-card-title"><a href="./post.html?slug=${encodeURIComponent(slug)}">${metadata.title || 'Untitled'}</a></h2>
				<p class="post-info">By ${metadata.author || 'Anonymous'} on <time datetime="${metadata.date || ''}">${metadata.date || ''}</time></p>
			</div>
			<div class="post-card-body">
				<p class="post-excerpt">${metadata.excerpt || ''}</p>
				${metadata.thumbnail ? `<img src="${metadata.thumbnail}" class="post-card-thumbnail" alt="">` : ''}
			</div>
		</article>
		<hr>
	`;
});