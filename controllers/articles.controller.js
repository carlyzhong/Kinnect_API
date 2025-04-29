const {
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
} = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  selectArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

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
