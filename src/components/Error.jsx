import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "blue",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 3, maxWidth: "80%" }}>
        The page you are looking for is not avalible !
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          bgcolor: "white",
          color: "blue",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#f0f0f0" },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
