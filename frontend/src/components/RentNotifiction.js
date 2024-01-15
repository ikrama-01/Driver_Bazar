import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import { getCommissions } from "../actions/commission";
import RentCard from "./RentCard";

function Rent() {
  const [rentInfos, setRentInfos] = useState([]);

  function getRentInfo() {
    fetch('https://driverbazar-543a6-default-rtdb.asia-southeast1.firebasedatabase.app/Rent_Car.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        const rentInfoArray = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const entry = data[key];
            const rentInfo = {
              car_name: entry.Car_Name,
              model_number: entry.Model_Number,
              price: entry.Price,
              status: entry.Status,
              ownerID: entry.ownerID,
              renterID: entry.renterID,
              location: entry.Location,
              key: key,
            };
            rentInfoArray.push(rentInfo);
          }
        }
        const filteredRentInfoArray = rentInfoArray.filter((rentInfo) => {
          return rentInfo.ownerID === localStorage.getItem("id");
        });
        setRentInfos(filteredRentInfoArray);
      })
      .catch(error => {
        console.error('Error fetching location data from Firebase:', error.message);
      });
  }


  useEffect(() => {
    getRentInfo();
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
            My Rent Notifications
          </Typography>
        </Grid>
      </Grid>
      <Grid container item direction="column" md={9} spacing={5}>
        {rentInfos?.map((rentInfo, index) => {
          return (
            <Grid item key={index}>
              <RentCard rentInfo={rentInfo} set={getRentInfo} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default withRouter(Rent);
