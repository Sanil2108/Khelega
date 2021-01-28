
const URLS = {
  BASE_URL: 'http://localhost:3000',
  ROUTES: {
    USERS: {
      BASE_URL: '/users',
      REGISTER: '/register',
      LOGIN: '/login',
      FORGOT_PASSWORD: '/forgotPassword',
      IS_AUTHENTIC: '/isAuthentic',
      CHANGE_PASSWORD: '/changePassword',
      FOLLOW: '/follow'
    },
    GAMES: {
      BASE_URL: '/games',
      HOST_GAME: '/host',
      JOIN_GAME: '/join',
      DELETE_GAME: '/delete'
    }
  }
}

module.exports = {
  URLS
}
