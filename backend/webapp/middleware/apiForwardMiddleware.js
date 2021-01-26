const apiForwardMiddleware = (apiFunction) => {
  return async (req, res, next) => {
    const body = req.body;
    const headers = req.headers;

    const response = await apiFunction({
      ...req,
      headers,
      body,
    }, res);

    res.json(response.data);

    next();
  };
};

module.exports = { apiForwardMiddleware };
