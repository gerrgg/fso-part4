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

describe("when there is initially some notes saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("the _id is undefined", async () => {
    const undefinedId = await helper.nonExistingId();
    expect(undefinedId).not.toBeUndefined();
  });
});

describe("addition of a new note", () => {
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

  test("Blogs missing the likes property default to 0", async () => {
    const blogObjectWithoutLikes = {
      title: "The Cat in the Hat",
      author: "Dr. Suess",
      url:
        "https://www.storyjumper.com/book/read/44442296/The-Cat-in-the-Hat#page/1",
    };

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
});

describe("When deleting a blog post", () => {
  test("should return 204 when a blog is deleted", async () => {
    const blogsBeforeDelete = await helper.blogsInDb();

    const response = await api.delete(`/api/blogs/${blogsBeforeDelete[0].id}`);

    expect(response.status).toBe(204);

    const blogsAfterDelete = await helper.blogsInDb();

    expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length - 1);
  });
});

describe("when updating a blog", () => {
  test("responds with 204 with valid update", async () => {
    const blogBeforeUpdate = await helper.firstBlog();

    blogBeforeUpdate.likes = 123;

    const response = await api.put(
      `/api/blogs/${blogBeforeUpdate.id}`,
      blogBeforeUpdate
    );

    expect(response.status).toBe(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
