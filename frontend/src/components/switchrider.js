import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

function switchRider() {
 
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
            here if driver has already registered, then we have to redirect the driver to a rider dashboard too!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default switchRider;
