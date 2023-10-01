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

export default function PaymentCard({ payment, set }) {
  console.log(payment);
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
          xs={5}
          id="driver-details"
          style={{ paddingLeft: "3%" }}
        >
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Order ID: {payment.order_id}</Typography>
            {payment.payment_id && (
              <Typography variant="subtitle1">
                Payment ID: {payment.payment_id}
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Driver: {payment.driver.name}
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          item
          xs={4}
          id="driver-details"
          style={{ paddingLeft: "1%" }}
        >
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              {payment.commission.type === "ride"
                ? `${payment.commission.origin} to ${payment.commission.destination}`
                : `${payment.commission.origin}`}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {payment.commission.type !== "hire"
              ? `${payment.commission.distance} km`
              : `Hourly Rate: Rs. ${payment.driver.priceperhour}`}
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
            xs={5}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Amount: Rs.{payment.commission.price}
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Payment:
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="dark" className="bookbutton">
              {payment.status}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
