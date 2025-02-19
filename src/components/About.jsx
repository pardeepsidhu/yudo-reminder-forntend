import React from "react";
import { Container, Typography, Card, CardContent, Button, Box, Link, Grid, Avatar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import developerPng from "../icon/logo.png"

const BackgroundImage = "https://images.unsplash.com/photo-1531297484001-80022131f5a1";
// const BackgroundImage = "https://images.unsplash.com/photo-1526772662000-3f88f10405ff";


const AboutPage = () => {
  return (
    <Box sx={{
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: 0.5,
      width: "100vw",
      overflowX: "hidden"
    }}>
      <Container maxWidth={false} sx={{ width: "100%", overflowX: "hidden",paddingTop:"10px" ,paddingBottom:"10px"}}>
        <Card sx={{ p: 3, borderRadius: 3,marginTop:"10px", boxShadow: 5, backdropFilter: "blur(5px)", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Avatar src={developerPng} sx={{ width: 100, height: 100 }}>
                  {/* <AccountCircleIcon sx={{ fontSize: 80 }} /> */}
                </Avatar>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h4" fontWeight="bold" textAlign="center">About Yudo-Reminder</Typography>
              </Grid>
            </Grid>

            <Typography variant="body1" paragraph mt={2}>
              <strong>Yudo-Reminder</strong> is a powerful email scheduling application that allows users to schedule emails at a predefined time. It ensures timely email delivery and includes OTP verification for security.
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>✨ Features:</Typography>
            <ul>
              <li>OTP Verification for Secure Access</li>
              <li>Email Scheduling at User-Defined Time</li>
              <li><strong>Telegram</strong> message Scheduling at User-Defined Time</li>
              <li>User Authentication (Login & Logout)</li>
              <li>Integration with <strong>google gemini</strong> API for Writing Emails</li>
            </ul>

            <Typography variant="h6" sx={{ mt: 2 }}>🛠️ Tech Stack:</Typography>
            <Typography variant="body1">
              Built using <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express.js</strong>, <strong>MongoDB</strong>, and <strong>Material-UI</strong>. Developed on <strong>Kali Linux</strong> using <strong>Visual Studio Code</strong>.
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>👨‍💻 About the Developer:</Typography>
            <Typography variant="body1">
              <strong>Pardeep Singh</strong>, a BCA student at Maharaja Ranjit Singh Punjab Technical University (2022-2025) with 70% marks. Completed a one-month internship at <strong>Outhink Global Communication</strong> as a MERN Stack Developer. Mobile : <strong>+91 8284012817</strong>
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>📚 Skills:</Typography>
            <Typography variant="body1">
              HTML, CSS, JavaScript, Node.js, Express.js, React.js, Bootstrap, PostgreSQL, MongoDB, and Core Java.
            </Typography>

            <Box sx={{ mt: 3, display: "flex", flexWrap:"wrap",justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<GitHubIcon />}
                href="https://github.com/pardeepsidhu"
                target="_blank"
              >

                GitHub &nbsp;&nbsp;&nbsp;
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<LinkedInIcon />}
                href="https://www.linkedin.com/in/pardeep-singh-85848a2b1"
                target="_blank"
              >
                LinkedIn&nbsp;
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<EmailIcon />}
                href="mailto:sidhupardeep618@yahoo.com"
              >
                Contact
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AboutPage;
