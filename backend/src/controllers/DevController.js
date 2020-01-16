const { Router } = require("express");
const axios = require("axios");
const Dev = require("../models/Dev");

const routes = Router();

routes.post("/", async (req, res) => {
  const { githubUsername, techStack, latitude, longitude } = req.body;

  const dev = await Dev.findOne({ githubUsername });

  if (dev) {
    return res.json({ isError: true, error: "User already exists!" });
  }

  const techStackArray = techStack.split(",").map(tech => tech.trim());

  let response;
  try {
    response = await axios.get(
      `https://api.github.com/users/${githubUsername}`
    );
  } catch (error) {
    return res.json({ isError: true, error: error.response.data.message });
  }

  const { name, login, avatar_url, bio } = response.data;

  const location = {
    type: "Point",
    coordinates: [longitude, latitude]
  };

  const devDocument = await Dev.create({
    githubUsername,
    techStack: techStackArray,
    name: name || login,
    avatarUrl: avatar_url,
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
