import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import "./devForm.css";

export const DevForm = ({ onSubmit }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [techStack, setTechStack] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await api.post("/devs", {
      githubUsername,
      techStack,
      latitude,
      longitude
    });

    if (response.data.isError) {
      setErrors(response.data.error);
      return;
    }

    await onSubmit(response.data);

    // clean up
    setGithubUsername("");
    setLatitude("");
    setLongitude("");
    setTechStack("");
    setErrors([]);
  };

  return (
    <div className="devForm">
      <strong>Sign up</strong>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="githubUsername">Github Username</label>
          <input
            id="githubUsername"
            name="githubUsername"
            required
            onChange={e => setGithubUsername(e.target.value)}
            value={githubUsername}
          />
        </div>
        <div className="input-block">
          <label htmlFor="techStack">Tech Stack</label>
          <input
            id="techStack"
            name="techStack"
            required
            onChange={e => setTechStack(e.target.value)}
            value={techStack}
          />
        </div>
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              required
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              required
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
        {(errors && <p className="error">{errors}</p>) || ""}
      </form>
    </div>
  );
};
