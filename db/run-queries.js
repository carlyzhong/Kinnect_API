const db = require("./connection");

const getAllUsers = async () => {
  const result = await db.query(`SELECT * FROM users;`);
  console.log(">>>>>>>Get all of the users:<<<<<<<< \n", result.rows);
  return result.rows;
};

const getCodingArticles = async () => {
  const result = await db.query(
    `SELECT * FROM articles WHERE topic = 'coding';`,
  );
  console.log(
    ">>>>>>>Get all of the articles where the topic is coding:<<<<<<<< \n",
    result.rows,
  );
  return result.rows;
};

const getNegativeVoteCommants = async () => {
  const result = await db.query(
    `SELECT * FROM comments WHERE votes < 0 ORDER BY votes ASC;`,
  );
  console.log(
    ">>>>>>>Get all of the comments where the votes are less than zero:<<<<<<<< \n",
    result.rows,
  );
  return result.rows;
};

const getAllTopics = async () => {
  const result = await db.query("SELECT * FROM topics;");
  console.log(">>>>>>>Get all of the topics:<<<<<<<< \n", result.rows);
  return result.rows;
};

const getUserArticles = async (username) => {
  const result = await db.query(
    `SELECT * FROM articles WHERE author = '${username}';`,
  );
  console.log(">>>>>>>Get all of the topics:<<<<<<<< \n", result.rows);
  return result.rows;
};

const getHighVoteCommants = async () => {
  const result = await db.query(
    "SELECT * FROM comments WHERE votes >= 10 ORDER BY votes DESC;",
  );
  console.log(
    ">>>>>>>Get all of the comments that have more than 10 votes<<<<<<<< \n",
    result.rows,
  );
  return result.rows;
};

getUserArticles("grumpy19");
