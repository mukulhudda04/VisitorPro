import { useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const VisitorTable = ({
  visitors,
  onEdit,
  onDelete,
}) => {

  const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Company</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {visitors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography>No Visitors Found</Typography>
              </TableCell>
            </TableRow>
          ) : (
            visitors
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map((visitor) => (
              <TableRow key={visitor.VisitorId}>
                <TableCell>{visitor.VisitorId}</TableCell>
                <TableCell>{visitor.FullName}</TableCell>
                <TableCell>{visitor.Phone}</TableCell>
                <TableCell>{visitor.Email}</TableCell>
                <TableCell>{visitor.CompanyName}</TableCell>

                <TableCell align="center">
                  <Tooltip title="Edit Visitor">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(visitor)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Visitor">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(visitor.VisitorId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={visitors.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(event, newPage) => setPage(newPage)}
  onRowsPerPageChange={(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }}
/>

    </Paper>
  );
};

export default VisitorTable;