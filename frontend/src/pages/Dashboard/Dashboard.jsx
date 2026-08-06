import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

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
            fontWeight={700}
          >
            Welcome Back, {user?.fullName} 👋
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
            fontSize={17}
          >
            Here's what's happening with your visitor management today.
          </Typography>

        </Box>

        <Stack
          direction="row"
          spacing={2}
        >

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

      <Grid
        container
        spacing={3}
        sx={{
          mb: 4,
        }}
      >

        {cards.map((card) => (

          <Grid
            key={card.title}
            size={{ xs: 12, sm: 6, md: 3 }}
          >

            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: `2px solid ${card.color}20`,
                transition: ".25s",
                height: "100%",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                },
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
                      color="text.secondary"
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      fontWeight={700}
                      mt={1}
                    >
                      {card.value}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={1}
                    >
                      {card.subtitle}
                    </Typography>

                  </Box>

                  <Avatar
                    sx={{
                      bgcolor: card.color,
                      width: 62,
                      height: 62,
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

        <Grid size={{ xs: 12, lg: 8 }}>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              height: 430,
            }}
          >

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Visitor Analytics
            </Typography>

            <Typography
              color="text.secondary"
              mb={3}
            >
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

        <Grid size={{ xs: 12, lg: 4 }}>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              height: 430,
            }}
          >

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Today's Summary
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>

              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography color="text.secondary">
                  Total Visitors
                </Typography>

                <Typography
                  fontWeight={700}
                  fontSize={22}
                >
                  {stats.TotalVisitors}
                </Typography>
              </Box>

              <Divider />

              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography color="text.secondary">
                  Active Visitors
                </Typography>

                <Typography
                  color="success.main"
                  fontWeight={700}
                  fontSize={22}
                >
                  {stats.ActiveVisitors}
                </Typography>
              </Box>

              <Divider />

              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography color="text.secondary">
                  Today's Visits
                </Typography>

                <Typography
                  color="warning.main"
                  fontWeight={700}
                  fontSize={22}
                >
                  {stats.TodayVisits}
                </Typography>
              </Box>

              <Divider />

              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography color="text.secondary">
                  Checked Out
                </Typography>

                <Typography
                  color="error.main"
                  fontWeight={700}
                  fontSize={22}
                >
                  {stats.CheckedOutToday}
                </Typography>
              </Box>

            </Stack>

          </Paper>

        </Grid>

      </Grid>

            {/* ================= Bottom Section ================= */}

      <Grid
        container
        spacing={3}
        sx={{ mt: 1 }}
      >

        {/* Recent Activity */}

        <Grid size={{ xs: 12, md: 6 }}>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              height: "100%",
            }}
          >

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Recent Activity
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">
                  Registered Visitors
                </Typography>

                <Typography fontWeight={700}>
                  {stats.TotalVisitors}
                </Typography>
              </Box>

              <Divider />

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">
                  Visitors Inside
                </Typography>

                <Typography
                  fontWeight={700}
                  color="success.main"
                >
                  {stats.ActiveVisitors}
                </Typography>
              </Box>

              <Divider />

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">
                  Today's Entries
                </Typography>

                <Typography
                  fontWeight={700}
                  color="warning.main"
                >
                  {stats.TodayVisits}
                </Typography>
              </Box>

              <Divider />

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">
                  Checked Out
                </Typography>

                <Typography
                  fontWeight={700}
                  color="error.main"
                >
                  {stats.CheckedOutToday}
                </Typography>
              </Box>

            </Stack>

          </Paper>

        </Grid>

        {/* Quick Overview */}

        <Grid size={{ xs: 12, md: 6 }}>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              height: "100%",
            }}
          >

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Quick Overview
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>

              <Typography>
                👥 Total Visitors :
                <b> {stats.TotalVisitors}</b>
              </Typography>

              <Typography>
                🟢 Active Visitors :
                <b> {stats.ActiveVisitors}</b>
              </Typography>

              <Typography>
                📅 Today's Visits :
                <b> {stats.TodayVisits}</b>
              </Typography>

              <Typography>
                🚪 Checked Out :
                <b> {stats.CheckedOutToday}</b>
              </Typography>

            </Stack>

          </Paper>

        </Grid>

      </Grid>

      {/* Footer */}

      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#2563EB,#1D4ED8)",
          color: "#fff",
        }}
      >

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              VisitorPro
            </Typography>

            <Typography sx={{ opacity: .9 }}>
              Smart Visitor Management System
            </Typography>

          </Box>

          <Chip
            label="System Online"
            color="success"
          />

        </Stack>

      </Paper>

    </Box>

  );

};

export default Dashboard;