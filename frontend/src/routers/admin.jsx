import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MiniDrawer from "../components/sidebar";
import AddDriver from "../pages/admin/addDriver";
import AddNewDriver from "../pages/regAsNewDriver";

const Routes = ({ history }) => {
  let { path } = useRouteMatch();
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    history.push("/");
  }

  return (
    <MiniDrawer hist={history}>
      <Switch>
        <Route path={`${path}/`} component={AddDriver} />
        <Route path={`${path}/`} component={AddNewDriver} />

      </Switch>
    </MiniDrawer>
  );
};

export { Routes };
