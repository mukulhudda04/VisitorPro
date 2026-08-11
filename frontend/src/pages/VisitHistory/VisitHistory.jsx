import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    InputAdornment,
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
    Chip,
    Toolbar,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";

import {
    getVisitHistory,
    deleteVisitHistory,
    deleteMultipleVisitHistory,
} from "../../services/historyService";


const VisitHistory = () => {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [selectedIds, setSelectedIds] = useState([]);

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    const [deleteMode, setDeleteMode] =
        useState("multiple");

    const [selectedDeleteId, setSelectedDeleteId] =
        useState(null);

    const [snackbarOpen, setSnackbarOpen] =
        useState(false);

    const [snackbarMessage, setSnackbarMessage] =
        useState("");

    const [snackbarSeverity, setSnackbarSeverity] =
        useState("success");


    // ==========================
    // ADMIN CHECK
    // ==========================

    const isAdmin = useMemo(() => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                return false;
            }

            const payload =
                JSON.parse(
                    atob(
                        token
                            .split(".")[1]
                            .replace(/-/g, "+")
                            .replace(/_/g, "/")
                    )
                );

            return Number(payload.roleId) === 1;

        } catch (error) {

            console.error(
                "Unable to read user role:",
                error
            );

            return false;
        }

    }, []);


    // ==========================
    // LOAD HISTORY
    // ==========================

    useEffect(() => {
        loadHistory();
    }, []);


    const loadHistory = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await getVisitHistory();

            setHistory(
                response.data || []
            );

        } catch (err) {

            console.error(err);

            setError(
                "Failed to load visit history."
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================
    // FILTER
    // ==========================

    const filteredHistory = useMemo(() => {

        const query =
            search.trim().toLowerCase();

        if (!query) {
            return history;
        }

        return history.filter((visit) => {

            const fullName =
                String(
                    visit.FullName || ""
                ).toLowerCase();

            const employeeName =
                String(
                    visit.EmployeeName || ""
                ).toLowerCase();

            const department =
                String(
                    visit.Department || ""
                ).toLowerCase();

            const purpose =
                String(
                    visit.Purpose || ""
                ).toLowerCase();

            return (
                fullName.includes(query) ||
                employeeName.includes(query) ||
                department.includes(query) ||
                purpose.includes(query)
            );

        });

    }, [history, search]);


    // ==========================
    // CURRENT PAGE DATA
    // ==========================

    const currentPageRows =
        filteredHistory.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );


    // ==========================
    // SELECTION
    // ==========================

    const handleSelectOne = (id) => {

        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter(
                    (item) => item !== id
                )
                : [...current, id]
        );

    };


    const currentPageIds =
        currentPageRows.map(
            (visit) => visit.VisitId
        );


    const allCurrentPageSelected =
        currentPageIds.length > 0 &&
        currentPageIds.every(
            (id) => selectedIds.includes(id)
        );


    const someCurrentPageSelected =
        currentPageIds.some(
            (id) => selectedIds.includes(id)
        );


    const handleSelectAll = (event) => {

        if (event.target.checked) {

            setSelectedIds((current) => {

                const combined = [
                    ...current,
                    ...currentPageIds,
                ];

                return [...new Set(combined)];

            });

        } else {

            setSelectedIds((current) =>
                current.filter(
                    (id) =>
                        !currentPageIds.includes(id)
                )
            );

        }

    };


    // ==========================
    // DELETE DIALOG
    // ==========================

    const openSingleDelete = (id) => {

        setSelectedDeleteId(id);
        setDeleteMode("single");
        setDeleteDialogOpen(true);

    };


    const openMultipleDelete = () => {

        if (selectedIds.length === 0) {
            return;
        }

        setDeleteMode("multiple");
        setDeleteDialogOpen(true);

    };


    // ==========================
    // DELETE
    // ==========================

    const handleDelete = async () => {

        try {

            let response;

            if (deleteMode === "single") {

                response =
                    await deleteVisitHistory(
                        selectedDeleteId
                    );

            } else {

                response =
                    await deleteMultipleVisitHistory(
                        selectedIds
                    );

            }

            setSnackbarSeverity("success");

            setSnackbarMessage(
                response?.message ||
                "Visit history deleted successfully."
            );

            setSnackbarOpen(true);

            setDeleteDialogOpen(false);

            setSelectedDeleteId(null);
            setSelectedIds([]);

            await loadHistory();

            setPage(0);

        } catch (err) {

            console.error(err);

            setSnackbarSeverity("error");

            setSnackbarMessage(
                err.response?.data?.message ||
                "Failed to delete visit history."
            );

            setSnackbarOpen(true);

        }

    };


    // ==========================
    // SEARCH
    // ==========================

    const handleSearchChange = (event) => {

        setSearch(
            event.target.value
        );

        setPage(0);

    };


    // ==========================
    // DATE FORMAT
    // ==========================

    const formatDate = (value) => {

        if (!value) {
            return "—";
        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "—";
        }

        return date.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    };


    return (

        <Box
            sx={{
                width: "100%",
                pb: 4,
            }}
        >

            {/* TOP CARD */}

            <Card
                elevation={0}
                sx={{
                    mb: 4,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    overflow: "hidden",
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 2.5,
                            md: 3,
                        },
                        "&:last-child": {
                            pb: {
                                xs: 2.5,
                                md: 3,
                            },
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
                            xs: "stretch",
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
                                    width: 52,
                                    height: 52,
                                    borderRadius: 3,
                                    bgcolor:
                                        "primary.main",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:
                                        "center",
                                }}
                            >
                                <HistoryRoundedIcon />
                            </Box>

                            <Box>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >

                                    <Typography
                                        variant="h5"
                                        fontWeight={850}
                                    >
                                        Visit History
                                    </Typography>

                                    <Chip
                                        label={`${history.length} Records`}
                                        size="small"
                                        color="primary"
                                        sx={{
                                            fontWeight: 700,
                                        }}
                                    />

                                </Stack>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mt={0.4}
                                >
                                    View and manage completed
                                    visitor visits.
                                </Typography>

                            </Box>

                        </Stack>


                        <TextField
                            placeholder="Search visitor, employee, department..."
                            size="small"
                            value={search}
                            onChange={
                                handleSearchChange
                            }
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: 380,
                                    md: 410,
                                },
                                "& .MuiOutlinedInput-root":
                                    {
                                        minHeight: 44,
                                        borderRadius: 2.5,
                                        bgcolor:
                                            "background.default",
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

                                endAdornment:
                                    search ? (
                                        <InputAdornment position="end">
                                            <Button
                                                size="small"
                                                onClick={() => {
                                                    setSearch(
                                                        ""
                                                    );
                                                    setPage(
                                                        0
                                                    );
                                                }}
                                                sx={{
                                                    minWidth: 30,
                                                    width: 30,
                                                    height: 30,
                                                    p: 0,
                                                }}
                                            >
                                                <CloseRoundedIcon />
                                            </Button>
                                        </InputAdornment>
                                    ) : null,
                            }}
                        />

                    </Stack>

                </CardContent>

            </Card>


            {/* STATS */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={2}
                sx={{
                    mb: 4,
                    position: "relative",
                    zIndex: 1,
                }}
            >

                <Card
                    elevation={0}
                    sx={{
                        flex: 1,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor:
                            "background.paper",
                    }}
                >

                    <CardContent
                        sx={{
                            p: 2.3,
                            "&:last-child": {
                                pb: 2.3,
                            },
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={650}
                        >
                            Total Records
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={850}
                            mt={0.4}
                        >
                            {history.length}
                        </Typography>

                    </CardContent>

                </Card>


                <Card
                    elevation={0}
                    sx={{
                        flex: 1,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor:
                            "background.paper",
                    }}
                >

                    <CardContent
                        sx={{
                            p: 2.3,
                            "&:last-child": {
                                pb: 2.3,
                            },
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={650}
                        >
                            Search Results
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={850}
                            mt={0.4}
                        >
                            {filteredHistory.length}
                        </Typography>

                    </CardContent>

                </Card>


                {isAdmin && (

                    <Card
                        elevation={0}
                        sx={{
                            flex: 1,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor:
                                "rgba(239,68,68,.25)",
                            bgcolor:
                                "background.paper",
                        }}
                    >

                        <CardContent
                            sx={{
                                p: 2.3,
                                "&:last-child": {
                                    pb: 2.3,
                                },
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                fontWeight={650}
                            >
                                Selected
                            </Typography>

                            <Typography
                                variant="h5"
                                fontWeight={850}
                                color={
                                    selectedIds.length
                                        ? "error.main"
                                        : "text.primary"
                                }
                                mt={0.4}
                            >
                                {selectedIds.length}
                            </Typography>

                        </CardContent>

                    </Card>

                )}

            </Stack>


            {/* HISTORY TABLE */}

            <Card
                elevation={0}
                sx={{
                    mt: 4,
                    position: "relative",
                    zIndex: 2,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor:
                        "background.paper",
                    overflow: "hidden",
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 2,
                            md: 3,
                        },
                        "&:last-child": {
                            pb: {
                                xs: 2,
                                md: 3,
                            },
                        },
                    }}
                >

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        justifyContent="space-between"
                        alignItems={{
                            xs: "flex-start",
                            sm: "center",
                        }}
                        spacing={1.5}
                        mb={2.5}
                    >

                        <Box>

                            <Typography
                                variant="h6"
                                fontWeight={850}
                            >
                                Visit Records
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={0.4}
                            >
                                Complete record of visitor
                                check-ins and check-outs.
                            </Typography>

                        </Box>


                        {isAdmin &&
                            selectedIds.length > 0 && (

                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={
                                        <DeleteRoundedIcon />
                                    }
                                    onClick={
                                        openMultipleDelete
                                    }
                                    sx={{
                                        borderRadius: 2,
                                        fontWeight: 750,
                                    }}
                                >
                                    Delete Selected (
                                    {selectedIds.length})
                                </Button>

                            )}

                    </Stack>


                    <Divider sx={{ mb: 2.5 }} />


                    {/* LOADING */}

                    {loading && (

                        <Box
                            sx={{
                                minHeight: 320,
                                display: "flex",
                                flexDirection:
                                    "column",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                gap: 1.5,
                            }}
                        >

                            <CircularProgress />

                            <Typography
                                color="text.secondary"
                            >
                                Loading visit history...
                            </Typography>

                        </Box>

                    )}


                    {/* ERROR */}

                    {!loading &&
                        error && (

                            <Alert
                                severity="error"
                                variant="outlined"
                                sx={{
                                    borderRadius: 3,
                                }}
                            >
                                {error}
                            </Alert>

                        )}


                    {/* EMPTY */}

                    {!loading &&
                        !error &&
                        filteredHistory.length ===
                            0 && (

                            <Box
                                sx={{
                                    minHeight: 300,
                                    display: "flex",
                                    flexDirection:
                                        "column",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    textAlign:
                                        "center",
                                }}
                            >

                                <HistoryRoundedIcon
                                    sx={{
                                        fontSize: 60,
                                        color:
                                            "text.secondary",
                                        mb: 1.5,
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    fontWeight={800}
                                >
                                    {search
                                        ? "No matching records"
                                        : "No Visit History Found"}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    mt={0.5}
                                >
                                    {search
                                        ? "Try another search."
                                        : "Completed visitor visits will appear here."}
                                </Typography>

                            </Box>

                        )}


                    {/* TABLE */}

                    {!loading &&
                        !error &&
                        filteredHistory.length >
                            0 && (

                            <TableContainer
                                component={
                                    Paper
                                }
                                elevation={0}
                                sx={{
                                    border:
                                        "1px solid",
                                    borderColor:
                                        "divider",
                                    borderRadius: 3,
                                    overflowX:
                                        "auto",
                                    bgcolor:
                                        "background.paper",
                                }}
                            >

                                <Table
                                    sx={{
                                        minWidth: 1200,
                                    }}
                                >

                                    <TableHead>

                                        <TableRow
                                            sx={{
                                                bgcolor:
                                                    "action.hover",
                                            }}
                                        >

                                            {isAdmin && (

                                                <TableCell
                                                    padding="checkbox"
                                                >
                                                    <Checkbox
                                                        checked={
                                                            allCurrentPageSelected
                                                        }
                                                        indeterminate={
                                                            someCurrentPageSelected &&
                                                            !allCurrentPageSelected
                                                        }
                                                        onChange={
                                                            handleSelectAll
                                                        }
                                                    />
                                                </TableCell>

                                            )}

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

                                            {isAdmin && (

                                                <TableCell align="center">
                                                    <b>Action</b>
                                                </TableCell>

                                            )}

                                        </TableRow>

                                    </TableHead>


                                    <TableBody>

                                        {currentPageRows.map(
                                            (visit) => (

                                                <TableRow
                                                    key={
                                                        visit.VisitId
                                                    }
                                                    hover
                                                >

                                                    {isAdmin && (

                                                        <TableCell
                                                            padding="checkbox"
                                                        >
                                                            <Checkbox
                                                                checked={
                                                                    selectedIds.includes(
                                                                        visit.VisitId
                                                                    )
                                                                }
                                                                onChange={() =>
                                                                    handleSelectOne(
                                                                        visit.VisitId
                                                                    )
                                                                }
                                                            />
                                                        </TableCell>

                                                    )}


                                                    <TableCell>

                                                        <Chip
                                                            label={`#${visit.VisitId}`}
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                            sx={{
                                                                fontWeight: 700,
                                                            }}
                                                        />

                                                    </TableCell>


                                                    <TableCell>

                                                        <Typography
                                                            fontWeight={750}
                                                            noWrap
                                                        >
                                                            {visit.FullName ||
                                                                "—"}
                                                        </Typography>

                                                    </TableCell>


                                                    <TableCell>

                                                        <Typography
                                                            noWrap
                                                        >
                                                            {visit.EmployeeName ||
                                                                "—"}
                                                        </Typography>

                                                    </TableCell>


                                                    <TableCell>

                                                        <Typography
                                                            color="text.secondary"
                                                            noWrap
                                                        >
                                                            {visit.Department ||
                                                                "—"}
                                                        </Typography>

                                                    </TableCell>


                                                    <TableCell>

                                                        <Typography
                                                            color="text.secondary"
                                                            sx={{
                                                                maxWidth: 180,
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >
                                                            {visit.Purpose ||
                                                                "—"}
                                                        </Typography>

                                                    </TableCell>


                                                    <TableCell>

                                                        <Stack
                                                            direction="row"
                                                            spacing={0.7}
                                                            alignItems="center"
                                                            sx={{
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >

                                                            <EventRoundedIcon
                                                                sx={{
                                                                    fontSize: 17,
                                                                    color:
                                                                        "text.secondary",
                                                                }}
                                                            />

                                                            <Typography
                                                                variant="body2"
                                                            >
                                                                {formatDate(
                                                                    visit.CheckInTime
                                                                )}
                                                            </Typography>

                                                        </Stack>

                                                    </TableCell>


                                                    <TableCell>

                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >
                                                            {formatDate(
                                                                visit.CheckOutTime
                                                            )}
                                                        </Typography>

                                                    </TableCell>


                                                    <TableCell>

                                                        <Chip
                                                            label={
                                                                visit.Status ||
                                                                "Completed"
                                                            }
                                                            color={
                                                                String(
                                                                    visit.Status
                                                                ).toLowerCase() ===
                                                                "active"
                                                                    ? "success"
                                                                    : "default"
                                                            }
                                                            size="small"
                                                            icon={
                                                                <CheckCircleRoundedIcon />
                                                            }
                                                            sx={{
                                                                fontWeight: 700,
                                                            }}
                                                        />

                                                    </TableCell>


                                                    {isAdmin && (

                                                        <TableCell align="center">

                                                            <Button
                                                                color="error"
                                                                variant="outlined"
                                                                size="small"
                                                                startIcon={
                                                                    <DeleteRoundedIcon />
                                                                }
                                                                onClick={() =>
                                                                    openSingleDelete(
                                                                        visit.VisitId
                                                                    )
                                                                }
                                                                sx={{
                                                                    borderRadius: 2,
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>

                                                        </TableCell>

                                                    )}

                                                </TableRow>

                                            )
                                        )}

                                    </TableBody>

                                </Table>


                                <TablePagination
                                    rowsPerPageOptions={[
                                        5,
                                        10,
                                        25,
                                    ]}
                                    component="div"
                                    count={
                                        filteredHistory.length
                                    }
                                    rowsPerPage={
                                        rowsPerPage
                                    }
                                    page={page}
                                    onPageChange={(
                                        event,
                                        newPage
                                    ) =>
                                        setPage(
                                            newPage
                                        )
                                    }
                                    onRowsPerPageChange={(
                                        event
                                    ) => {
                                        setRowsPerPage(
                                            parseInt(
                                                event
                                                    .target
                                                    .value,
                                                10
                                            )
                                        );
                                        setPage(
                                            0
                                        );
                                    }}
                                />

                            </TableContainer>

                        )}

                </CardContent>

            </Card>


            {/* DELETE CONFIRMATION */}

            <Dialog
                open={deleteDialogOpen}
                onClose={() =>
                    setDeleteDialogOpen(
                        false
                    )
                }
                PaperProps={{
                    sx: {
                        width: "100%",
                        maxWidth: 450,
                        borderRadius: 4,
                        bgcolor:
                            "background.paper",
                        backgroundImage:
                            "none",
                    },
                }}
            >

                <DialogTitle
                    sx={{
                        p: 3,
                        pb: 1.5,
                    }}
                >

                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                    >

                        <Box
                            sx={{
                                width: 46,
                                height: 46,
                                borderRadius: 2.5,
                                bgcolor:
                                    "rgba(239,68,68,.10)",
                                color:
                                    "error.main",
                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                            }}
                        >
                            <WarningAmberRoundedIcon />
                        </Box>

                        <Box>

                            <Typography
                                fontWeight={850}
                                fontSize={20}
                            >
                                Delete Visit History
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                This action cannot be undone.
                            </Typography>

                        </Box>

                    </Stack>

                </DialogTitle>


                <DialogContent
                    sx={{
                        px: 3,
                        py: 2,
                    }}
                >

                    <Typography
                        color="text.secondary"
                    >
                        {deleteMode ===
                        "single"
                            ? "Are you sure you want to permanently delete this visit history record?"
                            : `Are you sure you want to permanently delete ${selectedIds.length} selected visit history records?`}
                    </Typography>

                </DialogContent>


                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3,
                        gap: 1,
                    }}
                >

                    <Button
                        variant="outlined"
                        onClick={() =>
                            setDeleteDialogOpen(
                                false
                            )
                        }
                        sx={{
                            borderRadius: 2,
                            fontWeight: 700,
                        }}
                    >
                        Cancel
                    </Button>


                    <Button
                        variant="contained"
                        color="error"
                        startIcon={
                            <DeleteRoundedIcon />
                        }
                        onClick={
                            handleDelete
                        }
                        sx={{
                            borderRadius: 2,
                            fontWeight: 750,
                        }}
                    >
                        Delete Permanently
                    </Button>

                </DialogActions>

            </Dialog>


            {/* SNACKBAR */}

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
                        setSnackbarOpen(
                            false
                        )
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

export default VisitHistory;