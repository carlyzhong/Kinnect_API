const { faker } = require("@faker-js/faker");
const util = require("util");
const {
  portraitGenerator,
  randomGenderGenerator,
  loremParagraphsGenerator,
  dateGenerator,
  imgUrlsGenerator,
  loremSentencesGenerator,
} = require("../utils");

const { usernames_dev, usernames_test, content } = require("./articles_helper");
const randomComments = require(`./comments_helper`);
const reactions = require(`../test-data/reactions`);

function generateUsers(num, isDevData = false) {
  let users = [];
  for (let i = 1; i <= num; i++) {
    const sex = randomGenderGenerator();
    const firstname = isDevData
      ? faker.person.firstName(sex)
      : `firstname_${i}`;
    const lastname = isDevData ? faker.person.lastName() : `lastname_${i}`;
    const username = isDevData
      ? faker.internet.username({
          firstName: firstname,
          lastName: lastname,
        })
      : `test_user_${i}`;
    const portrait_url = portraitGenerator({ sex: sex, size: "128" });
    const birthdate = faker.date.birthdate().getTime();
    const email = isDevData
      ? faker.internet.email({
          firstName: firstname,
          lastName: lastname,
        })
      : `${firstname}.${lastname}@testing.com`;
    const password = isDevData
      ? faker.internet.password({ length: 20 })
      : "testing_PW";
    const bio = isDevData ? faker.person.bio() : `Bio sample for user${i}`;
    const timezone = faker.location.timeZone();
    const user = {
      username,
      firstname,
      lastname,
      sex,
      portrait_url,
      birthdate,
      email,
      password,
      bio,
      timezone,
    };
    users.push(user);
  }
  return users;
}
// const testUsers = generateUsers(5, false);
// console.log("module.exports = " + util.inspect(testUsers)); //npm run faker > db/data/test-data/users.js
// const devUsers = generateUsers(30, true);
// console.log("module.exports = " + util.inspect(devUsers)); //npm run faker > db/data/development-data/users.js

function generateArticles(num, isDevData = false) {
  let articles = [];
  for (let i = 1; i <= num; i++) {
    const index = faker.number.int({ min: 0, max: content.length - 1 });
    const title = isDevData ? content[index].title : `test_article_${i}`;
    const author = isDevData
      ? faker.helpers.arrayElement(usernames_dev)
      : faker.helpers.arrayElement(usernames_test);
    const body = isDevData
      ? content[index].body
      : `This is a testing article body for article test_article_${i}. ${loremParagraphsGenerator()}`;
    const created_at = dateGenerator().getTime();
    const article_img_urls = imgUrlsGenerator(faker.number.int({ max: 8 }));
    const family_id = faker.helpers.arrayElement([1, 2]);
    const is_pinned = faker.datatype.boolean(0.1);
    const tag = isDevData ? content[index].tag : faker.lorem.slug(1);
    const article = {
      title,
      author,
      body,
      created_at,
      article_img_urls,
      family_id,
      is_pinned,
      tag,
    };
    articles.push(article);
  }
  return articles;
}
// const testArticles = generateArticles(10, false);
// console.log("module.exports = " + util.inspect(testArticles)); //node db/data/data-generator/faker.js > db/data/test-data/articles.js
// const devArticles = generateArticles(50, true);
// console.log("module.exports = " + util.inspect(devArticles)); //node db/data/data-generator/faker.js > db/data/development-data/articles.js

function generateFamilies(num, isDevData = false) {
  let families = [];
  for (let i = 1; i <= num; i++) {
    const family_name = isDevData
      ? `The ${faker.person.lastName()}'s`
      : `test_family_${i}`;
    const created_by = faker.helpers.arrayElement(
      isDevData ? usernames_dev : ["test_user_1", "test_user_2", "test_user_3"],
    );
    const img_url = faker.helpers.arrayElement([
      "https://media.istockphoto.com/id/1082467846/photo/smiling-parents-with-two-children.jpg?s=612x612&w=0&k=20&c=U73LbULmJ7Gqt6jPtuZRL_--xw4lWSh24GIqCDSTkGI=",
      "https://images.unsplash.com/photo-1611516818236-8faa056fb659?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlnJTIwZmFtaWx5fGVufDB8fDB8fHww",
      "https://abqmom.com/wp-content/uploads/2023/09/764EB376-C233-4E06-9998-1248E27217BA-1536x1024.jpg",
    ]);
    const created_at = dateGenerator().getTime();
    const family = {
      family_name,
      created_by,
      img_url,
      created_at,
    };
    families.push(family);
  }
  return families;
}
// const testFamilies = generateFamilies(3, false);
// // console.log("module.exports = " + util.inspect(testFamilies)); //node db/data/data-generator/faker.js > db/data/test-data/families.js
// const devFamilies = generateFamilies(50, true);
// console.log("module.exports = " + util.inspect(devFamilies)); //node db/data/data-generator/faker.js > db/data/development-data/families.js

function generateComments(num, isDevData = false) {
  let comments = [];
  for (let i = 1; i <= num; i++) {
    const body = isDevData
      ? faker.helpers.arrayElement(randomComments)
      : `This is a testing comment: ${loremSentencesGenerator()}`;
    const author = isDevData
      ? faker.helpers.arrayElement(usernames_dev)
      : faker.helpers.arrayElement(usernames_test);
    const article_id = faker.number.int({ min: 1, max: isDevData ? 10 : 3 });
    const created_at = dateGenerator().getTime();
    const comment = {
      body,
      author,
      article_id,
      created_at,
    };
    comments.push(comment);
  }
  return comments;
}
// const testComments = generateComments(20, false);
// console.log("module.exports = " + util.inspect(testComments)); //node db/data/data-generator/faker.js > db/data/test-data/comments.js
// const devComments = generateComments(50, true);
// console.log("module.exports = " + util.inspect(devComments)); //node db/data/data-generator/faker.js > db/data/development-data/comments.js

function generateArticles_reactions(num, isDevData = false) {
  let articles_reactions = [];
  const existingReactions = new Set();
  while (articles_reactions.length < num) {
    const article_id = faker.number.int({ min: 1, max: isDevData ? 10 : 3 });
    const username = isDevData
      ? faker.helpers.arrayElement(usernames_dev)
      : faker.helpers.arrayElement(usernames_test);
    const reaction_id = faker.number.int({ min: 1, max: reactions.length });

    const key = `${article_id}-${username}-${reaction_id}`;
    if (!existingReactions.has(key)) {
      existingReactions.add(key);
      const created_at = dateGenerator(1).getTime();
      const article_reaction = {
        article_id,
        username,
        reaction_id,
        created_at,
      };
      articles_reactions.push(article_reaction);
    }
  }
  // console.log("module.exports = " + util.inspect(articles_reactions));
  return articles_reactions;
}
// generateArticles_reactions(20, false); //node db/data/data-generator/faker.js > db/data/test-data/articles_reactions.js
// generateArticles_reactions(20, true); //node db/data/data-generator/faker.js > db/data/development-data/articles_reactions.js

function generateComments_reactions(num, isDevData = false) {
  let comments_reactions = [];
  const existingReactions = new Set();
  while (comments_reactions.length < num) {
    const comment_id = faker.number.int({ min: 1, max: isDevData ? 20 : 10 });
    const username = isDevData
      ? faker.helpers.arrayElement(usernames_dev)
      : faker.helpers.arrayElement(usernames_test);
    const reaction_id = faker.number.int({ min: 1, max: reactions.length });

    const key = `${comment_id}-${username}-${reaction_id}`;
    if (!existingReactions.has(key)) {
      existingReactions.add(key);
      const created_at = dateGenerator(1).getTime();
      const comment_reaction = {
        comment_id,
        username,
        reaction_id,
        created_at,
      };
      comments_reactions.push(comment_reaction);
    }
  }
  // console.log("module.exports = " + util.inspect(comments_reactions));
  return comments_reactions;
}
// generateComments_reactions(20, false); //node db/data/data-generator/faker.js > db/data/test-data/comments_reactions.js
// generateComments_reactions(20, true); //node db/data/data-generator/faker.js > db/data/development-data/comments_reactions.js

function generateFamilies_Users(num, isDevData = false) {
  let families_users = [];
  for (let i = 1; i < num; i++) {
    const family_id = faker.number.int({ min: 1, max: 3 });
    const username = isDevData
      ? faker.helpers.arrayElement(usernames_dev)
      : faker.helpers.arrayElement(usernames_test);
    const created_at = dateGenerator(1).getTime();
    const family_user = {
      family_id,
      username,
      created_at,
    };
    families_users.push(family_user);
  }
  console.log("module.exports = " + util.inspect(families_users));
  return families_users;
}
// generateFamilies_Users(20, false); //node db/data/data-generator/faker.js > db/data/test-data/families_users.js
// generateFamilies_Users(100, true); //node db/data/data-generator/faker.js > db/data/development-data/families_users.js
