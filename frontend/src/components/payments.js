import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { getPayments } from "../actions/payment";
import PaymentCard from "./paymentCard";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  const getdata = async () => {
    const data = await getPayments();
    setPayments(data);
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
            Payments
          </Typography>
        </Grid>
      </Grid>
      <Grid container item direction="column" md={9} spacing={5}>
        {payments?.map((payment, index) => {
          return (
            <Grid item key={index}>
              <PaymentCard payment={payment} set={getdata} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default Payments;
