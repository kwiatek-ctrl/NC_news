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

describe('All bad URLs', () => {
  test('404: Path not found', () => {
    return request(app)
      .get('/api/badpath')
      .expect(404)
      .then(({ body: {msg} }) => {
        expect(msg).toBe('Path not found!');
      });
  })
})
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
describe('GET /api/users', () => {
  test('200: Responds with an object with the key of users and the value of an array of objects', () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({body: {users}}) => {
      expect(users).toHaveLength(6)
      users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String),
        })
      })
    })
  })
})
describe('GET /api/articles/:article_id/comments', () => {
  test('200: Responds with an array of comments for a given article_id', () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then(({body: {comments}}) => {
      expect(comments).toEqual([{"article_id": 1, "author": "weegembump", "body": "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.", "comment_id": 31, "created_at": "2020-09-26T16:16:00.000Z", "votes": 11}, {"article_id": 1, "author": "cooljmessy", "body": "Explicabo perspiciatis voluptatem sunt tenetur maxime aut. Optio totam modi. Perspiciatis et quia.", "comment_id": 33, "created_at": "2019-12-31T21:21:00.000Z", "votes": 4}, {"article_id": 1, "author": "grumpy19", "body": "Error est qui id corrupti et quod enim accusantium minus. Deleniti quae ea magni officiis et qui suscipit non.", "comment_id": 44, "created_at": "2020-06-15T15:13:00.000Z", "votes": 4}, {"article_id": 1, "author": "jessjelly", "body": "Consectetur deleniti sed. Omnis et dolore omnis aspernatur. Et porro accusantium. Tempora ullam voluptatum et rerum.", "comment_id": 52, "created_at": "2020-07-07T08:14:00.000Z", "votes": 10}, {"article_id": 1, "author": "happyamy2016", "body": "Assumenda sit est blanditiis asperiores est minima. Placeat sequi tenetur autem consequatur soluta molestiae. Incidunt neque labore et dolorem et vel possimus nemo quidem.", "comment_id": 85, "created_at": "2020-08-23T01:14:00.000Z", "votes": 0}, {"article_id": 1, "author": "tickle122", "body": "Et explicabo dignissimos officia dolore rerum aliquam corrupti. Culpa corporis earum et earum officia a est atque at. Quidem quo recusandae delectus autem possimus blanditiis optio. Sed culpa culpa. Exercitationem nemo aspernatur alias ut qui.", "comment_id": 86, "created_at": "2020-10-04T01:03:00.000Z", "votes": 14}, {"article_id": 1, "author": "cooljmessy", "body": "Esse et expedita harum non. Voluptatibus commodi voluptatem. Minima velit suscipit numquam ea. Id vitae debitis aut incidunt odio quo quam possimus ipsum.", "comment_id": 89, "created_at": "2020-10-24T06:08:00.000Z", "votes": 2}, {"article_id": 1, "author": "cooljmessy", "body": "Ut accusamus enim vel voluptate quae temporibus labore neque a. Reprehenderit iste est eos velit fugit vel quod velit.", "comment_id": 286, "created_at": "2020-04-26T01:14:00.000Z", "votes": 19}])
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
describe.skip('POST /api/articles/:article_id/comments', () => {
  test('201: Responds with the posted comment', () => {
    const newComment = {
      username: "jessjelly",
      body: "This is a new comment",
    }
    return request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          comment_id: expect.any(Number),
          article_id: 1,
          author: "jessjelly",
          body: "This is a new comment",
          created_at: expect.any(String),
          votes: 0,
      })
    })
  })
  test('400: Reponds with an appropriate status and error when provided with an invalid article_id', () => {
    const newComment = {
      username: 'jessjelly',
      body: 'This is a comment',
    }
    return request(app)
      .post('/api/articles/invalid_id/comments')
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({msg: 'Invalid article_id'})
    })
  })
  test('400: Responds with an appropriate status and error message when the request body is missing required fields', () => {
    const newComment = {
      body: 'This is a comment',
    }
    return request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({msg: 'Username and body are required'})
      })
  })
  test('400: Responds with an appropriate status and error message when the request body is missing required fields', () => {
    const newComment = {
      username: 73643,
      body: 736183,
    }
    return request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({msg: 'Username and body must be strings'})
      })
  })
  test('404: Responds with an appropriate status and error message when provided with a non-existent article_id', () => {
    const newComment = {
      username: 'jessjelly',
      body: 'This is a new comment',
    }
    return request(app)
      .post('/api/articles/9999/comments') 
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({msg: 'Article not found!'})
      })
  })
})
