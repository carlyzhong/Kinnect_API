const { faker } = require("@faker-js/faker");
const { portraitGenerator, randomGenderGenerator } = require("../utils");

function createTestUser(username, firstname, lastname) {
  const sex = randomGenderGenerator();
  return {
    username,
    firstname,
    lastname,
    sex,
    portrait_url: portraitGenerator(sex),
    birthdate: faker.date.birthdate(),
    email: faker.internet.email({ firstName: firstname, lastName: lastname }),
    password: "qwerqwer",
    bio: faker.person.bio(),
  };
}

module.exports = [
  createTestUser("test_user_1", "test_first_name_1", "test_last_name_1"),
  createTestUser("test_user_2", "test_first_name_2", "test_last_name_2"),
  // Add more users as needed
];
