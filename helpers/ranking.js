const rankFeed = (posts) => {
  posts.forEach((post) => {
    // algorithm arguments
    // likes
    const l = post.likes;
    // time since submission (in hours)
    const t =
      (new Date().getTime() - new Date(post.createdAt).getTime()) /
      (36 * 100000);
    // gravity constant
    const g = 1.8;
    post.score = l / Math.pow(t + 2, g);
  });
  return posts.sort((a, b) => a.score - b.score).slice(0, 20);
};

export default rankFeed;