import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MiniDrawer from "../components/sidebar";
import BookedRides from "../components/bookedRides";
import DriverBoard from "../pages/driver/driverBoard";
import Payments from "../components/payments";
import RoleSwitchComponent from "../components/switch";

const Routes = ({ history }) => {
  let { path } = useRouteMatch();
  // const role = localStorage.getItem("role");

  // if (role !== "driver") {
  //   history.push("/");
  // }
  const id = localStorage.getItem("id");
  // console.log(id);

  if (id === "") {
    history.push("/");
  }

  return (
    <MiniDrawer hist={history}>
      <Switch>
        <Route path={path} exact component={DriverBoard} />
        <Route path={`${path}/my-rides`} exact component={BookedRides} />
        <Route path={`${path}/payments`} exact component={Payments} />
        <Route path={`${path}/switch`} exact component={RoleSwitchComponent} />
      </Switch>
    </MiniDrawer>
  );
};

export { Routes };
