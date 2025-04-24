const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const seed = require('../db/seeds/seed')
const app = require('../db/app')
const db = require('../db/connection')
const data = require('../db/data/development-data')
/* Set up your beforeEach & afterAll functions here */
beforeEach(() => seed(data))
afterAll(() => db.end())


describe("GET /api", () => {
  test.skip("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});