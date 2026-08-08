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
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #020617 0%, #0F1B3D 45%, #1D4ED8 100%)",
        px: {
          xs: 1.5,
          sm: 3,
        },
        py: {
          xs: 2,
          sm: 4,
        },
      }}
    >
      {/* ================= BACKGROUND GLOW ================= */}

      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 280,
            md: 550,
          },
          height: {
            xs: 280,
            md: 550,
          },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,.28) 0%, rgba(59,130,246,0) 70%)",
          top: {
            xs: -130,
            md: -240,
          },
          right: {
            xs: -100,
            md: -160,
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,.18) 0%, rgba(37,99,235,0) 70%)",
          bottom: -220,
          left: -160,
        }}
      />

      {/* ================= MAIN CONTAINER ================= */}

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Card
          elevation={0}
          sx={{
            maxWidth: 1120,
            mx: "auto",
            overflow: "hidden",
            borderRadius: {
              xs: 3,
              md: 5,
            },
            background: "#FFFFFF",
            boxShadow:
              "0 35px 100px rgba(0,0,0,.38)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              minHeight: {
                xs: "auto",
                md: 650,
              },
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            {/* ================================================= */}
            {/* LEFT SIDE */}
            {/* ================================================= */}

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "52%",
                },
                position: "relative",
                overflow: "hidden",
                p: {
                  xs: 3,
                  sm: 5,
                  md: 6,
                },
                color: "#FFFFFF",
                background:
                  "linear-gradient(145deg, #0B1225 0%, #172554 58%, #2563EB 100%)",
              }}
            >
              {/* Decorative rings */}

              <Box
                sx={{
                  position: "absolute",
                  width: 310,
                  height: 310,
                  borderRadius: "50%",
                  border:
                    "1px solid rgba(147,197,253,.12)",
                  top: -145,
                  right: -100,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  width: 210,
                  height: 210,
                  borderRadius: "50%",
                  border:
                    "1px solid rgba(147,197,253,.10)",
                  bottom: -110,
                  left: -100,
                }}
              />

              {/* Logo */}

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Avatar
                  sx={{
                    width: 54,
                    height: 54,
                    bgcolor: "#3B82F6",
                    boxShadow:
                      "0 12px 30px rgba(59,130,246,.35)",
                  }}
                >
                  <ShieldIcon
                    sx={{
                      fontSize: 32,
                    }}
                  />
                </Avatar>

                <Box>
                  <Typography
                    fontSize={24}
                    fontWeight={800}
                    lineHeight={1}
                    letterSpacing="-.5px"
                  >
                    VisitorPro
                  </Typography>

                  <Typography
                    fontSize={11}
                    color="#93C5FD"
                    sx={{
                      mt: 0.5,
                      letterSpacing: ".7px",
                    }}
                  >
                    VISITOR MANAGEMENT
                  </Typography>
                </Box>
              </Box>

              {/* Main heading */}

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  mt: {
                    xs: 4,
                    md: 7,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 30,
                      sm: 36,
                      md: 44,
                    },
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: "-1.5px",
                    maxWidth: 500,
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
                    color: "#CBD5E1",
                    lineHeight: 1.75,
                    maxWidth: 500,
                    fontSize: 15,
                  }}
                >
                  Manage visitors, monitor active
                  visits and keep your workplace
                  secure — all from one powerful
                  dashboard.
                </Typography>
              </Box>

              {/* ================= DASHBOARD VISUAL ================= */}

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  mt: {
                    xs: 4,
                    md: 5,
                  },
                  height: {
                    xs: 190,
                    md: 220,
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Main security circle */}

                <Box
                  sx={{
                    width: {
                      xs: 150,
                      md: 190,
                    },
                    height: {
                      xs: 150,
                      md: 190,
                    },
                    borderRadius: "50%",
                    border:
                      "1px solid rgba(147,197,253,.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    background:
                      "radial-gradient(circle, rgba(59,130,246,.18), rgba(15,23,42,.05))",
                    boxShadow:
                      "0 0 50px rgba(59,130,246,.12)",
                  }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: 100,
                        md: 125,
                      },
                      height: {
                        xs: 100,
                        md: 125,
                      },
                      borderRadius: "50%",
                      background:
                        "rgba(59,130,246,.15)",
                      border:
                        "1px solid rgba(147,197,253,.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ShieldIcon
                      sx={{
                        fontSize: {
                          xs: 50,
                          md: 65,
                        },
                        color: "#60A5FA",
                      }}
                    />
                  </Box>

                  {/* Active Visitors card */}

                  <Paper
                    elevation={0}
                    sx={{
                      position: "absolute",
                      top: {
                        xs: -8,
                        md: 0,
                      },
                      right: {
                        xs: -75,
                        md: -105,
                      },
                      px: 1.5,
                      py: 1,
                      borderRadius: 2.5,
                      background:
                        "rgba(255,255,255,.10)",
                      backdropFilter:
                        "blur(14px)",
                      border:
                        "1px solid rgba(255,255,255,.16)",
                      color: "#FFFFFF",
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
                          fontSize={10}
                          color="#CBD5E1"
                        >
                          Active Visitors
                        </Typography>

                        <Typography
                          fontWeight={800}
                          fontSize={15}
                        >
                          24
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Security card */}

                  <Paper
                    elevation={0}
                    sx={{
                      position: "absolute",
                      bottom: {
                        xs: -5,
                        md: 0,
                      },
                      left: {
                        xs: -70,
                        md: -105,
                      },
                      px: 1.5,
                      py: 1,
                      borderRadius: 2.5,
                      background:
                        "rgba(255,255,255,.10)",
                      backdropFilter:
                        "blur(14px)",
                      border:
                        "1px solid rgba(255,255,255,.16)",
                      color: "#FFFFFF",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <VerifiedUserOutlinedIcon
                        sx={{
                          fontSize: 20,
                          color: "#4ADE80",
                        }}
                      />

                      <Typography
                        fontSize={12}
                        fontWeight={600}
                      >
                        Secure & Protected
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              </Box>

              {/* Features */}

              <Stack
                direction="row"
                spacing={3}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  mt: 2,
                  flexWrap: "wrap",
                  rowGap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                  }}
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
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                  }}
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
                </Box>
              </Stack>
            </Box>

            {/* ================================================= */}
            {/* RIGHT LOGIN SIDE */}
            {/* ================================================= */}

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "48%",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: {
                  xs: 3,
                  sm: 5,
                  md: 6,
                },
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  maxWidth: 430,
                  p: "0 !important",
                }}
              >
                {/* Header */}

                <Typography
                  sx={{
                    fontSize: {
                      xs: 30,
                      sm: 34,
                    },
                    fontWeight: 800,
                    color: "#0F172A",
                    letterSpacing: "-1px",
                  }}
                >
                  Welcome back 👋
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    mb: 3.5,
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  Sign in to continue to your
                  VisitorPro dashboard.
                </Typography>

                {/* Switch User message */}

                {location.state?.switchUser && (
                  <Alert
                    severity="info"
                    sx={{
                      mb: 2.5,
                      borderRadius: 2.5,
                      fontSize: 13,
                    }}
                  >
                    Sign in to switch to this
                    account.
                  </Alert>
                )}

                {/* Email */}

                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      backgroundColor: "#F8FAFC",
                      transition: ".2s",
                      "&:hover": {
                        backgroundColor: "#F1F5F9",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#FFFFFF",
                      },
                    },
                  }}
                />

                {/* Password */}

                <TextField
                  fullWidth
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      backgroundColor: "#F8FAFC",
                      transition: ".2s",
                      "&:hover": {
                        backgroundColor: "#F1F5F9",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#FFFFFF",
                      },
                    },
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            type="button"
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
                              mr: 0.5,
                              color: "#64748B",
                              "&:hover": {
                                color: "#2563EB",
                                backgroundColor:
                                  "#EFF6FF",
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
                    },
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
                    loading ? null : (
                      <LoginRoundedIcon />
                    )
                  }
                  sx={{
                    mt: 3,
                    py: 1.6,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontSize: 15.5,
                    fontWeight: 700,
                    background:
                      "linear-gradient(90deg,#2563EB,#3B82F6)",
                    boxShadow:
                      "0 12px 28px rgba(37,99,235,.25)",
                    transition: ".25s",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg,#1D4ED8,#2563EB)",
                      transform:
                        "translateY(-1px)",
                      boxShadow:
                        "0 15px 32px rgba(37,99,235,.32)",
                    },
                    "&:active": {
                      transform:
                        "translateY(0)",
                    },
                  }}
                >
                  {loading
                    ? "Signing in..."
                    : "Sign in to VisitorPro"}
                </Button>

                {/* Security divider */}

                <Divider
                  sx={{
                    my: 3,
                  }}
                />

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
                    color="text.secondary"
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