const { faker } = require("@faker-js/faker");
const {
  portraitGenerator,
  randomGenderGenerator,
  loremParagraphsGenerator,
  dateGenerator,
  imgUrlsGenerator,
  loremSentencesGenerator,
} = require("./utils");
const util = require("util");

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

const testUsers = generateUsers(5, false);
// console.log("module.exports = " + util.inspect(testUsers)); //node db/data/faker.js > db/data/test-data/users.js
const devUsers = generateUsers(30, true);
// console.log("module.exports = " + util.inspect(devUsers)); //node db/data/faker.js > db/data/development-data/users.js

function generateTestArticles(num) {
  let articles = [];
  for (let i = 1; i <= num; i++) {
    const title = `test_article_${i}`;
    const author_username = faker.helpers.arrayElement([
      "test_user_1",
      "test_user_2",
      "test_user_3",
    ]);
    const body = `This is a testing article body for article test_article_${i}. ${loremParagraphsGenerator()}`;
    const created_at = dateGenerator().getTime();
    const article_img_urls = imgUrlsGenerator(faker.number.int({ max: 8 }));
    const family_id = faker.helpers.arrayElement([1, 2]);
    const is_pinned = faker.datatype.boolean(0.1);
    const article = {
      title,
      author_username,
      body,
      created_at,
      article_img_urls,
      family_id,
      is_pinned,
    };
    articles.push(article);
  }
  return articles;
}

// const articles = generateTestArticles(20);
// console.log(articles);

function generateTestFamilies(num) {
  let families = [];
  for (let i = 1; i <= num; i++) {
    const family_name = `test_family_${i}`;
    const created_by = faker.helpers.arrayElement([
      "test_user_1",
      "test_user_2",
      "test_user_3",
    ]);
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

// const families = generateTestFamilies(3);
// console.log(families);

function generateTestComments(num) {
  let comments = [];
  for (let i = 1; i <= num; i++) {
    const body = `This is a testing comment: ${loremSentencesGenerator()}`;
    const author = faker.helpers.arrayElement([
      "test_user_1",
      "test_user_2",
      "test_user_3",
      "test_user_4",
      "test_user_5",
    ]);
    const article_id = faker.number.int({ max: 20 });
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

// const comments = generateTestComments(50);
// console.log(comments);
