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


describe.skip("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpointsJson } }) => {
        expect(endpointsJson[0]).toEqual(endpointsJson);
      });
  });
});
describe.skip('GET /api/topics', () => {
  test('200: Responds with an objcet ', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body: {data}}) => {
      expect(data).toEqual(endpointsJson)
    })
  })
})