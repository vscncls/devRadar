const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.use("/devs", DevController);
routes.use("/search", SearchController);

module.exports = routes;
