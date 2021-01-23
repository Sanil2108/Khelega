const schemaValidationMiddleware = (schema) => {
    return async (req, res, next) => {
        try {
            const value = await schema.validate(req.body);
            if (value.error) {
                res.status(400).send(value.error);
                return;
            }
            else {
                next();
            }
        }
        catch (err) {
            res.status(400).send('Schema validation failed. ');
        }
    }
}

module.exports = {schemaValidationMiddleware}