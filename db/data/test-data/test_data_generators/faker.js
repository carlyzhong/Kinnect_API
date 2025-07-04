const { faker } = require("@faker-js/faker");
const { portraitGenerator, randomGenderGenerator } = require("../../utils");

function createTestUsers(num) {
  const users = [];
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

const users = createTestUsers(5);

console.log(users);
