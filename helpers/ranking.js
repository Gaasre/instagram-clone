const rankFeed = (posts) => {
  posts.forEach((post) => {
    // algorithm arguments
    // likes
    const l = post.likeCount;
    // comments
    const c = post.commentCount;
    // time since submission (in hours)
    const t =
      (new Date().getTime() - new Date(post.createdAt).getTime()) /
      (36 * 100000);
    // gravity constant
    const g = 1.8;
    post.score = (l + (c*0.05) + 0.75) / Math.pow(t + 2, g);
  });
  console.log(posts);
  return posts.sort((a, b) => b.score - a.score).slice(0, 20);
};

export default rankFeed;
