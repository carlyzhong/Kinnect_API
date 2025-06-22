const { faker } = require("@faker-js/faker");
const { dateGenerator, avatarGenerator } = require("../utils");

function createTestFamilies(family_name, created_by_username, pic_url) {
  return {
    family_name,
    created_by: created_by_username,
    avatar_url: pic_url,
    created_at: dateGenerator(),
  };
}

module.exports = [
  createTestFamilies(
    "test_family_1",
    "test_user_1",
    "https://media.istockphoto.com/id/1082467846/photo/smiling-parents-with-two-children.jpg?s=612x612&w=0&k=20&c=U73LbULmJ7Gqt6jPtuZRL_--xw4lWSh24GIqCDSTkGI=",
  ),
  createTestFamilies(
    "test_family_2",
    "test_user_2",
    "https://images.unsplash.com/photo-1611516818236-8faa056fb659?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlnJTIwZmFtaWx5fGVufDB8fDB8fHww",
  ),
];
