import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Snackbar,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CheckCircleRounded,
  DarkModeRounded,
  LightModeRounded,
  NotificationsRounded,
  PaletteRounded,
  RestartAltRounded,
  SettingsRounded,
} from "@mui/icons-material";

const Settings = () => {
  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === "dark";

  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("visitorpro_theme") || "light"
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("visitorpro_notifications_enabled") !== "false"
  );

  const [saved, setSaved] = useState(false);

  const changeTheme = (mode) => {
    setThemeMode(mode);
    localStorage.setItem("visitorpro_theme", mode);

    window.dispatchEvent(
      new CustomEvent("visitorpro-theme-change", {
        detail: mode,
      })
    );

    setSaved(true);
  };

  const handleNotifications = (event) => {
    const enabled = event.target.checked;

    setNotifications(enabled);

    localStorage.setItem(
      "visitorpro_notifications_enabled",
      String(enabled)
    );

    window.dispatchEvent(
      new CustomEvent("visitorpro-notification-preference-change", {
        detail: enabled,
      })
    );

    setSaved(true);
  };

  const resetSettings = () => {
    setThemeMode("light");
    setNotifications(true);

    localStorage.setItem("visitorpro_theme", "light");
    localStorage.setItem(
      "visitorpro_notifications_enabled",
      "true"
    );

    window.dispatchEvent(
      new CustomEvent("visitorpro-theme-change", {
        detail: "light",
      })
    );

    window.dispatchEvent(
      new CustomEvent("visitorpro-notification-preference-change", {
        detail: true,
      })
    );

    setSaved(true);
  };

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      description: "Bright and clean workspace",
      icon: <LightModeRounded />,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Comfortable low-light interface",
      icon: <DarkModeRounded />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        bgcolor: "background.default",
        color: "text.primary",
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 1, sm: 2, md: 3 },
      }}
    >
      {/* Page heading */}
      <Box sx={{ mb: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              display: "grid",
              placeItems: "center",
              bgcolor: "primary.main",
              color: "#fff",
              boxShadow: "0 10px 24px rgba(37,99,235,.22)",
            }}
          >
            <SettingsRounded />
          </Box>

          <Box>
            <Typography
              variant="h5"
              fontWeight={900}
              color="text.primary"
            >
              Settings
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.3 }}
            >
              Personalize your VisitorPro experience.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Appearance */}
      <Card
        elevation={0}
        sx={{
          mb: 2.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: { xs: 2.2, sm: 3 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            gap={2}
            sx={{ mb: 2.5 }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <PaletteRounded
                  sx={{ color: "primary.main" }}
                />
                <Typography
                  variant="h6"
                  fontWeight={850}
                  color="text.primary"
                >
                  Appearance
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.6 }}
              >
                Choose the interface style you prefer.
              </Typography>
            </Box>

            <Chip
              label={themeMode === "dark" ? "Dark mode" : "Light mode"}
              size="small"
              icon={
                themeMode === "dark"
                  ? <DarkModeRounded />
                  : <LightModeRounded />
              }
              sx={{
                fontWeight: 750,
                bgcolor: "action.hover",
              }}
            />
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
          >
            {themeOptions.map((option) => {
              const selected = themeMode === option.value;

              return (
                <Button
                  key={option.value}
                  onClick={() => changeTheme(option.value)}
                  variant={selected ? "contained" : "outlined"}
                  startIcon={option.icon}
                  sx={{
                    flex: 1,
                    minHeight: 64,
                    justifyContent: "flex-start",
                    textTransform: "none",
                    borderRadius: 2.5,
                    px: 2,
                    fontWeight: 800,
                    textAlign: "left",
                  }}
                >
                  <Box sx={{ ml: 0.5 }}>
                    <Typography
                      component="span"
                      sx={{
                        display: "block",
                        fontWeight: 850,
                        lineHeight: 1.2,
                      }}
                    >
                      {option.label}
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        display: "block",
                        mt: 0.35,
                        fontSize: 11,
                        opacity: 0.78,
                        fontWeight: 500,
                      }}
                    >
                      {option.description}
                    </Typography>
                  </Box>
                </Button>
              );
            })}
          </Stack>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card
        elevation={0}
        sx={{
          mb: 2.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <CardContent sx={{ p: { xs: 2.2, sm: 3 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 2.5,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: isDark
                    ? "rgba(37,99,235,.14)"
                    : "#EFF6FF",
                  color: "primary.main",
                }}
              >
                <NotificationsRounded />
              </Box>

              <Box>
                <Typography
                  fontWeight={850}
                  color="text.primary"
                >
                  Notifications
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.3 }}
                >
                  Receive visitor and system activity alerts.
                </Typography>
              </Box>
            </Stack>

            <Switch
              checked={notifications}
              onChange={handleNotifications}
              inputProps={{
                "aria-label": "Enable notifications",
              }}
            />
          </Stack>

          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: "action.hover",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <CheckCircleRounded
                sx={{
                  fontSize: 18,
                  color: notifications
                    ? "success.main"
                    : "text.disabled",
                }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {notifications
                  ? "Notifications are enabled for this account."
                  : "Notifications are currently disabled."}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 2.5 }} />

      {/* Reset */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        gap={2}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Preferences are saved automatically on this device.
        </Typography>

        <Button
          variant="outlined"
          color="inherit"
          startIcon={<RestartAltRounded />}
          onClick={resetSettings}
          sx={{
            alignSelf: { xs: "flex-start", sm: "auto" },
            textTransform: "none",
            fontWeight: 800,
            borderRadius: 2.5,
          }}
        >
          Reset Settings
        </Button>
      </Stack>

      <Snackbar
        open={saved}
        autoHideDuration={1800}
        onClose={() => setSaved(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSaved(false)}
          sx={{ fontWeight: 700 }}
        >
          Settings saved successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
