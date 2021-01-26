const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.staging") });

const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const { URLS } = require("./constants");

(async () => {
  const app = require("express")();

  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());

  const postgresDriver = require("./drivers/postgresDriver");
  await postgresDriver.initialise();

  const userRouter = require("./routes/users/routes");

  app.use(URLS.ROUTES.USER, userRouter);

  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
})();
