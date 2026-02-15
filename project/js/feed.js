function getPosts() {
  return Storage.get("posts", []);
}
function savePosts(posts) {
  Storage.set("posts", posts);
}

function createPost(content) {
  const me = requireLogin();
  const text = content.trim();
  if (!text) throw new Error("Post cannot be empty.");
  if (text.length > 280) throw new Error("Post too long (max 280).");

  const posts = getPosts();
  posts.push({
    id: uid("p"),
    authorId: me.id,
    content: text,
    createdAt: Date.now()
  });
  savePosts(posts);
}

function deletePost(postId) {
  const me = requireLogin();
  let posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  if (post.authorId !== me.id) throw new Error("You can only delete your own posts.");
  posts = posts.filter(p => p.id !== postId);
  savePosts(posts);
}

function getFeedPosts() {
  const me = requireLogin();
  const posts = getPosts();
  const users = getUsers();

  const allowed = new Set([me.id, ...me.following]);
  return posts
    .filter(p => allowed.has(p.authorId))
    .sort((a,b) => b.createdAt - a.createdAt)
    .map(p => {
      const author = users.find(u => u.id === p.authorId);
      return {
        ...p,
        authorName: author?.name || "Unknown",
        authorUsername: author?.username || "unknown",
        authorAvatar: author?.avatar || ""
      };
    });
}
