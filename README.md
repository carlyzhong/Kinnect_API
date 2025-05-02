# NC News

## Hosted Version

[NC News - Live Demo](https://nc-news-ya2m.onrender.com)

## Project Summary

Welcome to my first backend project 🚨 NC News! 🎉

NC News represents my first dive into building a complete backend API from scratch. This is a RESTful API that powers a website similar to Reddit where users can read news articles and join discussions. The API manages all the data including articles, comments, topics, and user information.

I built this project using Node.js, Express, and PostgreSQL, following RESTful principles and MVC architecture. The development process followed Test-Driven Development (TDD) principles, using Jest for unit testing and Supertest for integration and end-to-end testing. The project also implements Continuous Integration and Continuous Deployment (CI/CD) to ensure code quality and automate deployment.

## Setup Instructions

### Prerequisites

- Node.js (minimum version: v23.7.0)
- PostgreSQL (minimum version: v14.0)

### Cloning and Installation

1. Clone the repository:

```
https://github.com/carlyzhong/NC-news
```

2. Install dependencies:

```
npm install
```

### Environment Setup

You'll need to create two `.env` files in the root directory to connect to the correct databases:

1. For the test environment, create `.env.test` with:

```
PGDATABASE=nc_news_test
```

2. For the development environment, create `.env.development` with:

```
PGDATABASE=nc_news
```

### Database Setup and Seeding

1. Set up the databases:

```
npm run setup-dbs
```

2. Seed the development database:

```
npm run seed-dev
```

### Running Tests

Run the test suite with:

```
npm test
```

## API Documentation

Once the server is running, you can access the API documentation at the `/api` endpoint, which provides details about all available endpoints, accepted queries, and example responses.

## Local Development

To run the server locally:

```
npm start
```

By default, the server will listen on port 9090 (http://localhost:9090).

## Available Endpoints

- `GET /api`: API documentation
- `GET /api/topics`: Get all topics
- `GET /api/articles`: Get all articles (with optional queries)
- `GET /api/articles/:article_id`: Get article by ID
- `GET /api/articles/:article_id/comments`: Get comments for an article
- `POST /api/articles/:article_id/comments`: Add a new comment
- `PATCH /api/articles/:article_id`: Update article votes
- `DELETE /api/comments/:comment_id`: Delete a comment
- `GET /api/users`: Get all users

For full details and example responses, check the `/api` endpoint.
