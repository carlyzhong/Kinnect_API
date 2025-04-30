const db = require("../db/connection");

exports.selectUserByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      const user = rows[0];
      if (!user) {
        return Promise.reject({
          status: 400,
          msg: `username: ${username} not exist!`,
        });
      }
      return user;
    });
};
