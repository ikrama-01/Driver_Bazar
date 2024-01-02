import Button from "react-bootstrap/Button";
import * as React from "react";
import { Paper, Grid, Typography, Avatar, Rating } from "@mui/material";
import "./driverCard.css";
import { baseurl } from "../apis/url";
import axios from "axios";
import { updateCommission } from "../actions/commission";
import { useSelector } from "react-redux";
import SelectInput from "@mui/material/Select/SelectInput";
import { getCommissions } from "../actions/commission";
import './bookedRideCard.css';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function BookedRideCard({ commission, set }) {
  const user = useSelector((state) => state.auth);
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    axios
      .post(`${baseurl}/payment/create-order/`, {
        amount: commission.price,
      })
      .then(function (response) {
        const options = {
          // key: "rzp_test_4LrpORafEOFNKL",
          key: "rzp_test_Ji0esyBmxAq54k",
          order_id: response.data.order_id,
          name: "Zwoop",
          description: "Ride payment",
          prefill: {
            email: user.email,
          },
          handler: function (resp) {
            console.log(resp);
            const data = {
              commission_id: commission._id,
              amount: commission.price,
              ...resp,
            };
            axios
              .post(`${baseurl}/payment/verify/`, data)
              .then(async (res) => {
                set();
                alert("Payment Successful");
              })
              .catch((error) => alert("Payment Unsuccessful"));
          },
        };
        const razor_window = new window.Razorpay(options);
        razor_window.open();
      })
      .catch(function (error) {
        alert("Something went wrong..");
      });
  }

  return (
    <Paper
      elevation={2}
      style={{
        overflow:"hidden",
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
          item
          xs={4}
          md={3}
          sm={2}
          id="driver-photo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
           <Avatar
        sx={{
          width: "15vh",
          height: "15vh", 
        }}
      />
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={3}
          id="driver-details"
          style={{ paddingLeft: "3%" }}
        >
          <Grid
            item
            xs={5}
            id="driver-details"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" id="text-css">
              Driver: {commission.driver.name + " "}
            </Typography>
            <Typography variant="subtitle2" id="text-css">
              {commission.driver.vehicle?.owner
                ? ` Owner: ${commission.driver.vehicle?.owner?.name}`
                : ""}
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
            Vehicle ID:{" "}
            {commission.vehicle
              ? commission.vehicle.plate
              : commission.vehicleId || commission.driver.vehicle?.plate}
            {/* {"experience"} */}
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Payment: {commission.payment}
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={3}
          id="driver-details"
          style={{ paddingLeft: "1%" }}
        >
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {commission.origin?.lat ? (
              <>
                <Typography variant="h9">
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
              <Typography variant="h9">{commission.origin}</Typography>
            )}
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
            {commission.type !== "hire" && (
              <>
                {`- `}
                {commission.destination?.lat ? (
                  <Typography variant="h9">
                    (
                    {`${commission.destination.lat
                      .toString()
                      .slice(0, 6)}, ${commission.destination.lng
                      .toString()
                      .slice(0, 6)}`}
                    )
                  </Typography>
                ) : (
                  <Typography variant="h9">{commission.destination}</Typography>
                )}
              </>
            )}
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          ></Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {commission.type !== "hire"
              ? `${commission.distance} km`
              : `Hourly Rate: Rs. ${commission.driver.priceperhour}`}
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={2}
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
            Status: {commission.status}
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Total: Rs. {commission.price} + Taxes
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
              className='bookbutton'
              disabled={
                localStorage.getItem("role") === "rider"
                  ? commission.status === "Paid" ||
                    commission.status === "Cancelled" ||
                    commission.status === "Declined"
                  : commission.status === "Paid" ||
                    commission.status === "Cancelled" ||
                    commission.status === "Declined" ||
                    commission.status === "Accepted"
              }
              onClick={async () => {
                if (commission.status === "Accepted") {
                  return displayRazorpay();
                } else {
                  updateCommission(commission._id, {
                    status: "Cancelled",
                  });
                  set();
                }
              }}
            >
              {commission.status !== "Accepted"
                ? commission.status === "Paid"
                  ? "Payment Done"
                  : "Cancel"
                : localStorage.getItem("role") === "rider"
                ? "Pay for ride"
                : "Accepted"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
