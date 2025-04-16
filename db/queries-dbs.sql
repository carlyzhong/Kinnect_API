\c nc_news

\echo '\n Get all of the users: \n'
SELECT * FROM users;

\echo '\n Get all of the articles where the topic is coding: \n'
SELECT * FROM articles
WHERE topic = 'coding';

\echo '\n Get all of the comments where the votes are less than zero: \n'
SELECT * FROM comments
WHERE votes < 0
ORDER BY votes ASC;

\echo '\n Get all of the topics: \n'
SELECT * FROM topics;

\echo '\n Get all of the articles by user grumpy19 \n'
SELECT * FROM articles
WHERE author = 'grumpy19';

\echo '\n Get all of the comments that have more than 10 votes\n'
SELECT * FROM comments
WHERE votes >= 10
ORDER BY votes DESC;





