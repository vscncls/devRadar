require("dotenv").config();
const express = require("express");
const moongose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

const app = express();

moongose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(routes);

app.listen(8010, () => {
  console.log("Express server started...");
});
