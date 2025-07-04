const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("Database schema and seed data", () => {
  describe("Table structure", () => {
    test("tags table exists and has correct columns and primary key", async () => {
      const {
        rows: [{ exists }],
      } = await db.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'tags');`,
      );
      expect(exists).toBe(true);
      const { rows: columns } = await db.query(
        `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'tags';`,
      );
      expect(columns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            column_name: "tag_id",
            data_type: "integer",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "tag_name",
            data_type: "character varying",
            is_nullable: "NO",
          }),
        ]),
      );
      const { rows: primaryKeyQueryResultRows } = await db.query(
        `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'tags' AND constraint_name = 'tags_pkey';`,
      );
      expect(primaryKeyQueryResultRows.length).toBe(1);
      const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
      expect(primaryKeyColumnName).toBe("tag_id");
    });

    test("tag_name column in tags table is unique", async () => {
      const { rows } = await db.query(`
        SELECT tc.constraint_type
        FROM information_schema.table_constraints tc
        JOIN information_schema.constraint_column_usage ccu
          ON tc.constraint_name = ccu.constraint_name
        WHERE tc.table_name = 'tags'
          AND ccu.column_name = 'tag_name'
          AND tc.constraint_type = 'UNIQUE';
      `);
      expect(rows.length).toBeGreaterThan(0);
    });

    test("families table exists and has correct columns and primary key", async () => {
      const {
        rows: [{ exists }],
      } = await db.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'families');`,
      );
      expect(exists).toBe(true);
      const { rows: columns } = await db.query(
        `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'families';`,
      );
      expect(columns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            column_name: "family_id",
            data_type: "integer",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "family_name",
            data_type: "character varying",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "created_by",
            data_type: "character varying",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "img_url",
            data_type: "character varying",
          }),
          expect.objectContaining({
            column_name: "created_at",
            data_type: "timestamp without time zone",
          }),
        ]),
      );
      const { rows: primaryKeyQueryResultRows } = await db.query(
        `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'families' AND constraint_name = 'families_pkey';`,
      );
      expect(primaryKeyQueryResultRows.length).toBe(1);
      const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
      expect(primaryKeyColumnName).toBe("family_id");
    });

    test("users table exists and has correct columns and primary key", async () => {
      const {
        rows: [{ exists }],
      } = await db.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users');`,
      );
      expect(exists).toBe(true);
      const { rows: columns } = await db.query(
        `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'users';`,
      );
      expect(columns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            column_name: "username",
            data_type: "character varying",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "firstname",
            data_type: "character varying",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "lastname",
            data_type: "character varying",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "sex",
            data_type: "character varying",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "portrait_url",
            data_type: "character varying",
          }),
          expect.objectContaining({
            column_name: "birthdate",
            data_type: "date",
          }),
          expect.objectContaining({
            column_name: "email",
            data_type: "character varying",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "password",
            data_type: "character varying",
            is_nullable: "NO",
          }),
          expect.objectContaining({ column_name: "bio", data_type: "text" }),
          expect.objectContaining({
            column_name: "timezone",
            data_type: "character varying",
          }),
        ]),
      );
      const { rows: primaryKeyQueryResultRows } = await db.query(
        `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'users' AND constraint_name = 'users_pkey';`,
      );
      expect(primaryKeyQueryResultRows.length).toBe(1);
      const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
      expect(primaryKeyColumnName).toBe("username");
    });

    test("articles table exists and has correct columns and primary key", async () => {
      const {
        rows: [{ exists }],
      } = await db.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'articles');`,
      );
      expect(exists).toBe(true);
      const { rows: columns } = await db.query(
        `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'articles';`,
      );
      expect(columns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            column_name: "article_id",
            data_type: "integer",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "title",
            data_type: "character varying",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "author_username",
            data_type: "character varying",
          }),
          expect.objectContaining({
            column_name: "body",
            data_type: "text",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "created_at",
            data_type: "timestamp without time zone",
          }),
          expect.objectContaining({
            column_name: "article_img_urls",
            data_type: "ARRAY",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "family_id",
            data_type: "integer",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "is_pinned",
            data_type: "boolean",
          }),
          expect.objectContaining({
            column_name: "location",
            data_type: "character varying",
          }),
        ]),
      );
      const { rows: primaryKeyQueryResultRows } = await db.query(
        `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'articles' AND constraint_name = 'articles_pkey';`,
      );
      expect(primaryKeyQueryResultRows.length).toBe(1);
      const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
      expect(primaryKeyColumnName).toBe("article_id");
    });

    test("comments table exists and has correct columns and primary key", async () => {
      const {
        rows: [{ exists }],
      } = await db.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'comments');`,
      );
      expect(exists).toBe(true);
      const { rows: columns } = await db.query(
        `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'comments';`,
      );
      expect(columns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            column_name: "comment_id",
            data_type: "integer",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "article_id",
            data_type: "integer",
          }),
          expect.objectContaining({ column_name: "body", data_type: "text" }),
          expect.objectContaining({
            column_name: "author",
            data_type: "character varying",
          }),
          expect.objectContaining({
            column_name: "created_at",
            data_type: "timestamp without time zone",
          }),
        ]),
      );
      const { rows: primaryKeyQueryResultRows } = await db.query(
        `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'comments' AND constraint_name = 'comments_pkey';`,
      );
      expect(primaryKeyQueryResultRows.length).toBe(1);
      const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
      expect(primaryKeyColumnName).toBe("comment_id");
    });

    test("reactions table exists and has correct columns and primary key", async () => {
      const {
        rows: [{ exists }],
      } = await db.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'reactions');`,
      );
      expect(exists).toBe(true);
      const { rows: columns } = await db.query(
        `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'reactions';`,
      );
      expect(columns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            column_name: "reaction_id",
            data_type: "integer",
            is_nullable: "NO",
          }),
          expect.objectContaining({
            column_name: "emoji",
            data_type: "character varying",
            is_nullable: "NO",
          }),
        ]),
      );
      const { rows: primaryKeyQueryResultRows } = await db.query(
        `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'reactions' AND constraint_name = 'reactions_pkey';`,
      );
      expect(primaryKeyQueryResultRows.length).toBe(1);
      const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
      expect(primaryKeyColumnName).toBe("reaction_id");
    });

    test("reactions table has unique name constraint", async () => {
      const { rows: uniqueRows } = await db.query(`
        SELECT tc.constraint_type
        FROM information_schema.table_constraints tc
        JOIN information_schema.constraint_column_usage ccu
          ON tc.constraint_name = ccu.constraint_name
        WHERE tc.table_name = 'reactions'
          AND ccu.column_name = 'emoji'
          AND tc.constraint_type = 'UNIQUE';
      `);
      expect(uniqueRows.length).toBeGreaterThan(0);
    });

    describe("articles_tags table", () => {
      test("exists and has correct columns, primary key, and constraints", async () => {
        const {
          rows: [{ exists }],
        } = await db.query(
          `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'articles_tags');`,
        );
        expect(exists).toBe(true);
        const { rows: columns } = await db.query(
          `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'articles_tags';`,
        );
        expect(columns).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              column_name: "article_tag_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "article_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "tag_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
          ]),
        );

        const { rows: primaryKeyQueryResultRows } = await db.query(
          `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'articles_tags' AND constraint_name = 'articles_tags_pkey';`,
        );
        expect(primaryKeyQueryResultRows.length).toBe(1);
        const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
        expect(primaryKeyColumnName).toBe("article_tag_id");

        // Check unique constraint
        const { rows: uniqueRows } = await db.query(`
          SELECT tc.constraint_type
          FROM information_schema.table_constraints tc
          JOIN information_schema.constraint_column_usage ccu
            ON tc.constraint_name = ccu.constraint_name
          WHERE tc.table_name = 'articles_tags'
            AND ccu.column_name = 'article_id'
            AND tc.constraint_type = 'UNIQUE';
        `);
        expect(uniqueRows.length).toBeGreaterThan(0);
      });
    });

    describe("families_users table", () => {
      test("exists and has correct columns, primary key, and constraints", async () => {
        const {
          rows: [{ exists }],
        } = await db.query(
          `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'families_users');`,
        );
        expect(exists).toBe(true);
        const { rows: columns } = await db.query(
          `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'families_users';`,
        );
        expect(columns).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              column_name: "family_user_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "family_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "username",
              data_type: "character varying",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "joined_at",
              data_type: "timestamp without time zone",
            }),
          ]),
        );

        const { rows: primaryKeyQueryResultRows } = await db.query(
          `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'families_users' AND constraint_name = 'families_users_pkey';`,
        );
        expect(primaryKeyQueryResultRows.length).toBe(1);
        const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
        expect(primaryKeyColumnName).toBe("family_user_id");

        // Check unique constraint
        const { rows: uniqueRows } = await db.query(`
          SELECT tc.constraint_type
          FROM information_schema.table_constraints tc
          JOIN information_schema.constraint_column_usage ccu
            ON tc.constraint_name = ccu.constraint_name
          WHERE tc.table_name = 'families_users'
            AND ccu.column_name = 'family_id'
            AND tc.constraint_type = 'UNIQUE';
        `);
        expect(uniqueRows.length).toBeGreaterThan(0);
      });
    });

    describe("articles_reactions table", () => {
      test("exists and has correct columns, primary key, and constraints", async () => {
        const {
          rows: [{ exists }],
        } = await db.query(
          `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'articles_reactions');`,
        );
        expect(exists).toBe(true);
        const { rows: columns } = await db.query(
          `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'articles_reactions';`,
        );
        expect(columns).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              column_name: "article_reaction_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "article_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "username",
              data_type: "character varying",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "reaction_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "reacted_at",
              data_type: "timestamp without time zone",
            }),
          ]),
        );

        const { rows: primaryKeyQueryResultRows } = await db.query(
          `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'articles_reactions' AND constraint_name = 'articles_reactions_pkey';`,
        );
        expect(primaryKeyQueryResultRows.length).toBe(1);
        const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
        expect(primaryKeyColumnName).toBe("article_reaction_id");

        // Check unique constraint on (article_id, username, reaction_id)
        const { rows: uniqueRows } = await db.query(`
          SELECT tc.constraint_name, string_agg(ccu.column_name, ', ' ORDER BY ccu.column_name) as columns
          FROM information_schema.table_constraints tc
          JOIN information_schema.constraint_column_usage ccu
            ON tc.constraint_name = ccu.constraint_name
          WHERE tc.table_name = 'articles_reactions'
            AND tc.constraint_type = 'UNIQUE'
          GROUP BY tc.constraint_name
          HAVING COUNT(*) = 3;
        `);
        expect(uniqueRows.length).toBeGreaterThan(0);

        // Verify the constraint includes all three required columns
        const constraintColumns = uniqueRows[0].columns.split(", ");
        expect(constraintColumns).toContain("article_id");
        expect(constraintColumns).toContain("username");
        expect(constraintColumns).toContain("reaction_id");
      });
    });

    describe("comments_reactions table", () => {
      test("exists and has correct columns, primary key, and constraints", async () => {
        const {
          rows: [{ exists }],
        } = await db.query(
          `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'comments_reactions');`,
        );
        expect(exists).toBe(true);
        const { rows: columns } = await db.query(
          `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'comments_reactions';`,
        );
        expect(columns).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              column_name: "comment_reaction_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "comment_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "username",
              data_type: "character varying",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "reaction_id",
              data_type: "integer",
              is_nullable: "NO",
            }),
            expect.objectContaining({
              column_name: "reacted_at",
              data_type: "timestamp without time zone",
            }),
          ]),
        );

        const { rows: primaryKeyQueryResultRows } = await db.query(
          `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'comments_reactions' AND constraint_name = 'comments_reactions_pkey';`,
        );
        expect(primaryKeyQueryResultRows.length).toBe(1);
        const primaryKeyColumnName = primaryKeyQueryResultRows[0].column_name;
        expect(primaryKeyColumnName).toBe("comment_reaction_id");

        // Check unique constraint on (comment_id, username, reaction_id)
        const { rows: uniqueRows } = await db.query(`
          SELECT tc.constraint_name, string_agg(ccu.column_name, ', ' ORDER BY ccu.column_name) as columns
          FROM information_schema.table_constraints tc
          JOIN information_schema.constraint_column_usage ccu
            ON tc.constraint_name = ccu.constraint_name
          WHERE tc.table_name = 'comments_reactions'
            AND tc.constraint_type = 'UNIQUE'
          GROUP BY tc.constraint_name
          HAVING COUNT(*) = 3;
        `);
        expect(uniqueRows.length).toBeGreaterThan(0);

        // Verify the constraint includes all three required columns
        const constraintColumns = uniqueRows[0].columns.split(", ");
        expect(constraintColumns).toContain("comment_id");
        expect(constraintColumns).toContain("username");
        expect(constraintColumns).toContain("reaction_id");
      });
    });
  });

  describe("Seed data insertion", () => {
    test("tags data inserted", async () => {
      const { rows } = await db.query(`SELECT * FROM tags;`);
      expect(rows.length).toBe(data.tagsData.length);
      rows.forEach((row) => {
        expect(row).toHaveProperty("tag_id");
        expect(row).toHaveProperty("tag_name");
      });
    });
    test("families data inserted", async () => {
      const { rows } = await db.query(`SELECT * FROM families;`);
      expect(rows.length).toBe(data.familiesData.length);
      rows.forEach((row) => {
        expect(row).toHaveProperty("family_id");
        expect(row).toHaveProperty("family_name");
        expect(row).toHaveProperty("created_by");
        expect(row).toHaveProperty("img_url");
        expect(row).toHaveProperty("created_at");
      });
    });
    test("users data inserted", async () => {
      const { rows } = await db.query(`SELECT * FROM users;`);
      expect(rows.length).toBe(data.usersData.length);
      rows.forEach((row) => {
        expect(row).toHaveProperty("username");
        expect(row).toHaveProperty("firstname");
        expect(row).toHaveProperty("lastname");
        expect(row).toHaveProperty("sex");
        expect(row).toHaveProperty("portrait_url");
        expect(row).toHaveProperty("birthdate");
        expect(row).toHaveProperty("email");
        expect(row).toHaveProperty("password");
        expect(row).toHaveProperty("bio");
        expect(row).toHaveProperty("timezone");
      });
    });
    test("articles data inserted", async () => {
      const { rows } = await db.query(`SELECT * FROM articles;`);
      expect(rows.length).toBe(data.articlesData.length);
      rows.forEach((row) => {
        expect(row).toHaveProperty("article_id");
        expect(row).toHaveProperty("title");
        expect(row).toHaveProperty("author_username");
        expect(row).toHaveProperty("body");
        expect(row).toHaveProperty("created_at");
        expect(row).toHaveProperty("article_img_urls");
        expect(row).toHaveProperty("family_id");
        expect(row).toHaveProperty("is_pinned");
        expect(row).toHaveProperty("location");
      });
    });
    test("comments data inserted", async () => {
      const { rows } = await db.query(`SELECT * FROM comments;`);
      expect(rows.length).toBe(data.commentsData.length);
      rows.forEach((row) => {
        expect(row).toHaveProperty("comment_id");
        expect(row).toHaveProperty("article_id");
        expect(row).toHaveProperty("body");
        expect(row).toHaveProperty("author");
        expect(row).toHaveProperty("created_at");
      });
    });

    test("reactions data inserted", async () => {
      const { rows } = await db.query(`SELECT * FROM reactions;`);
      expect(rows.length).toBe(data.reactionsData.length);
      rows.forEach((row) => {
        expect(row).toHaveProperty("reaction_id");
        expect(row).toHaveProperty("emoji");
      });
    });
    describe("articles_tags table", () => {
      test("data inserted", async () => {
        const { rows } = await db.query(`SELECT * FROM articles_tags;`);
        expect(rows.length).toBe(data.articlesTagsData.length);
        rows.forEach((row) => {
          expect(row).toHaveProperty("article_tag_id");
          expect(row).toHaveProperty("article_id");
          expect(row).toHaveProperty("tag_id");
        });
      });
    });
    describe("families_users table", () => {
      test("data inserted", async () => {
        const { rows } = await db.query(`SELECT * FROM families_users;`);
        console.log(rows);
        expect(rows.length).toBe(data.familiesUsersData.length);
        rows.forEach((row) => {
          expect(row).toHaveProperty("family_user_id");
          expect(row).toHaveProperty("family_id");
          expect(row).toHaveProperty("username");
          expect(row).toHaveProperty("joined_at");
        });
      });
    });

    describe("articles_reactions table", () => {
      test("data inserted", async () => {
        const { rows } = await db.query(`SELECT * FROM articles_reactions;`);
        expect(rows.length).toBe(data.articlesReactionsData.length);
        rows.forEach((row) => {
          expect(row).toHaveProperty("article_reaction_id");
          expect(row).toHaveProperty("article_id");
          expect(row).toHaveProperty("username");
          expect(row).toHaveProperty("reaction_id");
          expect(row).toHaveProperty("reacted_at");
        });
      });
    });

    describe("comments_reactions table", () => {
      test("data inserted", async () => {
        const { rows } = await db.query(`SELECT * FROM comments_reactions;`);
        expect(rows.length).toBe(data.commentsReactionsData.length);
        rows.forEach((row) => {
          expect(row).toHaveProperty("comment_reaction_id");
          expect(row).toHaveProperty("comment_id");
          expect(row).toHaveProperty("username");
          expect(row).toHaveProperty("reaction_id");
          expect(row).toHaveProperty("reacted_at");
        });
      });
    });
  });
});
