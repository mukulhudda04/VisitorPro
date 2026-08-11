import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import {
  getActiveVisits,
  checkOutVisitor,
} from "../../services/visitService";

const ActiveVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [search, setSearch] = useState("");

  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getActiveVisits();

      setVisits(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load active visits.");
    } finally {
      setLoading(false);
    }
  };

  const filteredVisits = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return visits;
    }

    return visits.filter((visit) => {
      const fullName = String(visit.FullName || "").toLowerCase();
      const employeeName = String(
        visit.EmployeeName || ""
      ).toLowerCase();
      const purpose = String(
        visit.Purpose || ""
      ).toLowerCase();
      const department = String(
        visit.Department || ""
      ).toLowerCase();

      return (
        fullName.includes(query) ||
        employeeName.includes(query) ||
        purpose.includes(query) ||
        department.includes(query)
      );
    });
  }, [visits, search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleCheckout = (visitId) => {
    setSelectedVisitId(visitId);
    setCheckoutDialogOpen(true);
  };

  const handleConfirmCheckout = async () => {
    try {
      const response = await checkOutVisitor(selectedVisitId);

      setSnackbarSeverity("success");
      setSnackbarMessage(
        response?.message || "Visitor checked out successfully."
      );
      setSnackbarOpen(true);

      setCheckoutDialogOpen(false);
      setSelectedVisitId(null);

      await loadVisits();
      setPage(0);
    } catch (err) {
      console.error(err);

      setSnackbarSeverity("error");
      setSnackbarMessage("Check-Out failed.");
      setSnackbarOpen(true);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        pb: 4,
      }}
    >
      {/* Top Controls */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, md: 2.5 },
            "&:last-child": {
              pb: { xs: 2, md: 2.5 },
            },
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            spacing={2}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  fontWeight={850}
                  color="text.primary"
                >
                  Active Visitor Management
                </Typography>

                <Chip
                  label={`${visits.length} Active`}
                  size="small"
                  color="success"
                  sx={{
                    fontWeight: 750,
                  }}
                />
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.4}
              >
                Monitor visitors currently inside and check them out
                when their visit is complete.
              </Typography>
            </Box>

            <TextField
              placeholder="Search visitor, employee or purpose..."
              size="small"
              value={search}
              onChange={handleSearchChange}
              sx={{
                width: {
                  xs: "100%",
                  sm: 360,
                  md: 390,
                },
                "& .MuiOutlinedInput-root": {
                  minHeight: 44,
                  borderRadius: 2.5,
                  bgcolor: "background.default",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: "text.secondary",
                      }}
                    />
                  </InputAdornment>
                ),

                endAdornment: search ? (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => {
                        setSearch("");
                        setPage(0);
                      }}
                      size="small"
                      sx={{
                        minWidth: 30,
                        width: 30,
                        height: 30,
                        borderRadius: 2,
                        p: 0,
                      }}
                    >
                      <CloseRoundedIcon fontSize="small" />
                    </Button>
                  </InputAdornment>
                ) : null,
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Card
          elevation={0}
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <CardContent
            sx={{
              p: 2.2,
              "&:last-child": {
                pb: 2.2,
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={650}
                >
                  Currently Inside
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={850}
                  color="text.primary"
                  mt={0.3}
                >
                  {visits.length}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  bgcolor: "rgba(34,197,94,.10)",
                  color: "success.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PeopleAltRoundedIcon />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <CardContent
            sx={{
              p: 2.2,
              "&:last-child": {
                pb: 2.2,
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={650}
                >
                  Search Results
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={850}
                  color="text.primary"
                  mt={0.3}
                >
                  {filteredVisits.length}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  bgcolor: "rgba(37,99,235,.10)",
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Active Visits Table */}
      <Card
        elevation={0}
        sx={{
          mt: "4px",
          position: "relative",
          zIndex: 2,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, md: 3 },
            "&:last-child": {
              pb: { xs: 2, md: 3 },
            },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
            mb={2.5}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={850}
                color="text.primary"
              >
                Active Visits
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.4}
              >
                Visitors currently checked in to the premises.
              </Typography>
            </Box>

            <Chip
              icon={<AccessTimeRoundedIcon />}
              label="Live"
              color="success"
              variant="outlined"
              sx={{
                fontWeight: 700,
              }}
            />
          </Stack>

          <Divider sx={{ mb: 2.5 }} />

          {/* Loading */}
          {loading && (
            <Box
              sx={{
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              <CircularProgress size={38} />

              <Typography
                color="text.secondary"
                fontWeight={600}
              >
                Loading active visits...
              </Typography>
            </Box>
          )}

          {/* Error */}
          {!loading && error && (
            <Alert
              severity="error"
              variant="outlined"
              sx={{
                borderRadius: 3,
              }}
            >
              {error}
            </Alert>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            filteredVisits.length === 0 && (
              <Box
                sx={{
                  minHeight: 300,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    bgcolor: "rgba(34,197,94,.10)",
                    color: "success.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <PeopleAltRoundedIcon fontSize="large" />
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={800}
                  color="text.primary"
                >
                  {search
                    ? "No matching visits found"
                    : "No Active Visitors"}
                </Typography>

                <Typography
                  color="text.secondary"
                  mt={0.5}
                  maxWidth={430}
                >
                  {search
                    ? "Try searching with a different visitor name, employee or purpose."
                    : "There are currently no visitors checked in."}
                </Typography>

                {search && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearch("");
                      setPage(0);
                    }}
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      fontWeight: 700,
                    }}
                  >
                    Clear Search
                  </Button>
                )}
              </Box>
            )}

          {/* Table */}
          {!loading &&
            !error &&
            filteredVisits.length > 0 && (
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  overflowX: "auto",
                  bgcolor: "background.paper",
                }}
              >
                <Table
                  sx={{
                    minWidth: 900,
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        bgcolor: "action.hover",
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Visit ID
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Visitor
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Employee
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Department
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Purpose
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Check In
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredVisits
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((visit) => (
                        <TableRow
                          key={visit.VisitId}
                          hover
                          sx={{
                            "&:last-child td": {
                              borderBottom: 0,
                            },
                            "&:hover": {
                              bgcolor: "action.hover",
                            },
                          }}
                        >
                          <TableCell>
                            <Chip
                              label={`#${visit.VisitId}`}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{
                                fontWeight: 700,
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Typography
                              fontWeight={750}
                              color="text.primary"
                              sx={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {visit.FullName || "—"}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography
                              color="text.primary"
                              fontWeight={600}
                              sx={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {visit.EmployeeName || "—"}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography
                              color="text.secondary"
                              sx={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {visit.Department || "—"}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography
                              color="text.secondary"
                              sx={{
                                maxWidth: 190,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              title={visit.Purpose || ""}
                            >
                              {visit.Purpose || "—"}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={0.7}
                              alignItems="center"
                              sx={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              <AccessTimeRoundedIcon
                                sx={{
                                  fontSize: 18,
                                  color: "text.secondary",
                                }}
                              />

                              <Typography
                                color="text.secondary"
                                fontSize={14}
                              >
                                {visit.CheckInTime || "—"}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="center">
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              startIcon={
                                <LogoutRoundedIcon />
                              }
                              onClick={() =>
                                handleCheckout(visit.VisitId)
                              }
                              sx={{
                                borderRadius: 2,
                                fontWeight: 750,
                                whiteSpace: "nowrap",
                                "&:hover": {
                                  bgcolor: "error.main",
                                  color: "#fff",
                                },
                              }}
                            >
                              Check-Out
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredVisits.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(event, newPage) =>
                    setPage(newPage)
                  }
                  onRowsPerPageChange={handleRowsPerPageChange}
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                />
              </TableContainer>
            )}
        </CardContent>
      </Card>

      {/* Check-Out Dialog */}
      <Dialog
        open={checkoutDialogOpen}
        onClose={() => setCheckoutDialogOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 450,
            borderRadius: 4,
            bgcolor: "background.paper",
            backgroundImage: "none",
          },
        }}
      >
        <DialogTitle sx={{ p: 3, pb: 1.5 }}>
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
                bgcolor: "rgba(239,68,68,.10)",
                color: "error.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningAmberRoundedIcon />
            </Box>

            <Box>
              <Typography
                fontWeight={850}
                fontSize={20}
                color="text.primary"
              >
                Check-Out Visitor
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Confirm visitor departure.
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Typography color="text.secondary">
            Are you sure you want to check-out this visitor?
            Their active visit will be completed.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            gap: 1,
          }}
        >
          <Button
            onClick={() => setCheckoutDialogOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleConfirmCheckout}
            sx={{
              borderRadius: 2,
              fontWeight: 750,
            }}
          >
            Confirm Check-Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
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

export default ActiveVisits;