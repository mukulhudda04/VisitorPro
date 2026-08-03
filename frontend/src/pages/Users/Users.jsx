import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

import { getUsers } from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      setUsers(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Users
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
                    <TableCell><b>User ID</b></TableCell>
                    <TableCell><b>Full Name</b></TableCell>
                    <TableCell><b>Email</b></TableCell>
                    <TableCell><b>Role</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No Users Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.UserId}>
                        <TableCell>{user.UserId}</TableCell>
                        <TableCell>{user.FullName}</TableCell>
                        <TableCell>{user.Email}</TableCell>
                        <TableCell>{user.RoleName}</TableCell>
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

export default Users;