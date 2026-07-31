import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const cards = [
  {
    title: "Total Visitors",
    value: 0,
  },
  {
    title: "Active Visitors",
    value: 0,
  },
  {
    title: "Checked Out Today",
    value: 0,
  },
  {
    title: "Today's Visits",
    value: 0,
  },
];

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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