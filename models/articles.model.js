const db = require("../db/connection");

exports.selectArticleById = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${id}`,
        });
      }
      return article;
    });
};

exports.selectArticles = (sort_by, order, topic) => {
  const validSortBy = [
    "title",
    "article_id",
    "topic",
    "author",
    "created_at",
    "votes",
  ];
  const validOrder = ["DESC", "ASC"];

  let queryArgs = [];
  let queryStr = ` 
    SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url, 
      count(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id `;

  if (topic) {
    queryStr += `HAVING topic = $1 `;
    queryArgs.push(topic.toLowerCase());
  }

  if (sort_by && validSortBy.includes(sort_by.toLowerCase())) {
    queryStr += `ORDER BY ${sort_by} `;
  } else if (!sort_by) {
    queryStr += `ORDER BY created_at `;
  } else {
    return Promise.reject({
      status: 400,
      msg: "Invalid sort_by parameter!",
    });
  }

  if (order && validOrder.includes(order.toUpperCase())) {
    queryStr += `${order};`;
  } else if (!order) {
    queryStr += `DESC;`;
  } else {
    return Promise.reject({
      status: 400,
      msg: "Invalid order parameter!",
    });
  }

  return db.query(queryStr, queryArgs).then(({ rows: articles }) => {
    return articles;
  });
};

exports.updateVotes = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes+$1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
