import express from "express";
import swaggerUi from "swagger-ui-express";
// import { apiDocumentation } from "../src/docs/apidocs";
import * as swaggerDocument from "./swagger.json";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use("/api/pets", require("./routes/petRouters"));
app.use("/api/store", require("./routes/storeRouters"));
app.use("/api/user", require("./routes/userRouters"));
// app.use("/documentation", swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.listen(PORT, () => {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Server is running on port.");
});
