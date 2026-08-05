import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LogoutIcon from "@mui/icons-material/Logout";
import TodayIcon from "@mui/icons-material/Today";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

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
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (err) {
      console.error(err);
    }
  };

const cards = [
  {
    title: "Total Visitors",
    value: stats.TotalVisitors,
    icon: <PeopleIcon />,
    color: "#1976d2",
  },
  {
    title: "Active Visitors",
    value: stats.ActiveVisitors,
    icon: <PersonAddAlt1Icon />,
    color: "#2e7d32",
  },
  {
    title: "Checked Out Today",
    value: stats.CheckedOutToday,
    icon: <LogoutIcon />,
    color: "#d32f2f",
  },
  {
    title: "Today's Visits",
    value: stats.TodayVisits,
    icon: <TodayIcon />,
    color: "#ed6c02",
  },
];
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome, {user?.fullName}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        mb={4}
      >
        Visitor Management Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card
              elevation={3}
              sx={{
  borderRadius: 3,
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: 8,
  },
}}
            >
              <CardContent>

  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >

    <Box>

      <Typography
        variant="subtitle1"
        color="text.secondary"
      >
        {card.title}
      </Typography>

      <Typography
        variant="h3"
        fontWeight="bold"
        mt={1}
      >
        {card.value}
      </Typography>

    </Box>

    <Avatar
      sx={{
        bgcolor: card.color,
        width: 56,
        height: 56,
      }}
    >
      {card.icon}
    </Avatar>

  </Box>

</CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card
        sx={{
          mt: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Recent Activity
          </Typography>

          <Typography
            color="text.secondary"
            mt={2}
          >
            No activity available.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;