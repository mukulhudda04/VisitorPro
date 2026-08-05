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
  TextField,
} from "@mui/material";

import {
  getActiveVisits,
  checkOutVisitor,
} from "../../services/visitService";

const ActiveVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      setLoading(true);

      const response = await getActiveVisits();
      console.log("FULL RESPONSE:", response);
      console.log("RESPONSE DATA:", response.data);
      console.log("FIRST ROW:", response.data?.[0]);

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
      <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  mb={3}
>
  <Typography
    variant="h4"
    fontWeight="bold"
  >
    Active Visits
  </Typography>

  <TextField
    label="Search Visitor"
    size="small"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    sx={{ width: 300 }}
  />
</Box>

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
                    
                    visits
  .filter(
    (visit) =>
      visit.FullName.toLowerCase().includes(search.toLowerCase()) ||
      visit.EmployeeName.toLowerCase().includes(search.toLowerCase()) ||
      visit.Purpose.toLowerCase().includes(search.toLowerCase())
  )
  .map((visit) => (

                      <TableRow key={visit.VisitId}>

                        <TableCell>{visit.VisitId}</TableCell>

                        <TableCell>{visit.FullName}</TableCell>

                        <TableCell>{visit.EmployeeName}</TableCell>

                        <TableCell>{visit.Department}</TableCell>

                        <TableCell>{visit.Purpose}</TableCell>

                        <TableCell>
                          {visit.CheckInTime}
                        </TableCell>

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