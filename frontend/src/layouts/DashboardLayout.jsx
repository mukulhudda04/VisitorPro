import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import toast from "react-hot-toast";
import { getUsers } from "../services/userService";

const drawerWidth = 270;

const roleNames = {
  1: "Administrator",
  2: "Security User",
  3: "Reception User",
};

const notificationSeed = [
  {
    id: 1,
    title: "New visitor registered",
    description: "A new visitor has been added to the system.",
    time: "Just now",
    type: "visitor",
    unread: true,
    mention: false,
  },
  {
    id: 2,
    title: "Visitor checked in",
    description: "A visitor has successfully checked in.",
    time: "10 minutes ago",
    type: "success",
    unread: true,
    mention: false,
  },
  {
    id: 3,
    title: "Visit requires attention",
    description: "An active visit needs your attention.",
    time: "25 minutes ago",
    type: "warning",
    unread: true,
    mention: true,
  },
];

const getRoleName = (roleId) =>
  roleNames[Number(roleId)] || "User";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = useMediaQuery("(max-width:900px)");

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const isAdmin = Number(user?.roleId) === 1;

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [switchUserOpen, setSwitchUserOpen] = useState(false);
  const [switchUsers, setSwitchUsers] = useState([]);
  const [switchLoading, setSwitchLoading] = useState(false);

  const [notifications, setNotifications] =
    useState(notificationSeed);

  const [notificationTab, setNotificationTab] =
    useState("all");

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(() => {
      return (
        localStorage.getItem(
          "visitorpro_notifications_enabled"
        ) !== "false"
      );
    });

  const [notificationSettingsOpen, setNotificationSettingsOpen] =
    useState(false);

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  const visibleNotifications =
    notificationTab === "unread"
      ? notifications.filter((item) => item.unread)
      : notificationTab === "mentions"
        ? notifications.filter((item) => item.mention)
        : notifications;

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/visitors": "Visitors",
    "/active-visits": "Active Visits",
    "/checkin": "Check In",
    "/visit-history": "Visit History",
    "/users": "Users",
    "/profile": "Profile",
    "/settings": "Settings",
  };

  const currentPageTitle =
    pageTitles[location.pathname] || "VisitorPro";

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      label: "Visitors",
      path: "/visitors",
      icon: <PeopleRoundedIcon />,
    },
    {
      label: "Active Visits",
      path: "/active-visits",
      icon: <VisibilityRoundedIcon />,
    },
    {
      label: "Check In",
      path: "/checkin",
      icon: <LoginRoundedIcon />,
    },
    {
      label: "Visit History",
      path: "/visit-history",
      icon: <HistoryRoundedIcon />,
    },
    ...(isAdmin
      ? [
          {
            label: "Users",
            path: "/users",
            icon: <GroupRoundedIcon />,
          },
        ]
      : []),
    {
      label: "Settings",
      path: "/settings",
      icon: <SettingsRoundedIcon />,
    },
  ];

  const menuItemStyle = {
    mx: 1.5,
    my: 0.65,
    px: 2,
    height: 54,
    borderRadius: 3,
    color: "#CBD5E1",
    transition: "all .2s ease",
    "& .MuiListItemIcon-root": {
      color: "#94A3B8",
      minWidth: 42,
    },
    "&:hover": {
      bgcolor: "rgba(59,130,246,.16)",
      color: "#fff",
      transform: "translateX(3px)",
    },
    "&:hover .MuiListItemIcon-root": {
      color: "#60A5FA",
    },
    "&.Mui-selected": {
      background:
        "linear-gradient(90deg,#3B82F6,#2563EB)",
      color: "#fff",
      boxShadow:
        "0 8px 22px rgba(37,99,235,.30)",
    },
    "&.Mui-selected .MuiListItemIcon-root": {
      color: "#fff",
    },
  };

  const navigateTo = (path) => {
    setMobileDrawerOpen(false);
    navigate(path);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled((current) => {
      const next = !current;
      localStorage.setItem(
        "visitorpro_notifications_enabled",
        String(next)
      );

      toast.success(
        next
          ? "Notifications enabled."
          : "Notifications disabled."
      );

      return next;
    });
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        unread: false,
      }))
    );
    toast.success("All notifications marked as read.");
  };

  const markNotificationAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, unread: false }
          : item
      )
    );
  };

  const handleSwitchUser = async () => {
    if (!isAdmin) return;

    handleProfileClose();
    setSwitchLoading(true);

    try {
      const response = await getUsers();
      const users = response.data?.data || response.data || [];

      setSwitchUsers(
        users.filter(
          (item) =>
            Number(item.UserId) !== Number(user?.userId)
        )
      );

      setSwitchUserOpen(true);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setSwitchLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleProfileClose();
    handleNotificationClose();
    navigate("/login", { replace: true });
    toast.success("Logged out successfully.");
  };

  const renderNotificationIcon = (type) => {
    if (type === "success") {
      return <CheckCircleRoundedIcon />;
    }

    if (type === "warning") {
      return <WarningAmberRoundedIcon />;
    }

    return <PersonAddAlt1RoundedIcon />;
  };

  const renderNotificationStyles = (type) => {
    if (type === "success") {
      return {
        bgcolor: "#ECFDF5",
        color: "#16A34A",
      };
    }

    if (type === "warning") {
      return {
        bgcolor: "#FFF7ED",
        color: "#EA580C",
      };
    }

    return {
      bgcolor: "#EFF6FF",
      color: "#2563EB",
    };
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
       background:
  "linear-gradient(180deg,#0F172A 0%,#111827 100%)",
minHeight: "100vh",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar
          sx={{
            minHeight: 78,
            justifyContent: "center",
            px: 2,
          }}
        >
          <ShieldRoundedIcon
            sx={{
              fontSize: 38,
              color: "#60A5FA",
              mr: 1.2,
            }}
          />

          <Box>
            <Typography
  variant="h5"
  fontWeight={900}
  color="#FFFFFF"
  lineHeight={1}
>
  VisitorPro
</Typography>

            <Typography
              variant="caption"
              color="#64748B"
              sx={{ letterSpacing: 0.5 }}
            >
              VISITOR MANAGEMENT
            </Typography>
          </Box>
        </Toolbar>

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,.08)",
            mx: 2,
          }}
        />

        <Box sx={{ px: 2.5, pt: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#64748B",
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            MAIN MENU
          </Typography>
        </Box>

        <List sx={{ mt: 1 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              sx={menuItemStyle}
              selected={location.pathname === item.path}
              onClick={() => navigateTo(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight:
                    location.pathname === item.path
                      ? 800
                      : 600,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ px: 2.2, pb: 2.2 }}>
        <Box
          sx={{
            p: 1.7,
            borderRadius: 3,
            border:
              "1px solid rgba(96,165,250,.14)",
            bgcolor: "rgba(59,130,246,.06)",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            <ShieldRoundedIcon
              sx={{
                fontSize: 18,
                color: "#60A5FA",
              }}
            />

            <Typography
              variant="caption"
              color="#93C5FD"
              fontWeight={800}
            >
              SECURE ACCESS
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: "#94A3B8",
              mt: 0.7,
              lineHeight: 1.45,
            }}
          >
            Role-based visitor management
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F4F7FC",
      }}
    >
      <CssBaseline />

      {mobile ? (
        <Drawer
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: 0,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: 0,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) =>
            theme.zIndex.drawer + 1,
          ml: mobile ? 0 : `${drawerWidth}px`,
          width: mobile
            ? "100%"
            : `calc(100% - ${drawerWidth}px)`,
          bgcolor: "rgba(255,255,255,.92)",
          color: "#0F172A",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "72px !important",
            px: { xs: 1.5, sm: 2.5 },
            gap: 1,
          }}
        >
          {mobile && (
            <IconButton
              onClick={() =>
                setMobileDrawerOpen(true)
              }
              sx={{
                mr: 0.5,
                color: "#0F172A",
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          )}

          <Box
            sx={{
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={850}
              noWrap
            >
              {currentPageTitle}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Smart Visitor Management System
            </Typography>
          </Box>

          <Tooltip title="Previous page">
            <span>
              <IconButton
                onClick={() => navigate(-1)}
                disabled={
                  window.history.length <= 1
                }
                size="small"
              >
                <ArrowBackRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Next page">
            <span>
              <IconButton
                onClick={() => navigate(1)}
                disabled={
                  window.history.length <= 1
                }
                size="small"
              >
                <ArrowForwardRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip
            title={
              notificationsEnabled
                ? "Notifications"
                : "Notifications disabled"
            }
          >
            <IconButton
              onClick={(event) =>
                setNotificationAnchor(
                  event.currentTarget
                )
              }
              sx={{
                ml: 0.5,
              }}
            >
              <Badge
                badgeContent={
                  notificationsEnabled
                    ? unreadCount
                    : 0
                }
                color="error"
                max={99}
              >
                {notificationsEnabled ? (
                  <NotificationsRoundedIcon />
                ) : (
                  <NotificationsOffRoundedIcon />
                )}
              </Badge>
            </IconButton>
          </Tooltip>

          <Box
            onClick={(event) =>
              setProfileAnchor(event.currentTarget)
            }
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 3,
              px: 0.8,
              py: 0.5,
              ml: 0.5,
              transition: ".2s",
              "&:hover": {
                bgcolor: "#F1F5F9",
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#2563EB",
                width: 42,
                height: 42,
                fontWeight: 800,
              }}
            >
              {user?.fullName
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </Avatar>

            <Box
              sx={{
                mx: 1.2,
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <Typography
                fontWeight={750}
                lineHeight={1.2}
              >
                {user?.fullName || "User"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {getRoleName(user?.roleId)}
              </Typography>
            </Box>

            <KeyboardArrowDownRoundedIcon
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                color: "#64748B",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================= PROFILE MENU ================= */}

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
              minWidth: 245,
              borderRadius: 3,
              p: 1,
              border: "1px solid #E2E8F0",
              boxShadow:
                "0 20px 50px rgba(15,23,42,.15)",
            },
          },
        }}
      >
        <Box
          sx={{
            px: 1.5,
            py: 1.3,
            mb: 0.5,
          }}
        >
          <Typography
            fontWeight={800}
            noWrap
          >
            {user?.fullName || "User"}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            noWrap
          >
            {user?.email || ""}
          </Typography>
        </Box>

        <Divider sx={{ mb: 0.5 }} />

        <MenuItem
          onClick={() => {
            handleProfileClose();
            navigate("/profile");
          }}
          sx={{ borderRadius: 2 }}
        >
          <PersonRoundedIcon
            sx={{ mr: 1.5, fontSize: 20 }}
          />
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleProfileClose();
            navigate("/settings");
          }}
          sx={{ borderRadius: 2 }}
        >
          <SettingsRoundedIcon
            sx={{ mr: 1.5, fontSize: 20 }}
          />
          Settings
        </MenuItem>

        {isAdmin && (
          <MenuItem
            onClick={handleSwitchUser}
            disabled={switchLoading}
            sx={{ borderRadius: 2 }}
          >
            <GroupRoundedIcon
              sx={{ mr: 1.5, fontSize: 20 }}
            />
            {switchLoading
              ? "Loading users..."
              : "Switch User"}
          </MenuItem>
        )}

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: "error.main",
            fontWeight: 700,
          }}
        >
          <LogoutRoundedIcon
            sx={{ mr: 1.5, fontSize: 20 }}
          />
          Logout
        </MenuItem>
      </Menu>

      {/* ================= NOTIFICATION POPOVER ================= */}

      <Popover
        open={Boolean(notificationAnchor)}
        anchorEl={notificationAnchor}
        onClose={handleNotificationClose}
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
              mt: 1.2,
              width: {
                xs: "calc(100vw - 20px)",
                sm: 500,
              },
              maxWidth: "calc(100vw - 20px)",
              borderRadius: 3.5,
              overflow: "hidden",
              border: "1px solid #E2E8F0",
              boxShadow:
                "0 24px 70px rgba(15,23,42,.20)",
            },
          },
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2.1,
            background:
              "linear-gradient(135deg,#FFFFFF,#EFF6FF)",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
              >
                <Typography
                  fontWeight={850}
                  fontSize={20}
                >
                  Notifications
                </Typography>

                {unreadCount > 0 && (
                  <Box
                    sx={{
                      px: 0.9,
                      py: 0.25,
                      borderRadius: 2,
                      bgcolor: "#DBEAFE",
                      color: "#2563EB",
                      fontSize: 11,
                      fontWeight: 900,
                    }}
                  >
                    {unreadCount} NEW
                  </Box>
                )}
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.4 }}
              >
                You have{" "}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 800,
                    color: "#2563EB",
                  }}
                >
                  {unreadCount}
                </Box>{" "}
                unread notifications
              </Typography>
            </Box>

            <IconButton
              size="small"
              onClick={handleNotificationClose}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Stack
              direction="row"
              spacing={0.6}
            >
              {[
                ["all", "All"],
                ["unread", `Unread (${unreadCount})`],
                ["mentions", "Mentions"],
              ].map(([value, label]) => (
                <Button
                  key={value}
                  size="small"
                  onClick={() =>
                    setNotificationTab(value)
                  }
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 1.3,
                    minWidth: "auto",
                    fontWeight: 750,
                    bgcolor:
                      notificationTab === value
                        ? "#2563EB"
                        : "transparent",
                    color:
                      notificationTab === value
                        ? "#fff"
                        : "#64748B",
                    "&:hover": {
                      bgcolor:
                        notificationTab === value
                          ? "#1D4ED8"
                          : "#EAF2FF",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>

            <Button
  size="small"
  startIcon={<DoneAllRoundedIcon />}
  onClick={markAllAsRead}
  disabled={unreadCount === 0}
  sx={{
    textTransform: "none",
    fontWeight: 800,
    color:
      unreadCount > 0
        ? "#2563EB"
        : "#94A3B8",
    minWidth: "auto",
    whiteSpace: "nowrap",
    "&.Mui-disabled": {
      color: "#94A3B8",
    },
  }}
>
  Mark all as read
</Button>
          </Stack>
        </Box>

        {!notificationsEnabled ? (
          <Box
            sx={{
              py: 6,
              px: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 1.5,
                borderRadius: "50%",
                bgcolor: "#F1F5F9",
                display: "grid",
                placeItems: "center",
              }}
            >
              <NotificationsOffRoundedIcon
                sx={{
                  fontSize: 30,
                  color: "#64748B",
                }}
              />
            </Box>

            <Typography
              fontWeight={800}
              fontSize={16}
            >
              Notifications are turned off
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.6 }}
            >
              Enable notifications to receive visitor
              activity alerts.
            </Typography>

            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 2,
                textTransform: "none",
                borderRadius: 2,
              }}
              onClick={() =>
                setNotificationSettingsOpen(true)
              }
            >
              Enable notifications
            </Button>
          </Box>
        ) : visibleNotifications.length === 0 ? (
          <Box
            sx={{
              py: 6,
              px: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 1.5,
                borderRadius: "50%",
                bgcolor: "#ECFDF5",
                display: "grid",
                placeItems: "center",
              }}
            >
              <CheckCircleRoundedIcon
                sx={{
                  fontSize: 32,
                  color: "#16A34A",
                }}
              />
            </Box>

            <Typography
              fontWeight={800}
              fontSize={16}
            >
              {notificationTab === "mentions"
                ? "No mentions yet"
                : "You're all caught up"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.6 }}
            >
              {notificationTab === "mentions"
                ? "You don't have any notifications mentioning you."
                : "You have no unread notifications."}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              maxHeight: 430,
              overflowY: "auto",
              py: 0.5,
            }}
          >
            {visibleNotifications.map(
              (notification) => {
                const iconStyle =
                  renderNotificationStyles(
                    notification.type
                  );

                return (
                  <Box
                    key={notification.id}
                    sx={{
                      mx: 1.2,
                      my: 0.7,
                      px: 1.4,
                      py: 1.5,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.3,
                      borderRadius: 2.5,
                      bgcolor: notification.unread
                        ? "#F8FBFF"
                        : "#FFFFFF",
                      border: "1px solid",
                      borderColor: notification.unread
                        ? "#DBEAFE"
                        : "#F1F5F9",
                      transition: ".2s",
                      "&:hover": {
                        bgcolor: "#F1F7FF",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        mt: 1.1,
                        borderRadius: "50%",
                        bgcolor: notification.unread
                          ? "#2563EB"
                          : "transparent",
                        flexShrink: 0,
                      }}
                    />

                    <Avatar
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: 2.5,
                        flexShrink: 0,
                        ...iconStyle,
                      }}
                    >
                      {renderNotificationIcon(
                        notification.type
                      )}
                    </Avatar>

                    <Box
                      sx={{
                        flexGrow: 1,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        fontWeight={800}
                        fontSize={14.5}
                      >
                        {notification.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.35,
                          lineHeight: 1.45,
                        }}
                      >
                        {notification.description}
                      </Typography>

                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={0.5}
                        sx={{ mt: 0.7 }}
                      >
                        <AccessTimeRoundedIcon
                          sx={{
                            fontSize: 15,
                            color: "#94A3B8",
                          }}
                        />

                        <Typography
                          variant="caption"
                          color="#64748B"
                        >
                          {notification.time}
                        </Typography>
                      </Stack>
                    </Box>

                    {notification.unread && (
                      <Button
                        size="small"
                        onClick={() =>
                          markNotificationAsRead(
                            notification.id
                          )
                        }
                        sx={{
                          minWidth: "auto",
                          textTransform: "none",
                          fontSize: 11,
                          fontWeight: 750,
                          color: "#2563EB",
                        }}
                      >
                        Read
                      </Button>
                    )}
                  </Box>
                );
              }
            )}
          </Box>
        )}

        <Box
          sx={{
            px: 1.8,
            py: 1.4,
            borderTop: "1px solid #E2E8F0",
            bgcolor: "#F8FAFC",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Button
              size="small"
              startIcon={
                <NotificationsNoneRoundedIcon />
              }
              onClick={() => setNotificationTab("all")}
              sx={{
                textTransform: "none",
                fontWeight: 800,
                color: "#2563EB",
                borderRadius: 2,
              }}
            >
              View all notifications
            </Button>

            <Button
              size="small"
              startIcon={<SettingsRoundedIcon />}
              onClick={() =>
                setNotificationSettingsOpen(true)
              }
              sx={{
                textTransform: "none",
                fontWeight: 700,
                color: "#64748B",
                borderRadius: 2,
              }}
            >
              Settings
            </Button>
          </Stack>
        </Box>
      </Popover>

      {/* ================= SWITCH USER ================= */}

      <Dialog
        open={switchUserOpen}
        onClose={() => setSwitchUserOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
            boxShadow:
              "0 24px 70px rgba(15,23,42,.20)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 850,
            fontSize: 22,
          }}
        >
          Switch User
        </DialogTitle>

        <DialogContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Choose another account to continue with.
          </Typography>

          {switchUsers.length === 0 ? (
            <Box
              sx={{
                py: 4,
                textAlign: "center",
              }}
            >
              <Typography color="text.secondary">
                No other users available.
              </Typography>
            </Box>
          ) : (
            switchUsers.map((switchUser) => (
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
                  gap: 1.5,
                  p: 1.5,
                  mb: 1,
                  borderRadius: 2.5,
                  cursor: "pointer",
                  border: "1px solid #E2E8F0",
                  transition: ".2s",
                  "&:hover": {
                    bgcolor: "#F3F7FF",
                    borderColor: "#BFDBFE",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#2563EB",
                    fontWeight: 800,
                  }}
                >
                  {switchUser.FullName
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    fontWeight={750}
                    noWrap
                  >
                    {switchUser.FullName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                  >
                    {switchUser.Email}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setSwitchUserOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= NOTIFICATION SETTINGS ================= */}

      <Dialog
        open={notificationSettingsOpen}
        onClose={() =>
          setNotificationSettingsOpen(false)
        }
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 850,
          }}
        >
          Notification Settings
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              bgcolor: "#F8FAFC",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                >
                  <NotificationsRoundedIcon
                    sx={{ color: "#2563EB" }}
                  />

                  <Typography fontWeight={800}>
                    Receive notifications
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.7 }}
                >
                  Show visitor activity alerts in
                  the notification bell.
                </Typography>
              </Box>

              <Switch
                checked={notificationsEnabled}
                onChange={handleToggleNotifications}
              />
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setNotificationSettingsOpen(false)
            }
            sx={{ textTransform: "none" }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= MAIN CONTENT ================= */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: "72px",
          p: {
            xs: 1.5,
            sm: 2.5,
            md: 3,
          },
          minHeight: "100vh",
          width: mobile
            ? "100%"
            : `calc(100% - ${drawerWidth}px)`,
          background:
            "linear-gradient(180deg,#F8FAFC 0%,#EEF3FB 100%)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
