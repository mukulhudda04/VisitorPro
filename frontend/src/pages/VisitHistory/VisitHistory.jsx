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
  TablePagination,
TextField,
Chip,
  Typography,
} from "@mui/material";

import { getVisitHistory } from "../../services/historyService";

const VisitHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);

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
    <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  }}
>
  <Typography
    variant="h4"
    fontWeight="bold"
  >
    Visit History
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

                    history
  .filter(
    (visit) =>
      visit.FullName.toLowerCase().includes(search.toLowerCase()) ||
      visit.EmployeeName.toLowerCase().includes(search.toLowerCase()) ||
      visit.Purpose.toLowerCase().includes(search.toLowerCase())
  )
  .slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )
  .map((visit) => (

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
  ? new Date(visit.CheckInTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  : "-"}
                        </TableCell>

                        <TableCell>
                          {visit.CheckOutTime
  ? new Date(visit.CheckOutTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  : "-"}
                        </TableCell>

                        <TableCell>
  <Chip
    label={visit.Status}
    color="success"
    size="small"
  />
</TableCell>

                      </TableRow>

                    ))

                  )}

                </TableBody>

              </Table>

              <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={
    history.filter(
      (visit) =>
        visit.FullName.toLowerCase().includes(search.toLowerCase()) ||
        visit.EmployeeName.toLowerCase().includes(search.toLowerCase()) ||
        visit.Purpose.toLowerCase().includes(search.toLowerCase())
    ).length
  }
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(event, newPage) => setPage(newPage)}
  onRowsPerPageChange={(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }}
/>

            </Paper>
                      )}

        </CardContent>

      </Card>

    </Box>
  );
};

export default VisitHistory;