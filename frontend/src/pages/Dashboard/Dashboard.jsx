import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

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
      setStats(res.data);
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

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {/* ================= Header ================= */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", lg: "center" }}
        spacing={2}
        mb={5}
      >
        <Box>
          <Typography
  variant="h3"
  fontWeight={600}
  sx={{
    fontSize: { xs: "2rem", md: "3rem" },
    letterSpacing: "-1.5px",
    lineHeight: 1.15,
    whiteSpace: "nowrap",
  }}
>
  Welcome Back, {user?.fullName} 👋
</Typography>

          <Typography
  color="text.secondary"
  mt={1}
  mb={2}
  fontSize={17}
>
  Here's what's happening with your visitor management today.
</Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Chip
            icon={<CalendarMonth />}
            label={new Date().toLocaleDateString()}
            sx={{
              height: 45,
              px: 1,
              fontSize: 15,
            }}
          />

          <Chip
            color="success"
            icon={<Circle sx={{ fontSize: 12 }} />}
            label="Live Dashboard"
            sx={{
              height: 45,
              px: 1,
              fontSize: 15,
            }}
          />
        </Stack>
      </Stack>

      {/* ================= Top Cards ================= */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card) => (
          <Grid
            key={card.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                border: `1px solid ${card.color}25`,
                background: "linear-gradient(145deg, #FFFFFF, #F8FAFC)",
                overflow: "hidden",
                transition: "all 0.3s ease",
                height: "100%",
                boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `0 18px 40px ${card.color}22`,
                  borderColor: `${card.color}45`,
                },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography color="text.secondary">
                      {card.title}
                    </Typography>

                    <Typography variant="h3" fontWeight={700} mt={1}>
                      {card.value}
                    </Typography>

                    <Typography color="text.secondary" mt={1}>
                      {card.subtitle}
                    </Typography>

                    <Box
                      sx={{
                        mt: 2,
                        width: "100%",
                        height: 8,
                        bgcolor: "#EEF2F7",
                        borderRadius: 999,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${Math.min(card.value * 25, 100)}%`,
                          height: "100%",
                          bgcolor: card.color,
                          borderRadius: 999,
                          boxShadow: `0 0 12px ${card.color}66`,
                          transition: "all .4s ease",
                        }}
                      />
                    </Box>
                  </Box>

                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      ml: 2,
                      flexShrink: 0,
                      bgcolor: `${card.color}12`,
                      color: card.color,
                      border: `1px solid ${card.color}25`,
                      boxShadow: `0 8px 20px ${card.color}20`,
                      transition: "all .3s ease",
                      "&:hover": {
                        transform: "scale(1.08) rotate(3deg)",
                        boxShadow: `0 10px 25px ${card.color}35`,
                      },
                    }}
                  >
                    {card.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= Analytics ================= */}
      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              minHeight: 430,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Visitor Analytics
            </Typography>

            <Typography color="text.secondary" mb={3}>
              Today's Visitor Distribution
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={300}
            >
              <PieChart
                width={500}
                height={280}
                series={[
                  {
                    data: chartData,
                    innerRadius: 70,
                    outerRadius: 110,
                    paddingAngle: 4,
                    cornerRadius: 6,
                  },
                ]}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              minHeight: 430,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Today's Summary
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>
              {[
                ["Total Visitors", stats.TotalVisitors, "text.primary"],
                ["Active Visitors", stats.ActiveVisitors, "success.main"],
                ["Today's Visits", stats.TodayVisits, "warning.main"],
                ["Checked Out", stats.CheckedOutToday, "error.main"],
              ].map(([label, value, color]) => (
                <Box key={label}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color="text.secondary">{label}</Typography>
                    <Typography
                      color={color}
                      fontWeight={700}
                      fontSize={22}
                    >
                      {value}
                    </Typography>
                  </Box>
                  {label !== "Checked Out" && <Divider sx={{ mt: 3 }} />}
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= Bottom Section ================= */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Recent Activity */}
        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              height: "100%",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Recent Activity
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>
              <Box>
                <Typography color="text.secondary">
                  Registered Visitors
                </Typography>
                <Typography fontWeight={700}>
                  {stats.TotalVisitors}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">
                  Visitors Inside
                </Typography>
                <Typography fontWeight={700} color="success.main">
                  {stats.ActiveVisitors}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">
                  Today's Entries
                </Typography>
                <Typography fontWeight={700} color="warning.main">
                  {stats.TodayVisits}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">
                  Checked Out
                </Typography>
                <Typography fontWeight={700} color="error.main">
                  {stats.CheckedOutToday}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Quick Overview */}
        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              height: "100%",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Quick Overview
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>
              {[
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
              ].map((item) => (
                <Box key={item.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#374151",
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Chip
                      label={item.value}
                      size="small"
                      sx={{
                        bgcolor: item.color,
                        color: "#fff",
                        fontWeight: 700,
                        minWidth: 34,
                        height: 26,
                        borderRadius: "8px",
                      }}
                    />
                  </Stack>

                  <Box
                    sx={{
                      width: "100%",
                      height: 10,
                      borderRadius: 20,
                      bgcolor: "#E5E7EB",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${Math.min(item.value * 25, 100)}%`,
                        height: "100%",
                        bgcolor: item.color,
                        borderRadius: 20,
                        transition: ".5s",
                        boxShadow: `0 0 10px ${item.color}55`,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Live Status */}
        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              height: "100%",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Live Status
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>
              {[
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
              ].map((visitor) => (
                <Paper
                  key={visitor.name}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "#F8FAFC",
                    border: "1px solid #EEF2F7",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography fontWeight={700}>
                        {visitor.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {visitor.company}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      color={visitor.color}
                      label={visitor.status}
                    />
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= Footer ================= */}
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 6,
          background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            VisitorPro
          </Typography>

          <Typography sx={{ opacity: 0.9 }}>
            Smart Visitor Management System
          </Typography>
        </Box>

        <Chip
          label="System Online"
          color="success"
          sx={{
            fontWeight: 700,
            px: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;