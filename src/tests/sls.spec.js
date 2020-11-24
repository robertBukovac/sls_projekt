const request = require('supertest')
const app = require('../app')
jest.setTimeout(30000);

describe("GET /sls", () => {
  test("It responds with all the sls in DB", async () => {
    const response = await request(app).get("/api/v1/sls");
    expect('Content-Type', /json/)
    expect(response.statusCode).toBe(200)
    end(function(err, res) {
      if (err) throw err;
    });
  });
});