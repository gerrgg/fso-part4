const config = require("./utils/config");
const express = require("express");

require("express-async-errors");

const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const usersRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");

const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    logger.info("connecting to " + config.MONGODB_URI);
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("connected to MongoDB");
  } catch (e) {
    logger.error("error connecting to MongoDB:", e.message);
  }
};

connectToDb();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

// Setup redirect from root to getAll Blogs
app.get("/", (request, response) => {
  response.redirect("/api/blogs");
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
