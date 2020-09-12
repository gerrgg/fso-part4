const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when empty list likes is equal to zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("if bigger list is calculated correctly", () => {
    // essentailly double
    listWithOneBlog.push(listWithOneBlog[0]);
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(10);
  });
});

describe("favorite blog", () => {
  const blogs = require("./blogs");

  test("should return null if given nothing", () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test("should return blog with highest likes", () => {
    let favorite = listHelper.favoriteBlog(blogs);
    console.log(favorite);
    expect(favorite.likes).toBe(12);
  });
});