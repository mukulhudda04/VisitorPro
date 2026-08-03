import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import {
  getActiveVisits,
  checkOutVisitor,
} from "../../services/visitService";

const ActiveVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      setLoading(true);

      const response = await getActiveVisits();

      console.log("API Response:", response);
      console.log("Visits Data:", response.data);
console.log("First CheckIn:", response.data[0]?.CheckInTime);

      setVisits(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load active visits.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (visitId) => {
    const confirm = window.confirm("Check-Out this visitor?");

    if (!confirm) return;

    try {
      const response = await checkOutVisitor(visitId);

      alert(response.message);

      loadVisits();
    } catch (err) {
      console.error(err);
      alert("Check-Out failed.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Active Visits
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

          {!loading && !error && (
            <Paper>
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell><b>Visit ID</b></TableCell>
                    <TableCell><b>Visitor</b></TableCell>
                    <TableCell><b>Employee</b></TableCell>
                    <TableCell><b>Department</b></TableCell>
                    <TableCell><b>Purpose</b></TableCell>
                    <TableCell><b>Check In</b></TableCell>
                    <TableCell align="center"><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {visits.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No Active Visitors
                      </TableCell>
                    </TableRow>
                  ) : (
                    visits.map((visit) => (
                      <TableRow key={visit.VisitId}>

                        <TableCell>{visit.VisitId}</TableCell>

                        <TableCell>{visit.FullName}</TableCell>

                        <TableCell>{visit.EmployeeName}</TableCell>

                        <TableCell>{visit.Department}</TableCell>

                        <TableCell>{visit.Purpose}</TableCell>
                      <TableCell>{visit.CheckInTime}</TableCell>
                        {/* CHECK-IN DATE & TIME */}


                        <TableCell align="center">
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => handleCheckout(visit.VisitId)}
                          >
                            Check-Out
                          </Button>
                        </TableCell>

                      </TableRow>
                    ))
                  )}

                </TableBody>

              </Table>
            </Paper>
          )}

        </CardContent>
      </Card>
    </Box>
  );
};

export default ActiveVisits;