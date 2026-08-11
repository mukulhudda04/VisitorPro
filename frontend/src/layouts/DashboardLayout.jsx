import { useEffect, useMemo, useState } from "react";
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
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoginIcon from "@mui/icons-material/Login";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShieldIcon from "@mui/icons-material/Shield";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";

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
    background: "linear-gradient(90deg,#3B82F6,#2563EB)",
    color: "#fff",
    transform: "translateX(4px)",
    boxShadow: "0 8px 18px rgba(37,99,235,.35)",
  },

  "&:hover .MuiListItemIcon-root": {
    color: "#fff",
  },

  "&.Mui-selected": {
    background: "linear-gradient(90deg,#3B82F6,#2563EB)",
    color: "#fff",
    boxShadow: "0 8px 18px rgba(37,99,235,.35)",
  },

  "&.Mui-selected .MuiListItemIcon-root": {
    color: "#fff",
  },
};

const notificationSeed = [
  {
    id: 1,
    title: "New visitor registered",
    description: "A new visitor has been added to the system.",
    time: "Just now",
    type: "visitor",
    unread: true,
  },
  {
    id: 2,
    title: "Visitor checked in",
    description: "A visitor has successfully checked in.",
    time: "10 minutes ago",
    type: "success",
    unread: true,
  },
  {
    id: 3,
    title: "Visit requires attention",
    description: "An active visit needs your attention.",
    time: "25 minutes ago",
    type: "warning",
    unread: true,
  },
];

const getRoleName = (roleId) => {
  const roles = {
    1: "Administrator",
    2: "Security User",
    3: "Reception User",
  };

  return roles[Number(roleId)] || "User";
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const isAdmin = Number(user?.roleId) === 1;
  const mobile = useMediaQuery("(max-width:900px)");

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const [notifications, setNotifications] = useState(notificationSeed);
  const [notificationTab, setNotificationTab] = useState("all");

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem("visitorpro_notifications_enabled") !== "false";
  });

  const [notificationSettingsOpen, setNotificationSettingsOpen] =
    useState(false);

  const [switchUserOpen, setSwitchUserOpen] = useState(false);
  const [switchUsers, setSwitchUsers] = useState([]);
  const [switchLoading, setSwitchLoading] = useState(false);

  const unreadCount = notifications.filter((item) => item.unread).length;

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/visitors": "Visitors",
    "/active-visits": "Active Visits",
    "/checkin": "Check In",
    "/visit-history": "Visit History",
    "/users": "Users",
    "/profile": "My Profile",
  };

  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  const handleProfileOpen = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleMarkAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled((current) => {
      const next = !current;
      localStorage.setItem(
        "visitorpro_notifications_enabled",
        String(next)
      );
      return next;
    });
  };

  const handleSwitchUser = async () => {
    handleProfileClose();
    setSwitchLoading(true);

    try {
      const response = await getUsers();
      setSwitchUsers(response.data || []);
      setSwitchUserOpen(true);
    } catch (error) {
      console.error("Failed to load users:", error);
      setSwitchUsers([]);
      setSwitchUserOpen(true);
    } finally {
      setSwitchLoading(false);
    }
  };

  const handleLogout = () => {
    handleProfileClose();
    setNotificationAnchor(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleSwitchToUser = (switchUser) => {
    setSwitchUserOpen(false);

    navigate("/login", {
      state: {
        switchUser: true,
        email: switchUser.Email,
      },
    });
  };

  const navigateTo = (path) => {
    navigate(path);
    setMobileDrawerOpen(false);
  };

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    }
  };

  const goForward = () => {
    window.history.forward();
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  const renderNotificationIcon = (type) => {
    if (type === "visitor") {
      return <PersonAddAlt1RoundedIcon />;
    }

    if (type === "success") {
      return <CheckCircleRoundedIcon />;
    }

    return <WarningAmberRoundedIcon />;
  };

  const renderNotificationStyles = (type) => {
    if (type === "visitor") {
      return {
        bgcolor: "#EFF6FF",
        color: "#2563EB",
      };
    }

    if (type === "success") {
      return {
        bgcolor: "#ECFDF5",
        color: "#16A34A",
      };
    }

    return {
      bgcolor: "#FFF7ED",
      color: "#EA580C",
    };
  };

  const visibleNotifications =
    notificationTab === "unread"
      ? notifications.filter((item) => item.unread)
      : notificationTab === "mentions"
        ? []
        : notifications;

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Visitors",
      path: "/visitors",
      icon: <PeopleIcon />,
    },
    {
      label: "Active Visits",
      path: "/active-visits",
      icon: <VisibilityIcon />,
    },
    {
      label: "Check In",
      path: "/checkin",
      icon: <LoginIcon />,
    },
    {
      label: "Visit History",
      path: "/visit-history",
      icon: <HistoryIcon />,
    },
    {
      label: "Users",
      path: "/users",
      icon: <GroupIcon />,
    },
  ];

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(180deg,#111827,#0F172A)",
      }}
    >
      <Box>
        <Toolbar
          sx={{
            py: 2,
            minHeight: 78,
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
            sx={{ color: "#FFFFFF" }}
          >
            VisitorPro
          </Typography>
        </Toolbar>

        <Divider sx={{ borderColor: "#1F2937" }} />

        <List sx={{ mt: 2 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              sx={menuItemStyle}
              selected={location.pathname === item.path}
              onClick={() => navigateTo(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,.08)",
            bgcolor: "rgba(255,255,255,.04)",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#93C5FD", fontWeight: 700 }}
          >
            SECURE ACCESS
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#CBD5E1", mt: 0.5 }}
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

      {/* ================= SIDEBAR ================= */}

      {mobile ? (
        <Drawer
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
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
              borderRight: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* ================= TOP NAVBAR ================= */}

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: mobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          ml: mobile ? 0 : `${drawerWidth}px`,
          bgcolor: "#FFFFFF",
          color: "#111827",
          borderBottom: "1px solid #E5E7EB",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            minHeight: 72,
            px: { xs: 1.5, sm: 2.5 },
          }}
        >
          <IconButton
            onClick={() => setMobileDrawerOpen(true)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              mr: 1,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Tooltip title="Go back">
              <IconButton
                onClick={goBack}
                size="small"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                <ArrowBackRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Go forward">
              <IconButton
                onClick={goForward}
                size="small"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                <ArrowForwardRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              ml: { xs: 0.5, sm: 1.5 },
              flexGrow: 1,
              fontSize: { xs: "1.1rem", sm: "1.5rem" },
            }}
          >
            {pageTitle}
          </Typography>

          {/* ================= NOTIFICATIONS ================= */}

          <IconButton
            onClick={handleNotificationOpen}
            sx={{
              mr: { xs: 0.5, sm: 1.5 },
              p: { xs: 0.75, sm: 1 },
              borderRadius: 2.5,
              "&:hover": {
                bgcolor: "#F3F6FB",
              },
            }}
          >
            <Badge
              badgeContent={
                notificationsEnabled && unreadCount > 0
                  ? unreadCount
                  : undefined
              }
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "10px",
                  minWidth: 18,
                  height: 18,
                },
              }}
            >
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          {/* ================= PROFILE ================= */}

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
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>

            <Box
              sx={{
                mr: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              <Typography fontWeight={700} lineHeight={1.2}>
                {user?.fullName || "User"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {getRoleName(user?.roleId)}
              </Typography>
            </Box>

            <KeyboardArrowDownIcon
              sx={{
                display: { xs: "none", sm: "block" },
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
          <PersonRoundedIcon sx={{ mr: 1.5, fontSize: 20 }} />
          Profile
        </MenuItem>

        {isAdmin && (
          <MenuItem onClick={handleSwitchUser} disabled={switchLoading}>
            <GroupIcon sx={{ mr: 1.5, fontSize: 20 }} />
            {switchLoading ? "Loading users..." : "Switch User"}
          </MenuItem>
        )}

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "error.main",
            fontWeight: 600,
          }}
        >
          <LogoutRoundedIcon sx={{ mr: 1.5, fontSize: 20 }} />
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
              mt: 1.5,
              width: {
                xs: "calc(100vw - 20px)",
                sm: 520,
              },
              maxWidth: "calc(100vw - 20px)",
              borderRadius: 3.5,
              overflow: "hidden",
              border: "1px solid #E2E8F0",
              boxShadow: "0 20px 60px rgba(15,23,42,.18)",
            },
          },
        }}
      >
        {/* Notification Header */}

        <Box
          sx={{
            px: 2.5,
            py: 2.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background:
              "linear-gradient(135deg,#FFFFFF,#F8FAFC)",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <Box>
            <Typography
              fontWeight={800}
              fontSize={20}
              color="#0F172A"
            >
              Notifications
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.4 }}
            >
              You have{" "}
              <Box
                component="span"
                sx={{
                  color: "#2563EB",
                  fontWeight: 800,
                }}
              >
                {unreadCount}
              </Box>{" "}
              unread notifications
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Button
              onClick={handleMarkAllRead}
              size="small"
              disabled={!notificationsEnabled || unreadCount === 0}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                color: "#2563EB",
              }}
            >
              Mark all as read
            </Button>

            <Tooltip title="Notification settings">
              <IconButton
                size="small"
                onClick={() => setNotificationSettingsOpen(true)}
                sx={{
                  bgcolor: "#F1F5F9",
                  width: 38,
                  height: 38,
                  "&:hover": {
                    bgcolor: "#E2E8F0",
                  },
                }}
              >
                <SettingsRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Tabs */}

        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          {[
            ["all", "All"],
            ["unread", `Unread (${unreadCount})`],
            ["mentions", "Mentions"],
          ].map(([value, label]) => (
            <Box
              key={value}
              onClick={() => setNotificationTab(value)}
              sx={{
                flex: 1,
                textAlign: "center",
                py: 1.5,
                color:
                  notificationTab === value
                    ? "#2563EB"
                    : "#475569",
                fontWeight:
                  notificationTab === value ? 700 : 600,
                cursor: "pointer",
                borderBottom:
                  notificationTab === value
                    ? "3px solid #2563EB"
                    : "3px solid transparent",
                transition: ".2s",

                "&:hover": {
                  color: "#2563EB",
                  bgcolor: "#F8FAFC",
                },
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        {/* Notifications disabled */}

        {!notificationsEnabled && (
          <Box
            sx={{
              py: 6,
              px: 3,
              textAlign: "center",
            }}
          >
            <NotificationsOffRoundedIcon
              sx={{
                fontSize: 46,
                color: "#94A3B8",
                mb: 1,
              }}
            />

            <Typography
              fontWeight={700}
              color="#0F172A"
            >
              Notifications are turned off
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.6 }}
            >
              Open notification settings to turn them back on.
            </Typography>
          </Box>
        )}

        {/* Mentions empty state */}

        {notificationsEnabled &&
          notificationTab === "mentions" && (
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
                  bgcolor: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NotificationsNoneIcon
                  sx={{
                    fontSize: 30,
                    color: "#2563EB",
                  }}
                />
              </Box>

              <Typography
                fontWeight={700}
                fontSize={16}
                color="#0F172A"
              >
                No mentions yet
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.6 }}
              >
                You don't have any notifications mentioning you.
              </Typography>
            </Box>
          )}

        {/* Unread empty state */}

        {notificationsEnabled &&
          notificationTab === "unread" &&
          visibleNotifications.length === 0 && (
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                fontWeight={700}
                fontSize={16}
                color="#0F172A"
              >
                You're all caught up
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.6 }}
              >
                You have no unread notifications.
              </Typography>
            </Box>
          )}

        {/* All notifications */}

        {notificationsEnabled &&
          notificationTab !== "mentions" &&
          visibleNotifications.map((notification) => {
            const iconStyle = renderNotificationStyles(
              notification.type
            );

            return (
              <Box
                key={notification.id}
                sx={{
                  mx: 1.5,
                  mt: 1.5,
                  px: 1.5,
                  py: 1.8,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  borderRadius: 2.5,
                  bgcolor: notification.unread
                    ? "#F8FBFF"
                    : "#FFFFFF",
                  border:
                    "1px solid transparent",
                  transition: ".2s",

                  "&:hover": {
                    bgcolor: "#F1F7FF",
                    borderColor: "#DBEAFE",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: notification.unread
                      ? "#2563EB"
                      : "transparent",
                    flexShrink: 0,
                  }}
                />

                <Avatar
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2.5,
                    ...iconStyle,
                  }}
                >
                  {renderNotificationIcon(notification.type)}
                </Avatar>

                <Box
                  sx={{
                    flexGrow: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    fontWeight={800}
                    fontSize={15}
                    color="#0F172A"
                  >
                    {notification.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.4,
                      lineHeight: 1.45,
                    }}
                  >
                    {notification.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.6,
                      mt: 0.8,
                    }}
                  >
                    <AccessTimeRoundedIcon
                      sx={{
                        fontSize: 16,
                        color: "#94A3B8",
                      }}
                    />

                    <Typography
                      variant="caption"
                      color="#64748B"
                    >
                      {notification.time}
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  size="small"
                  onClick={() => {
                    setNotifications((current) =>
                      current.map((item) =>
                        item.id === notification.id
                          ? { ...item, unread: false }
                          : item
                      )
                    );
                  }}
                  sx={{
                    color: "#64748B",
                    "&:hover": {
                      bgcolor: "#EAF2FF",
                      color: "#2563EB",
                    },
                  }}
                >
                  <ArrowForwardIosRoundedIcon
                    sx={{ fontSize: 15 }}
                  />
                </IconButton>
              </Box>
            );
          })}

        {/* Footer */}

        <Box
          sx={{
            px: 2,
            py: 1.5,
            mt: 1.5,
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="medium"
            startIcon={<NotificationsNoneIcon />}
            onClick={() => setNotificationTab("all")}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              color: "#2563EB",
              fontSize: 14,
              borderRadius: 2,

              "&:hover": {
                bgcolor: "#EFF6FF",
              },
            }}
          >
            All notifications
          </Button>
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
            boxShadow: "0 20px 60px rgba(15,23,42,.18)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            fontSize: "22px",
            pb: 1,
          }}
        >
          Switch User
        </DialogTitle>

        <DialogContent>
          {switchUsers.filter(
            (switchUser) =>
              switchUser.UserId !== user?.UserId
          ).length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 2 }}>
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
                    onClick={() =>
                      handleSwitchToUser(switchUser)
                    }
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      mb: 1,
                      borderRadius: 2.5,
                      cursor: "pointer",
                      border: "1px solid #E5E7EB",
                      transition: ".2s",

                      "&:hover": {
                        bgcolor: "#F3F6FB",
                        borderColor: "#BFDBFE",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#2563EB",
                      }}
                    >
                      {switchUser.FullName
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </Avatar>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={700}>
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

      {/* ================= NOTIFICATION SETTINGS ================= */}

      <Dialog
        open={notificationSettingsOpen}
        onClose={() => setNotificationSettingsOpen(false)}
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
            fontWeight: 800,
          }}
        >
          Notification Settings
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              p: 2,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              bgcolor: "#F8FAFC",
            }}
          >
            <Box>
              <Typography fontWeight={700}>
                Receive notifications
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.4 }}
              >
                Show visitor activity alerts in the notification bell.
              </Typography>
            </Box>

            <Button
              variant={
                notificationsEnabled
                  ? "contained"
                  : "outlined"
              }
              onClick={handleToggleNotifications}
              sx={{
                minWidth: 76,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              {notificationsEnabled ? "ON" : "OFF"}
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setNotificationSettingsOpen(false)
            }
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
          p: { xs: 1.5, sm: 3 },
          minHeight: "100vh",
          width: mobile
            ? "100%"
            : `calc(100% - ${drawerWidth}px)`,
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