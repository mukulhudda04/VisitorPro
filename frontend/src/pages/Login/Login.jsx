import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import api from "../../config/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success(response.data.message);

        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={10}
          sx={{
            borderRadius: 4,
            p: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight="bold"
              align="center"
              gutterBottom
            >
              VisitorPro
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              mb={4}
            >
              Visitor Management System
            </Typography>

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
              }}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Logging In..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;