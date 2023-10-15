import React from 'react';
import { Grid, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';

// state = localStorage.getItem("profile")

const index = 0;
function SwitchingtoNewDriver() {
  const history = useHistory();
    history.push('/regAsDriver');
}

function SwitchingtoDriverDashboard(){
  // loginAsRider();
  const history = useHistory();
    history.push('/driver');
}

function switchDriver() {
  return (
    index === 0
    ? SwitchingtoNewDriver()
    : SwitchingtoDriverDashboard(),

    <Grid container item direction="row" md={3} spacing={5}>
    <Grid item xs={12}>
      <Typography
        variant="h5"
        style={{
          fontFamily: "Roboto,Helvetica,Arial,sans-serif",
          fontWeight: 500,
        }}
      >
      </Typography>
    </Grid>
  </Grid>
  );
}

export default switchDriver;
