import "./App.css";
import * as React from "react";
import { Routes as RiderRoutes } from "./routers/rider";
import { Routes as DriverRoutes } from "./routers/driver";
import { Routes as AdminRoutes } from "./routers/admin";
import { Routes as OwnerRoutes } from "./routers/owner";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import MyForm from "./pages/regAsDriver";
import AddOwner from "./pages/regAsOwner";
import AddDriver from "./pages/regAsDriver";
import AddNewDriver from "./pages/regAsNewDriver";
const libraries = ["drawing", "places", "visualization"];

function App() {
  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyA6gr7fy0-jWmpJ9wPrK0W6JIeb_yzN5uI"
      language="en"
      region="EN"
      version="weekly"
      libraries={libraries}
    >
      <Router hashType="noslash">
        <Switch>
          <Route path="/rider" component={RiderRoutes} />
          <Route path="/driver" component={DriverRoutes} />
          <Route path="/owner" component={OwnerRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/regAsDriver" component={AddDriver} />
          <Route path="/regAsNewDriver" component={AddNewDriver} />
          <Route path="/regAsOwner" component={AddOwner} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </LoadScript>
  );
}

export default App;

//I EDITED THIS CODE AS WELL