const db = require("../db/connection");

exports.selectCommentsByArticleId = (id) => {
  return db
    .query(
      `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id
      FROM comments
      LEFT JOIN articles ON comments.article_id = articles.article_id
      WHERE comments.article_id = $1
      ORDER BY comments.created_at DESC;`,
      [id],
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectCommentById = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [id])
    .then(({ rows }) => {
      const comment = rows[0];
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: `No article found for comment_id: ${id}`,
        });
      }
      return comment;
    });
};

exports.insertComment = (article_id, author, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, author, body],
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteCommentModel = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then(({ rows }) => {
      return rows[0];
    });
};
