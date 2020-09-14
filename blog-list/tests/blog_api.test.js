const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const { initBlogs } = require("./test_helper");

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

  const contents = response.body.map((r) => r.content);

  expect(response.body).toHaveLength(initBlogs.length + 1);
});

test("a invalid blog will not be added", async () => {
  const newBlog = new Blog({
    author: "Dr. Suess",
    url:
      "https://www.storyjumper.com/book/read/44442296/The-Cat-in-the-Hat#page/1",
    likes: 500,
  });

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
