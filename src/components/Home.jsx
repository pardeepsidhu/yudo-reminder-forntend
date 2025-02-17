import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const Home = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        p: 3,
        mt: "0px", // Adjust for sticky navbar
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Yudo Reminder
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Schedule your emails and never miss an important reminder again!
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <AccessTimeIcon fontSize="large" />
              <Typography variant="h6">Set Timed Emails</Typography>
              <Typography variant="body1" align="center">Choose when you want your emails to be sent automatically.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <EmailIcon fontSize="large" />
              <Typography variant="h6">Automatic Email Sending</Typography>
              <Typography variant="body1" align="center">Let Yudo-Reminder handle email delivery for you.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <NotificationsActiveIcon fontSize="large" />
              <Typography variant="h6">Never Miss a Reminder</Typography>
              <Typography variant="body1" align="center">Stay on top of important tasks with scheduled notifications.</Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ mt: 5 }}>
          Start organizing your emails today with Yudo-Reminder!
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;