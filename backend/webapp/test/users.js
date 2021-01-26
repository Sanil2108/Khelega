const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { URLS } = require("../constants");

chai.use(chaiHttp);

describe("Users test", () => {
  describe("Registering a user", () => {
    it('Should return 404 when trying to login a user', () => {});

    it('Should create a user', async () => {
      await new Promise(r => setTimeout(r, 3000))

      const response = await chai.request('http://localhost:3000/').post('users/register').send({
        username: "sanil21",
        password: "raymon11",
        email: "sanilkhurana7@gmail.com",
      });
      assert.strictEqual(response.statusCode, 200);
    });

    it('Should not return 404 when creating a user and logging in', () => {})
  });

  describe("Logging in a user", () => {

  })
});
