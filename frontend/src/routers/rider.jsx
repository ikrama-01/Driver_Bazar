import React from "react";
import Dash from "../pages/rider/board";
import BookedRides from "../components/bookedRides";
import Payments from "../components/payments";
// import switchDriver from "../components/switchdriver";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MiniDrawer from "../components/sidebar";
import RoleSwitchComponent from "../components/switch";

const Routes = ({ history }) => {
  let { path } = useRouteMatch();
  // const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  // console.log(id);

  if (id === "") {
    history.push("/");
  }

  return (
    <MiniDrawer hist={history}>
      <Switch>
        <Route path={path} exact component={Dash} />
        <Route path={`${path}/my-rides`} exact component={BookedRides} />
        <Route path={`${path}/payments`} exact component={Payments} />
        <Route path={`${path}/switch`} exact component={RoleSwitchComponent} />
      </Switch>
    </MiniDrawer>
  );
};

export { Routes };
