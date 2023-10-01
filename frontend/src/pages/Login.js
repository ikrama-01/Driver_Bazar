import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { login, signup } from "../actions/user";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles"

;

const theme = createTheme();

export default function SignInnUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    in_up: "in",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (state.in_up === "in") {
      const formdata = {
        email: data.get("email"),
        password: data.get("password"),
      };

      if (formdata.email.length == 0 || formdata.password.length == 0) {
        return alert("Please fill all the credentials");
      } else {
        return dispatch(login(formdata, (route) => history.push(route)));
      }
    } else {
      const formdata = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        role: "rider",
      };

      if (
        formdata.email.length == 0 ||
        formdata.password.length == 0 ||
        formdata.name.length == 0
      ) {
        return alert("Please fill all the credentials");
      } else {
        await signup(formdata, () =>
          setState({ name: "", email: "", password: "", in_up: "in" })
        );
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#273A5A" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign {state.in_up}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {state.in_up === "up" && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="Name"
                value={state.name}
                onChange={(e) =>
                  setState((state) => ({ ...state, name: e.target.value }))
                }
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={state.email}
              onChange={(e) =>
                setState((state) => ({ ...state, email: e.target.value }))
              }
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={state.password}
              onChange={(e) =>
                setState((state) => ({ ...state, password: e.target.value }))
              }
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {state.in_up === "in" ? (
                <div>
                <Typography
                  component="p"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "2% 0",
                  }}
                  onClick={() => setState((prev) => ({ ...prev, in_up: "up" }))}
                >
                  New to the site? Sign up now! as a rider
                </Typography>
                <Typography
                  component="p"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "2% 0",
                  }}
                  onClick={() => {
                    // setState((prev) => ({ ...prev, in_up: "" }))
                   window.location.href = "http://localhost:3000/regAsDriver";
                  // history.push("/regAsDriver")
                  }} 
                  // Redirects to the new page
                >
                New to the site? Sign up now! as a driver
              </Typography>
              </div>
              
            ) : (
              <Typography
                component="p"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2% 0",
                }}
                onClick={() => setState((prev) => ({ ...prev, in_up: "in" }))}
              >
                Already have an account? Sign in!
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, bgcolor: "#273A5A" }}
            >
              Sign {state.in_up}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
