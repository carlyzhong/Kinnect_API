const { selectArticleById } = require("../models/articles.model");
const {
  selectCommentsByArticleId,
  insertComment,
} = require("../models/comments.model");
const { selectUserByUsername } = require("../models/users.model");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const pendingArticleIdValid = selectArticleById(article_id);
  const pendingSelectCommentsById = selectCommentsByArticleId(article_id);
  Promise.all([pendingSelectCommentsById, pendingArticleIdValid])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (typeof username === "string" && typeof body === "string") {
    const pendingUsernameExisting = selectUserByUsername(username);
    const pendingArticleIdValid = selectArticleById(article_id);
    const pendingPostComment = insertComment(article_id, username, body);
    Promise.all([
      pendingPostComment,
      pendingArticleIdValid,
      pendingUsernameExisting,
    ])
      .then(([comment]) => {
        res.status(201).send({ comment });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next({ status: 400, msg: "Invalid input!" });
  }
};
