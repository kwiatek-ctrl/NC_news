const db = require("../connection")
const format = require('pg-format')

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query(`DROP TABLE IF EXISTS comments`)//<< write your first query in here.
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS articles`);
  })
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS users`);
  })
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS topics`);
  })
  .then(() => {
    return db.query(`CREATE TABLE topics(
      slug VARCHAR(1000) PRIMARY KEY,
      description VARCHAR(1000) NOT NULL,
      img_url VARCHAR(1000))`);
  })
  .then(() => {
    return db.query(`CREATE TABLE users(
      username VARCHAR(1000) PRIMARY KEY,
      name VARCHAR(1000) NOT NULL,
      avatar_url VARCHAR(1000))`);
  })
  .then(() => {
    return db.query(`CREATE TABLE articles(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(1000) NOT NULL,
      topic VARCHAR(1000) REFERENCES topics(slug),
      author VARCHAR(1000) REFERENCES users(username),
      body TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000))`);
  })
  .then(() => {
    return db.query(`CREATE TABLE comments(
      comment_id SERIAL PRIMARY KEY,
      article_id INT REFERENCES articles(article_id),
      body TEXT,
      votes INT DEFAULT 0,
      author VARCHAR(1000) REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
  })
  .then(() => {
    const formatedTopicData = topicData.map((topic) => {
      return [
        topic.slug,
        topic.description,
        topic.img_url
      ]
    })
    const topicsTable = format(`INSERT INTO topics(slug, description, img_url) VALUES %L`, formatedTopicData);
    return db.query(topicsTable)
  })
  .then(() => {
    const formatedUserData = userData.map((user) => {
      return [
        user.username,
        user.name,
        user.avatar_url
      ]
    })
    const usersTable = format(`INSERT INTO users(username, name, avatar_url) VALUES %L`, formatedUserData);
    return db.query(usersTable)
  })
  .then(() => {
    const formatedArticleData = articleData.map((article) => {
      return [
        article.title,
        article.topic,
        article.author,
        article.body,
        new Date(article.created_at),
        article.votes,
        article.article_img_url
      ]
    })
    const articlesTable = format(`INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L`, formatedArticleData);
    console.log(articlesTable,'<<<<<<<')
    return db.query(articlesTable)
  })
  .then(() => {
    const formatedCommentData = commentData.map((comment) => {
      return [
        comment.body,
        comment.votes,
        comment.author,
        new Date(comment.created_at)
      ]
    })
    const commentTable = format(`INSERT INTO comments(body, votes, author, created_at) VALUES %L`, formatedCommentData);
    return db.query(commentTable)
  })
};
module.exports = seed;
