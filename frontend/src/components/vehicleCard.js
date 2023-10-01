import Button from "react-bootstrap/Button";
import * as React from "react";
import { Paper, Grid, Typography, Avatar, Rating } from "@mui/material";

export default function VehicleCards({ vehicle, selectVehicle, close }) {
  return (
    <Paper
      elevation={2}
      style={{
        width: "100%",
        height: "24vh",
        padding: "2% 0",
        borderRadius: 12,
        backgroundColor: "whitesmoke",
      }}
    >
      <Grid
        container
        direction="row"
        style={{
          height: "100%",
        }}
      >
        <Grid
          container
          direction="column"
          item
          xs={6}
          id="driver-details"
          style={{ paddingLeft: "3%" }}
        >
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="b">
              {vehicle.brand} {vehicle.model}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {vehicle.plate}
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={6}
          id="driver-book"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", 
          }}
        >
          {/* <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Rating defaultValue={driver.rating} precision={0.5} readOnly />
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Total: $ + Tax Applicable
          </Grid> */}
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="dark"
              className="bookbutton"
              onClick={() => {
                selectVehicle(vehicle);
                close();
              }}
            >
              Select
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
