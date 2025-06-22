const { faker } = require("@faker-js/faker");

exports.dateGenerator = () => {
  const date = faker.date.past({
    years: 5,
    refDate: "2025-06-20T00:00:00.000Z",
  });
  return date;
};

exports.imgUrlsGenerator = (length) => {
  const urls = [];
  for (i = 0; i < length; i++) {
    urls[i] = faker.image.url({
      width: 700,
      height: 700,
    });
  }
  return urls;
};

exports.avatarGenerator = () => {
  return faker.image.avatar();
};

exports.portraitGenerator = (sex) => {
  return faker.image.personPortrait({ sex: sex, size: "256" });
};

exports.birthdateGenerator = () => {
  return faker.date.birthdate();
};

exports.randomGenderGenerator = () => {
  return faker.person.sexType();
};
