import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, Divider, Paper } from "@mui/material";
import Map from "../../components/map";
import { ChakraProvider, theme } from "@chakra-ui/react";
import BookingForm from "../../components/mapForm";
import { withRouter } from "react-router-dom";
import "./board.css";
import VehicleCards from "../../components/vehicleCards";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: "3" }}>{children}</Box>}
    </div>
  );
}

function Dash() {
  const [dest, setDest] = useState({
    origin: null,
    destination: null,
    distance: 0,
    origin_obj: null,
    dest_obj: null,
  });
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setDest({
      origin: null,
      destination: null,
      distance: 0,
      origin_obj: null,
      dest_obj: null,
    });
  };

  function a11yProps(index) {
    return {
      // id: `simple-tab-${index}`,
      // "aria-controls": `simple-tabpanel-${index}`,
      style: {
        width: "33%",
        color: index === value ? "#172B4D" : "#777",
        borderBottom: index === value ? "2px solid #172B4D" : "",
        fontSize: "18px",
      },
    };
  }

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
          <Tab label="Hire" {...a11yProps(0)} />
          <Tab label="Ride" {...a11yProps(1)} />
          <Tab label="Rent" {...a11yProps(2)} />
          <Tab label="Vehicle" {...a11yProps(3)} />
        </Tabs>
        <Divider />
      </Grid>
      <Grid item md={9}>

        {/* Hire Page */}
        <TabPanel value={value} index={0}>
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


        {/* Ride Page */}
        <TabPanel value={value} index={1}>
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
              <BookingForm type="Book" loaded={loaded} places={dest} setPlaces={setDest} />
            </Grid>
          </Grid>
        </TabPanel>



        {/* Rent Page */}
        <TabPanel value={value} index={2}>
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
                type="Rent"
                loaded={loaded}
                places={dest}
                setPlaces={setDest}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Vehicle Page */}
        <TabPanel value={value} index={3}>
          <VehicleCards />
        </TabPanel>
      </Grid>
    </Grid>
  );
}

export default withRouter(Dash);
