import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  PeopleAlt,
  PersonAddAlt1,
  Logout,
  Today,
  CalendarMonth,
  Circle,
} from "@mui/icons-material";

import { PieChart } from "@mui/x-charts/PieChart";

import { getDashboardStats } from "../../services/dashboardService";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    TotalVisitors: 0,
    ActiveVisitors: 0,
    TodayVisits: 0,
    CheckedOutToday: 0,
  });

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(() => {
      loadDashboard();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardStats();

      setStats(
        res.data || {
          TotalVisitors: 0,
          ActiveVisitors: 0,
          TodayVisits: 0,
          CheckedOutToday: 0,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Total Visitors",
      value: stats.TotalVisitors,
      subtitle: "All time visitors",
      color: "#2563EB",
      icon: <PeopleAlt />,
    },
    {
      title: "Active Visitors",
      value: stats.ActiveVisitors,
      subtitle: "Currently inside",
      color: "#22C55E",
      icon: <PersonAddAlt1 />,
    },
    {
      title: "Today's Visits",
      value: stats.TodayVisits,
      subtitle: "Today's entries",
      color: "#F59E0B",
      icon: <Today />,
    },
    {
      title: "Checked Out",
      value: stats.CheckedOutToday,
      subtitle: "Completed visits",
      color: "#EF4444",
      icon: <Logout />,
    },
  ];

  const chartData = [
    {
      id: 0,
      value: stats.ActiveVisitors,
      label: "Active",
      color: "#2563EB",
    },
    {
      id: 1,
      value: stats.CheckedOutToday,
      label: "Checked Out",
      color: "#F59E0B",
    },
  ];

  const overview = [
    {
      label: "Total Visitors",
      value: stats.TotalVisitors,
      color: "#2563EB",
    },
    {
      label: "Active Visitors",
      value: stats.ActiveVisitors,
      color: "#22C55E",
    },
    {
      label: "Today's Visits",
      value: stats.TodayVisits,
      color: "#F59E0B",
    },
    {
      label: "Checked Out",
      value: stats.CheckedOutToday,
      color: "#EF4444",
    },
  ];

  const liveVisitors = [
    {
      name: "Rahul Sharma",
      company: "Tech Mahindra",
      status: "Inside",
      color: "success",
    },
    {
      name: "Aman Verma",
      company: "Infosys",
      status: "Checked Out",
      color: "error",
    },
    {
      name: "Priya Singh",
      company: "TCS",
      status: "Inside",
      color: "success",
    },
  ];

  const maxValue = Math.max(
    Number(stats.TotalVisitors) || 0,
    Number(stats.ActiveVisitors) || 0,
    Number(stats.TodayVisits) || 0,
    Number(stats.CheckedOutToday) || 0,
    1
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}

      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", lg: "center" }}
        spacing={2}
        mb={{ xs: 3, md: 4 }}
        sx={{
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            minWidth: 0,
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            color="text.primary"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "2.8rem",
                lg: "3.1rem",
              },
              lineHeight: 1.15,
              wordBreak: "break-word",
            }}
          >
            Welcome Back, {user?.fullName || "User"} 👋
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
            fontSize={{ xs: 14, sm: 17 }}
          >
            Here's what's happening with your visitor management today.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1.5}
          flexWrap="wrap"
          useFlexGap
          sx={{
            width: { xs: "100%", lg: "auto" },
            justifyContent: { xs: "flex-start", lg: "flex-end" },
          }}
        >
          <Chip
            icon={<CalendarMonth />}
            label={new Date().toLocaleDateString("en-GB")}
            sx={{
              height: 45,
              px: 1,
              fontSize: 15,
              bgcolor: "background.paper",
              color: "text.primary",
              border: "1px solid",
              borderColor: "divider",
              "& .MuiChip-icon": {
                color: "text.secondary",
              },
            }}
          />

          <Chip
            icon={<Circle sx={{ fontSize: 12 }} />}
            label="Live Dashboard"
            sx={{
              height: 45,
              px: 1,
              fontSize: 15,
              bgcolor: "#22C55E",
              color: "#fff",
              "& .MuiChip-icon": {
                color: "#0F172A",
              },
            }}
          />
        </Stack>
      </Stack>

      {/* ================= STATISTIC CARDS ================= */}

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
            key={card.title}
            size={{ xs: 12, sm: 6, lg: 3 }}
            sx={{
              minWidth: 0,
            }}
          >
            <Card
              elevation={0}
              sx={{
                width: "100%",
                minWidth: 0,
                height: { xs: "auto", sm: 175 },
                minHeight: 175,
                borderRadius: 4,
                border: "1px solid",
                borderColor: `${card.color}55`,
                bgcolor: "background.paper",
                boxShadow: "0 10px 30px rgba(15,23,42,.08)",
                transition:
                  "transform .25s ease, box-shadow .25s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow:
                    "0 18px 40px rgba(15,23,42,.14)",
                },
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  minWidth: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  p: 2.5,
                  "&:last-child": {
                    pb: 2.5,
                  },
                }}
              >
                <Box
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <Typography
                    color="text.secondary"
                    fontSize={15}
                    fontWeight={650}
                    noWrap
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight={850}
                    color="text.primary"
                    mt={0.5}
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    mt={0.8}
                    color="text.secondary"
                    fontSize={14}
                    noWrap
                  >
                    {card.subtitle}
                  </Typography>

                  <Box
                    sx={{
                      mt: 1.5,
                      width: "100%",
                      maxWidth: 150,
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(
                        (Number(card.value) / maxValue) * 100,
                        100
                      )}
                      sx={{
                        height: 6,
                        borderRadius: 5,
                        bgcolor: "action.hover",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: card.color,
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Avatar
                  sx={{
                    width: { xs: 55, sm: 65, md: 70 },
                    height: { xs: 55, sm: 65, md: 70 },
                    flexShrink: 0,
                    bgcolor: `${card.color}18`,
                    color: card.color,
                    border: `1px solid ${card.color}40`,
                  }}
                >
                  {card.icon}
                </Avatar>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= ANALYTICS + SUMMARY ================= */}

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid
          size={{ xs: 12, lg: 8 }}
          sx={{
            minWidth: 0,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              minWidth: 0,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              minHeight: 430,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color="text.primary"
            >
              Visitor Analytics
            </Typography>

            <Typography
              color="text.secondary"
              mb={2}
            >
              Today's Visitor Distribution
            </Typography>

            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                height: 320,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PieChart
                  width={500}
                  height={300}
                  series={[
                    {
                      data: chartData,
                      innerRadius: 70,
                      outerRadius: 120,
                      paddingAngle: 5,
                      cornerRadius: 8,
                    },
                  ]}
                  sx={{
                    maxWidth: "100%",
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid
          size={{ xs: 12, lg: 4 }}
          sx={{
            minWidth: 0,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              minWidth: 0,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              minHeight: 430,
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color="text.primary"
            >
              Today's Summary
            </Typography>

            <Divider sx={{ my: 2.5 }} />

            <Stack spacing={2.2}>
              {overview.map((item) => (
                <Box key={item.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={0.8}
                    gap={2}
                  >
                    <Typography
                      color="text.secondary"
                      fontWeight={600}
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Typography
                      fontWeight={850}
                      fontSize={22}
                      color={item.color}
                      flexShrink={0}
                    >
                      {item.value}
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={Math.min(
                      (Number(item.value) / maxValue) * 100,
                      100
                    )}
                    sx={{
                      height: 7,
                      borderRadius: 5,
                      bgcolor: "action.hover",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: item.color,
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= BOTTOM SECTION ================= */}

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        {/* Recent Activity */}

        <Grid
          size={{ xs: 12, lg: 4 }}
          sx={{
            minWidth: 0,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              minWidth: 0,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color="text.primary"
            >
              Recent Activity
            </Typography>

            <Divider sx={{ my: 2.5 }} />

            <Stack spacing={2.5}>
              <Box>
                <Typography color="text.secondary">
                  Registered Visitors
                </Typography>

                <Typography
                  fontWeight={800}
                  fontSize={22}
                  color="text.primary"
                >
                  {stats.TotalVisitors}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">
                  Visitors Inside
                </Typography>

                <Typography
                  fontWeight={800}
                  fontSize={22}
                  color="success.main"
                >
                  {stats.ActiveVisitors}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">
                  Today's Entries
                </Typography>

                <Typography
                  fontWeight={800}
                  fontSize={22}
                  color="warning.main"
                >
                  {stats.TodayVisits}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">
                  Checked Out
                </Typography>

                <Typography
                  fontWeight={800}
                  fontSize={22}
                  color="error.main"
                >
                  {stats.CheckedOutToday}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Quick Overview */}

        <Grid
          size={{ xs: 12, lg: 4 }}
          sx={{
            minWidth: 0,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              minWidth: 0,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color="text.primary"
            >
              Quick Overview
            </Typography>

            <Divider sx={{ my: 2.5 }} />

            <Stack spacing={2}>
              {overview.map((item) => (
                <Stack
                  key={item.label}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                  sx={{
                    p: 1.4,
                    borderRadius: 2.5,
                    bgcolor: "action.hover",
                    minWidth: 0,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 9,
                        height: 9,
                        minWidth: 9,
                        borderRadius: "50%",
                        bgcolor: item.color,
                      }}
                    />

                    <Typography
                      color="text.secondary"
                      fontWeight={600}
                      noWrap
                    >
                      {item.label}
                    </Typography>
                  </Stack>

                  <Typography
                    fontWeight={850}
                    color="text.primary"
                    flexShrink={0}
                  >
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Live Status */}

        <Grid
          size={{ xs: 12, lg: 4 }}
          sx={{
            minWidth: 0,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              minWidth: 0,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color="text.primary"
            >
              Live Status
            </Typography>

            <Divider sx={{ my: 2.5 }} />

            <Stack spacing={1.5}>
              {liveVisitors.map((visitor) => (
                <Box
                  key={visitor.name}
                  sx={{
                    width: "100%",
                    minWidth: 0,
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: "action.hover",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {/* Important: responsive layout prevents overlap */}
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
                    gap={1.2}
                    sx={{
                      width: "100%",
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 0,
                        flex: 1,
                        width: {
                          xs: "100%",
                          sm: "auto",
                        },
                      }}
                    >
                      <Typography
                        fontWeight={750}
                        color="text.primary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {visitor.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {visitor.company}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      color={visitor.color}
                      label={visitor.status}
                      sx={{
                        flexShrink: 0,
                        alignSelf: {
                          xs: "flex-start",
                          sm: "center",
                        },
                        fontWeight: 600,
                      }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= FOOTER ================= */}

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          minWidth: 0,
          mt: 3,
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#2563EB,#1D4ED8)",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          gap={2}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h5"
              fontWeight={800}
            >
              VisitorPro
            </Typography>

            <Typography sx={{ opacity: 0.9 }}>
              Smart Visitor Management System
            </Typography>
          </Box>

          <Chip
            label="System Online"
            sx={{
              bgcolor: "#22C55E",
              color: "#fff",
              fontWeight: 700,
              flexShrink: 0,
            }}
          />
        </Stack>
      </Paper>
    </Box>
  );
};

export default Dashboard;