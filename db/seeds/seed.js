const db = require("../connection");
var format = require('pg-format');
const {
  convertTimestampToDate, formatData
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
          VALUES %L`, formatData(timeConvertedArticles))
        return db.query(insertUsersQuery);
      })

      //comments data only has article_title, need to use JOIN to link article_id, as require
      .then(() => {
        //create a temp_comments table to hold the origin comments raw data
        return db.query(`CREATE TABLE temp_comments(
          article_title VARCHAR(500),
          body TEXT,
          votes INT,
          author VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
      })
      .then(() => {
        //insert the raw data into temp
        const timeConvertedComment = commentData.map(comment => convertTimestampToDate(comment))
        console.log(timeConvertedComment)
        const insertUsersQuery = format(`
          INSERT INTO temp_comments (created_at,article_title,body,votes,author) 
          VALUES %L`, formatData(timeConvertedComment))
        return db.query(insertUsersQuery)
      })
      .then(() => {
        return db.query(`
        INSERT INTO comments (article_id, body, votes, author, created_at)
        SELECT 
          articles.article_id,
          temp_comments.body,
          temp_comments.votes,
          temp_comments.author,
          temp_comments.created_at
        FROM temp_comments
        JOIN articles ON articles.title = temp_comments.article_title;
        `)
      })
      .then(() => {
        return db.query("DROP TABLE IF EXISTS temp_comments;");
      })

  );
};
module.exports = seed;
