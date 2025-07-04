const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createRef } = require("./utils");
const bcrypt = require("bcrypt");

const seed = async ({
  tagsData,
  usersData,
  familyData,
  articleData,
  commentData,
  articlesTagsData,
  familiesUsersData,
  reactionsData,
  articlesReactionsData,
  commentsReactionsData,
}) => {
  await db.query(`DROP TABLE IF EXISTS comments_reactions;`);
  await db.query(`DROP TABLE IF EXISTS articles_reactions;`);
  await db.query(`DROP TABLE IF EXISTS articles_tags;`);
  await db.query(`DROP TABLE IF EXISTS families_users;`);
  await db.query(`DROP TABLE IF EXISTS reactions;`);
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

  await db.query(`
    CREATE TABLE reactions (
      reaction_id SERIAL PRIMARY KEY,
      emoji VARCHAR(10) NOT NULL UNIQUE
    );
  `);

  await db.query(`
    CREATE TABLE articles_tags (
      article_tag_id SERIAL PRIMARY KEY,
      article_id INT NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
      tag_id INT NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
      UNIQUE(article_id, tag_id)
    );
  `);

  await db.query(`
    CREATE TABLE families_users ( 
      family_user_id SERIAL PRIMARY KEY,
      family_id INT NOT NULL REFERENCES families(family_id) ON DELETE CASCADE,
      username VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
      joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      UNIQUE(family_id, username)
    );
  `);

  await db.query(`
    CREATE TABLE articles_reactions (
      article_reaction_id SERIAL PRIMARY KEY,
      article_id INT NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
      username VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
      reaction_id INT NOT NULL REFERENCES reactions(reaction_id) ON DELETE CASCADE,
      reacted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(article_id, username, reaction_id)
    );
  `);

  await db.query(`
    CREATE TABLE comments_reactions (
      comment_reaction_id SERIAL PRIMARY KEY,
      comment_id INT NOT NULL REFERENCES comments(comment_id) ON DELETE CASCADE,
      username VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
      reaction_id INT NOT NULL REFERENCES reactions(reaction_id) ON DELETE CASCADE,
      reacted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(comment_id, username, reaction_id)
    );
  `);

  const insertTagsQuery = format(
    `INSERT INTO tags (tag_name) VALUES %L RETURNING *;`,
    tagsData.map((tag) => [tag.tag_name]),
  );
  await db.query(insertTagsQuery);

  const insertFamiliesQuery = format(
    `INSERT INTO families (family_name, created_by, img_url, created_at) VALUES %L RETURNING *;`,
    familyData.map((family) => [
      family.family_name,
      family.created_by,
      family.img_url,
      family.created_at,
    ]),
  );
  await db.query(insertFamiliesQuery);

  const convertedUsersData = usersData.map((user) =>
    convertTimestampToDate(user),
  );

  const hashedUsersData = await Promise.all(
    convertedUsersData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt rounds
      return [
        user.username,
        user.firstname,
        user.lastname,
        user.sex,
        user.portrait_url,
        user.birthdate,
        user.email,
        hashedPassword,
        user.bio,
        user.timezone,
      ];
    }),
  );

  const insertUsersQuery = format(
    `INSERT INTO users (username, firstname, lastname, sex, portrait_url, birthdate, email, password, bio, timezone) VALUES %L RETURNING *;`,
    hashedUsersData,
  );
  const { rows: insertedUsers } = await db.query(insertUsersQuery);

  const userTimezoneRef = createRef(insertedUsers, "username", "timezone");

  const insertArticlesQuery = format(
    `INSERT INTO articles (title, author_username, body, created_at, article_img_urls, family_id, is_pinned, location) VALUES %L RETURNING *;`,
    articleData.map((article) => [
      article.title,
      article.author_username,
      article.body,
      article.created_at,
      `{${article.article_img_urls.map((url) => `"${url}"`).join(",")}}`,
      article.family_id,
      article.is_pinned,
      userTimezoneRef[article.author_username],
    ]),
  );
  const { rows: insertedArticles } = await db.query(insertArticlesQuery);

  // Insert into articles_tags
  const articlesTagsRows = articlesTagsData.map((articleTag) => [
    articleTag.article_id,
    articleTag.tag_id,
  ]);
  const insertArticlesTagsQuery = format(
    `INSERT INTO articles_tags (article_id, tag_id) VALUES %L RETURNING *;`,
    articlesTagsRows,
  );
  await db.query(insertArticlesTagsQuery);

  const insertCommentsQuery = format(
    `INSERT INTO comments (article_id, body, author, created_at) VALUES %L`,
    commentData.map((comment) => [
      insertedArticles[comment.article_title],
      comment.body,
      comment.author,
      comment.created_at,
    ]),
  );
  await db.query(insertCommentsQuery);

  const insertReactionsQuery = format(
    `INSERT INTO reactions (emoji) VALUES %L RETURNING *;`,
    reactionsData.map((reaction) => [reaction.emoji]),
  );
  await db.query(insertReactionsQuery);

  const insertArticlesReactionsQuery = format(
    `INSERT INTO articles_reactions (article_id, username, reaction_id, reacted_at) VALUES %L RETURNING *;`,
    articlesReactionsData.map((articleReaction) => [
      articleReaction.article_id,
      articleReaction.username,
      articleReaction.reaction_id,
      articleReaction.reacted_at,
    ]),
  );
  await db.query(insertArticlesReactionsQuery);

  if (commentsReactionsData) {
    const insertCommentsReactionsQuery = format(
      `INSERT INTO comments_reactions (comment_id, username, reaction_id, reacted_at) VALUES %L RETURNING *;`,
      commentsReactionsData.map((commentReaction) => [
        commentReaction.comment_id,
        commentReaction.username,
        commentReaction.reaction_id,
        commentReaction.reacted_at,
      ]),
    );
    await db.query(insertCommentsReactionsQuery);
  }

  if (familiesUsersData) {
    const insertFamiliesUsersQuery = format(
      `INSERT INTO families_users (family_id, username, joined_at) VALUES %L RETURNING *;`,
      familiesUsersData.map((familyUser) => [
        familyUser.family_id,
        familyUser.username,
        familyUser.joined_at,
      ]),
    );
    await db.query(insertFamiliesUsersQuery);
  }

  console.log("🪴Seeding is completed.");
};

module.exports = seed;
