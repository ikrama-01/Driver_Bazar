import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
// import { createNewDriver } from "../actions/driver";
import { useHistory } from "react-router-dom";
const AddNewDriver = () => {
    const history = useHistory(); 
  const [profile, setProfile] = useState({ email: '', name: '' , _id: ''});
  const [state, setState] = useState({
    name:"",
    rating: 0,
    priceperkm: "",
    priceperhour: "",
    experience: "",
  });

  // Fetch and set profile from localStorage when component mounts
  useEffect(() => {
    const profileData = localStorage.getItem('profile');
    if (profileData) {
      setProfile(JSON.parse(profileData));
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const data = {
        name: profile.name,
        rating: Number(state.rating),
        priceperkm: Number(state.priceperkm),
        priceperhour: Number(state.priceperhour),
        experience: state.experience,
        uid:profile._id,
      };
      // () =>
      //   setState({
      //     name:"",
      //     rating: "",
      //     priceperkm: "",
      //     priceperhour: "",
      //     experience: "",
      //   })
    try {
      const response = await fetch('http://localhost:5000/driver/add_new_driver/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Driver created successfully');
        history.push('/driver');
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to create driver');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const back = () => {
    history.push('/rider');
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
        <h2>Create your Driver-Based Account</h2>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          name="name"
          onChange={handleChange}
          value={profile.name}
          fullWidth
          label="name"
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

export default AddNewDriver;
