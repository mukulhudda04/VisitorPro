import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight={700}
        mb={1}
      >
        My Profile
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Manage your account information.
      </Typography>

      <Card
        elevation={0}
        sx={{
          maxWidth: 700,
          borderRadius: 4,
          border: "1px solid #E5E7EB",
          boxShadow: "0 8px 25px rgba(15,23,42,.06)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: "#2563EB",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              {user?.fullName?.charAt(0)}
            </Avatar>

            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
              >
                {user?.fullName || "User"}
              </Typography>

              <Typography
                color="text.secondary"
                mt={0.5}
              >
                Administrator
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Stack spacing={3}>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Full Name
              </Typography>

              <Typography
                fontWeight={600}
                mt={0.5}
              >
                {user?.fullName || "N/A"}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Email
              </Typography>

              <Typography
                fontWeight={600}
                mt={0.5}
              >
                {user?.email || "N/A"}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Role
              </Typography>

              <Typography
                fontWeight={600}
                mt={0.5}
              >
                Administrator
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;