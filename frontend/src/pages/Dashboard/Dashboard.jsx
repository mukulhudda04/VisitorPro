import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";

import {
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
    },
    {
      title: "Active Visitors",
      value: stats.ActiveVisitors,
    },
    {
      title: "Checked Out Today",
      value: stats.CheckedOutToday,
    },
    {
      title: "Today's Visits",
      value: stats.TodayVisits,
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
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  mt={2}
                >
                  {card.value}
                </Typography>
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