import React from "react";
import "./devItem.css";

export const DevItem = ({ dev }) => {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatarUrl} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techStack.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.githubUsername}`}>Github Profile</a>
    </li>
  );
};
