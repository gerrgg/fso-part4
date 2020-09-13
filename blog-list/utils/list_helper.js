const _ = require("lodash");

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

const favoriteBlog = (blogs) =>
  !blogs.length ? null : _.maxBy(blogs, "likes");

// return the author with the most blogs in the given list
const mostBlogs = (blogs) =>
  !blogs.length ? null : _.maxBy(blogs, "author").author;

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
