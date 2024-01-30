import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import Nav from "react-bootstrap/Nav";
import "./sidebar.css";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Modal } from "@mui/material";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ hist, children }) {



  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setOpen1(true);
  };
  const hancleCardClose = () => {
    setOpen1(false);
  };
  // if(localStorage.getItem('role')=== "rider"){
    const id = localStorage.getItem("id");
  // }
  // }else{
  //   const id = localStorage.getItem("profile.uid");
  // }
  const getData = (id) => {
    fetch(`http://localhost:5000/get_data?${id}`)
      .then(response => response.json())
      .then(data => {
        // Use the retrieved data from the backend
        console.log("fetched:",data);
        // Display the data in the frontend as needed
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    useEffect(() => {
      getData(id);  
    }, []);
  


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="appBar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              // component="div"
              style={{ cursor: "pointer" }}
            >
              Zwoop
            </Typography>
            <Nav>
              {auth && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle fontSize="inherit" />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClick={handleClose}
                  >
                    <MenuItem
                      onClick={handleProfileClick}>
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        dispatch({ type: "LOGOUT" });
                        hist.push("/");
                      }}
                    >
                      Logout
                    </MenuItem>

                  </Menu>
                </div>
              )}
            </Nav>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {(localStorage.getItem("role") === "rider"
            ? ["Home", "My Rides", "Payments", "Switch to Driver"]
            : localStorage.getItem("role") === "driver"
              ? ["Home", "My Rides", "Payments", "Switch to Rider"]
              : ["Home"]
          ).map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                if (localStorage.getItem("role") === "rider") {
                  hist.push(
                    index === 0
                      ? "/rider"
                      : index === 1
                        ? "/rider/my-rides"
                        : index === 2
                          ? "/rider/payments"
                          : index === 3
                            ? "/driver/switch"
                            : "/rider/notifications"
                  );
                } else if (localStorage.getItem("role") === "driver") {
                  hist.push(
                    index === 0
                      ? "/driver"
                      : index === 1
                        ? "/driver/my-rides"
                        : index === 2
                          ? "/driver/payments"
                          : "/rider/switch"
                  );
                }
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? <HomeIcon /> : <></>}
                  {index === 1 ? <DirectionsCarFilledIcon /> : <></>}
                  {index === 2 ? <AddCardIcon /> : <></>}
                  {index === 3 ? <AccountCircle /> : <></>}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            // </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
        {open1 && (
          <Modal
            open={open1}
            onClose={hancleCardClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
              }}
            >
              <CardContent>
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
                    Profile
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Modal>
        )}
    </Box>
  );
}


