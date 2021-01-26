const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { URLS } = require("../constants");

chai.use(chaiHttp);

before((done) => {
  require('../app');
  setTimeout(done, 3000)
})

describe("Users test", () => {
  describe("Registering a user", () => {
    it('Should return 400 when trying to register without an email', async () => {
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        username: "sanil2",
        password: "raymon11",
      });
      assert.strictEqual(response.statusCode, 400, `Register did not give a 400 response code when trying to register without an email address.`);
    });

    it('Should return 400 when trying to register with an invalid email', async () => {
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        username: "sanil2",
        password: "raymon11",
        email: "sanilkhurana8@gmail",
      });
      assert.strictEqual(response.statusCode, 400, `Register did not give a 400 response code when trying to register with an invalid email address.`);
    });

    it('Should return 400 when trying to register without a username', async () => {
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        password: "raymon11",
        email: "sanilkhurana8@gmail.com",
      });
      assert.strictEqual(response.statusCode, 400, `Register did not give a 400 response code when trying to register without a username.`);
    });

    it('Should return 400 when trying to register without a password', async () => {
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        username: "sanil2",
        email: "sanilkhurana8@gmail.com",
      });
      assert.strictEqual(response.statusCode, 400, `Register did not give a 400 response code when trying to register without a password.`);
    });

    it('Should create a user', async () => {
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        username: "sanil2",
        password: "raymon11",
        email: "sanilkhurana8@gmail.com",
      });
      assert.strictEqual(response.statusCode, 200, `Register did not give a 200 response code.`);
    });

    it('Should return 400 when trying to register with an email that already exists', async () => {
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        username: "sanil2",
        password: "raymon11",
        email: "sanilkhurana8@gmail.com",
      });
      assert.strictEqual(response.statusCode, 400, `Register did not give a 400 response code when trying to register without an email address.`);
    });

    it('Should return 400 when trying to register with a username that already exists', async () => {
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        username: "sanil2",
        password: "raymon11",
        email: "sanilkhurana8@gmail.com",
      });
      assert.strictEqual(response.statusCode, 400, `Register did not give a 400 response code when trying to register without an email address.`);
    });
  });

  describe("Logging in a user", () => {

  })
});
