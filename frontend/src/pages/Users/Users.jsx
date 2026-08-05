import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";

import { getRoles } from "../../services/roleService";
import { getDepartments } from "../../services/departmentService";

const Users = () => {

  // ==========================
  // STATES
  // ==========================
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  phone: "",
  roleId: "",
  departmentId: "",
});

const [emailError, setEmailError] = useState("");
const [phoneError, setPhoneError] = useState("");
const [passwordError, setPasswordError] = useState("");

  const [search, setSearch] = useState("");

  // ==========================
  // LOAD DATA
  // ==========================
  useEffect(() => {
    loadUsers();
    loadRoles();
    loadDepartments();
  }, []);

  // ==========================
  // GET USERS
  // ==========================
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

  // ==========================
  // GET ROLES
  // ==========================
  const loadRoles = async () => {
    try {
      const response = await getRoles();

      setRoles(response.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // GET DEPARTMENTS
  // ==========================
  const loadDepartments = async () => {
    try {
      const response = await getDepartments();

      setDepartments(response.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // INPUT CHANGE
  // ==========================
const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });

  // Email Validation
  if (name === "email") {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setEmailError("Enter a valid email address.");
    } else {
      setEmailError("");
    }

  }

  // Phone Validation
  if (name === "phone") {

    if (!/^\d{10}$/.test(value)) {
      setPhoneError("Phone number must be exactly 10 digits.");
    } else {
      setPhoneError("");
    }

  }

  // Password Validation
  if (name === "password") {

    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }

  }

};


  // ==========================
  // CREATE USER
  // ==========================
  const handleCreateUser = async () => {

    try {

      await createUser(formData);

      alert("User created successfully.");

      setOpen(false);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        roleId: "",
        departmentId: "",
      });

      loadUsers();

    } catch (err) {

      console.error(err);

      alert("Failed to create user.");

    }

  };

// ==========================
// EDIT USER
// ==========================
const handleEditUser = (user) => {

  console.log(user);

  setEditingUserId(user.UserId);

  setFormData({
    fullName: user.FullName,
    email: user.Email,
    password: "",
    phone: user.Phone,
    roleId: String(user.RoleId),
    departmentId: String(user.DepartmentId),
  });

  setOpen(true);
};

// ==========================
// UPDATE USER
// ==========================
const handleUpdateUser = async () => {

  try {

    await updateUser(editingUserId, {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      roleId: formData.roleId,
      departmentId: formData.departmentId,
      isActive: true,
    });

    alert("User updated successfully.");

    setOpen(false);

    setEditingUserId(null);

    setFormData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      roleId: "",
      departmentId: "",
    });

    loadUsers();

  } catch (err) {

    console.error(err);

    alert("Failed to update user.");

  }

};

// ==========================
// DELETE USER
// ==========================
const handleDeleteUser = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {

    const response = await deleteUser(id);

    alert(response.message);

    loadUsers();

  } catch (err) {

    console.error(err);

    alert("Failed to delete user.");

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
    Users
  </Typography>

  <Box
    display="flex"
    gap={2}
    alignItems="center"
  >

    <TextField
      label="Search User"
      size="small"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ width: 300 }}
    />

    <Button
      variant="contained"
      onClick={() => setOpen(true)}
    >
      Add User
    </Button>

  </Box>

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

                    <TableCell><b>ID</b></TableCell>

                    <TableCell><b>Name</b></TableCell>

                    <TableCell><b>Email</b></TableCell>

                    <TableCell><b>Role</b></TableCell>

                    <TableCell><b>Department</b></TableCell>

                    <TableCell><b>Action</b></TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {users.length === 0 ? (

                    <TableRow>

                      <TableCell
                        colSpan={5}
                        align="center"
                      >
                        No Users Found
                      </TableCell>

                    </TableRow>

                  ) : (

                    users
  .filter(
    (user) =>
      user.FullName.toLowerCase().includes(search.toLowerCase()) ||
      user.Email.toLowerCase().includes(search.toLowerCase())
  )
  .map((user) => (

                      <TableRow key={user.UserId}>

                        <TableCell>{user.UserId}</TableCell>

                        <TableCell>{user.FullName}</TableCell>

                        <TableCell>{user.Email}</TableCell>

                        <TableCell>{user.RoleName}</TableCell>

                        <TableCell>{user.DepartmentName}</TableCell>

<TableCell>

  <Button
    variant="contained"
    size="small"
    sx={{ mr: 1 }}
    onClick={() => handleEditUser(user)}
  >
    EDIT
  </Button>

  <Button
    variant="contained"
    color="error"
    size="small"
    onClick={() => handleDeleteUser(user.UserId)}
  >
    DELETE
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

      {/* ============================= */}
      {/* ADD USER DIALOG */}
      {/* ============================= */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>
          {editingUserId ? "Edit User" : "Add User"}
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            helperText="Enter full name."
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!emailError}
helperText={emailError || "Enter a valid email address."}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!passwordError}
helperText={passwordError || "Password must be at least 8 characters."}
          />

          <TextField
  fullWidth
  margin="normal"
  label="Phone"
  name="phone"
  value={formData.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    handleChange({
      target: {
        name: "phone",
        value,
      },
    });
  }}
  error={!!phoneError}
  helperText={phoneError || "Phone number must be exactly 10 digits."}
/>

          <TextField
            select
            fullWidth
            margin="normal"
            label="Role"
            name="roleId"
            value={String(formData.roleId)}
            onChange={handleChange}
            helperText="Select user role."
          >

            {roles.map((role) => (

              <MenuItem
                key={role.RoleId}
                value={String(role.RoleId)}
              >
                {role.RoleName}
              </MenuItem>

            ))}

          </TextField>

          <TextField
            select
            fullWidth
            margin="normal"
            label="Department"
            name="departmentId"
            value={String(formData.departmentId)}
            onChange={handleChange}
            helperText="Select department."
          >

            {departments.map((department) => (

              <MenuItem
                key={department.DepartmentId}
                value={String(department.DepartmentId)}
              >
                {department.DepartmentName}
              </MenuItem>

            ))}

          </TextField>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

<Button
  variant="contained"
  disabled={
    !formData.fullName ||
    !formData.email ||
    !formData.phone ||
    !formData.roleId ||
    !formData.departmentId ||
    emailError ||
    phoneError ||
    (!editingUserId && (!formData.password || passwordError))
  }
  onClick={editingUserId ? handleUpdateUser : handleCreateUser}
>
  {editingUserId ? "Update User" : "Save User"}
</Button>
        </DialogActions>

      </Dialog>

        </Box>
  );
};

export default Users;