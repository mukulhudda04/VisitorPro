import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import toast from "react-hot-toast";
import api from "../../config/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(
    location.state?.switchUser
      ? location.state.email || ""
      : ""
  );

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        toast.success(response.data.message);

        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        px: { xs: 1.5, sm: 3 },
        py: { xs: 2, sm: 4 },
        background:
          "radial-gradient(circle at 10% 10%, rgba(37,99,235,.20), transparent 28%), radial-gradient(circle at 90% 90%, rgba(59,130,246,.18), transparent 30%), linear-gradient(135deg,#020617 0%,#0F172A 45%,#172554 100%)",
      }}
    >
      {/* Background decoration */}

      <Box
        sx={{
          position: "absolute",
          width: { xs: 260, md: 520 },
          height: { xs: 260, md: 520 },
          borderRadius: "50%",
          border: "1px solid rgba(147,197,253,.08)",
          top: { xs: -160, md: -250 },
          right: { xs: -120, md: -180 },
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: { xs: 220, md: 420 },
          height: { xs: 220, md: 420 },
          borderRadius: "50%",
          border: "1px solid rgba(147,197,253,.06)",
          bottom: { xs: -130, md: -220 },
          left: { xs: -120, md: -180 },
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 0, sm: 2 },
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 1180,
            mx: "auto",
            overflow: "hidden",
            borderRadius: {
              xs: 3,
              sm: 4,
              md: 5,
            },
            backgroundColor: "#fff",
            boxShadow:
              "0 35px 100px rgba(0,0,0,.45)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              minHeight: {
                md: 680,
              },
            }}
          >
            {/* =====================================================
                LEFT BRANDING PANEL
            ===================================================== */}

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "53%",
                },
                position: "relative",
                overflow: "hidden",
                color: "#fff",
                p: {
                  xs: 3,
                  sm: 4,
                  md: 6,
                },
                background:
                  "linear-gradient(145deg,#020617 0%,#0F1B3D 48%,#1D4ED8 100%)",
              }}
            >
              {/* Decorative circles */}

              <Box
                sx={{
                  position: "absolute",
                  width: 430,
                  height: 430,
                  borderRadius: "50%",
                  border:
                    "1px solid rgba(147,197,253,.10)",
                  top: -230,
                  right: -170,
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  border:
                    "1px solid rgba(147,197,253,.08)",
                  bottom: -170,
                  left: -140,
                  pointerEvents: "none",
                }}
              />

              {/* Logo */}

              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 54,
                    height: 54,
                    bgcolor: "#2563EB",
                    border:
                      "1px solid rgba(147,197,253,.35)",
                    boxShadow:
                      "0 12px 35px rgba(37,99,235,.40)",
                  }}
                >
                  <ShieldIcon sx={{ fontSize: 31 }} />
                </Avatar>

                <Box>
                  <Typography
                    fontSize={{ xs: 23, sm: 25 }}
                    fontWeight={850}
                    lineHeight={1}
                    letterSpacing="-0.6px"
                  >
                    VisitorPro
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 10,
                      letterSpacing: 1.2,
                      color: "#93C5FD",
                      fontWeight: 700,
                    }}
                  >
                    VISITOR MANAGEMENT SYSTEM
                  </Typography>
                </Box>
              </Stack>

              {/* Main text */}

              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  mt: {
                    xs: 4,
                    sm: 5,
                    md: 7,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 30,
                      sm: 38,
                      md: 46,
                    },
                    fontWeight: 850,
                    lineHeight: 1.08,
                    letterSpacing: "-1.8px",
                  }}
                >
                  Smarter visitor
                  <br />
                  <Box
                    component="span"
                    sx={{
                      color: "#60A5FA",
                    }}
                  >
                    management.
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    maxWidth: 520,
                    color: "#CBD5E1",
                    lineHeight: 1.75,
                    fontSize: {
                      xs: 14,
                      sm: 15,
                    },
                  }}
                >
                  Manage visitors, monitor active
                  visits and keep your workplace
                  secure — all from one powerful
                  dashboard.
                </Typography>
              </Box>

              {/* Security visual */}

              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  height: {
                    xs: 190,
                    sm: 220,
                    md: 245,
                  },
                  mt: {
                    xs: 3,
                    md: 4,
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: 145,
                      sm: 175,
                      md: 195,
                    },
                    height: {
                      xs: 145,
                      sm: 175,
                      md: 195,
                    },
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    border:
                      "1px solid rgba(147,197,253,.28)",
                    background:
                      "radial-gradient(circle,rgba(59,130,246,.20),rgba(15,23,42,.04))",
                    boxShadow:
                      "0 0 65px rgba(59,130,246,.14)",
                  }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: 95,
                        sm: 115,
                        md: 130,
                      },
                      height: {
                        xs: 95,
                        sm: 115,
                        md: 130,
                      },
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "rgba(59,130,246,.14)",
                      border:
                        "1px solid rgba(147,197,253,.25)",
                    }}
                  >
                    <ShieldIcon
                      sx={{
                        fontSize: {
                          xs: 48,
                          sm: 57,
                          md: 68,
                        },
                        color: "#60A5FA",
                      }}
                    />
                  </Box>

                  {/* Active visitor floating card */}

                  <Paper
                    elevation={0}
                    sx={{
                      position: "absolute",
                      top: {
                        xs: -4,
                        sm: 0,
                      },
                      right: {
                        xs: -60,
                        sm: -85,
                        md: -110,
                      },
                      px: 1.5,
                      py: 1,
                      borderRadius: 2.5,
                      color: "#fff",
                      background:
                        "rgba(255,255,255,.09)",
                      backdropFilter: "blur(14px)",
                      border:
                        "1px solid rgba(255,255,255,.15)",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <PeopleAltOutlinedIcon
                        sx={{
                          fontSize: 20,
                          color: "#93C5FD",
                        }}
                      />

                      <Box>
                        <Typography
                          fontSize={9.5}
                          color="#CBD5E1"
                        >
                          Active Visitors
                        </Typography>

                        <Typography
                          fontWeight={850}
                          fontSize={15}
                        >
                          24
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Secure card */}

                  <Paper
                    elevation={0}
                    sx={{
                      position: "absolute",
                      bottom: {
                        xs: -3,
                        sm: 0,
                      },
                      left: {
                        xs: -55,
                        sm: -80,
                        md: -110,
                      },
                      px: 1.5,
                      py: 1,
                      borderRadius: 2.5,
                      color: "#fff",
                      background:
                        "rgba(255,255,255,.09)",
                      backdropFilter: "blur(14px)",
                      border:
                        "1px solid rgba(255,255,255,.15)",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <VerifiedUserOutlinedIcon
                        sx={{
                          fontSize: 19,
                          color: "#4ADE80",
                        }}
                      />

                      <Typography
                        fontSize={11.5}
                        fontWeight={650}
                      >
                        Secure & Protected
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              </Box>

              {/* Feature badges */}

              <Stack
                direction="row"
                spacing={2.5}
                flexWrap="wrap"
                useFlexGap
                sx={{
                  position: "relative",
                  zIndex: 2,
                  mt: 1,
                }}
              >
                <Stack
                  direction="row"
                  spacing={0.7}
                  alignItems="center"
                >
                  <SecurityOutlinedIcon
                    sx={{
                      fontSize: 18,
                      color: "#93C5FD",
                    }}
                  />

                  <Typography
                    fontSize={12}
                    color="#CBD5E1"
                  >
                    Secure Access
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.7}
                  alignItems="center"
                >
                  <VerifiedUserOutlinedIcon
                    sx={{
                      fontSize: 18,
                      color: "#86EFAC",
                    }}
                  />

                  <Typography
                    fontSize={12}
                    color="#CBD5E1"
                  >
                    Role Based
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            {/* =====================================================
                RIGHT LOGIN PANEL
            ===================================================== */}

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "47%",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: {
                  xs: 3,
                  sm: 5,
                  md: 6,
                },
                bgcolor: "#fff",
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  maxWidth: 425,
                  p: "0 !important",
                }}
              >
                {/* Login heading */}

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  mb={1.5}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#EFF6FF",
                      color: "#2563EB",
                    }}
                  >
                    <LockRoundedIcon />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 27,
                          sm: 31,
                        },
                        fontWeight: 850,
                        color: "#0F172A",
                        letterSpacing: "-1px",
                        lineHeight: 1.1,
                      }}
                    >
                      Welcome back
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  color="#64748B"
                  sx={{
                    mb: 3.5,
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  Sign in to continue to your
                  VisitorPro dashboard.
                </Typography>

                {/* Switch user */}

                {location.state?.switchUser && (
                  <Alert
                    severity="info"
                    sx={{
                      mb: 2.5,
                      borderRadius: 2.5,
                      alignItems: "center",
                    }}
                  >
                    Sign in to switch to this
                    account.
                  </Alert>
                )}

                {/* Email */}

                <TextField
                  fullWidth
                  required
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  placeholder="you@example.com"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      backgroundColor: "#F8FAFC",
                      transition: "all .2s ease",
                      "&:hover": {
                        backgroundColor: "#F1F5F9",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        boxShadow:
                          "0 0 0 3px rgba(37,99,235,.10)",
                      },
                    },
                  }}
                />

                {/* Password */}

                <TextField
                  fullWidth
                  required
                  label="Password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      backgroundColor: "#F8FAFC",
                      transition: "all .2s ease",
                      "&:hover": {
                        backgroundColor: "#F1F5F9",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        boxShadow:
                          "0 0 0 3px rgba(37,99,235,.10)",
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() =>
                            setShowPassword(
                              (prev) => !prev
                            )
                          }
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          sx={{
                            color: "#64748B",
                            "&:hover": {
                              color: "#2563EB",
                              bgcolor: "#EFF6FF",
                            },
                          }}
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Login button */}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  onClick={handleLogin}
                  startIcon={
                    !loading && (
                      <LoginRoundedIcon />
                    )
                  }
                  sx={{
                    mt: 3,
                    minHeight: 54,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontSize: 15.5,
                    fontWeight: 800,
                    background:
                      "linear-gradient(90deg,#2563EB,#3B82F6)",
                    boxShadow:
                      "0 12px 28px rgba(37,99,235,.25)",
                    transition:
                      "transform .2s ease, box-shadow .2s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg,#1D4ED8,#2563EB)",
                      transform:
                        "translateY(-1px)",
                      boxShadow:
                        "0 16px 34px rgba(37,99,235,.32)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                    "&.Mui-disabled": {
                      color: "#fff",
                      background:
                        "linear-gradient(90deg,#93C5FD,#60A5FA)",
                    },
                  }}
                >
                  {loading
                    ? "Signing in..."
                    : "Sign in to VisitorPro"}
                </Button>

                {/* Security information */}

                <Divider sx={{ my: 3 }} />

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.8}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      fontSize: 17,
                      color: "#16A34A",
                    }}
                  />

                  <Typography
                    fontSize={12}
                    color="#64748B"
                  >
                    Protected workplace access
                  </Typography>
                </Stack>

                <Typography
                  align="center"
                  sx={{
                    mt: 2,
                    fontSize: 11.5,
                    color: "#94A3B8",
                  }}
                >
                  © {new Date().getFullYear()}{" "}
                  VisitorPro · All rights reserved
                </Typography>
              </CardContent>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;