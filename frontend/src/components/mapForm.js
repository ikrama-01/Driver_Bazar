import * as React from "react";
import {
  Paper,
  Grid,
  Typography,
  Divider,
  TextField,
  Box,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Autocomplete } from "@react-google-maps/api";
import DriverCards from "./driverCard";
import { getDrivers } from "../actions/driver";
import { createCommission } from "../actions/commission";
import { getVehicles, updateVehicle, getCommercialVehicles } from "../actions/vehicle"
import VehicleCards from "./vehicleCard";
import { useState, useEffect, useRef } from "react";
// import { Console } from "console";

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
      {value === index && (
        <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DriverModal = ({ type, open, handleClose, hireDriver, distance }) => {
  const [value, setValue] = React.useState(0);
  const [drivers, setDrivers] = React.useState([]);
  const [filteredDrivers, setFilteredDrivers] = React.useState([]);
  const [driverIds, setDriverIds] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await getCurrentLocation();
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      } catch (error) {
        console.error('Error getting user location:', error.message);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('https://driverbazar-543a6-default-rtdb.asia-southeast1.firebasedatabase.app/location.json');
        if (!response.ok) {
          throw new Error('Error fetching drivers');
        }

        const driversData = await response.json();
        console.log('driversData:', driversData);

        const filteredDrivers = filterDriversByDistance(driversData);
        setFilteredDrivers(filteredDrivers);
        const driverIds = filteredDrivers.map(driver => driver.id);
        console.log('filtered drivers:', filteredDrivers);
        // console.log(driverIds)
        fetchNearestDrivers(driverIds)
      } catch (error) {
        console.error('Error fetching drivers:', error.message);
      }

    };

    if (userLocation) {
      fetchDrivers();
    }
  }, [userLocation]);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const filterDriversByDistance = (driversData) => {
    const driversArray = Object.entries(driversData).map(([id, driver]) => ({
      id,
      lat: driver.latitude,
      lng: driver.longitude,
    }));

    const filteredDrivers = driversArray.filter((driver) => {
      if (userLocation) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          driver.lat,
          driver.lng
        );
        console.log('Distance:', distance);
        return distance < 5; // 5km radius for testing
      }
      return false;
    });

    return filteredDrivers;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };

  const fetchNearestDrivers = async (driverIds) => {
    try {
      console.log(driverIds);

      const response = await fetch('http://localhost:5000/findNearDriver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ driverIds }),
      });

      if (!response.ok) {
        throw new Error('Error fetching nearest drivers');
      }

      const data = await response.json();
      setDrivers(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching nearest drivers:', error.message);
    }
  };




  // const getDriverData = () => {
  //   getDrivers().then((meta) => {
  //     console.log(meta.data)
  //     setDrivers(meta.data);
  //   });
  // };


  // React.useEffect(() => {
  //   getDriverData();
  // }, []);




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: "70vw",
          height: "85vh",
          backgroundColor: "white",
          borderRadius: 5,
          padding: "1% 0 0 0",
        }}
      >
        <Typography variant="h5" style={{ width: "100%", textAlign: "center" }}>
          {type !== "Hire" ? "Book a ride" : "Hire a driver"}
        </Typography>
        {type !== "Hire" && type !== "Rent" ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Car Owner" {...a11yProps(0)} />
                <Tab label="Car Rented" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid
                container
                direction="row"
                spacing={2}
                justifyContent="center"
                style={{ overflowY: "auto", height: "63vh" }}
              >
                {drivers.map((driver, index) => {
                  if (!driver.rented && driver.vehicle) {
                    return (
                      <Grid item style={{ width: "80%" }} key={index}>
                        <DriverCards
                          driver={driver}
                          owner={true}
                          hireDriver={hireDriver}
                          close={handleClose}
                          distance={distance}
                        />
                      </Grid>
                    );
                  }
                  return <div key={index}></div>;
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid
                container
                direction="row"
                spacing={2}
                justifyContent="center"
                style={{ overflowY: "auto", height: "63vh" }}
              >
                {drivers.map((driver, index) => {
                  if (driver.rented) {
                    return (
                      <Grid item style={{ width: "80%" }} key={index}>
                        <DriverCards
                          driver={driver}
                          owner={false}
                          hireDriver={hireDriver}
                          close={handleClose}
                          distance={distance}
                        />
                      </Grid>
                    );
                  }
                  return <div key={index}></div>;
                })}
              </Grid>
            </TabPanel>
          </>
        ) : type === "Hire" ? (
          <>
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent="center"
              style={{ overflowY: "auto", height: "63vh" }}
            >
              {drivers.map((driver, index) => {
                if (!driver.vehicleId && !driver.preferredVehicleId) {
                  return (
                    <Grid item style={{ width: "80%" }} key={index}>
                      <DriverCards
                        driver={driver}
                        owner={false}
                        hireDriver={hireDriver}
                        close={handleClose}
                      />
                    </Grid>
                  );
                }
                return <div key={index}></div>;
              })}
            </Grid>
          </>
        ) : ""
        }
      </Paper>
    </Modal>
  );
};

const VehicleModal = ({ type, open, handleClose, selectVehicle }) => {
  const [value, setValue] = React.useState(0);
  const [vehicles, setVehicles] = React.useState([]);

  const getdata = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };
  const getcommercialdata = async () => {
    const data = await getCommercialVehicles();
    setVehicles(data);
  };

  // const getcommercialdata = async () => {
  //   const data = await getCommercialVehicles();
  //   setVehicles(data);
  //   console.log(localStorage);
  // };

  React.useEffect(() => {
    if (localStorage.getItem("role") === "owner" && type === "vehicle") {
      console.log(type);
      getcommercialdata();
    } else if (type === "Rent") {
      getcommercialdata();
    } else {
      getdata();
    }
  }, []);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: "70vw",
          height: "85vh",
          backgroundColor: "white",
          borderRadius: 5,
          padding: "1% 0 0 0",
        }}
      >
        <Typography variant="h5" style={{ width: "100%", textAlign: "center" }}>
          Select Vehicle
        </Typography>
        {type !== "Rent" ? (
          <Grid
            container
            direction="row"
            spacing={2}
            justifyContent="center"
            style={{ overflowY: "auto", height: "63vh" }}
          >
            {vehicles?.map((vehicle, index) => {
              return (
                !vehicle.freeasset &&
                !vehicle.driverId && (
                  <Grid item style={{ width: "80%" }} key={index}>
                    <VehicleCards
                      vehicle={vehicle}
                      selectVehicle={selectVehicle}
                      close={handleClose}
                    />
                  </Grid>
                )
              );
            })}
          </Grid>
        ) : ""}
        {type === "Rent" ? (
          <Grid
            container
            direction="row"
            spacing={2}
            justifyContent="center"
            style={{ overflowY: "auto", height: "63vh" }}
          >
            {vehicles?.map((vehicle, index) => {
              return (
                vehicle.Rent &&
                (
                  <Grid item style={{ width: "80%" }} key={index}>
                    <VehicleCards
                      vehicle={vehicle}
                      selectVehicle={selectVehicle}
                      close={handleClose}
                    />
                  </Grid>
                )
              );
            })}
          </Grid>
        ) : ""}

      </Paper>
    </Modal>
  );
};

function BookingForm({ type, loaded, places, setPlaces }) {
  const [hiredDriver, hireDriver] = React.useState({});
  const [selectedVehicle, selectVehicle] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [dates, setDates] = React.useState({
    start: dayjs().add(1, "M"),
    end: dayjs().add(2, "M"),
  });
  const [ac, setAC] = React.useState({
    fromac: null,
    toac: null,
  });

  const originRef = React.useRef(null);
  const destRef = React.useRef(null);
  const startRef = React.useRef(null);
  const endRef = React.useRef(null);
  const driverRef = React.useRef(null);
  const vehicleRef = React.useRef(null);

  const handleChange = (event) => {
    setPlaces((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const handleOpen = () => {
    if (type === "Hire") {
      if (places.origin === null || places.origin === "") {
        alert("Please select origin");
      } else {
        setOpen(true);
      }
    } else if (type === "Book")
      if (
        places.origin === null ||
        places.origin === "" ||
        places.destination === null ||
        places.destination === ""
      ) {
        alert("Please select origin and destination!");
      } else {
        setOpen(true);
      }
    if (type === "Rent") {
      if (places.origin === null || places.origin === "") {
        alert("Please select origin");
      } else if (selectedVehicle.model === "" || selectedVehicle.model === null) {
        alert("Please select vehicle");
      } else {
        fetch(`https://driverbazar-543a6-default-rtdb.asia-southeast1.firebasedatabase.app/Rent_Car.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            renterID: localStorage.getItem("id"),
            ownerID: selectedVehicle.ownerId,
            Location: originRef.current.value,
            Price: selectedVehicle.price,
            Status: "",
            Car_Name: selectedVehicle.brand + " " + selectedVehicle.model,
            Model_Number: selectedVehicle.plate,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log("data");
            console.log(data);
          })
          .catch(error => {
            console.error('Error sending data to firebase:', error.message);
          });
      }
    }
  };
  const handleClose = () => setOpen(false);

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleSubmit = (type) => {
    if (type !== "Hire" && type !== "Rent") {
      if (places.origin === null) {
        alert("Please select a starting point!");
      } else if (places.destination === null) {
        alert("Please select an end point!");
      } else if (dates.start.diff(dates.end) >= 0) {
        alert("Please select appropriate start and end dates!");
      } else if (!hiredDriver) {
        alert("Please select a driver!");
      } else {
        createCommission({
          destination: places.destination,
          origin: places.origin,
          distance: places.distance / 1000,
          price: (places.distance * hiredDriver.priceperkm) / 1000,
          driverId: Object.values(hiredDriver._id)[0],
          start: dates.start,
          end: dates.end,
          passenger: localStorage.getItem("id"),
          type: "ride",
        });
        alert("Ride has been booked!");
        setPlaces({ origin: null, destination: null });
        setDates({
          start: dayjs().add(1, "M"),
          end: dayjs().add(2, "M"),
        });
        hireDriver({});
      }
    } else {
      if (places.origin === null) {
        alert("Please select a starting point!");
      } else if (dates.start.diff(dates.end) >= 0) {
        alert("Please select appropriate start and end dates!");
      } else if (!hiredDriver) {
        alert("Please select a driver!");
      } else if (!selectedVehicle) {
        alert("Please select a vehicle!");
      } else {
        setPlaces({ origin: null, destination: null });
        setDates({
          start: dayjs().add(1, "M"),
          end: dayjs().add(2, "M"),
        });
        createCommission({
          origin: places.origin,
          driverId: hiredDriver._id.$oid,
          start: dates.start,
          end: dates.end,
          price: dayjs(dates.end).diff(dates.start, 'h') * hiredDriver.priceperhour,
          vehicle: selectedVehicle._id,
          type: "hire",
        });
        updateVehicle(selectedVehicle._id, { hireStatus: "Pending" });
        alert("Hire Notification Sent!");
        hireDriver({});
        selectVehicle({});
      }
    }
    // if (type === "Rent") {
    //   if (places.origin === null || places.origin === "") {
    //     alert("Please select origin");
    //   } else if (selectedVehicle.model === "" || selectedVehicle.model === null) {
    //     alert("Please select vehicle");
    //   } else {
    //     fetch('https://driverbazar-543a6-default-rtdb.asia-southeast1.firebasedatabase.app/Rent_Car.json', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         renterID: localStorage.getItem("id"),
    //         ownerID: selectedVehicle.ownerId,
    //         Location: selectedVehicle.Location,
    //         Price: selectedVehicle.price,
    //         Status: "True",
    //         Car_Name: selectedVehicle.brand + selectedVehicle.model,
    //         Model_Number: selectedVehicle.plate,
    //       }),
    //     })
    //       .then(response => response.json())
    //       .then(data => {
    //         console.log("data");
    //         console.log(data);
    //       })
    //       .catch(error => {
    //         console.error('Error sending data to firebase:', error.message);
    //       });
    //   }
    // }
  };

  return (
    <Paper
      elevation={3}
      style={{
        paddingTop: "3%",
        height: "100%",
        backgroundColor: "whitesmoke",
        borderRadius: "18px",
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item style={{ width: "90%" }}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            {type !== "Hire" && type !== "Rent" ? "Book a ride" : type === "Hire" ? "Hire a Driver" : "Rent a vehicle"}
            <Divider sx={{ lineWeight: "2px" }} />
          </Typography>
        </Grid>
        <Grid item style={{ width: "90%" }}>
          {loaded && (
            <Autocomplete
              onLoad={(e) =>
                setAC((prev) => {
                  return { ...prev, fromac: e };
                })
              }
              onPlaceChanged={() => {
                setPlaces((prev) => {
                  return {
                    ...prev,
                    origin: ac.fromac.getPlace().name,
                    origin_obj: ac.fromac.getPlace(),
                  };
                });
              }}
            >
              <TextField
                id="outlined-name"
                label="From"
                name="origin"
                value={places?.origin || ""}
                onChange={handleChange}
                style={{ width: "100%", color: "#172B4D" }}
                inputRef={originRef}
              />
            </Autocomplete>
          )}
        </Grid>
        {type !== "Hire" && type !== "Rent" && (
          <Grid item style={{ width: "90%" }}>
            {loaded && (
              <Autocomplete
                onLoad={(e) =>
                  setAC((prev) => {
                    return { ...prev, toac: e };
                  })
                }
                onPlaceChanged={() => {
                  setPlaces((prev) => {
                    return {
                      ...prev,
                      destination: ac.toac.getPlace().name,
                      dest_obj: ac.toac.getPlace(),
                    };
                  });
                }}
              >
                <TextField
                  id="outlined-uncontrolled"
                  label="To"
                  name="destination"
                  value={places?.destination || ""}
                  onChange={handleChange}
                  style={{ width: "100%", color: "#172B4D" }}
                  ref={destRef}
                />
              </Autocomplete>
            )}
          </Grid>
        )}
        {type !== "Hire" ? (
          <>
            <Grid item style={{ width: "90%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  id="date-time"
                  label="Start Date & Time"
                  minDate={dayjs().add(0, "D")}
                  maxDateTime={dayjs().add(6, "M")}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      style={{ width: "100%", color: "#172B4D" }}
                      ref={startRef}
                    />
                  )}
                  value={dates.start}
                  onChange={(newValue) => {
                    setDates((prev) => {
                      return { ...prev, start: newValue };
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item style={{ width: "90%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  id="date-time"
                  label="End Date & Time"
                  minDateTime={dates.start.add(0, "D")}
                  maxDateTime={dates.start.add(6, "M")}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      style={{ width: "100%", color: "#172B4D" }}
                      ref={endRef}
                    />
                  )}
                  value={dates.end}
                  onChange={(newValue) => {
                    setDates((prev) => {
                      return { ...prev, end: newValue };
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </>
        ) : (
          <>
            <Grid item style={{ width: "90%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="date"
                  label="Start Date"
                  minDate={dayjs().add(0, "D")}
                  maxDateTime={dayjs().add(6, "M")}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      style={{ width: "100%", color: "#172B4D" }}
                      ref={startRef}
                    />
                  )}
                  value={dates.start}
                  onChange={(newValue) => {
                    setDates((prev) => {
                      return { ...prev, start: newValue };
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item style={{ width: "90%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="date"
                  label="End Date"
                  minDateTime={dates.start.add(0, "D")}
                  maxDateTime={dates.start.add(6, "M")}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      style={{ width: "100%", color: "#172B4D" }}
                      ref={endRef}
                    />
                  )}
                  value={dates.end}
                  onChange={(newValue) => {
                    setDates((prev) => {
                      return { ...prev, end: newValue };
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </>
        )}
        {type === "Hire" && (
          <Grid item style={{ width: "90%" }}>
            <TextField
              id="Vehicle"
              label="Vehicle"
              value={
                selectedVehicle.model
                  ? `${selectedVehicle.brand} ${selectedVehicle.model}`
                  : ""
              }
              // onChange={handleChange}
              onClick={handleOpen1}
              style={{ width: "100%" }}
              ref={vehicleRef}
            />
          </Grid>
        )}

        {/* Rent vehicle Form */}
        {type === "Rent" && (
          <Grid item style={{ width: "90%" }}>
            <TextField
              id="Vehicle"
              label="Vehicle"
              value={
                selectedVehicle.model
                  ? `${selectedVehicle.brand} ${selectedVehicle.model}`
                  : ""
              }
              // onChange={handleChange}
              onClick={handleOpen1}
              style={{ width: "100%" }}
              ref={vehicleRef}
            />
          </Grid>
        )}

        <Grid item style={{ width: "90%" }}>
          {!hiredDriver.name ? (
            <Button
              variant="contained"
              style={{
                width: "100%",
                borderRadius: "12px",
                backgroundColor: "#172B4D",
                color: "white",
                opacity: 0.9,
              }}
              onClick={handleOpen}
            >
              {type === "Rent" ? "Search Vehicles" : "Search Drivers"}
            </Button>
          ) : (
            <TextField
              id="Driver"
              label="Driver"
              value={hiredDriver.name || ""}
              // onChange={handleChange}
              onClick={handleOpen}
              style={{ width: "100%" }}
              ref={driverRef}
            />
          )}
        </Grid>
        <Grid item style={{ width: "90%" }}>
          {hiredDriver.name && (
            <Button
              variant="contained"
              style={{
                width: "100%",
                borderRadius: "12px",
                backgroundColor: "#172B4D",
                color: "white",
                opacity: 0.9,
              }}
              onClick={() => handleSubmit(type !== "Hire" && type !== "Rent" ? "Book" : type === "Hire" ? "Hire" : "Rent")}
            >
              {type !== "Hire" && type !== "Rent" ? "Book" : type === "Hire" ? "Hire" : "Rent"}
            </Button>
          )}
        </Grid>
      </Grid>
      <DriverModal
        open={open}
        handleClose={handleClose}
        hireDriver={hireDriver}
        type={type}
        distance={places.distance}
      />
      <VehicleModal
        type={type}
        open={open1}
        handleClose={handleClose1}
        selectVehicle={selectVehicle}
      />
    </Paper>
  );
}

export default BookingForm;
