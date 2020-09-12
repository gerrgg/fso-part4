const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  // if empty return 0
  if (blogs.length === 0) return 0;

  // if 1 then return the only blogs likes - anymore and add them all up
  return blogs.length === 1
    ? blogs[0].likes
    : blogs.reduce((p, n) => p.likes + n.likes);
};

const favoriteBlog = (blogs) => {
  // if nothing return null
  if (!blogs.length) return null;

  // otherwise set favorite to first and run down list comparing likes
  let favorite = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) favorite = blog;
  });

  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
