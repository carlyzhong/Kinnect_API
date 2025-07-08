const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const app = require("../app");
require("jest-sorted");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

// describe("attempting to access a non-existent endpoint", () => {
//   test("404: when requesting a invalid endpoint", () => {
//     return request(app)
//       .get("/notARoute")
//       .expect(404)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid Endpoint!");
//       });
//   });
// });

// describe("GET /api/topics", () => {
//   test("200: responds with the all topics", () => {
//     return request(app)
//       .get("/api/topics")
//       .expect(200)
//       .then(({ body: { topics } }) => {
//         expect(topics.length).toBe(3);
//         topics.forEach((topic) => {
//           expect(topic).toMatchObject({
//             slug: expect.any(String),
//             description: expect.any(String),
//             img_url: expect.any(String),
//           });
//         });
//       });
//   });
// });

// describe("GET /api/articles/:article_id", () => {
//   test("200 OK: responds with the selected article with comment_count", () => {
//     return request(app)
//       .get("/api/articles/3")
//       .expect(200)
//       .then(({ body: { article } }) => {
//         expect(article).toEqual({
//           article_id: 3,
//           title: "Eight pug gifs that remind me of mitch",
//           topic: "mitch",
//           author: "icellusedkars",
//           body: "some gifs",
//           created_at: "2020-11-03T09:12:00.000Z",
//           votes: 0,
//           article_img_url:
//             "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           comment_count: 2,
//         });
//       });
//   });
//   test("404 Not Found: when passed a valid number but does not exist in the db", () => {
//     return request(app)
//       .get("/api/articles/9999")
//       .expect(404)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("No article found for article_id: 9999");
//       });
//   });
//   test("400 Bad Request: when passed an invalid data type as id", () => {
//     return request(app)
//       .get("/api/articles/notANumber")
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid id!");
//       });
//   });
// });

// describe("GET /api/articles", () => {
//   describe("200 OK", () => {
//     test("responds with all articles", () => {
//       return request(app)
//         .get("/api/articles")
//         .expect(200)
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBe(13);
//           expect(articles).toBeSortedBy("created_at", { descending: true });
//           articles.forEach((article) => {
//             expect(Date.parse(article.created_at)).not.toBeNaN();
//             expect(article).not.toHaveProperty("body");
//             expect(article).toMatchObject({
//               author: expect.any(String),
//               title: expect.any(String),
//               article_id: expect.any(Number),
//               topic: expect.any(String),
//               created_at: expect.any(String),
//               votes: expect.any(Number),
//               article_img_url: expect.any(String),
//             });
//           });
//         });
//     });
//     test("responds with articles with comment counts", () => {
//       return request(app)
//         .get("/api/articles")
//         .expect(200)
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBe(13);
//           articles.forEach((article) => {
//             expect(article).toHaveProperty("comment_count");
//           });
//         });
//     });
//     test("responds with all articles with descending created_at by default", () => {
//       return request(app)
//         .get("/api/articles")
//         .expect(200)
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBeGreaterThan(0);
//           expect(articles).toBeSortedBy("created_at", { descending: true });
//         });
//     });
//     test("when passed a valid field name as sort_by, default as descending ", () => {
//       return request(app)
//         .get("/api/articles?sort_by=title")
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBeGreaterThan(0);
//           expect(articles).toBeSortedBy("title", { descending: true });
//         });
//     });
//     test("when passed a valid field name as sort_by and a valid order", () => {
//       return request(app)
//         .get("/api/articles?sort_by=author&order=asc")
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBeGreaterThan(0);
//           expect(articles).toBeSortedBy("author", { ascending: true });
//         });
//     });
//     test("when only passed a valid order without field name, should sort by created_at by default", () => {
//       return request(app)
//         .get("/api/articles?order=asc")
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBeGreaterThan(0);
//           expect(articles).toBeSortedBy("created_at", { ascending: true });
//         });
//     });
//     test("when passed order before sort_by ", () => {
//       return request(app)
//         .get("/api/articles?order=asc&sort_by=author")
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBeGreaterThan(0);
//           expect(articles).toBeSortedBy("author", { ascending: true });
//         });
//     });
//     test("when passed a topic filter as the only query, responds with all articles with the selected topic with default order", () => {
//       return request(app)
//         .get("/api/articles?topic=mitch")
//         .expect(200)
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBe(12);
//           expect(articles).toBeSortedBy("created_at", { descending: true });
//           articles.forEach((article) => {
//             expect(article.topic).toBe("mitch");
//           });
//         });
//     });
//     test("when passed sort_by and topic filter , responds with selected topic articles with descending sort_by", () => {
//       return request(app)
//         .get("/api/articles?topic=mitch&sort_by=votes")
//         .expect(200)
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBe(12);
//           expect(articles).toBeSortedBy("votes", { descending: true });
//           articles.forEach((article) => {
//             expect(article.topic).toBe("mitch");
//           });
//         });
//     });
//     test("when passed order and topic filter , responds with selected topic articles correct order by created_at", () => {
//       return request(app)
//         .get("/api/articles?topic=mitch&order=ASC")
//         .expect(200)
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBe(12);
//           expect(articles).toBeSortedBy("created_at", { ascending: true });
//           articles.forEach((article) => {
//             expect(article.topic).toBe("mitch");
//           });
//         });
//     });
//     test("when passed sort_by, order and topic filter, responds with selected topic articles with correct order", () => {
//       return request(app)
//         .get("/api/articles?topic=mitch&sort_by=title&order=ASC")
//         .expect(200)
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBe(12);
//           expect(articles).toBeSortedBy("title", { ascending: true });
//           articles.forEach((article) => {
//             expect(article.topic).toBe("mitch");
//           });
//         });
//     });
//     test("when passed a valid topic but theres no articles under the topic, should return empty array", () => {
//       return request(app)
//         .get("/api/articles?topic=paper")
//         .expect(200)
//         .then(({ body: { articles } }) => {
//           expect(articles.length).toBe(0);
//         });
//     });
//   });
//   describe("404 Not Found", () => {
//     test("when passed a invalid topic which does not exist in the db", () => {
//       return request(app)
//         .get("/api/articles?topic=notSuchTopic")
//         .expect(404)
//         .then(({ body: { msg } }) => {
//           expect(msg).toBe("No topic found for slug: notSuchTopic");
//         });
//     });
//   });
//   describe("400 Bad Request", () => {
//     test("When passed an invalid field name as sort_by", () => {
//       return request(app)
//         .get("/api/articles?sort_by=harmfulCode")
//         .expect(400)
//         .then(({ body: { msg } }) => {
//           expect(msg).toBe("Invalid sort_by parameter!");
//         });
//     });
//     test("When passed an invalid field name as order", () => {
//       return request(app)
//         .get("/api/articles?order=harmfulCode")
//         .expect(400)
//         .then(({ body: { msg } }) => {
//           expect(msg).toBe("Invalid order parameter!");
//         });
//     });
//     test("When sort_by key is mis-spelled", () => {
//       return request(app)
//         .get("/api/articles?szzort_by=article_id")
//         .expect(400)
//         .then(({ body: { msg } }) => {
//           expect(msg).toBe("Invalid parameter: szzort_by");
//         });
//     });
//     test("When order key is mis-spelled", () => {
//       return request(app)
//         .get("/api/articles?sort_by=article_id&orrder=asc")
//         .expect(400)
//         .then(({ body: { msg } }) => {
//           expect(msg).toBe("Invalid parameter: orrder");
//         });
//     });
//     test("When topic key is mis-spelled", () => {
//       return request(app)
//         .get("/api/articles?sort_by=article_id&order=asc&topiic=cats")
//         .expect(400)
//         .then(({ body: { msg } }) => {
//           expect(msg).toBe("Invalid parameter: topiic");
//         });
//     });
//   });
// });

// describe("GET /api/articles/:article_id/comments", () => {
//   test("200 OK: responds with all comments of the selected article", () => {
//     return request(app)
//       .get("/api/articles/1/comments")
//       .expect(200)
//       .then(({ body: { comments } }) => {
//         expect(comments).toBeSortedBy("created_at", { descending: true });
//         expect(comments.length).toBe(11);
//         comments.forEach((comment) => {
//           expect(comment).toMatchObject({
//             comment_id: expect.any(Number),
//             votes: expect.any(Number),
//             created_at: expect.any(String),
//             author: expect.any(String),
//             body: expect.any(String),
//             article_id: expect.any(Number),
//           });
//         });
//       });
//   });
//   test("200 OK: responds with empty array of comments for an article which has no comments", () => {
//     return request(app)
//       .get("/api/articles/8/comments")
//       .expect(200)
//       .then(({ body: { comments } }) => {
//         expect(comments.length).toBe(0);
//       });
//   });
//   test("404 Not Found: when passed a valid number but does not exist in the db", () => {
//     return request(app)
//       .get("/api/articles/999/comments")
//       .expect(404)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("No article found for article_id: 999");
//       });
//   });
//   test("400 Bad Request: when passed an invalid data type as id", () => {
//     return request(app)
//       .get("/api/articles/notANumber/comments")
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid id!");
//       });
//   });
// });

// describe("POST /api/articles/:article_id/comments", () => {
//   test("201 Created: responds with the newly posted comment from a existing user", () => {
//     const newComment = {
//       username: "butter_bridge",
//       body: "This is a testing comment...",
//     };
//     return request(app)
//       .post("/api/articles/5/comments")
//       .send(newComment)
//       .expect(201)
//       .then(({ body: { comment } }) => {
//         expect(Date.parse(comment.created_at)).not.toBeNaN();
//         expect(comment).toMatchObject({
//           comment_id: expect.any(Number),
//           votes: 0,
//           created_at: expect.any(String),
//           author: "butter_bridge",
//           body: "This is a testing comment...",
//           article_id: 5,
//         });
//       });
//   });
//   test("400 Bad Request: when the username is not existing in the users db", () => {
//     const newComment = {
//       username: "userNotExisting",
//       body: "This comment will not be posted",
//     };
//     return request(app)
//       .post("/api/articles/6/comments")
//       .send(newComment)
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("username: userNotExisting not exist!");
//       });
//   });
//   test("400 Bad Request: when passed an invalid data type in username", () => {
//     const newComment = {
//       username: 123,
//       body: "This comment will not be posted",
//     };
//     return request(app)
//       .post("/api/articles/6/comments")
//       .send(newComment)
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid input!");
//       });
//   });
//   test("400 Bad Request: when missing body in the comment", () => {
//     const newComment = {
//       username: "icellusedkars",
//     };
//     return request(app)
//       .post("/api/articles/6/comments")
//       .send(newComment)
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid input!");
//       });
//   });
//   test("400 Bad Request: when missing username in the comment", () => {
//     const newComment = {
//       body: "this is the body",
//     };
//     return request(app)
//       .post("/api/articles/6/comments")
//       .send(newComment)
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid input!");
//       });
//   });
//   test("404 Not Found: when passed a valid number as article_id but does not exist in the db", () => {
//     const newComment = {
//       username: "butter_bridge",
//       body: "This is a testing comment...",
//     };
//     return request(app)
//       .post("/api/articles/999/comments")
//       .send(newComment)
//       .expect(404)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("No article found for article_id: 999");
//       });
//   });
//   test("400 Bad Request: when passed an invalid data type as article_id", () => {
//     const newComment = {
//       username: "butter_bridge",
//       body: "This is a testing comment...",
//     };
//     return request(app)
//       .post("/api/articles/notANumber/comments")
//       .send(newComment)
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid id!");
//       });
//   });
// });

// describe("PATCH /api/articles/:article_id", () => {
//   test("200 OK: responds with the selected article with incremented votes", () => {
//     const testNewVote = { inc_votes: 50 };
//     return request(app)
//       .patch("/api/articles/3")
//       .send(testNewVote)
//       .expect(200)
//       .then(({ body: { article } }) => {
//         expect(article).toEqual({
//           article_id: 3,
//           title: "Eight pug gifs that remind me of mitch",
//           topic: "mitch",
//           author: "icellusedkars",
//           body: "some gifs",
//           created_at: "2020-11-03T09:12:00.000Z",
//           votes: 50,
//           article_img_url:
//             "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//         });
//       });
//   });
//   test("200 OK: responds with the selected article with decremented votes", () => {
//     const testNewVote = { inc_votes: -200 };
//     return request(app)
//       .patch("/api/articles/3")
//       .send(testNewVote)
//       .expect(200)
//       .then(({ body: { article } }) => {
//         expect(article).toEqual({
//           article_id: 3,
//           title: "Eight pug gifs that remind me of mitch",
//           topic: "mitch",
//           author: "icellusedkars",
//           body: "some gifs",
//           created_at: "2020-11-03T09:12:00.000Z",
//           votes: -200,
//           article_img_url:
//             "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//         });
//       });
//   });
//   test("404 Not Found: when passed a valid number as article_id but does not exist in the db", () => {
//     const testNewVote = { inc_votes: 10 };
//     return request(app)
//       .patch("/api/articles/999")
//       .send(testNewVote)
//       .expect(404)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("No article found for article_id: 999");
//       });
//   });
//   test("400 Bad Request: when passed an invalid data type as article_id", () => {
//     const testNewVote = { inc_votes: 10 };
//     return request(app)
//       .patch("/api/articles/notANumber")
//       .send(testNewVote)
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid id!");
//       });
//   });
//   test("400 Bad Request: when passed an invalid data type in newVote ", () => {
//     const testNewVote = { inc_votes: "not a number" };
//     return request(app)
//       .patch("/api/articles/3")
//       .send(testNewVote)
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid input!");
//       });
//   });
//   test("400 Bad Request: when missing content in the newVote", () => {
//     const testNewVote = {};
//     return request(app)
//       .patch("/api/articles/3")
//       .send(testNewVote)
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid input!");
//       });
//   });
// });

// describe("DELETE /api/comments/:comment_id", () => {
//   test("204 No Content: deletes the selected comment", () => {
//     return request(app)
//       .delete("/api/comments/1")
//       .expect(204)
//       .then(({ body }) => {
//         db.query(`SELECT comment_id FROM comments`).then(({ rows }) => {
//           expect(rows).not.toContain(1);
//         });
//       });
//   });
//   test("404 Not Found: when passed a valid number as comment_id but does not exist in the db", () => {
//     return request(app)
//       .delete("/api/comments/9999")
//       .expect(404)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("No article found for comment_id: 9999");
//       });
//   });
//   test("400 Bad Request: when passed an invalid data type as article_id", () => {
//     return request(app)
//       .delete("/api/comments/notANumber")
//       .expect(400)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Invalid id!");
//       });
//   });
// });

// describe("GET /api/users", () => {
//   test("200: responds with the all users", () => {
//     return request(app)
//       .get("/api/users")
//       .expect(200)
//       .then(({ body: { users } }) => {
//         expect(users.length).toBe(4);
//         expect(users).toBeSortedBy("username");
//         users.forEach((user) => {
//           expect(user).toMatchObject({
//             username: expect.any(String),
//             name: expect.any(String),
//             avatar_url: expect.any(String),
//           });
//         });
//       });
//   });
// });
