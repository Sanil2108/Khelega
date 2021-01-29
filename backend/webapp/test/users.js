const assert = require("assert");
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { URLS } = require("../constants");
const btoa = require('btoa');

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
    it('Should return 404 when trying to login a user that does not exist', async () => {

    });

    it('Should return 200 after registering a user and logging him/her', async () => {

    });

    it('Should return a JWT after logging in a valid user', async () => {

    });

    it('Should return 401 if trying to login without an authorization header', async () => {

    });

    it('Should return 400 when trying to login with a malformed authorization header', async () => {

    });

    it('Should return 400 when trying to login with incorrect password', async () => {

    });
  });

  describe("Forgot Password", () => {
    it('Should return 400 if no email is specified', async () => {
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.FORGOT_PASSWORD}`).send({});
      assert.strictEqual(response.statusCode, 400, `Forgot Password did not give a 400 response code when trying to send a request without an email address.`);
    });

    it('Should return 404 if email is not found', async () => {
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.FORGOT_PASSWORD}`).send({
        email: "test.account@gmail.com",
      });
      assert.strictEqual(response.statusCode, 404, `Forgot Password did not give a 404 response code when trying to send a request with an unregistered email address.`);
    });
    
    it('Should return token if email is found', async () => {
      await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        username: "test.account",
        password: "raymon11",
        email: "test.account@gmail.com",
      });
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.FORGOT_PASSWORD}`).send({
        email: "test.account@gmail.com",
      });
      assert.strictEqual(response.statusCode, 200, `Forgot Password did not give a 200 response code.`);
      expect(response.body, `Forgot Password did not return a token.`).to.have.property('token');
    });
  });

  describe("Is Authentic", () => {

  });

  describe("Change Password", () => {
    it('Should return 400 if no password is specified', async () => {
      await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        username: "test.account-1",
        password: "raymon11",
        email: "test.account123@gmail.com",
      });
      const forgotPasswordResponse = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.FORGOT_PASSWORD}`).send({
        email: "test.account123@gmail.com",
      });
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.CHANGE_PASSWORD}`).send({
        token: forgotPasswordResponse.body.token
      });
      assert.strictEqual(response.statusCode, 400, `Change Password did not give a 400 response code when trying to send a request without a new password.`);
    });

    it('Should return 200 if correct token is sent and change the password', async () => {
      await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.REGISTER}`).send({
        username: "test.account-2",
        password: "raymon11",
        email: "test.account1234@gmail.com",
      });
      const forgotPasswordResponse = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.FORGOT_PASSWORD}`).send({
        email: "test.account1234@gmail.com",
      });
      const response = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.CHANGE_PASSWORD}`).send({
        token: forgotPasswordResponse.body.token,
        password: 'root2'
      });
      assert.strictEqual(response.statusCode, 200, `Change Password did not give a 200 response code when trying to send a correct request.`);
      const loginResponse = await chai.request(URLS.BASE_URL).post(`${URLS.ROUTES.USERS.BASE_URL}${URLS.ROUTES.USERS.LOGIN}`).set({
        authorization: `Basic ${btoa(`test.account1234@gmail.com:root2`)}`
      })
      assert.strictEqual(loginResponse.statusCode, 200, `Change Password did not change the password.`);
    });
  });

  describe("Follow", () => {

  })
});
