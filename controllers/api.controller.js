const db = require("../db/connection");
const endpoints = require("../endpoints.json");

exports.getApi = (req, res, next) => {
  return res.status(200).send({ endpoints: endpoints });
};
