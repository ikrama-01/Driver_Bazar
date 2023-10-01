import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Button,
  Checkbox,
  Modal,
  TextField,
  Divider,
} from "@mui/material";
import {
  createVehicle,
  deleteVehicle,
  getVehicles,
  updateVehicle,
} from "../actions/vehicle";
import vehiclesvg from "../assets/Fast car-cuate.svg";
import { updateDriver } from "../actions/driver";

const VehicleCard = ({ vehicle, setState, selectPreference, prefer }) => {
  // vehicle ID, plate, owner ID, Brand, Model, driver ID, free asset scheme, Hiring Duration
  return (
    <Paper
      elevation={2}
      style={{
        width: "100%",
        height: "24vh",
        borderRadius: 12,
        backgroundColor: "whitesmoke",
        marginBottom: "1%",
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
          xs={3}
          style={{
            backgroundImage: `url(${vehiclesvg})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          ></div>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          item
          xs={4}
          style={{ padding: "1% 0 1% 3%" }}
        >
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="b">
              {vehicle.brand} {vehicle.model} ({vehicle.plate})
            </Typography>
          </Grid>
          <Grid item xs={6} container spacing={1}>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="p" component="b">
                Owner:
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="p">
                {vehicle.owner?.name || vehicle.driver.name}
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
              {vehicle.driver && (
                <>
                  <Typography variant="p" component="b">
                    Driver:
                  </Typography>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {vehicle.driver && (
                <>
                  <Typography variant="p">{vehicle.driver.name}</Typography>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={5}
          id="driver-book"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1% 0",
          }}
          spacing={1}
        >
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Checkbox disabled checked={vehicle?.freeasset} /> Free Asset Scheme
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <Button
              variant="outlined"
              className="bookbutton"
              onClick={() => {
                // hireDriver(driver);
              }}
            >
              Edit
            </Button> */}
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {selectPreference ? (
              <Button
                variant="contained"
                color="primary"
                className="bookbutton"
                disabled={vehicle.freeasset}
                onClick={() => {
                  // update localStorage.getItem('profile').preferredVehicleId to remove driverId
                  // update vehicle._id to have driverId=localStorage.getItem('id')
                  // update driver to change/add preferredVehicleId to vehicle._id

                  if (
                    JSON.parse(localStorage.getItem("profile"))
                      .preferredVehicle === vehicle._id
                  ) {
                    prefer();
                  } else {
                    if (
                      JSON.parse(localStorage.getItem("profile"))
                        .preferredVehicle
                    ) {
                      updateVehicle(
                        JSON.parse(localStorage.getItem("profile"))
                          .preferredVehicle,
                        { unsetDriver: true }
                      );
                    }
                    updateVehicle(vehicle._id, {
                      driverId: localStorage.getItem("id"),
                    });
                    updateDriver(localStorage.getItem("id"), {
                      preferredVehicleId: vehicle._id,
                    });
                    localStorage.setItem(
                      "profile",
                      JSON.stringify({
                        ...JSON.parse(localStorage.getItem("profile")),
                        preferredVehicle: vehicle._id,
                      })
                    );
                    prefer();
                  }
                }}
              >
                Select as Preference
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                className="bookbutton"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this vehicle?"
                    )
                  ) {
                    deleteVehicle(vehicle._id.$oid);
                    setState((vehicles) =>
                      vehicles.filter((veh) => veh._id !== vehicle._id)
                    );
                  }
                }}
              >
                Delete
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const AddModal = ({ open, handleClose, state, newData }) => {
  const [vehicle, setVehicle] = state;
  const handleSubmit = () => {
    if (vehicle.brand !== "") {
      if (vehicle.model !== "") {
        if (vehicle.plate !== "") {
          if (!vehicle.freeasset) {
            createVehicle({
              brand: vehicle.brand,
              model: vehicle.model,
              plate: vehicle.plate,
              freeasset: false,
            });
            newData();
            setVehicle({
              brand: "",
              model: "",
              plate: "",
              freeasset: false,
            });
            handleClose();
          } else {
            if (vehicle.location !== "") {
              createVehicle(vehicle);
              newData();
              setVehicle({
                brand: "",
                model: "",
                plate: "",
                freeasset: false,
                location: "",
              });
              handleClose();
            } else {
              alert("Please add a hiring location");
            }
          }
        } else {
          alert("Please add the number plate of the vehicle");
        }
      } else {
        alert("Please specify the model of the vehicle");
      }
    } else {
      alert("Please specify the brand of the vehicle");
    }
  };

  return (
    <Modal
      open={open ? open : false}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: "60vw",
          height: "60vh",
          backgroundColor: "white",
          borderRadius: 5,
          padding: "1% 0 0 0",
        }}
      >
        <Typography variant="h4" style={{ width: "100%", textAlign: "center" }}>
          Add Vehicle
        </Typography>
        <Divider variant="middle" />
        <Grid
          container
          style={{ padding: "2% 0" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{
                width: "20%",
                textAlign: "center",
                color: "gray",
                paddingBottom: "0.5%",
              }}
            >
              Vehicle Brand:
            </Typography>
            <TextField
              margin="normal"
              required
              style={{ width: "40%" }}
              value={vehicle.brand}
              onChange={(e) =>
                setVehicle((state) => ({ ...state, brand: e.target.value }))
              }
              name="brand"
              autoComplete="brand"
              autoFocus
              variant="standard"
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{
                width: "20%",
                textAlign: "center",
                color: "gray",
                paddingBottom: "0.5%",
              }}
            >
              Vehicle Model:
            </Typography>
            <TextField
              margin="normal"
              required
              style={{ width: "40%" }}
              value={vehicle.model}
              onChange={(e) =>
                setVehicle((state) => ({ ...state, model: e.target.value }))
              }
              name="model"
              autoComplete="model"
              autoFocus
              variant="standard"
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{
                width: "20%",
                textAlign: "center",
                color: "gray",
                paddingBottom: "0.5%",
              }}
            >
              Number Plate:
            </Typography>
            <TextField
              margin="normal"
              required
              style={{ width: "40%" }}
              value={vehicle.plate}
              onChange={(e) =>
                setVehicle((state) => ({ ...state, plate: e.target.value }))
              }
              name="plate"
              autoComplete="plate"
              autoFocus
              variant="standard"
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-end",
              padding: "3% 0 0",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{ width: "100%", textAlign: "center", color: "gray" }}
            >
              Opt for Free Asset Scheme:{" "}
              <Checkbox
                checked={vehicle.freeasset}
                onChange={(e) => {
                  setVehicle((state) => ({
                    ...state,
                    freeasset: e.target.checked,
                  }));
                }}
              />
            </Typography>
          </Grid>
          {vehicle.freeasset && (
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  width: "20%",
                  textAlign: "center",
                  color: "gray",
                  paddingBottom: "0.5%",
                }}
              >
                Location for hiring:
              </Typography>
              <TextField
                margin="normal"
                required
                style={{ width: "40%" }}
                value={vehicle.location}
                onChange={(e) =>
                  setVehicle((state) => ({
                    ...state,
                    location: e.target.value,
                  }))
                }
                name="location"
                autoComplete="location"
                autoFocus
                variant="standard"
              />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-end",
              padding: "3% 0 0",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Add Vehicle
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

const VehicleCards = () => {
  const [vehicles, setVehicles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const state = useState({
    brand: "",
    model: "",
    plate: "",
    freeasset: false,
    location: ""
  });
  const [preferred, prefer] = useState(false);

  const toggle = () => {
    prefer(!preferred);
    getdata();
  };

  const getdata = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  useEffect(() => {
    getdata();
  }, [state[0]]);

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="flex-start"
      style={{ overflowY: "auto", maxHeight: "80vh" }}
    >
      <Grid
        item
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          style={{
            fontFamily: "Roboto,Helvetica,Arial,sans-serif",
            fontWeight: 500,
          }}
        >
          My Vehicles
        </Typography>
        {!JSON.parse(localStorage.getItem("profile")).hired &&
        localStorage.getItem("role") === "driver" ? (
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant={preferred ? "contained" : "outlined"}
              onClick={toggle}
              style={{ height: "5vh" }}
            >
              <Typography
                variant="h6"
                style={{
                  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                  fontWeight: 500,
                }}
              >
                Select Preferred Vehicle
              </Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(true);
              }}
              style={{ height: "5vh" }}
            >
              <Typography
                variant="h6"
                style={{
                  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                  fontWeight: 500,
                }}
              >
                Add Vehicle
              </Typography>
            </Button>
          </div>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
            style={{ height: "5vh" }}
          >
            <Typography
              variant="h6"
              style={{
                fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                fontWeight: 500,
              }}
            >
              Add Vehicle
            </Typography>
          </Button>
        )}
      </Grid>
      {vehicles.map((vehicle, index) => {
        return (
          <Grid item style={{ width: "100%" }} key={index}>
            <VehicleCard
              vehicle={vehicle}
              setState={setVehicles}
              selectPreference={preferred}
              prefer={toggle}
            />
          </Grid>
        );
      })}
      <AddModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        state={state}
        allVehicles={setVehicles}
        newData={getdata}
      />
    </Grid>
  );
};

export default VehicleCards;
