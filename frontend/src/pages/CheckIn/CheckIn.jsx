import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Chip,
  InputAdornment,
} from "@mui/material";

import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { getVisitors } from "../../services/visitorService";
import { checkInVisitor } from "../../services/visitService";

const initialState = {
  VisitorId: "",
  EmployeeName: "",
  Department: "",
  Purpose: "",
  Remarks: "",
};

const CheckIn = () => {
  const [visitors, setVisitors] = useState([]);
  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    loadVisitors();
  }, []);

  const loadVisitors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getVisitors();

      setVisitors(response.data || []);
    } catch (err) {
      console.error("Load Visitors Error:", err);

      setError("Failed to load registered visitors.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleClear = () => {
    setFormData(initialState);
  };

  const handleSubmit = async () => {
    if (!formData.VisitorId) {
      showSnackbar(
        "Please select a visitor.",
        "warning"
      );
      return;
    }

    if (!formData.EmployeeName.trim()) {
      showSnackbar(
        "Please enter the host / employee name.",
        "warning"
      );
      return;
    }

    if (!formData.Department.trim()) {
      showSnackbar(
        "Please enter the department.",
        "warning"
      );
      return;
    }

    if (!formData.Purpose.trim()) {
      showSnackbar(
        "Please enter the purpose of the visit.",
        "warning"
      );
      return;
    }

    try {
      setSaving(true);

      const response = await checkInVisitor(formData);

      showSnackbar(
        response?.message ||
          "Visitor checked in successfully.",
        "success"
      );

      setFormData(initialState);
    } catch (err) {
      console.error("Check-In Error:", err);

      if (err.response?.data?.message) {
        showSnackbar(
          err.response.data.message,
          "error"
        );
      } else {
        showSnackbar(
          "Check-In failed. Please try again.",
          "error"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        pb: 5,
      }}
    >
      {/* =====================================================
          MAIN CHECK-IN CARD
      ====================================================== */}

      <Card
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <Box
          sx={{
            px: {
              xs: 2.5,
              sm: 3,
              md: 4,
            },
            py: {
              xs: 2.5,
              sm: 3,
            },
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(20,184,166,0.06))",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            spacing={2}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  flexShrink: 0,
                  borderRadius: 3,
                  bgcolor: "primary.main",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 8px 22px rgba(37,99,235,0.25)",
                }}
              >
                <PersonAddAltRoundedIcon
                  fontSize="medium"
                />
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  fontWeight={850}
                  color="text.primary"
                >
                  Visitor Check-In
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.4,
                  }}
                >
                  Register a visitor entry and assign
                  their host.
                </Typography>
              </Box>
            </Stack>

            <Chip
              icon={<LoginRoundedIcon />}
              label="New Check-In"
              color="primary"
              variant="outlined"
              sx={{
                fontWeight: 750,
                borderRadius: 2,
              }}
            />
          </Stack>
        </Box>

        {/* =================================================
            CONTENT
        ================================================== */}

        <CardContent
          sx={{
            p: {
              xs: 2.5,
              sm: 3,
              md: 4,
            },
            "&:last-child": {
              pb: {
                xs: 2.5,
                sm: 3,
                md: 4,
              },
            },
          }}
        >
          {/* =================================================
              LOADING
          ================================================== */}

          {loading && (
            <Box
              sx={{
                minHeight: 330,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              <CircularProgress size={42} />

              <Typography
                color="text.secondary"
                fontWeight={600}
              >
                Loading registered visitors...
              </Typography>
            </Box>
          )}

          {/* =================================================
              ERROR
          ================================================== */}

          {!loading && error && (
            <Box>
              <Alert
                severity="error"
                variant="outlined"
                icon={<ErrorOutlineRoundedIcon />}
                sx={{
                  borderRadius: 3,
                }}
              >
                {error}
              </Alert>

              <Button
                variant="outlined"
                onClick={loadVisitors}
                sx={{
                  mt: 2,
                  borderRadius: 2.5,
                  fontWeight: 700,
                }}
              >
                Try Again
              </Button>
            </Box>
          )}

          {/* =================================================
              FORM
          ================================================== */}

          {!loading && !error && (
            <Box>
              {/* =============================================
                  VISITOR INFORMATION
              ============================================== */}

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={0.5}
              >
                <BadgeRoundedIcon
                  sx={{
                    color: "primary.main",
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight={800}
                  color="text.primary"
                >
                  Visitor Information
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                mb={2.5}
              >
                Select the registered visitor who is
                entering the premises.
              </Typography>

              <Grid
                container
                spacing={2.5}
              >
                {/* SELECT VISITOR */}

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    select
                    fullWidth
                    required
                    label="Select Visitor"
                    name="VisitorId"
                    value={formData.VisitorId}
                    onChange={handleChange}
                    helperText={
                      visitors.length > 0
                        ? `${visitors.length} registered visitor${
                            visitors.length > 1
                              ? "s"
                              : ""
                          } available`
                        : "No registered visitors available"
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                      },
                    }}
                  >
                    {visitors.length === 0 ? (
                      <MenuItem
                        disabled
                        value=""
                      >
                        No visitors available
                      </MenuItem>
                    ) : (
                      visitors.map((visitor) => (
                        <MenuItem
                          key={
                            visitor.VisitorId
                          }
                          value={
                            visitor.VisitorId
                          }
                        >
                          {visitor.FullName}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                </Grid>

                {/* HOST */}

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    required
                    label="Host / Employee Name"
                    name="EmployeeName"
                    value={
                      formData.EmployeeName
                    }
                    onChange={handleChange}
                    placeholder="Enter host name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeRoundedIcon
                            sx={{
                              color:
                                "text.secondary",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Divider
                sx={{
                  my: 4,
                }}
              />

              {/* =============================================
                  VISIT DETAILS
              ============================================== */}

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={0.5}
              >
                <BusinessRoundedIcon
                  sx={{
                    color: "primary.main",
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight={800}
                  color="text.primary"
                >
                  Visit Details
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                mb={2.5}
              >
                Provide information about the current
                visitor visit.
              </Typography>

              <Grid
                container
                spacing={2.5}
              >
                {/* DEPARTMENT */}

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    required
                    label="Department"
                    name="Department"
                    value={
                      formData.Department
                    }
                    onChange={handleChange}
                    placeholder="e.g. Digital Services"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessRoundedIcon
                            sx={{
                              color:
                                "text.secondary",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                      },
                    }}
                  />
                </Grid>

                {/* PURPOSE */}

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    required
                    label="Purpose"
                    name="Purpose"
                    value={formData.Purpose}
                    onChange={handleChange}
                    placeholder="e.g. Meeting / Interview"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionRoundedIcon
                            sx={{
                              color:
                                "text.secondary",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                      },
                    }}
                  />
                </Grid>

                {/* REMARKS */}

                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Remarks"
                    name="Remarks"
                    value={formData.Remarks}
                    onChange={handleChange}
                    placeholder="Add any additional information about this visit..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <NotesRoundedIcon
                            sx={{
                              color:
                                "text.secondary",
                              mt: 0.5,
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                        alignItems:
                          "flex-start",
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Divider
                sx={{
                  my: 4,
                }}
              />

              {/* =============================================
                  FOOTER / ACTIONS
              ============================================== */}

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                  xs: "stretch",
                  sm: "center",
                }}
                spacing={2}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    <b>*</b> Required fields
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Check-in time will be recorded
                    automatically.
                  </Typography>
                </Box>

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={1.5}
                >
                  <Button
                    variant="outlined"
                    disabled={saving}
                    startIcon={
                      <RestartAltRoundedIcon />
                    }
                    onClick={
                      handleClear
                    }
                    sx={{
                      minHeight: 46,
                      px: 2.5,
                      borderRadius: 2.5,
                      fontWeight: 750,
                    }}
                  >
                    Clear
                  </Button>

                  <Button
                    variant="contained"
                    size="large"
                    disabled={saving}
                    startIcon={
                      saving ? (
                        <CircularProgress
                          size={18}
                          color="inherit"
                        />
                      ) : (
                        <LoginRoundedIcon />
                      )
                    }
                    onClick={
                      handleSubmit
                    }
                    sx={{
                      minHeight: 46,
                      px: 3,
                      borderRadius: 2.5,
                      fontWeight: 800,
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,0.22)",
                    }}
                  >
                    {saving
                      ? "Checking In..."
                      : "Check-In Visitor"}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* =====================================================
          SNACKBAR
      ====================================================== */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        onClose={() =>
          setSnackbarOpen(false)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          icon={
            snackbarSeverity ===
            "success" ? (
              <CheckCircleRoundedIcon />
            ) : undefined
          }
          onClose={() =>
            setSnackbarOpen(false)
          }
          sx={{
            borderRadius: 2.5,
            fontWeight: 650,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckIn;