const express = require("express");
const app = express();
const { getApi } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticleById,
  getArticles,
} = require("./controllers/articles.controller");
const {
  handleCustomErrors,
  handleSQLErrors,
  handleEndpointError,
  handleServerErrors,
} = require("./errors/index");

app.get("/api", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);

app.all("/*splat", handleEndpointError);

app.use(handleCustomErrors);
app.use(handleSQLErrors);
app.use(handleServerErrors);

module.exports = app;
