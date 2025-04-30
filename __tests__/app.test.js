const endpointsJson = require("../endpoints.json");
const request = require('supertest')
/* Set up your test imports here */
const seed = require('../db/seeds/seed')
const app = require('../app')
const db = require('../db/connection')
const data = require('../db/data/development-data')
/* Set up your beforeEach & afterAll functions here */
beforeEach(() => seed(data))
afterAll(() => db.end())


describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: {endpoints} }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe('GET /api/topics', () => {
  test('200: Responds with an array of topics ', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body: {topics}}) => {
      expect(topics).toHaveLength(3)
      topics.forEach((topic) => {
        expect(topic).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String),
        })
      })
    })
  })
})
describe('GET /api/articles/:article_id', () => {
  test('200: Responds with an object of a given article', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({body: {article}}) => {
      expect(article).toEqual({
        article_id: 1,
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: "2020-11-07T06:03:00.000Z",
        votes: 0,
        article_img_url: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
      })
    })
  })
  test('400: Responds when there is an invalid article_id', () => {
    return request(app)
      .get('/api/articles/invalid_id')
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({msg: 'Invalid article_id'})
      })
  })
  test('404: Responds when there is no matching article', () => {
    return request(app)
    .get('/api/articles/99999')
    .expect(404)
    .then(({body}) => {
      expect(body).toEqual({msg: 'Article not found!'})
    })
  })
})
describe('GET /api/articles', () => {
  test('200: Responds with an array of articles', () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({body: {articles}}) => {
      expect(articles).toHaveLength(37)
      articles.forEach((article) => {
        expect(article).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
        })
      })
    })
  })
})
describe('GET /api.articles/:article_id/comments', () => {
  test('200: Responds with an array of comments for a given article_id', () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then(({body: {comments}}) => {
      expect(comments).toHaveLength(8)
      comments.forEach((comment) => {
        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          body: expect.any(String),
          article_id: 1,
        })
      })
    })
  })
  test('400: Responds when there is an invalid article_id', () => {
    return request(app)
      .get('/api/articles/invalid_id/comments')
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({msg: 'Invalid article_id'})
      })
  })
  test('404: Responds when there is no matching article', () => {
    return request(app)
    .get('/api/articles/99999/comments')
    .expect(404)
    .then(({body}) => {
      expect(body).toEqual({msg: 'Article not found!'})
    })
  })
})