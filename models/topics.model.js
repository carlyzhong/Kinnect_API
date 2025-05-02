const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

exports.selectTopicsBySlug = (slug) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1`, [slug])
    .then(({ rows }) => {
      const topic = rows[0];
      if (!topic) {
        return Promise.reject({
          status: 404,
          msg: `No topic found for slug: ${slug}`,
        });
      }
      return topic;
    });
};
