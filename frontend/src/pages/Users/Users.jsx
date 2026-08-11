import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";

import { getRoles } from "../../services/roleService";
import { getDepartments } from "../../services/departmentService";

const initialFormState = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  roleId: "",
  departmentId: "",
};

const Users = () => {
  // =========================================================
  // STATES
  // =========================================================

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [formData, setFormData] = useState(
    initialFormState
  );

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedUserId, setSelectedUserId] =
    useState(null);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [snackbarOpen, setSnackbarOpen] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const [snackbarSeverity, setSnackbarSeverity] =
    useState("success");

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    await Promise.all([
      loadUsers(),
      loadRoles(),
      loadDepartments(),
    ]);
  };

  // =========================================================
  // GET USERS
  // =========================================================

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getUsers();

      setUsers(response?.data || []);
    } catch (err) {
      console.error("Load Users Error:", err);

      setError(
        "Failed to load users. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GET ROLES
  // =========================================================

  const loadRoles = async () => {
    try {
      const response = await getRoles();

      setRoles(response?.data || []);
    } catch (err) {
      console.error("Load Roles Error:", err);
    }
  };

  // =========================================================
  // GET DEPARTMENTS
  // =========================================================

  const loadDepartments = async () => {
    try {
      const response = await getDepartments();

      setDepartments(response?.data || []);
    } catch (err) {
      console.error(
        "Load Departments Error:",
        err
      );
    }
  };

  // =========================================================
  // SNACKBAR
  // =========================================================

  const showSnackbar = (
    message,
    severity = "success"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // =========================================================
  // SEARCH FILTER
  // =========================================================

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const name = String(
        user.FullName || ""
      ).toLowerCase();

      const email = String(
        user.Email || ""
      ).toLowerCase();

      const role = String(
        user.RoleName || ""
      ).toLowerCase();

      const department = String(
        user.DepartmentName || ""
      ).toLowerCase();

      return (
        name.includes(query) ||
        email.includes(query) ||
        role.includes(query) ||
        department.includes(query)
      );
    });
  }, [users, search]);

  // =========================================================
  // FORM RESET
  // =========================================================

  const resetForm = () => {
    setFormData(initialFormState);

    setEmailError("");
    setPhoneError("");
    setPasswordError("");

    setEditingUserId(null);
  };

  // =========================================================
  // OPEN ADD USER
  // =========================================================

  const handleOpenAddUser = () => {
    resetForm();
    setOpen(true);
  };

  // =========================================================
  // CLOSE DIALOG
  // =========================================================

  const handleCloseDialog = () => {
    if (saving) return;

    setOpen(false);
    resetForm();
  };

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // -------------------------
    // EMAIL VALIDATION
    // -------------------------

    if (name === "email") {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (value && !emailRegex.test(value)) {
        setEmailError(
          "Enter a valid email address."
        );
      } else {
        setEmailError("");
      }
    }

    // -------------------------
    // PHONE VALIDATION
    // -------------------------

    if (name === "phone") {
      if (value && !/^\d{10}$/.test(value)) {
        setPhoneError(
          "Phone number must be exactly 10 digits."
        );
      } else {
        setPhoneError("");
      }
    }

    // -------------------------
    // PASSWORD VALIDATION
    // -------------------------

    if (name === "password") {
      if (
        !editingUserId &&
        value &&
        value.length < 8
      ) {
        setPasswordError(
          "Password must be at least 8 characters."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  // =========================================================
  // CREATE USER
  // =========================================================

  const handleCreateUser = async () => {
    if (!validateForm(false)) return;

    try {
      setSaving(true);

      await createUser(formData);

      showSnackbar(
        "User created successfully.",
        "success"
      );

      setOpen(false);
      resetForm();

      await loadUsers();
    } catch (err) {
      console.error(
        "Create User Error:",
        err
      );

      showSnackbar(
        err.response?.data?.message ||
          "Failed to create user.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // EDIT USER
  // =========================================================

  const handleEditUser = (user) => {
    setEditingUserId(user.UserId);

    setFormData({
      fullName: user.FullName || "",
      email: user.Email || "",
      password: "",
      phone: user.Phone || "",
      roleId:
        user.RoleId !== null &&
        user.RoleId !== undefined
          ? String(user.RoleId)
          : "",
      departmentId:
        user.DepartmentId !== null &&
        user.DepartmentId !== undefined
          ? String(user.DepartmentId)
          : "",
    });

    setEmailError("");
    setPhoneError("");
    setPasswordError("");

    setOpen(true);
  };

  // =========================================================
  // UPDATE USER
  // =========================================================

  const handleUpdateUser = async () => {
    if (!validateForm(true)) return;

    try {
      setSaving(true);

      await updateUser(editingUserId, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        roleId: formData.roleId,
        departmentId:
          formData.departmentId,
        isActive: true,
      });

      showSnackbar(
        "User updated successfully.",
        "success"
      );

      setOpen(false);
      resetForm();

      await loadUsers();
    } catch (err) {
      console.error(
        "Update User Error:",
        err
      );

      showSnackbar(
        err.response?.data?.message ||
          "Failed to update user.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // FORM VALIDATION
  // =========================================================

  const validateForm = (isEditing) => {
    if (!formData.fullName.trim()) {
      showSnackbar(
        "Please enter the full name.",
        "warning"
      );
      return false;
    }

    if (!formData.email.trim()) {
      showSnackbar(
        "Please enter the email address.",
        "warning"
      );
      return false;
    }

    if (emailError) {
      showSnackbar(
        "Please enter a valid email address.",
        "warning"
      );
      return false;
    }

    if (!formData.phone.trim()) {
      showSnackbar(
        "Please enter the phone number.",
        "warning"
      );
      return false;
    }

    if (phoneError) {
      showSnackbar(
        "Please enter a valid 10-digit phone number.",
        "warning"
      );
      return false;
    }

    if (!isEditing && !formData.password) {
      showSnackbar(
        "Please enter a password.",
        "warning"
      );
      return false;
    }

    if (!isEditing && passwordError) {
      showSnackbar(
        "Password must contain at least 8 characters.",
        "warning"
      );
      return false;
    }

    if (!formData.roleId) {
      showSnackbar(
        "Please select a role.",
        "warning"
      );
      return false;
    }

    if (!formData.departmentId) {
      showSnackbar(
        "Please select a department.",
        "warning"
      );
      return false;
    }

    return true;
  };

  // =========================================================
  // DELETE USER
  // =========================================================

  const handleDeleteUser = (id) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!selectedUserId) return;

    try {
      setDeleting(true);

      const response =
        await deleteUser(selectedUserId);

      showSnackbar(
        response?.message ||
          "User deleted successfully.",
        "success"
      );

      setDeleteDialogOpen(false);
      setSelectedUserId(null);

      await loadUsers();
    } catch (err) {
      console.error(
        "Delete User Error:",
        err
      );

      showSnackbar(
        err.response?.data?.message ||
          "Failed to delete user.",
        "error"
      );
    } finally {
      setDeleting(false);
    }
  };

  // =========================================================
  // PAGINATION
  // =========================================================

  const handlePageChange = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event
  ) => {
    setRowsPerPage(
      parseInt(event.target.value, 10)
    );

    setPage(0);
  };

  // =========================================================
  // STATS
  // =========================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.IsActive
  ).length;

  const inactiveUsers =
    totalUsers - activeUsers;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        pb: 5,
      }}
    >
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <Box
        sx={{
          mb: 3,
          px: {
            xs: 0,
            sm: 0,
          },
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          spacing={2}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Box
              sx={{
                width: 54,
                height: 54,
                flexShrink: 0,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 8px 22px rgba(37,99,235,0.22)",
              }}
            >
              <PeopleRoundedIcon />
            </Box>

            <Box>
              <Typography
                variant="h4"
                fontWeight={850}
                color="text.primary"
              >
                Users
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Manage system users, roles and
                departments.
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            startIcon={
              <PersonAddAltRoundedIcon />
            }
            onClick={handleOpenAddUser}
            sx={{
              minHeight: 46,
              px: 2.5,
              borderRadius: 2.5,
              fontWeight: 800,
              boxShadow:
                "0 8px 18px rgba(37,99,235,0.22)",
            }}
          >
            Add User
          </Button>
        </Stack>
      </Box>

      {/* =====================================================
          STAT CARDS
      ====================================================== */}

      <Grid
        container
        spacing={2}
        sx={{
          mb: 3,
        }}
      >
        {/* TOTAL */}

        <Grid
          item
          xs={12}
          sm={4}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={650}
                  >
                    Total Users
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={850}
                    color="text.primary"
                    sx={{ mt: 0.5 }}
                  >
                    {totalUsers}
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor:
                      "rgba(37,99,235,0.12)",
                    color: "primary.main",
                  }}
                >
                  <PeopleRoundedIcon />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ACTIVE */}

        <Grid
          item
          xs={12}
          sm={4}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={650}
                  >
                    Active Users
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={850}
                    color="success.main"
                    sx={{ mt: 0.5 }}
                  >
                    {activeUsers}
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor:
                      "rgba(34,197,94,0.12)",
                    color: "success.main",
                  }}
                >
                  <PersonRoundedIcon />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* INACTIVE */}

        <Grid
          item
          xs={12}
          sm={4}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={650}
                  >
                    Inactive Users
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={850}
                    color="error.main"
                    sx={{ mt: 0.5 }}
                  >
                    {inactiveUsers}
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor:
                      "rgba(239,68,68,0.12)",
                    color: "error.main",
                  }}
                >
                  <PersonRoundedIcon />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* =====================================================
          USERS TABLE CARD
      ====================================================== */}

      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        {/* TABLE HEADER */}

        <Box
          sx={{
            px: {
              xs: 2.5,
              sm: 3,
            },
            py: 2.5,
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "stretch",
              md: "center",
            }}
            spacing={2}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  fontWeight={850}
                  color="text.primary"
                >
                  User Directory
                </Typography>

                <Chip
                  label={filteredUsers.length}
                  size="small"
                  color="primary"
                  sx={{
                    fontWeight: 800,
                  }}
                />
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.4,
                }}
              >
                View, edit or remove registered
                system users.
              </Typography>
            </Box>

            <TextField
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(0);
              }}
              placeholder="Search name, email, role..."
              size="small"
              sx={{
                width: {
                  xs: "100%",
                  sm: 320,
                  md: 360,
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon
                      sx={{
                        color:
                          "text.secondary",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Box>

        <Divider />

        {/* LOADING */}

        {loading && (
          <Box
            sx={{
              minHeight: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
            }}
          >
            <CircularProgress />

            <Typography
              color="text.secondary"
              fontWeight={600}
            >
              Loading users...
            </Typography>
          </Box>
        )}

        {/* ERROR */}

        {!loading && error && (
          <Box sx={{ p: 3 }}>
            <Alert
              severity="error"
              variant="outlined"
              sx={{
                borderRadius: 3,
              }}
            >
              {error}
            </Alert>

            <Button
              variant="outlined"
              startIcon={
                <RefreshRoundedIcon />
              }
              onClick={loadUsers}
              sx={{
                mt: 2,
                borderRadius: 2.5,
                fontWeight: 700,
              }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* TABLE */}

        {!loading && !error && (
          <>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: 0,
                bgcolor:
                  "background.paper",
              }}
            >
              <Table
                sx={{
                  minWidth: 850,
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color:
                          "text.secondary",
                        bgcolor:
                          "action.hover",
                      }}
                    >
                      ID
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color:
                          "text.secondary",
                        bgcolor:
                          "action.hover",
                      }}
                    >
                      User
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color:
                          "text.secondary",
                        bgcolor:
                          "action.hover",
                      }}
                    >
                      Email
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color:
                          "text.secondary",
                        bgcolor:
                          "action.hover",
                      }}
                    >
                      Role
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color:
                          "text.secondary",
                        bgcolor:
                          "action.hover",
                      }}
                    >
                      Department
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color:
                          "text.secondary",
                        bgcolor:
                          "action.hover",
                      }}
                    >
                      Status
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 800,
                        color:
                          "text.secondary",
                        bgcolor:
                          "action.hover",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredUsers.length ===
                  0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        align="center"
                        sx={{
                          py: 7,
                        }}
                      >
                        <PeopleRoundedIcon
                          sx={{
                            fontSize: 48,
                            color:
                              "text.disabled",
                            mb: 1,
                          }}
                        />

                        <Typography
                          fontWeight={750}
                          color="text.primary"
                        >
                          No users found
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Try changing your
                          search.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage +
                          rowsPerPage
                      )
                      .map((user) => (
                        <TableRow
                          key={user.UserId}
                          hover
                        >
                          {/* ID */}

                          <TableCell>
                            <Typography
                              variant="body2"
                              fontWeight={700}
                              color="text.secondary"
                            >
                              #{user.UserId}
                            </Typography>
                          </TableCell>

                          {/* USER */}

                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={1.2}
                              alignItems="center"
                            >
                              <Avatar
                                sx={{
                                  width: 38,
                                  height: 38,
                                  bgcolor:
                                    "primary.main",
                                  fontSize: 15,
                                  fontWeight: 800,
                                }}
                              >
                                {(
                                  user.FullName ||
                                  "U"
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </Avatar>

                              <Box>
                                <Typography
                                  fontWeight={750}
                                  color="text.primary"
                                >
                                  {
                                    user.FullName
                                  }
                                </Typography>

                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  User ID:{" "}
                                  {
                                    user.UserId
                                  }
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>

                          {/* EMAIL */}

                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.primary"
                            >
                              {user.Email}
                            </Typography>
                          </TableCell>

                          {/* ROLE */}

                          <TableCell>
                            <Chip
                              icon={
                                <AdminPanelSettingsRoundedIcon />
                              }
                              label={
                                user.RoleName ||
                                "—"
                              }
                              size="small"
                              variant="outlined"
                              color="primary"
                              sx={{
                                fontWeight: 650,
                              }}
                            />
                          </TableCell>

                          {/* DEPARTMENT */}

                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={0.7}
                              alignItems="center"
                            >
                              <BusinessRoundedIcon
                                sx={{
                                  fontSize: 18,
                                  color:
                                    "text.secondary",
                                }}
                              />

                              <Typography
                                variant="body2"
                                color="text.primary"
                              >
                                {user.DepartmentName ||
                                  "—"}
                              </Typography>
                            </Stack>
                          </TableCell>

                          {/* STATUS */}

                          <TableCell>
                            <Chip
                              label={
                                user.IsActive
                                  ? "Active"
                                  : "Inactive"
                              }
                              color={
                                user.IsActive
                                  ? "success"
                                  : "error"
                              }
                              size="small"
                              sx={{
                                fontWeight: 750,
                              }}
                            />
                          </TableCell>

                          {/* ACTIONS */}

                          <TableCell align="center">
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="center"
                            >
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={
                                  <EditRoundedIcon />
                                }
                                onClick={() =>
                                  handleEditUser(
                                    user
                                  )
                                }
                                sx={{
                                  borderRadius: 2,
                                  fontWeight: 700,
                                  minWidth: 82,
                                }}
                              >
                                Edit
                              </Button>

                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={
                                  <DeleteOutlineRoundedIcon />
                                }
                                onClick={() =>
                                  handleDeleteUser(
                                    user.UserId
                                  )
                                }
                                sx={{
                                  borderRadius: 2,
                                  fontWeight: 700,
                                }}
                              >
                                Delete
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
              ]}
              component="div"
              count={
                filteredUsers.length
              }
              rowsPerPage={
                rowsPerPage
              }
              page={Math.min(
                page,
                Math.max(
                  0,
                  Math.ceil(
                    filteredUsers.length /
                      rowsPerPage
                  ) - 1
                )
              )}
              onPageChange={
                handlePageChange
              }
              onRowsPerPageChange={
                handleRowsPerPageChange
              }
            />
          </>
        )}
      </Card>

      {/* =====================================================
          ADD / EDIT USER DIALOG
      ====================================================== */}

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            bgcolor:
              "background.paper",
            backgroundImage: "none",
          },
        }}
      >
        {/* DIALOG HEADER */}

        <DialogTitle
          sx={{
            pb: 1.5,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <Avatar
                sx={{
                  bgcolor:
                    "primary.main",
                }}
              >
                {editingUserId ? (
                  <EditRoundedIcon />
                ) : (
                  <PersonAddAltRoundedIcon />
                )}
              </Avatar>

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={850}
                >
                  {editingUserId
                    ? "Edit User"
                    : "Add New User"}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {editingUserId
                    ? "Update user account details."
                    : "Create a new system user."}
                </Typography>
              </Box>
            </Stack>

            <Button
              onClick={
                handleCloseDialog
              }
              disabled={saving}
              sx={{
                minWidth: 40,
                width: 40,
                height: 40,
                borderRadius: 2,
              }}
            >
              <CloseRoundedIcon />
            </Button>
          </Stack>
        </DialogTitle>

        <Divider />

        {/* DIALOG CONTENT */}

        <DialogContent
          sx={{
            pt: 3,
          }}
        >
          <Grid
            container
            spacing={2}
          >
            {/* FULL NAME */}

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                required
                label="Full Name"
                name="fullName"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                placeholder="Enter full name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRoundedIcon
                        sx={{
                          color:
                            "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      borderRadius: 2.5,
                    },
                }}
              />
            </Grid>

            {/* EMAIL */}

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                error={
                  !!emailError
                }
                helperText={
                  emailError ||
                  "Enter a valid email address."
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon
                        sx={{
                          color:
                            "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      borderRadius: 2.5,
                    },
                }}
              />
            </Grid>

            {/* PHONE */}

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                required
                label="Phone"
                name="phone"
                value={
                  formData.phone
                }
                onChange={(event) => {
                  const value =
                    event.target.value
                      .replace(
                        /\D/g,
                        ""
                      )
                      .slice(
                        0,
                        10
                      );

                  handleChange({
                    target: {
                      name: "phone",
                      value,
                    },
                  });
                }}
                error={
                  !!phoneError
                }
                helperText={
                  phoneError ||
                  "10 digit phone number."
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneRoundedIcon
                        sx={{
                          color:
                            "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      borderRadius: 2.5,
                    },
                }}
              />
            </Grid>

            {/* PASSWORD */}

            {!editingUserId && (
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  required
                  label="Password"
                  type="password"
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  error={
                    !!passwordError
                  }
                  helperText={
                    passwordError ||
                    "Minimum 8 characters."
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon
                          sx={{
                            color:
                              "text.secondary",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root":
                      {
                        borderRadius: 2.5,
                      },
                  }}
                />
              </Grid>
            )}

            {/* ROLE */}

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                select
                fullWidth
                required
                label="Role"
                name="roleId"
                value={String(
                  formData.roleId
                )}
                onChange={
                  handleChange
                }
                helperText="Select user role."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AdminPanelSettingsRoundedIcon
                        sx={{
                          color:
                            "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      borderRadius: 2.5,
                    },
                }}
              >
                {roles.map(
                  (role) => (
                    <MenuItem
                      key={
                        role.RoleId
                      }
                      value={String(
                        role.RoleId
                      )}
                    >
                      {
                        role.RoleName
                      }
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            {/* DEPARTMENT */}

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                select
                fullWidth
                required
                label="Department"
                name="departmentId"
                value={String(
                  formData.departmentId
                )}
                onChange={
                  handleChange
                }
                helperText="Select department."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessRoundedIcon
                        sx={{
                          color:
                            "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      borderRadius: 2.5,
                    },
                }}
              >
                {departments.map(
                  (
                    department
                  ) => (
                    <MenuItem
                      key={
                        department.DepartmentId
                      }
                      value={String(
                        department.DepartmentId
                      )}
                    >
                      {
                        department.DepartmentName
                      }
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        {/* DIALOG ACTIONS */}

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={
              handleCloseDialog
            }
            disabled={saving}
            sx={{
              borderRadius: 2.5,
              fontWeight: 700,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={saving}
            onClick={
              editingUserId
                ? handleUpdateUser
                : handleCreateUser
            }
            startIcon={
              saving ? (
                <CircularProgress
                  size={18}
                  color="inherit"
                />
              ) : editingUserId ? (
                <EditRoundedIcon />
              ) : (
                <PersonAddAltRoundedIcon />
              )
            }
            sx={{
              borderRadius: 2.5,
              fontWeight: 800,
              px: 2.5,
            }}
          >
            {saving
              ? "Saving..."
              : editingUserId
              ? "Update User"
              : "Save User"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* =====================================================
          DELETE CONFIRMATION
      ====================================================== */}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          if (!deleting) {
            setDeleteDialogOpen(
              false
            );
          }
        }}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            bgcolor:
              "background.paper",
            backgroundImage: "none",
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Avatar
              sx={{
                bgcolor:
                  "rgba(239,68,68,0.12)",
                color: "error.main",
              }}
            >
              <DeleteOutlineRoundedIcon />
            </Avatar>

            <Box>
              <Typography
                variant="h6"
                fontWeight={850}
              >
                Delete User
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                This action requires confirmation.
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.7,
            }}
          >
            Are you sure you want to delete
            this user? This action cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          <Button
            onClick={() =>
              setDeleteDialogOpen(
                false
              )
            }
            disabled={deleting}
            sx={{
              borderRadius: 2.5,
              fontWeight: 700,
            }}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={
              confirmDeleteUser
            }
            disabled={deleting}
            startIcon={
              deleting ? (
                <CircularProgress
                  size={18}
                  color="inherit"
                />
              ) : (
                <DeleteOutlineRoundedIcon />
              )
            }
            sx={{
              minWidth: 110,
              borderRadius: 2.5,
              fontWeight: 800,
            }}
          >
            {deleting
              ? "Deleting..."
              : "Delete User"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* =====================================================
          SNACKBAR
      ====================================================== */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        onClose={() =>
          setSnackbarOpen(false)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={
            snackbarSeverity
          }
          variant="filled"
          onClose={() =>
            setSnackbarOpen(false)
          }
          sx={{
            borderRadius: 2.5,
            fontWeight: 650,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;