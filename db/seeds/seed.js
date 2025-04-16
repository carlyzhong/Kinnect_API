const db = require("../connection");
var format = require('pg-format');
const {
  convertTimestampToDate, formatData,
  createRef
} = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return (
    db
      //drop tables for testing
      .query("DROP TABLE IF EXISTS temp_comments;")
      .then(() => {
        return db.query("DROP TABLE IF EXISTS comments;");
      })
      .then(() => {
        return db.query("DROP TABLE IF EXISTS articles;");
      })
      .then(() => {
        return db.query("DROP TABLE IF EXISTS users;");
      })
      .then(() => {
        return db.query("DROP TABLE IF EXISTS topics;");
      })

      //create tables
      .then(() => {
        return db.query(`CREATE TABLE topics(
  slug VARCHAR(200) PRIMARY KEY NOT NULL,
  description VARCHAR(200) NOT NULL,
  img_url VARCHAR(1000) NOT NULL);`);
      })

      .then(() => {
        return db.query(`CREATE TABLE users(
  username VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  avatar_url VARCHAR(1000) NOT NULL);`);
      })
      .then(() => {
        return db.query(`CREATE TABLE articles(
  article_id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  topic VARCHAR(200),
  FOREIGN KEY (topic) REFERENCES topics(slug),
  author VARCHAR(50),
  FOREIGN KEY (author) REFERENCES users(username),
  body TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  votes INT DEFAULT 0,
  article_img_url VARCHAR(1000) NOT NULL);`);
      })
      .then(() => {
        return db.query(`CREATE TABLE comments(
  comment_id SERIAL PRIMARY KEY,
  article_id INT,
  FOREIGN KEY (article_id) REFERENCES articles(article_id),
  body TEXT,
  votes INT DEFAULT 0,
  author VARCHAR(50),
  FOREIGN KEY (author) REFERENCES users(username),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
      })

      //insert table content
      .then(() => {
        const insertTopicsQuery = format(`INSERT INTO topics (description, slug, img_url) VALUES %L;`, formatData(topicData))
        return db.query(insertTopicsQuery);
      })
      .then(() => {
        const insertUsersQuery = format(`INSERT INTO users (username,name,avatar_url) VALUES %L;`, formatData(userData))
        return db.query(insertUsersQuery);
      })
      .then(() => {
        const timeConvertedArticles = articleData.map(article => convertTimestampToDate(article))
        const insertUsersQuery = format(`
          INSERT INTO articles (created_at,title,topic,author,body,votes,article_img_url) 
          VALUES %L RETURNING *;`, formatData(timeConvertedArticles))
        return db.query(insertUsersQuery);
      })
      .then((result) => {
        articleIDReference = createRef(result.rows)
        const formattedComments = commentData.map(comment => {
          const timeConvertedComment = convertTimestampToDate(comment)
          return [
            articleIDReference[comment.article_title],
            timeConvertedComment.body,
            timeConvertedComment.votes,
            timeConvertedComment.author,
            timeConvertedComment.created_at,
          ]
        })
        const insertUsersQuery = format(`
          INSERT INTO comments (article_id,body,votes,author,created_at) 
          VALUES %L`, formattedComments)
        return db.query(insertUsersQuery)
      })
  );
};
module.exports = seed;
