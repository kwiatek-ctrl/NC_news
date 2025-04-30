const endpointsJson = require("../endpoints.json");
const request = require('supertest')
/* Set up your test imports here */
const seed = require('../db/seeds/seed')
const app = require('../db/app')
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
  test('200: Responds with an objcet ', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body: {topics}}) => {
      topics.forEach((topic) => {
        expect(topic).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String),
        })
      })
    })
  })
})
describe.skip('GET /api/articles/:article_id', () => {
  test('200: Responds with an object with the article', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({body: {article}}) => {
      expect(article).toEqual({
        article_id: 1,
        title: expect.any(String),
        topic: expect.any(String),
        author: expect.any(String),
        body: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        article_img_url: expect.any(String),
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