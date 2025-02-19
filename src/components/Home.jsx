import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TelegramIcon from "@mui/icons-material/Telegram";

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
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Yudo Reminder
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Schedule your emails & messages and never miss an important reminder again!
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" align="center">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h5" sx={{ mt: 5, fontWeight: "bold" }}>
          Start organizing your emails & messages today with Yudo Reminder!
        </Typography>
      </Container>
    </Box>
  );
};

const features = [
  {
    icon: <AccessTimeIcon fontSize="large" sx={{ color: "#ffcc00" }} />,
    title: "Set Timed Emails",
    description: "Choose when you want your emails to be sent automatically.",
  },
  {
    icon: <EmailIcon fontSize="large" sx={{ color: "#ff5722" }} />,
    title: "Automatic Email Sending",
    description: "Let Yudo-Reminder handle email delivery for you.",
  },
  {
    icon: <NotificationsActiveIcon fontSize="large" sx={{ color: "#4caf50" }} />,
    title: "Never Miss a Reminder",
    description: "Stay updated  with scheduled notifications.",
  },
  {
    icon: <TelegramIcon fontSize="large" sx={{ color: "#0088cc" }} />,
    title: "Send via Telegram",
    description: "Get reminders delivered straight to your Telegram chat.",
  },
];

export default Home;