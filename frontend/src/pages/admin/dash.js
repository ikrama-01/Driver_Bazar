import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { login, signup } from "../actions/user";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Admin() {
  return (
    <Grid container direction="column" spacing={3} justifyContent="center">
      <Grid
        container
        item
        direction="row"
        md={3}
        spacing={5}
        justifyContent="center"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          style={{
            width: "85%",
            padding: "2% 6% 0 6%",
            borderBottom: "1px solid #282c34",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          indicatorColor="#172B4D"
        >
          <Tab label="Ride" {...a11yProps(0)} />
          <Tab label="Hire" {...a11yProps(1)} />
          <Tab label="Vehicle" {...a11yProps(2)} />
        </Tabs>
        <Divider />
      </Grid>
      <Grid item md={9}>
        {/* Ride Page */}
        <TabPanel value={value} index={0}>
          <Grid container item direction="row" spacing={5}>
            <Grid item md={8}>
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
                elevation={3}
              >
                <ChakraProvider theme={theme}>
                  <Map callback={setLoaded} places={dest} setPlaces={setDest} />
                </ChakraProvider>
              </Paper>
            </Grid>
            <Grid item md={4}>
              <BookingForm loaded={loaded} places={dest} setPlaces={setDest} />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Hire Page */}
        <TabPanel value={value} index={1}>
          <Grid container item direction="row" spacing={5}>
            <Grid item md={8}>
              <Paper
                sx={{
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
                elevation={3}
              >
                <ChakraProvider theme={theme}>
                  <Map callback={setLoaded} places={dest} setPlaces={setDest} />
                </ChakraProvider>
              </Paper>
            </Grid>
            <Grid item md={4}>
              <BookingForm
                type="Hire"
                loaded={loaded}
                places={dest}
                setPlaces={setDest}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Vehicle Page */}
        <TabPanel value={value} index={2}>
          <VehicleCards />
        </TabPanel>
      </Grid>
    </Grid>
  );
}
