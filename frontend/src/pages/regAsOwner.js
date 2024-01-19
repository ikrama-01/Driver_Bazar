import React, { useState } from "react";
import { Grid, TextField, Button,List, ListItem,ListItemText } from "@mui/material";
import { signup } from "../actions/user";
import { createOwner } from "../actions/owner";
import { useHistory } from "react-router-dom";
const AddOwner = () => {
  const history = useHistory(); 
  const [state, setState] = useState({
    name: "",
    email: "",
    numberofvehicles: 0,
    officeaddress: "",
    password: "",
    confirm: ""
  });

  const [commVehicle, setCommVehicle] = useState([]);
  const [newCommVehicle, setNewCommVehicle] = useState({
    brand: "",
    model: "",
    plate: "",
    price: 0
  });
  const submit = async (e) => {
    e.preventDefault();
    if (state.password === state.confirm) {
      const uid = await signup(
        {
          name: state.name,
          email: state.email,
          password: state.password,
          role: "owner",
        },
        null
      );
      await createOwner(
        {
          name: state.name,
          numberofvehicles: Number(state.numberofvehicles),
          officeaddress: state.officeaddress,
          uid,
          commVehicle: commVehicle,
        },
        () =>
          setState({
            name: "",
            email: "",
            numberofvehicles:"",
            officeaddress: "",
            password: "",
            confirm: "",
          })
      );
    } else {
      alert("Passwords must be same!");
    }
  };
  const back = () => {
    history.push('/');
  };
  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleVehicleChange = (e) => {
    setNewCommVehicle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addVehicle = () => {
    if (newCommVehicle.brand.trim() !== '' && newCommVehicle.model.trim() !== '' && newCommVehicle.plate.trim() !== '' ) {
      setCommVehicle([...commVehicle, newCommVehicle]);
      setNewCommVehicle({brand: "" , model: "", plate: "", price: 0  });
    }
  };

  const removeVehicle = (index) => {
    const updatedVehicles = [...commVehicle];
    updatedVehicles.splice(index, 1);
    setCommVehicle(updatedVehicles);
  };
  return (
    <Grid
      container
      component={"form"}
      style={{ padding: "3em" }}
      justifyContent="center"
      onSubmit={submit}
      alignItems="flex-start"
      spacing={3}
    >
      <Grid container item xs={12} justifyContent="flex-start"> {/* Adjust xs={12} or other breakpoints as needed */}
      <Button
        onClick={back}
        variant="contained"
        sx={{ mt: 0, mb: 0, bgcolor: "#273A5A" }}
      >
        Back
      </Button>
      </Grid>
      <Grid item container justifyContent="center" xs={12}>
        <h2>Register As a Owner</h2>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="name"
          onChange={handleChange}
          value={state.name}
          fullWidth
          label="Name"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="email"
          onChange={handleChange}
          value={state.email}
          fullWidth
          label="Email"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="password"
          onChange={handleChange}
          value={state.password}
          fullWidth
          label="Password"
          type="password"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="confirm"
          onChange={handleChange}
          value={state.confirm}
          fullWidth
          label="Confirm Password"
          type="password"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="numberofvehicles"
          onChange={handleChange}
          value={state.numberofvehicles}
          fullWidth
          label="Number of Vehicles"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="officeaddress"
          onChange={handleChange}
          value={state.officeaddress}
          fullWidth
          label="Office Address"
        />
      </Grid>
      <Grid item xs={12} md={12}>
      <Button type="button" onClick={addVehicle}>
          Add Vehicle
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          name="brand"
          onChange={handleVehicleChange}
          value={newCommVehicle.brand}
          fullWidth
          label="Vehicle Brand"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          name="model"
          onChange={handleVehicleChange}
          value={newCommVehicle.model}
          fullWidth
          label="Vehicle Model"
        />
      </Grid>
      <Grid item xs={12} md={6}>
       <TextField
          variant="outlined"
          name="plate"
          onChange={handleVehicleChange}
          value={newCommVehicle.plate}
          fullWidth
          label="Vehicle Plate"
        />
      </Grid>
      <Grid item xs={12} md={6}>
       <TextField
          variant="outlined"
          name="price"
          onChange={handleVehicleChange}
          value={newCommVehicle.price}
          fullWidth
          label="Price"
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <List>
          {commVehicle.map((vehicle, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Brand: ${vehicle.brand}, Model: ${vehicle.model}, Plate: ${vehicle.plate}, Price: ${ vehicle.price}`} />
              <Button type="button" onClick={() => removeVehicle(index)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item container justifyContent="center" xs={12}>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 2, bgcolor: "#273A5A" }}
        >
          Register
        </Button>
      </Grid>
    </Grid>
    
  );
};

export default AddOwner;
