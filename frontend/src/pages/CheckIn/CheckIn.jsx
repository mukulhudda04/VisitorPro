import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import {
  getVisitors,
} from "../../services/visitorService";

import {
  checkInVisitor,
} from "../../services/visitService";

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

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async () => {

    if (
      !formData.VisitorId ||
      !formData.EmployeeName ||
      !formData.Department ||
      !formData.Purpose
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {

      setSaving(true);

      const response = await checkInVisitor(formData);

      alert(response.message);

      setFormData(initialState);

    } catch (err) {

      console.error(err);

      if (err.response) {
        alert(JSON.stringify(err.response.data, null, 2));
      } else {
        alert("Check-In Failed.");
      }

    } finally {

      setSaving(false);

    }

  };

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Visitor Check-In
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>

          {loading && (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          {!loading && (

            <Grid
              container
              spacing={2}
            >

              <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                  select
                  fullWidth
                  label="Select Visitor"
                  name="VisitorId"
                  value={formData.VisitorId}
                  onChange={handleChange}
                >

                  {visitors.map((visitor) => (

                    <MenuItem
                      key={visitor.VisitorId}
                      value={visitor.VisitorId}
                    >
                      {visitor.FullName}
                    </MenuItem>

                  ))}

                </TextField>

              </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                  fullWidth
                  label="Host / Employee Name"
                  name="EmployeeName"
                  value={formData.EmployeeName}
                  onChange={handleChange}
                />

              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                  fullWidth
                  label="Department"
                  name="Department"
                  value={formData.Department}
                  onChange={handleChange}
                />

              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                  fullWidth
                  label="Purpose"
                  name="Purpose"
                  value={formData.Purpose}
                  onChange={handleChange}
                />

              </Grid>

              <Grid size={{ xs: 12 }}>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Remarks"
                  name="Remarks"
                  value={formData.Remarks}
                  onChange={handleChange}
                />

              </Grid>

              <Grid size={{ xs: 12 }}>

                <Button
                  variant="contained"
                  size="large"
                  disabled={saving}
                  onClick={handleSubmit}
                >
                  {saving
                    ? "Checking In..."
                    : "Check-In Visitor"}
                </Button>

              </Grid>

            </Grid>

          )}

        </CardContent>

      </Card>

    </Box>
  );
};

export default CheckIn;