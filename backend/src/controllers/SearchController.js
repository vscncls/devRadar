const { Router } = require("express");
const Dev = require("../models/Dev");

const routes = Router();

routes.get("/", async (req, res) => {
  const { latitude, longitude, techs } = req.query;
  const techsArray = techs.split(",").map(tech => tech.trim());

  const searchTechs = {};
  if (techs) {
    searchTechs.techStack = { $in: techsArray };
  }

  const devs = await Dev.find({
    ...searchTechs,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        $maxDistance: 100000
      }
    }
  });

  return res.json({ devs });
});

module.exports = routes;
