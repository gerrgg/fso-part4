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

module.exports = {
  dummy,
  totalLikes,
};
