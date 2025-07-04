const { faker } = require("@faker-js/faker");
const {
  portraitGenerator,
  randomGenderGenerator,
  loremParagraphsGenerator,
  dateGenerator,
  imgUrlsGenerator,
} = require("../../utils");

function generateTestUsers(num) {
  let users = [];
  for (let i = 1; i <= num; i++) {
    const sex = randomGenderGenerator();
    const firstname = `firstname_${i}`;
    const lastname = `lastname_${i}`;
    const user = {
      username: `test_user_${i}`,
      firstname,
      lastname,
      sex,
      portrait_url: portraitGenerator(sex),
      birthdate: faker.date.birthdate().getTime(),
      email: faker.internet.email({ firstName: firstname, lastName: lastname }),
      password: "qwerqwer",
      bio: faker.person.bio(),
      timezone: faker.location.timeZone(),
    };
    users.push(user);
  }
  return users;
}
// const users = generateTestUsers(1);
// console.log(users);

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

const articles = generateTestArticles(20);
// run node ./db/data/test-data/test_data_generators/faker.js > db/data/test-data/articles.js
console.log(articles);
