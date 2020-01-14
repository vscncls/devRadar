const { Router } = require("express");
const Dev = require("../models/Dev");

const routes = Router();

routes.get("/", async (req, res) => {
  const { latitude, longitude, techs } = req.query;
  const techsArray = techs.split(",").map(tech => tech.trim());

  const devs = await Dev.find({
    techStack: {
      $in: techsArray
    },
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        $maxDistance: 10000
      }
    }
  });

  return res.json({ devs });
});

module.exports = routes;
