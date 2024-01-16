import Button from "react-bootstrap/Button";
import * as React from "react";
import { useEffect, useState } from "react";
import { Paper, Grid, Typography, unstable_composeClasses } from "@mui/material";
import "./driverCard.css";

export default function RentCard({ rentInfo, set }) {
    function updateRentInfo(key, newData) {
        fetch(`https://driverbazar-543a6-default-rtdb.asia-southeast1.firebasedatabase.app/Rent_Car/${key}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error sending data to firebase:', error.message);
            });
    }
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
                        <Typography variant="h9" component="b">
                            {`${rentInfo.car_name} ${rentInfo.model_number} `}
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
                        <Typography variant="h10">
                            <b>Location</b>
                            <br /> {rentInfo.location}
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
                        <Typography variant="h10">
                            <b>Renter ID</b>
                            <br /> {rentInfo.renterID}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="column"
                    item
                    xs={4}
                    id="driver-details"
                    style={{ paddingLeft: "3%" }}
                >
                    <Grid item xs={4}>
                        <Typography variant="h10">
                            <b>Status</b>
                            <br />
                            {`${rentInfo.status}`}
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
                        <Typography variant="h10">
                            <b>Rent</b>
                            <br /> {`${rentInfo.price}$`}
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
                        <Typography variant="h10">
                            <b>Owner ID</b>
                            <br /> {rentInfo.ownerID}
                        </Typography>
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
                            rentInfo.status === "Accepted by owner" ||
                            rentInfo.status === "Declined by owner" ||
                            rentInfo.status === "Paid"
                        }
                        className="bookbutton"
                        onClick={() => {
                            const key = rentInfo.key;
                            const newData = {
                                Status: "Accepted by owner",
                            };
                            updateRentInfo(key, newData);
                            set();
                        }}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="dark"
                        className="bookbutton"
                        disabled={
                            rentInfo.status === "Accepted by owner" ||
                            rentInfo.status === "Declined by owner" ||
                            rentInfo.status === "Paid"
                        }
                        onClick={() => {
                            const key = rentInfo.key;
                            const newData = {
                                Status: "Declined by owner",
                            };
                            updateRentInfo(key, newData);
                            set();
                        }}
                    >
                        Deny
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
