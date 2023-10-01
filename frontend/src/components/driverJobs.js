import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import { getCommissions } from "../actions/commission";
import DriverJobCard from "./driverJobCard";

function DriverJobs() {
  const [rides, setRides] = useState([]);

  const getdata = async () => {
    const data = await getCommissions();
    setRides(data);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <Grid container direction="column" spacing={3} justifyContent="center">
      <Grid container item direction="row" md={3} spacing={5}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{
              fontFamily: "Roboto,Helvetica,Arial,sans-serif",
              fontWeight: 500,
            }}
          >
            My Ride Notifications
          </Typography>
        </Grid>
      </Grid>
      <Grid container item direction="column" md={9} spacing={5}>
        {rides?.map((ride, index) => {
          return (
            <Grid item key={index}>
              <DriverJobCard commission={ride} set={getdata} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default withRouter(DriverJobs);
