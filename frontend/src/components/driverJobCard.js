import Button from "react-bootstrap/Button";
import * as React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import "./driverCard.css";
import dayjs from "dayjs";
import { updateCommission } from "../actions/commission";
import { updateDriver } from "../actions/driver";
import { updateVehicle } from "../actions/vehicle";

export default function DriverJobCard({ commission, set }) {
  return (
    <Paper
      elevation={2}
      style={{
        width: "100%",
        height: "24vh",
        padding: "2% 0",
        borderRadius: 20,
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
          xs={4}
          id="driver-details"
          style={{ paddingLeft: "3%" }}
        >
          <Grid item xs={4}>
            {commission.origin?.lat ? (
              <>
                <Typography variant="h9" component="b">
                  (
                  {`${commission.origin.lat
                    .toString()
                    .slice(0, 6)}, ${commission.origin.lng
                    .toString()
                    .slice(0, 6)}`}
                  )
                </Typography>
              </>
            ) : (
              <Typography variant="h9" component="b">
                {commission.origin}
              </Typography>
            )}
            {commission.type !== "hire" && (
              <>
                {commission.destination?.lat ? (
                  <>
                    <Typography variant="h9" component="b">
                      {" to "}
                      (
                      {`${commission.destination.lat
                        .toString()
                        .slice(0, 6)}, ${commission.destination.lng
                        .toString()
                        .slice(0, 6)}`}
                      )
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h9" component="b">
                    {" to " + commission.destination}
                  </Typography>
                )}
              </>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h10">
              <b>From: </b>
              <br /> {dayjs(commission.start_date).toString()}
            </Typography>
            <Typography variant="h10">
              <b>To: </b>
              <br />
              {dayjs(commission.end_date).toString()}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={4}
          id="driver-details"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Typography variant="p">Status: </Typography>
            <Typography variant="p">{commission.status}</Typography>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {/* {driver.experience} */}
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {commission.type === "hire" &&
              `${commission.vehicle.brand} ${commission.vehicle.model}`}
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {/* {driver.experience} */}
            {/* {commission.distance} */}
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={4}
          id="driver-book"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Button
            variant="dark"
            disabled={
              commission.status === "Accepted" ||
              commission.status === "Declined" ||
              commission.status === "Paid"
            }
            className="bookbutton"
            onClick={() => {
              updateCommission(commission._id, {
                status: "Accepted",
              });
              if (commission.type === "hire") {
                updateDriver(localStorage.getItem("id"), {
                  vehicleId: commission.vehicle._id.$oid,
                });
                updateVehicle(commission.vehicle._id.$oid, {
                  driverId: localStorage.getItem("id"),
                  hireStatus: "Accepted",
                });
                alert("You have been hired!");
              }
              set();
            }}
          >
            Accept Job
          </Button>
          <Button
            variant="dark"
            className="bookbutton"
            disabled={
              commission.status === "Accepted" ||
              commission.status === "Declined" ||
              commission.status === "Paid"
            }
            onClick={() => {
              updateCommission(commission._id, {
                status: "Declined",
              });
              if (commission.type === "hire") {
                updateVehicle(commission.vehicle._id.$oid, {
                  hireStatus: "Declined",
                });
              }
              set();
            }}
          >
            Deny Job
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
