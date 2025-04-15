# NC News Seeding

### 1. Install npm package

CLI run `npm install`

### 2. Create databases

CLI run `npm run setup-dbs`

> This will run the `setup-dbs.sql` file to create both a test and development database.

## Setting up Database Connections

### 1. Install dotenv

CLI run `npm install pg-format`

### 2. For Testing Environment

> To connect to the databases locally, you need to create two `.env` files in the root directory of the project:

Create a file named `.env.test` with the following content:

```
PGDATABASE=nc_news_test
```

### 3. For Development Environment

Create a file named `.env.development` with the following content:

```
PGDATABASE=nc_news
```
