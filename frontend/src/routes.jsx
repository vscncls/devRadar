import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./routes/home";
import "./global.css";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
