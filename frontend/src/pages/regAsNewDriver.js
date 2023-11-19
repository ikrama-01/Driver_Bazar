// import React, { useState } from "react";
// import { Grid, TextField, Button } from "@mui/material";
// import { signup } from "../actions/user";
// import { createDriver } from "../actions/driver";
// const profile = JSON.parse(localStorage.getItem('profile'));
// const email = profile.email;
// const name = profile.name;
// const AddNewDriver = () => {
//   const [state, setState] = useState({
//     name: "", //set name from local storage
//     email: "",
//     rating: 0,
//     priceperkm: "",
//     priceperhour: "",
//     experience: "",
//   });

//   const submit = async (e) => {
//     e.preventDefault();
//       await createDriver(
//         {
//           name: name, //set from local storage
//           rating: Number(state.rating),
//           priceperkm: Number(state.priceperkm),
//           priceperhour: Number(state.priceperhour),
//           experience: state.experience,
//           uid,
//         },
//         () =>
//           setState({
//             name: "",
//             email: "",
//             rating: "",
//             priceperkm: "",
//             priceperhour: "",
//             experience: "",
//           })
//       );
//   };
  
//   const handleChange = (e) => {
//     setState((state) => ({ ...state, [e.target.name]: e.target.value }));
//   };
//   return (
//     <Grid
//       container
//       component={"form"}
//       style={{ padding: "3em" }}
//       justifyContent="center"
//       onSubmit={submit}
//       alignItems="flex-start"
//       spacing={3}
//     >
//       <Grid item container justifyContent="center" xs={12}>
//         <h2>Register As a Driver</h2>
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <TextField
//           required
//           variant="outlined"
//           name="experience"
//           onChange={handleChange}
//           value={state.experience}
//           fullWidth
//           label="Experience"
//         />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <TextField
//           required
//           variant="outlined"
//           name="rating"
//           onChange={handleChange}
//           value={state.rating}
//           fullWidth
//           label="Rating"
//         />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <TextField
//           required
//           variant="outlined"
//           fullWidth
//           name="priceperkm"
//           onChange={handleChange}
//           value={state.priceperkm}
//           label="Pricing (per kilometer)"
//         />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <TextField
//           required
//           variant="outlined"
//           fullWidth
//           name="priceperhour"
//           onChange={handleChange}
//           value={state.priceperhour}
//           label="Pricing (per hour)"
//         />
//       </Grid>
//       <Grid item container justifyContent="center" xs={12}>
//         <Button
//           type="submit"
//           variant="contained"
//           sx={{ mt: 2, mb: 2, bgcolor: "#273A5A" }}
//         >
//           Register
//         </Button>
//       </Grid>
//     </Grid>
//   );
// };

// export default AddNewDriver;
