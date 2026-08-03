import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";

const drawerWidth = 260;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: "#ffffff",
          color: "#000",
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
            }}
          >
            VisitorPro Dashboard
          </Typography>

          <Avatar sx={{ mr: 1 }}>
            {user?.fullName?.charAt(0)}
          </Avatar>

          <Typography>{user?.fullName}</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#0F172A",
            color: "#fff",
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
            }}
          >
            VisitorPro
          </Typography>
        </Toolbar>

        <List>

          <ListItemButton
            selected={location.pathname === "/dashboard"}
            onClick={() => navigate("/dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton
            selected={location.pathname === "/visitors"}
            onClick={() => navigate("/visitors")}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Visitors" />
          </ListItemButton>

          <ListItemButton
            selected={location.pathname === "/active-visits"}
            onClick={() => navigate("/active-visits")}
          >
            <ListItemIcon>
              <VisibilityIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Active Visits" />
          </ListItemButton>

          {/* Check In */}
          <ListItemButton
            selected={location.pathname === "/checkin"}
            onClick={() => navigate("/checkin")}
          >
            <ListItemIcon>
              <LoginIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Check In" />
          </ListItemButton>

          {/* Check Out */}
          <ListItemButton
            selected={location.pathname === "/active-visits"}
            onClick={() => navigate("/active-visits")}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Check Out" />
          </ListItemButton>

          {/* Visit History */}
          <ListItemButton
  selected={location.pathname === "/visit-history"}
  onClick={() => navigate("/visit-history")}
>
  <ListItemIcon>
    <HistoryIcon sx={{ color: "#fff" }} />
  </ListItemIcon>
  <ListItemText primary="Visit History" />
</ListItemButton>

          {/* Users */}
         <ListItemButton
  selected={location.pathname === "/users"}
  onClick={() => navigate("/users")}
>
  <ListItemIcon>
    <GroupIcon sx={{ color: "#fff" }} />
  </ListItemIcon>
  <ListItemText primary="Users" />
</ListItemButton>

        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "#F5F7FB",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;