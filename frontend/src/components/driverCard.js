import Button from "react-bootstrap/Button";
import * as React from "react";
import { Paper, Grid, Typography, Avatar, Rating } from "@mui/material";
import "./driverCard.css";

export default function DriverCards({
  driver,
  owner,
  hireDriver,
  close,
  distance,
}) {
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
          item
          xs={3}
          id="driver-photo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ width: "15vh", height: "15vh" }} />
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={4}
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
              {driver.name}
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
            {/* experienced? */}
            {driver.experience}
          </Grid>
          {owner ? (
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {"Drives a " +
                driver.vehicle?.brand +
                " " +
                driver.vehicle?.model}
            </Grid>
          ) : driver.vehicleId ? (
            <>
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {"Rented a " +
                  driver.vehicle?.brand +
                  " " +
                  driver.vehicle?.model}
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {"from " + driver.vehicle?.owner?.name}
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={5}
          id="driver-book"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
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
            {distance
              ? `Total: Rs. ${(driver.priceperkm * distance) / 1000} + Tax`
              : `Price per km.: Rs. ${driver.priceperkm}`}
          </Grid>
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
                hireDriver(driver);
                close();
              }}
            >
              Hire
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
