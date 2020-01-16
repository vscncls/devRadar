import React, { useEffect, useState } from "react";
import "./global.css";
import "./App.css";
// import "./Sidebar.css";
import "./Main.css";
import { api } from "./services/api";
import { DevItem } from "./components/devItem";
import { DevForm } from "./components/devForm";

export default function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    const loadDevs = async () => {
      const response = await api.get("/devs");
      setDevs(response.data);
    };
    loadDevs();
  }, []);

  const onSubmit = async data => {
    setDevs([...devs, data.dev]);
  };

  return (
    <div id="app">
      <aside>
        <DevForm onSubmit={onSubmit} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}
