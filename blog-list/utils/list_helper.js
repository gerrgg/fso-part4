const _ = require("lodash");
const e = require("express");

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

const mostBlogs = (blogs) => {
  // return null if empty
  if (!blogs.length) return null;

  // get the author with the most blogs
  let author = _.maxBy(blogs, "author").author;
  let blogCount = 0;

  // count each blog with author name
  blogs.forEach((blog) => (blog.author !== author ? 0 : blogCount++));

  return { author, blogs: blogCount };
};

const mostLikes = (blogs) => {
  // return null if empty
  if (!blogs.length) return null;

  // get author with most likes
  let author = _.maxBy(blogs, "likes").author;

  // sum up author like count
  let likes = _.sumBy(blogs, (o) => (o.author !== author ? 0 : o.likes));

  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
