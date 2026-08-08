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
  useMediaQuery,
  Dialog,
DialogTitle,
DialogContent,
DialogActions,
Button,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoginIcon from "@mui/icons-material/Login";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShieldIcon from "@mui/icons-material/Shield";
import { useState } from "react";


import { getUsers } from "../services/userService";

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
 const isAdmin = Number(user?.roleId) === 1;

  const mobile = useMediaQuery("(max-width:900px)");
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [switchUserOpen, setSwitchUserOpen] = useState(false);
const [switchUsers, setSwitchUsers] = useState([]);
  const handleProfileOpen = (event) => {
  setProfileAnchor(event.currentTarget);
};

const handleProfileClose = () => {
  setProfileAnchor(null);
};

const handleSwitchUser = async () => {
  handleProfileClose();

  try {
    const response = await getUsers();

    setSwitchUsers(response.data || []);
    setSwitchUserOpen(true);
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

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



      </Drawer>

      {/* ================= TOP NAVBAR ================= */}

      <AppBar
  position="fixed"
  elevation={0}
  sx={{
    width: mobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
    ml: mobile ? 0 : `${drawerWidth}px`,
    bgcolor: "#fff",
    color: "#111827",
    borderBottom: "1px solid #E5E7EB",
    zIndex: (theme) => theme.zIndex.drawer + 1,
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
    ml: { xs: 0.5, sm: 2 },
    flexGrow: 1,
    fontSize: { xs: "1.1rem", sm: "1.5rem" },
  }}
>
  Dashboard
</Typography>

            <IconButton
  sx={{
    mr: { xs: 0.5, sm: 1.5 },
    p: { xs: 0.5, sm: 1 },
  }}
>
  <Badge
    badgeContent={3}
    color="error"
  >
    <NotificationsNoneIcon fontSize="medium" />
  </Badge>
</IconButton>

<Box
  onClick={handleProfileOpen}
  sx={{
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    px: 1,
    py: 0.5,
    transition: "all .2s ease",

    "&:hover": {
      bgcolor: "#F3F4F6",
    },
  }}
>
  <Avatar
    sx={{
      bgcolor: "#2563EB",
      width: 42,
      height: 42,
      mr: { xs: 0, sm: 1.5 },
    }}
  >
    {user?.fullName?.charAt(0)}
  </Avatar>

  <Box
    sx={{
      mr: 1,
      display: { xs: "none", sm: "block" },
    }}
  >
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

  <KeyboardArrowDownIcon
    sx={{
      display: { xs: "none", sm: "block" },
    }}
  />
</Box>

        </Toolbar>

<Menu
  anchorEl={profileAnchor}
  open={Boolean(profileAnchor)}
  onClose={handleProfileClose}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  slotProps={{
  paper: {
    sx: {
      mt: 1,
      minWidth: 230,
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: "0 16px 40px rgba(15,23,42,.14)",
      border: "1px solid #E5E7EB",
      p: 1,

      "& .MuiMenuItem-root": {
        borderRadius: 2,
        py: 1.3,
        px: 1.5,
        mb: 0.5,
        fontSize: "14px",

        "&:hover": {
          bgcolor: "#F3F6FB",
        },
      },
    },
  },
}}
>
  <MenuItem
  onClick={() => {
    handleProfileClose();
    navigate("/profile");
  }}
>
  👤 Profile
</MenuItem>

 {isAdmin && (
  <MenuItem onClick={handleSwitchUser}>
    🔄 Switch User
  </MenuItem>
)}

  <Divider />

  <MenuItem
    onClick={() => {
      handleProfileClose();
      localStorage.removeItem("user");
      navigate("/login");
    }}
    sx={{
      color: "error.main",
      fontWeight: 600,
    }}
  >
    🚪 Logout
  </MenuItem>
</Menu>

<Dialog
  open={switchUserOpen}
  onClose={() => setSwitchUserOpen(false)}
  fullWidth
  maxWidth="xs"
  PaperProps={{
    sx: {
      borderRadius: 4,
      p: 1,
      boxShadow: "0 20px 60px rgba(15,23,42,.18)",
    },
  }}
>
 <DialogTitle
  sx={{
    fontWeight: 700,
    fontSize: "22px",
    pb: 1,
  }}
>
  Switch User
</DialogTitle>

  <DialogContent>
    {switchUsers.length === 0 ? (
      <Typography color="text.secondary">
        No other users available.
      </Typography>
    ) : (
      <Box>
        {switchUsers
          .filter(
            (switchUser) =>
              switchUser.UserId !== user?.UserId
          )
          .map((switchUser) => (
            <Box
              key={switchUser.UserId}
              onClick={() => {
  setSwitchUserOpen(false);

  navigate("/login", {
    state: {
      switchUser: true,
      email: switchUser.Email,
    },
  });
}}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                mb: 1,
                borderRadius: 2,
                cursor: "pointer",
                border: "1px solid #E5E7EB",

                "&:hover": {
                  bgcolor: "#F3F6FB",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#2563EB",
                }}
              >
                {switchUser.FullName?.charAt(0)}
              </Avatar>

              <Box>
                <Typography fontWeight={700}>
                  {switchUser.FullName}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {switchUser.Email}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
    )}
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => setSwitchUserOpen(false)}
    >
      Cancel
    </Button>
  </DialogActions>
</Dialog>

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