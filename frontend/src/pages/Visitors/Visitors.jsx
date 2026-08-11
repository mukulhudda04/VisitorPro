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
  Snackbar,
  Stack,
  TextField,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import {
  getVisitors,
  deleteVisitor,
} from "../../services/visitorService";

import VisitorForm from "../../components/VisitorForm";
import VisitorTable from "../../components/VisitorTable";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);

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
      console.error(err);
      setError("Failed to load visitors.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setSelectedVisitor(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVisitor(null);
    loadVisitors();
  };

  const handleEdit = (visitor) => {
    setSelectedVisitor(visitor);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedVisitorId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteVisitor(selectedVisitorId);

      setSnackbarSeverity("success");
      setSnackbarMessage(
        response?.message || "Visitor deleted successfully."
      );
      setSnackbarOpen(true);

      setDeleteDialogOpen(false);
      setSelectedVisitorId(null);

      loadVisitors();
    } catch (error) {
      console.error(error);

      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to delete visitor.");
      setSnackbarOpen(true);
    }
  };

  const filteredVisitors = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return visitors;
    }

    return visitors.filter((visitor) => {
      const fullName = String(visitor.FullName || "").toLowerCase();
      const email = String(visitor.Email || "").toLowerCase();
      const phone = String(visitor.Phone || "").toLowerCase();

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        phone.includes(query)
      );
    });
  }, [visitors, search]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        pb: 3,
      }}
    >
      {/* Top Controls */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
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
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
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
                  Visitor Management
                </Typography>

                <Chip
                  label={`${visitors.length} Total`}
                  size="small"
                  color="primary"
                  sx={{
                    fontWeight: 700,
                  }}
                />
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.4}
              >
                Search, edit and manage registered visitors.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpen}
              sx={{
                minHeight: 44,
                px: 2.5,
                borderRadius: 2.5,
                fontWeight: 750,
                boxShadow: "0 7px 18px rgba(37,99,235,.20)",
              }}
            >
              Add Visitor
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
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
                  Total Visitors
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={850}
                  color="text.primary"
                  mt={0.3}
                >
                  {visitors.length}
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
                  {filteredVisitors.length}
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
                <PersonAddAlt1RoundedIcon />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Visitor List */}
      <Card
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 1,
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
          {/* List Header */}
          <Stack
            direction={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", lg: "center" }}
            spacing={2}
            mb={2.5}
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
                  Visitor List
                </Typography>

                <Chip
                  label={filteredVisitors.length}
                  size="small"
                  color="primary"
                  sx={{
                    fontWeight: 750,
                    minWidth: 30,
                  }}
                />
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.4}
              >
                View, edit or remove registered visitors.
              </Typography>
            </Box>

            <TextField
              placeholder="Search by name, email or phone..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: {
                  xs: "100%",
                  sm: 360,
                  lg: 390,
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
                      onClick={() => setSearch("")}
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

          <Divider sx={{ mb: 2.5 }} />

          {/* Loading */}
          {loading && (
            <Box
              sx={{
                minHeight: 260,
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
                Loading visitors...
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

          {/* Empty Search */}
          {!loading &&
            !error &&
            visitors.length > 0 &&
            filteredVisitors.length === 0 && (
              <Box
                sx={{
                  minHeight: 260,
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
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    bgcolor: "action.hover",
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <SearchIcon fontSize="large" />
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={800}
                  color="text.primary"
                >
                  No visitors found
                </Typography>

                <Typography
                  color="text.secondary"
                  mt={0.5}
                >
                  Try searching with a different name, email or phone.
                </Typography>

                <Button
                  variant="outlined"
                  onClick={() => setSearch("")}
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    fontWeight: 700,
                  }}
                >
                  Clear Search
                </Button>
              </Box>
            )}

          {/* No Visitors */}
          {!loading &&
            !error &&
            visitors.length === 0 && (
              <Box
                sx={{
                  minHeight: 280,
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
                    bgcolor: "rgba(37,99,235,.10)",
                    color: "primary.main",
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
                  No visitors registered yet
                </Typography>

                <Typography
                  color="text.secondary"
                  mt={0.5}
                  maxWidth={430}
                >
                  Add your first visitor to start managing visitor
                  records in VisitorPro.
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpen}
                  sx={{
                    mt: 2,
                    borderRadius: 2.5,
                    fontWeight: 750,
                  }}
                >
                  Add First Visitor
                </Button>
              </Box>
            )}

          {/* Visitor Table */}
          {!loading &&
            !error &&
            filteredVisitors.length > 0 && (
              <Box
                sx={{
                  width: "100%",
                  overflowX: "auto",
                  "& > *": {
                    maxWidth: "100%",
                  },
                }}
              >
                <VisitorTable
                  visitors={filteredVisitors}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Box>
            )}
        </CardContent>
      </Card>

      {/* Add / Edit Visitor */}
      <VisitorForm
        open={open}
        handleClose={handleClose}
        visitor={selectedVisitor}
      />

      {/* Delete Confirmation */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
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
                width: 44,
                height: 44,
                borderRadius: 2.5,
                bgcolor: "rgba(239,68,68,.10)",
                color: "error.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DeleteOutlineRoundedIcon />
            </Box>

            <Box>
              <Typography
                fontWeight={850}
                color="text.primary"
                fontSize={20}
              >
                Delete Visitor
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                This action cannot be undone.
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Typography color="text.secondary">
            Are you sure you want to delete this visitor? Their
            visitor record will be permanently removed.
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
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={handleConfirmDelete}
            sx={{
              borderRadius: 2,
              fontWeight: 750,
            }}
          >
            Delete Visitor
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
          onClose={() => setSnackbarOpen(false)}
          variant="filled"
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

export default Visitors;