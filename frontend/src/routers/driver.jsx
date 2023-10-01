import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MiniDrawer from "../components/sidebar";
import BookedRides from "../components/bookedRides";
import DriverBoard from "../pages/driver/driverBoard";
import Payments from "../components/payments";
import switchRider from "../components/switchrider";

const Routes = ({ history }) => {
  let { path } = useRouteMatch();
  const role = localStorage.getItem("role");

  if (role !== "driver") {
    history.push("/");
  }

  return (
    <MiniDrawer hist={history}>
      <Switch>
        <Route path={path} exact component={DriverBoard} />
        <Route path={`${path}/my-rides`} exact component={BookedRides} />
        <Route path={`${path}/payments`} exact component={Payments} />
        <Route path={`${path}/switchrider`} exact component={switchRider} />
      </Switch>
    </MiniDrawer>
  );
};

export { Routes };
