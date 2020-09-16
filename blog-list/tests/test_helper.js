const Blog = require("../models/blog");
const User = require("../models/user");

const nonExistingId = async () => {
  const blog = new Blog({
    title: "The Cat in the Hat",
    userID: "5f611794f427ff74350da53d",
    url:
      "https://www.storyjumper.com/book/read/44442296/The-Cat-in-the-Hat#page/1",
    likes: 500,
  });

  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const firstBlog = async () => {
  const blogs = await Blog.find({});
  return blogs[0].toJSON();
};

module.exports = {
  firstBlog,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
