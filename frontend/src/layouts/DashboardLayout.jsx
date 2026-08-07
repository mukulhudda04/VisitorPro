import { Outlet, useNavigate, useLocation } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
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
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShieldIcon from "@mui/icons-material/Shield";

const drawerWidth = 270;

const menuItemStyle = {
  mx: 2,
  my: 0.7,
  px: 2,
  height: 56,
  borderRadius: "16px",
  color: "#D1D5DB",
  transition: ".25s",

  "& .MuiListItemIcon-root": {
    color: "#D1D5DB",
    minWidth: 42,
  },

  "&:hover": {
    background:
      "linear-gradient(90deg,#3B82F6,#2563EB)",

    color: "#fff",

    transform: "translateX(4px)",

    boxShadow:
      "0 8px 18px rgba(37,99,235,.35)",
  },

  "&:hover .MuiListItemIcon-root": {
    color: "#fff",
  },

  "&.Mui-selected": {
    background:
      "linear-gradient(90deg,#3B82F6,#2563EB)",

    color: "#fff",

    boxShadow:
      "0 8px 18px rgba(37,99,235,.35)",
  },

  "&.Mui-selected .MuiListItemIcon-root": {
    color: "#fff",
  },
};

const DashboardLayout = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

    return (
    <Box sx={{ display: "flex", bgcolor: "#F4F7FC" }}>
      <CssBaseline />

      {/* ================= SIDEBAR ================= */}

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background:
              "linear-gradient(180deg,#111827,#0F172A)",

            color: "#fff",

            borderRight: "none",

            display: "flex",
            justifyContent: "space-between",
          },
        }}
      >

        <Box>

          {/* LOGO */}

          <Toolbar
            sx={{
              py: 2,
              justifyContent: "center",
            }}
          >

            <ShieldIcon
              sx={{
                fontSize: 42,
                color: "#60A5FA",
                mr: 1.5,
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              VisitorPro
            </Typography>

          </Toolbar>

          <Divider sx={{ borderColor: "#1F2937" }} />

          {/* MENU */}

          <List sx={{ mt: 2 }}>

            <ListItemButton
              sx={menuItemStyle}
              selected={location.pathname === "/dashboard"}
              onClick={() => navigate("/dashboard")}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>

              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
              sx={menuItemStyle}
              selected={location.pathname === "/visitors"}
              onClick={() => navigate("/visitors")}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>

              <ListItemText primary="Visitors" />
            </ListItemButton>

            <ListItemButton
              sx={menuItemStyle}
              selected={location.pathname === "/active-visits"}
              onClick={() => navigate("/active-visits")}
            >
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>

              <ListItemText primary="Active Visits" />
            </ListItemButton>

                        <ListItemButton
              sx={menuItemStyle}
              selected={location.pathname === "/checkin"}
              onClick={() => navigate("/checkin")}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>

              <ListItemText primary="Check In" />
            </ListItemButton>

            <ListItemButton
              sx={menuItemStyle}
              selected={location.pathname === "/visit-history"}
              onClick={() => navigate("/visit-history")}
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>

              <ListItemText primary="Visit History" />
            </ListItemButton>

            <ListItemButton
              sx={menuItemStyle}
              selected={location.pathname === "/users"}
              onClick={() => navigate("/users")}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>

              <ListItemText primary="Users" />
            </ListItemButton>

          </List>

        </Box>

        {/* Bottom Profile */}

        <Box sx={{ p: 2 }}>

          <Divider sx={{ borderColor: "#1F2937", mb: 2 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,.05)",
              borderRadius: "16px",
              p: 1.5,
            }}
          >

            <Avatar
              sx={{
                bgcolor: "#2563EB",
                mr: 1.5,
              }}
            >
              {user?.fullName?.charAt(0)}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>

              <Typography
                fontWeight={700}
                color="#fff"
              >
                {user?.fullName}
              </Typography>

              <Typography
                variant="body2"
                color="#94A3B8"
              >
                Administrator
              </Typography>

            </Box>

          </Box>

        </Box>

      </Drawer>

      {/* ================= TOP NAVBAR ================= */}

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "#fff",
          color: "#111827",
          borderBottom: "1px solid #E5E7EB",
        }}
      >

        <Toolbar>

          <IconButton>

            <MenuIcon />

          </IconButton>

          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 2,
              flexGrow: 1,
            }}
          >
            Dashboard
          </Typography>

                    <Badge
            badgeContent={3}
            color="error"
            sx={{ mr: 3 }}
          >
            <NotificationsNoneIcon fontSize="medium" />
          </Badge>

          <Avatar
            sx={{
              bgcolor: "#2563EB",
              width: 42,
              height: 42,
              mr: 1.5,
            }}
          >
            {user?.fullName?.charAt(0)}
          </Avatar>

          <Box sx={{ mr: 1 }}>

            <Typography
              fontWeight={700}
              lineHeight={1.2}
            >
              {user?.fullName}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Administrator
            </Typography>

          </Box>

          <KeyboardArrowDownIcon />

        </Toolbar>

      </AppBar>

      {/* ================= MAIN CONTENT ================= */}

     <Box
  component="main"
  sx={{
    flexGrow: 1,
    mt: "72px",
    p: 3,
    minHeight: "100vh",
    width: `calc(100% - ${drawerWidth}px)`,
    background:
      "linear-gradient(180deg,#F8FAFC,#EEF3FB)",
  }}
>

        <Outlet />

      </Box>

    </Box>

      );
};

export default DashboardLayout;