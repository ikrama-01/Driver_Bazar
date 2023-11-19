import "./App.css";
import * as React from "react";
import { Routes as RiderRoutes } from "./routers/rider";
import { Routes as DriverRoutes } from "./routers/driver";
import { Routes as AdminRoutes } from "./routers/admin";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import MyForm from "./pages/regAsDriver";
import AddDriver from "./pages/regAsDriver";
import AddNewDriver from "./pages/regAsNewDriver";
const libraries = ["drawing", "places", "visualization"];

function App() {
  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyCEJ2TwETGcSfkeYlNTfipfrmTaczDgn28"
      language="en"
      region="EN"
      version="weekly"
      libraries={libraries}
    >
      <Router hashType="noslash">
        <Switch>
          <Route path="/rider" component={RiderRoutes} />
          <Route path="/driver" component={DriverRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/regAsDriver" component={AddDriver} />
          {/* <Route path="/regAsNewDriver" component={AddNewDriver} /> */}
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </LoadScript>
  );
}

export default App;

//I EDITED THIS CODE AS WELL