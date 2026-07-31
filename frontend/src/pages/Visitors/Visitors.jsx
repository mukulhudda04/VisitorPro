import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this visitor?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteVisitor(id);

      alert(response.message);

      loadVisitors();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data, null, 2));
      } else {
        alert("Failed to delete visitor.");
      }
    }
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
              visitors={visitors}
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
    </Box>
  );
};

export default Visitors;