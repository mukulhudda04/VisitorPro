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
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
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
  const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
const [selectedVisitId, setSelectedVisitId] = useState(null);

const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarSeverity, setSnackbarSeverity] = useState("success");
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

const handleConfirmCheckout = async () => {
  try {

    const response = await checkOutVisitor(selectedVisitId);

    setSnackbarSeverity("success");
    setSnackbarMessage(response.message);
    setSnackbarOpen(true);

    setCheckoutDialogOpen(false);
    setSelectedVisitId(null);

    loadVisits();

  } catch (err) {

    console.error(err);

    setSnackbarSeverity("error");
    setSnackbarMessage("Check-Out failed.");
    setSnackbarOpen(true);

  }
};

const handleCheckout = (visitId) => {

  setSelectedVisitId(visitId);
  setCheckoutDialogOpen(true);

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
  .slice(
  page * rowsPerPage,
  page * rowsPerPage + rowsPerPage
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
    onClick={() => {
      console.log("Button Clicked:", visit.VisitId);
      handleCheckout(visit.VisitId);
    }}
  >
    Check-Out
  </Button>
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
    visits.filter(
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

          <Dialog
  open={checkoutDialogOpen}
  onClose={() => setCheckoutDialogOpen(false)}
>
  <DialogTitle>
    Check-Out Visitor
  </DialogTitle>

  <DialogContent>
    Are you sure you want to check-out this visitor?
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => setCheckoutDialogOpen(false)}
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      color="error"
      onClick={handleConfirmCheckout}
    >
      Check-Out
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
    variant="filled"
    onClose={() => setSnackbarOpen(false)}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

    </Box>
  );
};

export default ActiveVisits;