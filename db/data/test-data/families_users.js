const { dateGenerator } = require("../utils");

module.exports = [
  { family_id: 1, username: "test_user_1", joined_at: dateGenerator() },
  { family_id: 1, username: "test_user_2", joined_at: dateGenerator() },
  { family_id: 1, username: "test_user_3", joined_at: dateGenerator() },
  { family_id: 1, username: "test_user_4", joined_at: dateGenerator() },
  { family_id: 2, username: "test_user_5", joined_at: dateGenerator() },
  { family_id: 2, username: "test_user_4", joined_at: dateGenerator() },
  { family_id: 2, username: "test_user_3", joined_at: dateGenerator() },
  { family_id: 2, username: "test_user_2", joined_at: dateGenerator() },
];
