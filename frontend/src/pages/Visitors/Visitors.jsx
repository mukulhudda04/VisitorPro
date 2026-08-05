import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
DialogTitle,
DialogContent,
DialogActions,
Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
console.log("Deleting Visitor ID:", selectedVisitorId);

const handleConfirmDelete = async () => {
  try {
    const response = await deleteVisitor(selectedVisitorId);

    setSnackbarSeverity("success");
setSnackbarMessage(response.message);
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

  const handleDelete = (id) => {
  setSelectedVisitorId(id);
  setDeleteDialogOpen(true);
};

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Visitors
        </Typography>
        
        <TextField
  label="Search Visitor"
  size="small"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  sx={{ width: 300 }}
/>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Visitor
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={3}>
            Visitor List
          </Typography>

          {loading && (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && (
<VisitorTable
  visitors={visitors.filter(
    (visitor) =>
      visitor.FullName.toLowerCase().includes(search.toLowerCase()) ||
      visitor.Email.toLowerCase().includes(search.toLowerCase()) ||
      visitor.Phone.includes(search)
  )}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
          )}
        </CardContent>
      </Card>

      <VisitorForm
        open={open}
        handleClose={handleClose}
        visitor={selectedVisitor}
      />

<Dialog
  open={deleteDialogOpen}
  onClose={() => setDeleteDialogOpen(false)}
>
  <DialogTitle>
    Delete Visitor
  </DialogTitle>

  <DialogContent>
    Are you sure you want to delete this visitor?
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => setDeleteDialogOpen(false)}
    >
      Cancel
    </Button>

    <Button
      color="error"
      variant="contained"
      onClick={handleConfirmDelete}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>

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
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

    </Box>
  );
};

export default Visitors;