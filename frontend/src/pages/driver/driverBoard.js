import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, Divider, Paper } from "@mui/material";
import Map from "../../components/map";
import { ChakraProvider, theme } from "@chakra-ui/react";
import BookingForm from "../../components/mapForm";
import { withRouter } from "react-router-dom";
import DriverJobs from "../../components/driverJobs";
import VehicleCards from "../../components/vehicleCards";
import Rent from "../../components/RentNotifiction";
import "./driverBoard.css";

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

function DriverBoard() {
  const [dest, setDest] = useState({
    origin: null,
    destination: null,
  });
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      // id: `simple-tab-${index}`,
      // "aria-controls": `simple-tabpanel-${index}`,
      style: {
        width: "100%",
        color: index === value ? "#172B4D" : "#777",
        borderBottom: index === value ? "2px solid #172B4D" : "",
        fontSize: "18px",
      },
    };
  }
  
  const [latitude, setLatitude] = useState("");
const [longitude, setLongitude] = useState("");
const [id, setId] = useState();
const [key, setKey] = useState(null);

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        const currentId = localStorage.getItem('id'); 

        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
        setId(currentId);

        console.log('User Location:');
        console.log(`Latitude: ${currentLatitude}`);
        console.log(`Longitude: ${currentLongitude}`);
        console.log("Message being sent");

        if (currentLatitude && currentLongitude) {
          fetch(`https://driverbazar-543a6-default-rtdb.asia-southeast1.firebasedatabase.app/location/${currentId}.json`, {
            method: 'PUT', // Use PUT to update or create a new entry with the specified ID
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude: currentLatitude, longitude: currentLongitude }),
          })
          
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error('Error sending location data to Firebase:', error.message);
            });
        }
      },
      (error) => {
        console.error('Error getting user location:', error.message);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};


  

  useEffect(() => {
    getUserLocation();  
  }, []);

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
            width: "62%",
            padding: "2% 6% 0 6%",
            borderBottom: "1px solid #282c34",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          indicatorColor="#172B4D"
        >
          <Tab label="Vehicle" {...a11yProps(0)} />
          <Tab label="Ride Notifications" {...a11yProps(1)} />
          <Tab label="Rent Notifications" {...a11yProps(2)} />
        </Tabs>
        <Divider />
      </Grid>
      <Grid item md={9}>

        {/* Vehicle Page */}
        <TabPanel value={value} index={0}>
          <VehicleCards />
        </TabPanel>

        {/* Ride notifications Page */}
        <TabPanel value={value} index={1}>
          <Grid container item direction="row" spacing={5}>
            <Grid item md={12}>
              <DriverJobs />
            </Grid>
          </Grid>
        </TabPanel>

             {/* Rent notifications Page */}
             <TabPanel value={value} index={2}>
          <Grid container item direction="row" spacing={5}>
            <Grid item md={12}>
              <Rent />
            </Grid>
          </Grid>
        </TabPanel>
      </Grid>
    </Grid>
  );
}

export default withRouter(DriverBoard);