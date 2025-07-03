const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createRef } = require("./utils");

const seed = async ({ tagsData, userData, familyData, articleData, commentData }) => {
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS families;`);
  await db.query(`DROP TABLE IF EXISTS tags;`);

  await db.query(`
    CREATE TABLE tags (
      tag_id SERIAL PRIMARY KEY,
      tag_name VARCHAR(255) UNIQUE NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE families (
      family_id SERIAL PRIMARY KEY,
      family_name VARCHAR(255) NOT NULL,
      created_by VARCHAR(255) NOT NULL,
      img_url VARCHAR(1000),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE users (
      username VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
      firstname VARCHAR(50) NOT NULL,
      lastname VARCHAR(50) NOT NULL,
      sex VARCHAR(20) NOT NULL,
      portrait_url VARCHAR(1000),
      birthdate DATE,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      bio TEXT,
      timezone VARCHAR(255)
    );
  `);

  await db.query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      author_username VARCHAR(50) REFERENCES users(username),
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      article_img_urls VARCHAR(1000)[] NOT NULL,
      family_id INT REFERENCES families(family_id) NOT NULL,
      is_pinned BOOLEAN DEFAULT false,
      location VARCHAR(255)
    );
  `);

  await db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT REFERENCES articles(article_id),
      body TEXT,
      author VARCHAR(50) REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const insertTagsQuery = format(
    `INSERT INTO tags (tag_name) VALUES %L RETURNING *;`,
    tagsData.map((tag) => [tag.tag_name])
  );
  await db.query(insertTagsQuery);

  const insertFamiliesQuery = format(
    `INSERT INTO families (family_name, created_by, avatar_url, created_at) VALUES %L RETURNING *;`,
    familyData.map((family) => [
      family.family_name,
      family.created_by,
      family.avatar_url,
      family.created_at,
    ])
  );
  await db.query(insertFamiliesQuery);

  const insertUsersQuery = format(
    `INSERT INTO users (username, firstname, lastname, sex, portrait_url, birthdate, email, password, bio, timezone) VALUES %L RETURNING *;`,
    userData.map((user) => [
      user.username,
      user.firstname,
      user.lastname,
      user.sex,
      user.portrait_url,
      user.birthdate,
      user.email,
      user.password,
      user.bio,
      user.timezone,
    ])
  );
  const { rows: insertedUsers } = await db.query(insertUsersQuery);

  const userLocationRef = createRef(insertedUsers, "username", "location");

  const insertArticlesQuery = format(
    `INSERT INTO articles (title, author_username, body, created_at, article_img_urls, family_id, is_pinned, location) VALUES %L RETURNING *;`,
    articleData.map((article) => [
      article.title,
      article.author_username,
      article.body,
      article.created_at,
      article.article_img_urls,
      article.family_id,
      article.is_pinned,
      userLocationRef[article.author_username],
    ])
  );
  const { rows: insertedArticles } = await db.query(insertArticlesQuery);

  const insertCommentsQuery = format(
    `INSERT INTO comments (article_id, body, author, created_at) VALUES %L`,
    commentData.map((comment) => [
      articleIdRef[comment.article_title],
      comment.body,
      comment.author,
      comment.created_at,
    ])
  );
  await db.query(insertCommentsQuery);

  console.log("Seeding is completed.");
};

module.exports = seed;