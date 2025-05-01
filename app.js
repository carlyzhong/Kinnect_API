const express = require("express");
const app = express();
const { getApi } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticleById,
  getArticles,
  patchNewVotes,
} = require("./controllers/articles.controller");
const {
  getCommentsByArticleId,
  postComment,
  deleteComment,
} = require("./controllers/comments.controller");
const {
  handleCustomErrors,
  handleSQLErrors,
  handleEndpointError,
  handleServerErrors,
} = require("./errors/index");

const { getAllUsers } = require("./controllers/users.controller");

app.use(express.json());

app.get("/api", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/users", getAllUsers);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchNewVotes);

app.delete("/api/comments/:comment_id", deleteComment);

app.all("/*splat", handleEndpointError);

app.use(handleCustomErrors);
app.use(handleSQLErrors);
app.use(handleServerErrors);

module.exports = app;
