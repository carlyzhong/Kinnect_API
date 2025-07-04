const { convertTimestampToDate, createRef } = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  describe("created_at", () => {
    test("returns a new object", () => {
      const timestamp = 1557572706232;
      const input = { created_at: timestamp };
      const result = convertTimestampToDate(input);
      expect(result).not.toBe(input);
      expect(result).toBeObject();
    });
    test("converts a created_at property to a date", () => {
      const timestamp = 1557572706232;
      const input = { created_at: timestamp };
      const result = convertTimestampToDate(input);
      expect(result.created_at).toBeDate();
      expect(result.created_at).toEqual(new Date(timestamp));
    });
    test("does not mutate the input", () => {
      const timestamp = 1557572706232;
      const input = { created_at: timestamp };
      convertTimestampToDate(input);
      const control = { created_at: timestamp };
      expect(input).toEqual(control);
    });
    test("ignores includes any other key-value-pairs in returned object", () => {
      const input = { created_at: 0, key1: true, key2: 1 };
      const result = convertTimestampToDate(input);
      expect(result.key1).toBe(true);
      expect(result.key2).toBe(1);
    });
    test("returns unchanged object if no created_at property", () => {
      const input = { key: "value" };
      const result = convertTimestampToDate(input);
      const expected = { key: "value" };
      expect(result).toEqual(expected);
    });
  });
  describe("birthdate", () => {
    test("returns a new object", () => {
      const timestamp = 1557572706232;
      const input = { birthdate: timestamp };
      const result = convertTimestampToDate(input);
      expect(result).not.toBe(input);
      expect(result).toBeObject();
    });
    test("converts a birthdate property to a date", () => {
      const timestamp = 1557572706232;
      const input = { birthdate: timestamp };
      const result = convertTimestampToDate(input);
      expect(result.birthdate).toBeDate();
      expect(result.birthdate).toEqual(new Date(timestamp));
    });
    test("does not mutate the input", () => {
      const timestamp = 1557572706232;
      const input = { birthdate: timestamp };
      convertTimestampToDate(input);
      const control = { birthdate: timestamp };
      expect(input).toEqual(control);
    });
    test("ignores includes any other key-value-pairs in returned object", () => {
      const input = { birthdate: 0, key1: true, key2: 1 };
      const result = convertTimestampToDate(input);
      expect(result.key1).toBe(true);
      expect(result.key2).toBe(1);
    });
    test("returns unchanged object if no birthdate property", () => {
      const input = { key: "value" };
      const result = convertTimestampToDate(input);
      const expected = { key: "value" };
      expect(result).toEqual(expected);
    });
  });
  describe("both created_at and birthdate in the input", () => {
    test("returns a new object", () => {
      const timestamp1 = 1557572706232;
      const timestamp2 = 863866329825;
      const input = { birthdate: timestamp1, created_at: timestamp2 };
      const result = convertTimestampToDate(input);
      expect(result).not.toBe(input);
      expect(result).toBeObject();
    });
    test("converts birthdate property to a date", () => {
      const timestamp1 = 1557572706232;
      const timestamp2 = 863866329825;
      const input = { birthdate: timestamp1, created_at: timestamp2 };
      const result = convertTimestampToDate(input);
      expect(result.birthdate).toBeDate();
      expect(result.birthdate).toEqual(new Date(timestamp1));
    });
    test("converts created_at property to a date", () => {
      const timestamp1 = 1557572706232;
      const timestamp2 = 863866329825;
      const input = { birthdate: timestamp1, created_at: timestamp2 };
      const result = convertTimestampToDate(input);
      expect(result.created_at).toBeDate();
      expect(result.created_at).toEqual(new Date(timestamp2));
    });
    test("does not mutate the input", () => {
      const timestamp1 = 1557572706232;
      const timestamp2 = 863866329825;
      const input = { birthdate: timestamp1, created_at: timestamp2 };
      convertTimestampToDate(input);
      const control = { birthdate: timestamp1, created_at: timestamp2 };
      expect(input).toEqual(control);
    });
    test("ignores includes any other key-value-pairs in returned object", () => {
      const input = { birthdate: 0, created_at: 0, key1: true, key2: 1 };
      const result = convertTimestampToDate(input);
      expect(result.key1).toBe(true);
      expect(result.key2).toBe(1);
    });
  });
});

describe("createRef", () => {
  test("return empty object when pass on empty array", () => {
    expect(createRef([])).toEqual({});
  });
  test("return one reference when pass on one object", () => {
    const input = [
      {
        article_id: 10,
        title: "Seven inspirational thought leaders from Manchester UK",
        topic: "mitch",
        author: "rogersop",
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: "2020-05-14T04:15:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    expect(createRef(input, "title", "article_id")).toEqual({
      "Seven inspirational thought leaders from Manchester UK": 10,
    });
  });
  test("return multiple references when pass on morethan one object", () => {
    const input = [
      {
        article_id: 11,
        title: "Am I a cat?",
        topic: "mitch",
        author: "icellusedkars",
        body: "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
        created_at: "2020-01-15T22:21:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        article_id: 13,
        title: "Another article about Mitch",
        topic: "mitch",
        author: "butter_bridge",
        body: "There will never be enough articles about Mitch!",
        created_at: "2020-10-11T11:24:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    expect(createRef(input, "title", "article_id")).toEqual({
      "Am I a cat?": 11,
      "Another article about Mitch": 13,
    });
  });
});
