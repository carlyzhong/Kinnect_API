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
  console.log(urls);
  return urls;
};
