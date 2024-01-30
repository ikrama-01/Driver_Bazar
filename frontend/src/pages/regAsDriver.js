import React, { useState } from "react";
import { Grid, TextField, Button, Input } from "@mui/material";
import { signup } from "../actions/user";
import { createDriver } from "../actions/driver";
import { useHistory } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const AddDriver = () => {
  const [carMode, setCarMode] = useState('Auto');
  
  const history = useHistory();
  const [state, setState] = useState({
    name: "",
    email: "",
    rating: 0,
    priceperkm: "",
    priceperhour: "",
    experience: "",
    password: "",
    confirm: "",
    aadharNo: "",
    gender: "",
    panNo: "",
    EvBtn: "",  //auto/manual/Both
    phoneNo: "",
    age:""
  });
  const submit = async (e) => {
    e.preventDefault();
    if (state.password === state.confirm) {
      const uid = await signup(
        {
          name: state.name,
          email: state.email,
          password: state.password,
          age:state.age,
          gender:state.gender,
          phoneNo:state.phoneNo,
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
          carMode: carMode,
          aadharNo: state.aadharNo,
          panNo: state.panNo,
          EvBtn: state.EvBtn,
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
            aadharNo: "",
            gender: "",
            panNo: "",
            EvBtn: "",
            phoneNo: "",
            age:"",
          })
      );
      setCarMode('');
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
  const handleSelectChange = (event) => {
    setCarMode(event.target.value);
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
        <h2>Register As a Driver</h2>
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
          name="age"
          onChange={handleChange}
          value={state.age}
          fullWidth
          label="Age"
          type="number"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        Gender:
        <br />

        <Grid item xs={4} md={4}>
          <label>
            Male
            <Input
              required
              type="radio"
              // variant="outlined"
              // fullWidth
              name="gender"
              onChange={handleChange}
              value="male"
              defaultChecked={false}
            />
          </label>
        </Grid>

        <Grid item xs={4} md={4}>
          <label>
            Female
            <Input
              required
              type="radio"
              // variant="outlined"
              // fullWidth
              name="gender"
              onChange={handleChange}
              value="Female"
              defaultChecked={false}
            />
          </label>
        </Grid>

        <Grid item xs={4} md={4}>
          <label>
            Other
            <Input
              required
              type="radio"
              // variant="outlined"
              // fullWidth
              name="gender"
              onChange={handleChange}
              value="Other"
              defaultChecked={false}
            />
          </label>
        </Grid>
      </Grid>

      <Grid item xs={4} md={6}>
        <Grid item xs={4} md={4}>
          <label>
            Electric Vehicle
            <Input
              // required
              type="radio"
              // variant="outlined"
              // fullWidth
              name="EvBtn"
              onChange={handleChange}
              value="EV"
              defaultChecked={false}
            />
          </label>
        </Grid>
        <Grid item xs={4} md={4}>
          <label>
            Non-Electric Vehicle
            <Input
              // required
              type="radio"
              // variant="outlined"
              // fullWidth
              name="EvBtn"
              onChange={handleChange}
              value="Non-Ev"
              defaultChecked={false}
            />
          </label>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <label>Select Option</label>
        <br />
        <Select
        value={carMode}
        onChange={handleSelectChange}
        name="carMode"
      >
        <MenuItem value="Auto">Auto</MenuItem>
        <MenuItem value="Manual">Manual</MenuItem>
        <MenuItem value="Both">Both</MenuItem>
      </Select>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="aadharNo"
          onChange={handleChange}
          value={state.aadharNo}
          fullWidth
          label="Aadhar Number"
          type="number"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="panNo"
          onChange={handleChange}
          value={state.panNo}
          fullWidth
          label="Pan Number"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="phoneNo"
          onChange={handleChange}
          value={state.phoneNo}
          fullWidth
          label="Phone Number"
          type="number"
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
          Register
        </Button>
      </Grid>
    </Grid>

  );
};

export default AddDriver;
