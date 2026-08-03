import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { getVisitHistory } from "../../services/historyService";

const VisitHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const response = await getVisitHistory();

      setHistory(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load visit history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Visit History
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

                    <TableCell>
                      <b>Visit ID</b>
                    </TableCell>

                    <TableCell>
                      <b>Visitor</b>
                    </TableCell>

                    <TableCell>
                      <b>Employee</b>
                    </TableCell>

                    <TableCell>
                      <b>Department</b>
                    </TableCell>

                    <TableCell>
                      <b>Purpose</b>
                    </TableCell>
                                        <TableCell>
                      <b>Check In</b>
                    </TableCell>

                    <TableCell>
                      <b>Check Out</b>
                    </TableCell>

                    <TableCell>
                      <b>Status</b>
                    </TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {history.length === 0 ? (

                    <TableRow>

                      <TableCell
                        colSpan={8}
                        align="center"
                      >
                        No Visit History Found
                      </TableCell>

                    </TableRow>

                  ) : (

                    history.map((visit) => (

                      <TableRow key={visit.VisitId}>

                        <TableCell>
                          {visit.VisitId}
                        </TableCell>

                        <TableCell>
                          {visit.FullName}
                        </TableCell>

                        <TableCell>
                          {visit.EmployeeName}
                        </TableCell>

                        <TableCell>
                          {visit.Department}
                        </TableCell>

                        <TableCell>
                          {visit.Purpose}
                        </TableCell>

                        <TableCell>
                          {visit.CheckInTime
                            ? new Date(
                                visit.CheckInTime
                              ).toLocaleString("en-IN")
                            : "-"}
                        </TableCell>

                        <TableCell>
                          {visit.CheckOutTime
                            ? new Date(
                                visit.CheckOutTime
                              ).toLocaleString("en-IN")
                            : "-"}
                        </TableCell>

                        <TableCell>
                          {visit.Status}
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

export default VisitHistory;