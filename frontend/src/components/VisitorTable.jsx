import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const VisitorTable = ({
  visitors,
  onEdit,
  onDelete,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Reset page if filtering leaves the current page empty
  useEffect(() => {
    const maxPage = Math.max(
      0,
      Math.ceil(visitors.length / rowsPerPage) - 1
    );

    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [visitors.length, rowsPerPage, page]);

  const visibleVisitors = visitors.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getInitial = (name) => {
    return (
      String(name || "V")
        .trim()
        .charAt(0)
        .toUpperCase() || "V"
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        backgroundImage: "none",
      }}
    >
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: 7,
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            bgcolor: "action.disabled",
          },
        }}
      >
        <Table
          sx={{
            minWidth: 850,
          }}
          aria-label="visitor table"
        >
          {/* =================================================
              TABLE HEADER
          ================================================== */}

          <TableHead>
            <TableRow
              sx={{
                bgcolor: "action.hover",
              }}
            >
              <TableCell
                sx={{
                  minWidth: 80,
                  fontWeight: 800,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                ID
              </TableCell>

              <TableCell
                sx={{
                  minWidth: 220,
                  fontWeight: 800,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                Visitor
              </TableCell>

              <TableCell
                sx={{
                  minWidth: 170,
                  fontWeight: 800,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                Phone
              </TableCell>

              <TableCell
                sx={{
                  minWidth: 240,
                  fontWeight: 800,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                Email
              </TableCell>

              <TableCell
                sx={{
                  minWidth: 180,
                  fontWeight: 800,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                Company
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  minWidth: 130,
                  fontWeight: 800,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* =================================================
              TABLE BODY
          ================================================== */}

          <TableBody>
            {visibleVisitors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{
                    py: 8,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        bgcolor: "action.hover",
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.5,
                      }}
                    >
                      <PeopleAltRoundedIcon
                        fontSize="large"
                      />
                    </Box>

                    <Typography
                      fontWeight={800}
                      color="text.primary"
                    >
                      No Visitors Found
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                      }}
                    >
                      No visitor records match your
                      current search.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              visibleVisitors.map((visitor) => (
                <TableRow
                  key={visitor.VisitorId}
                  hover
                  sx={{
                    transition:
                      "background-color 0.2s ease",
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  {/* ID */}

                  <TableCell>
                    <Chip
                      label={`#${visitor.VisitorId}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontWeight: 750,
                        borderRadius: 1.5,
                      }}
                    />
                  </TableCell>

                  {/* VISITOR */}

                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={1.25}
                      alignItems="center"
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "primary.main",
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: 15,
                        }}
                      >
                        {getInitial(
                          visitor.FullName
                        )}
                      </Avatar>

                      <Box
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          fontWeight={750}
                          color="text.primary"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 170,
                          }}
                        >
                          {visitor.FullName ||
                            "Unknown Visitor"}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Registered Visitor
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  {/* PHONE */}

                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={0.8}
                      alignItems="center"
                    >
                      <PhoneRoundedIcon
                        sx={{
                          fontSize: 18,
                          color: "text.secondary",
                        }}
                      />

                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {visitor.Phone || "—"}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* EMAIL */}

                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={0.8}
                      alignItems="center"
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <EmailRoundedIcon
                        sx={{
                          fontSize: 18,
                          flexShrink: 0,
                          color: "text.secondary",
                        }}
                      />

                      <Tooltip
                        title={
                          visitor.Email || ""
                        }
                      >
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{
                            maxWidth: 190,
                            overflow: "hidden",
                            textOverflow:
                              "ellipsis",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          {visitor.Email || "—"}
                        </Typography>
                      </Tooltip>
                    </Stack>
                  </TableCell>

                  {/* COMPANY */}

                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={0.8}
                      alignItems="center"
                    >
                      <BusinessRoundedIcon
                        sx={{
                          fontSize: 18,
                          color: "text.secondary",
                        }}
                      />

                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                          maxWidth: 150,
                          overflow: "hidden",
                          textOverflow:
                            "ellipsis",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {visitor.CompanyName ||
                          "—"}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* ACTIONS */}

                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={0.5}
                      justifyContent="center"
                    >
                      <Tooltip title="Edit Visitor">
                        <IconButton
                          size="small"
                          onClick={() =>
                            onEdit(visitor)
                          }
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            color:
                              "primary.main",
                            bgcolor:
                              "rgba(37,99,235,0.08)",
                            "&:hover": {
                              bgcolor:
                                "rgba(37,99,235,0.16)",
                            },
                          }}
                        >
                          <EditRoundedIcon
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Visitor">
                        <IconButton
                          size="small"
                          onClick={() =>
                            onDelete(
                              visitor.VisitorId
                            )
                          }
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            color:
                              "error.main",
                            bgcolor:
                              "rgba(239,68,68,0.08)",
                            "&:hover": {
                              bgcolor:
                                "rgba(239,68,68,0.16)",
                            },
                          }}
                        >
                          <DeleteOutlineRoundedIcon
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* =====================================================
          PAGINATION
      ====================================================== */}

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={visitors.length}
        rowsPerPage={rowsPerPage}
        page={Math.min(
          page,
          Math.max(
            0,
            Math.ceil(
              visitors.length /
                rowsPerPage
            ) - 1
          )
        )}
        onPageChange={(
          event,
          newPage
        ) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(
            parseInt(
              event.target.value,
              10
            )
          );
          setPage(0);
        }}
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",

          "& .MuiTablePagination-toolbar":
            {
              minHeight: 58,
              px: {
                xs: 1,
                sm: 2,
              },
            },

          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              color: "text.secondary",
              fontWeight: 600,
            },
        }}
      />
    </Paper>
  );
};

export default VisitorTable;