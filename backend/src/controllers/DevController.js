const { Router } = require("express");
const axios = require("axios");
const Dev = require("../models/Dev");

const routes = Router();

routes.post("/", async (req, res) => {
  const { github_username, techStack, latitude, longitude } = req.body;

  const dev = await Dev.findOne({ github_username });

  if (dev) {
    return res.json({ isError: true, error: "User already exists!" });
  }

  const response = await axios.get(
    `https://api.github.com/users/${github_username}`
  );

  const { name = login, avatar_url, bio } = response.data;

  const location = {
    type: "Point",
    coordinates: [longitude, latitude]
  };

  const devDocument = await Dev.create({
    github_username,
    techStack,
    name,
    avatar_url,
    bio,
    location
  });

  return res.json({ dev: devDocument, isError: false });
});

routes.get("/", async (req, res) => {
  const devs = await Dev.find();
  return res.json(devs);
});

module.exports = routes;
