import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { signup } from "../../actions/user";
import { createDriver } from "../../actions/driver";
const AddDriver = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    rating: 0,
    priceperkm: "",
    priceperhour: "",
    experience: "",
    password: "",
    confirm: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    if (state.password === state.confirm) {
      const uid = await signup(
        {
          name: state.name,
          email: state.email,
          password: state.password,
          role: "driver",
        },
        null
      );
      await createDriver(
        {
          name: state.name,
          rating: Number(state.rating),
          priceperkm: Number(state.priceperkm),
          priceperhour: Number(state.priceperhour),
          experience: state.experience,
          uid,
        },
        () =>
          setState({
            name: "",
            email: "",
            rating: "",
            priceperkm: "",
            priceperhour: "",
            experience: "",
            password: "",
            confirm: "",
          })
      );
    } else {
      alert("Passwords must be same!");
    }
  };
  
  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
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
      <Grid item container justifyContent="center" xs={12}>
        <h2>Add a Driver</h2>
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
          name="experience"
          onChange={handleChange}
          value={state.experience}
          fullWidth
          label="Experience"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="rating"
          onChange={handleChange}
          value={state.rating}
          fullWidth
          label="Rating"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          fullWidth
          name="priceperkm"
          onChange={handleChange}
          value={state.priceperkm}
          label="Pricing (per kilometer)"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          fullWidth
          name="priceperhour"
          onChange={handleChange}
          value={state.priceperhour}
          label="Pricing (per hour)"
        />
      </Grid>
      <Grid item container justifyContent="center" xs={12}>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 2, bgcolor: "#273A5A" }}
        >
          Add Driver
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddDriver;
