// import React from 'react';
// import { Grid, Typography } from "@mui/material";
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';

// state = localStorage.getItem("profile")

// const index = 0;
// function SwitchingtoNewDriver() {
//   const history = useHistory();
//     history.push('/regAsDriver');
// }

// function SwitchingtoDriverDashboard(){
//   // loginAsRider();
//   const history = useHistory();
//     history.push('/driver');
// }

// function switchDriver() {
//   return (
//     index === 0
//     ? SwitchingtoNewDriver()
//     : SwitchingtoDriverDashboard(),

//     <Grid container item direction="row" md={3} spacing={5}>
//     <Grid item xs={12}>
//       <Typography
//         variant="h5"
//         style={{
//           fontFamily: "Roboto,Helvetica,Arial,sans-serif",
//           fontWeight: 500,
//         }}
//       >
//       </Typography>
//     </Grid>
//   </Grid>
//   );
// }

// export default switchDriver;

// function switchDriver(){

// }

// function switchRider(){

// }
// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

// import React from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom'; // Import useHistory hook from react-router-dom

// const YourComponent = () => {
//   const history = useHistory(); // Access history object to handle redirection

//   const switch_to_driver = async () => {
//     try {
//       // Make a POST request to set flag to 1 for switching to driver
//       await axios.post('http://localhost:5000/switch', { "email": "rider@gmail.com", "flag": 1 });

//       // Redirect to '/driver' route after flag changes
//       history.push('/driver');
//     } catch (error) {
//       console.error('Error occurred while switching to driver:', error);
//     }
//   };

//   const switch_to_rider = async () => {
//     try {
//       // Make a POST request to set flag to 2 for switching to rider
//       await axios.post('http://localhost:5000/switch', { "email": "rider@gmail.com", "flag": 1 });

//       // Redirect to '/rider' route after flag changes
//       history.push('/rider');
//     } catch (error) {
//       console.error('Error occurred while switching to rider:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={switch_to_driver}>Switch to Driver</button>
//       <button onClick={switch_to_rider}>Switch to Rider</button>
//     </div>
//   );
// };

// export default YourComponent;

// Your React component
// import React, { useEffect } from 'react';
// import axios from 'axios';

// function RoleSwitchComponent() {
//   useEffect(() => {
//     // Retrieve user information from localStorage or wherever it is stored
//     const profile = JSON.parse(localStorage.getItem('profile')); // Assuming user info is stored as JSON
//     const email = profile.email;
//     console.log(email);
//     // Update user role function
//     const updateUserRole = async () => {
//       try {
//         const response = await axios.put(`http://localhost:5000/api/user/role`, {
//           email: email,
//           newRole: 'driver', // Replace with the new role you want to assign
//         });
        
//         console.log(response.data); // Log the response from the server
//       } catch (error) {
//         console.error('Error:', error); // Handle error
//       }
//     };

//     // Call the function to update the user role
//     updateUserRole();
//   }, []);

//   return (
//     <div>
//       {/* Your component UI */}
//     </div>
//   );
// }

// export default RoleSwitchComponent;


// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { switchRole } from '../actions/user'; // Import the switchRole action
// import { useHistory } from 'react-router-dom';
// import { check_id_match } from '../apis/user';

// const RoleSwitchComponent = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const profile = JSON.parse(localStorage.getItem('profile'));
//   const role = localStorage.getItem('role');
//   const email = '';
//   const id = profile._id;
//   console.log(email);

//   const handleRoleSwitch = async () => {
//     try{ 
//     if(role === 'driver'){

//       const email = profile.email;    
//       const newRole = 'rider'; // Replace with the new role
      
//       const response = await dispatch(switchRole(email, newRole));
//       // console.log(response);
//       localStorage.setItem("role", 'rider');
//       history.push('/rider');
//     } 
//     else{
//       const response = await dispatch(check_id_match(id));
//       if(response === true ){
//         const email = profile.email;    
//         const newRole = 'driver'; // Replace with the new role
        
//         const response = await dispatch(switchRole(email, newRole));
//         // console.log(response);
//         localStorage.setItem("role", 'driver');
//         history.push('/driver');
//       }else{
//         history.push('/regAsDriver');
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     // Handle errors
//   }
//   };
//   handleRoleSwitch();
//   return ('');
// };

// export default RoleSwitchComponent;


import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { switchRole } from '../actions/user';
import { useHistory } from 'react-router-dom';
// import { checkIdMatch } from '../apis/user';

const RoleSwitchComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = JSON.parse(localStorage.getItem('profile'));
  let role = localStorage.getItem('role');
  const email = profile.email;
  const pid = profile._id;
  // const id = { _id: pid };
  // console.log(pid);

  useEffect(() => {
    handleRoleSwitch();
  }, []);

  const handleRoleSwitch = async () => {
    try {
      if (role === 'driver') {
        // If the current role is 'driver', switch role directly
        const newRole = 'rider';
        const response = await dispatch(switchRole(email, newRole));
        // console.log(response);
        if (response.status === 200) {
          localStorage.setItem('role', 'rider');
          history.push('/rider');
        } else {
          // Handle error while switching role
        }
      }  else if (role === 'rider') {
        // If the current role is 'rider', check in Drivers collection
        const response = await checkDriver();
        // console.log(response)
        if (response.match === true) { // Adjusted the condition to check for a boolean value
          const newRole = 'driver';
          const switchResponse = await dispatch(switchRole(email, newRole));
          if (switchResponse.status === 200) {
            localStorage.setItem('role', 'driver');
            history.push('/driver');
          } else {
            // Handle error
          }
        } else {
          history.push('/regAsNewDriver');
        }
      } else {
        // Handle other cases or errors
      }
    } catch (error) {
      console.error(error);
      // Handle other errors
    }
  };

  
  const checkDriver = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/check_id_match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id : pid }), // Assuming 'id' is the profile ID to check in Drivers collection
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      console.log(data);
      return data;
    }
    catch (error) {
      console.error(error);
      // Handle errors while checking driver
      // return { match: false }; // Return false for simplicity when encountering an error
    }
  };
  return null; // Return null or any other component since this component doesn't render anything visible
};

export default RoleSwitchComponent;
