import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
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
            visitors.map((visitor) => (
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
    </Paper>
  );
};

export default VisitorTable;