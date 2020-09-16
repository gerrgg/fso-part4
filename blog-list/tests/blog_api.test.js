const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = new User({
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  });

  const savedUser = await user.save();

  const blog = new Blog({
    title: "React patterns 2",
    url: "https://reactpatterns.com/",
    user: savedUser._id,
    likes: 7,
  });

  const savedBlog = await blog.save();
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
    const users = await helper.usersInDb();
    const beforeCreate = await helper.blogsInDb();

    const newBlog = {
      title: "The Cat in the Hat 2",
      userId: users[0].id,
      url:
        "https://www.storyjumper.com/book/read/44442296/The-Cat-in-the-Hat#page/1",
      likes: 500,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(beforeCreate.length + 1);
  });

  test("Blogs missing the likes property default to 0", async () => {
    const users = await helper.usersInDb();

    const blogObjectWithoutLikes = {
      title: "The Cat in the Hat",
      userId: users[0].id,
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
    const users = await helper.usersInDb();

    const badBlogObj = {
      userId: users[0].id,
      likes: 9000,
    };

    await api.post("/api/blogs").send(badBlogObj).expect(400);
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
