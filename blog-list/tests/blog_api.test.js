const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("root is redirected to blog/api", async () => {
  const response = await api.get("/");

  expect(response.status).toBe(302);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a valid blog can be added", async () => {
  const newBlog = new Blog({
    title: "The Cat in the Hat",
    author: "Dr. Suess",
    url:
      "https://www.storyjumper.com/book/read/44442296/The-Cat-in-the-Hat#page/1",
    likes: 500,
  });

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initBlogs.length + 1);
});

test("the _id is undefined", async () => {
  const undefinedId = await helper.nonExistingId();
  expect(undefinedId).not.toBeUndefined();
});

test("Blogs missing the likes property default to 0", async () => {
  const blogObjectWithoutLikes = new Blog({
    title: "The Cat in the Hat",
    author: "Dr. Suess",
    url:
      "https://www.storyjumper.com/book/read/44442296/The-Cat-in-the-Hat#page/1",
  });

  const response = await api
    .post("/api/blogs")
    .send(blogObjectWithoutLikes)
    .expect(201);

  expect(response.body.likes).toBe(0);
});

test("Blogs without the title or url are responded to with a 400 status", async () => {
  const badBlogObj = new Blog({
    author: "Some woman",
    likes: 9000,
  });

  const response = await api.post("/api/blogs").send(badBlogObj);
  expect(response.status).toBe(400);
});

afterAll(() => {
  mongoose.connection.close();
});
