const apiForwardMiddleware = (apiFunction) => {
    return (req, res, next) => {
        const body = req.body;
        const headers = req.headers;

        const response = apiFunction({
            headers,
            body
        });

        res.json(response);

        next();
    }
}

module.exports = {apiForwardMiddleware};
