const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

if (slug) {
  fetch(`./posts/${slug}.md`)
    .then((response) => response.text())
    .then((markdownText) => {
      document.getElementById('post-content').innerHTML = marked.parse(markdownText);
    });
}
