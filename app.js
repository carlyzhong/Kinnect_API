const express = require("express");
const app = express();
const { getApi } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const { handleEndpointError } = require("./errors/index");

app.get("/api", getApi);
app.get("/api/topics", getTopics);

app.all("/*splat", handleEndpointError);

module.exports = app;
