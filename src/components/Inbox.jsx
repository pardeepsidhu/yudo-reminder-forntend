import React, { useEffect, useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { scheduleEmail } from "../api/schedule.api";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { generateAIContent } from "../api/AI.api";
import NotificationsActive from "@mui/icons-material/NotificationsActive";

const YuduGramEmailScheduler = ({ setMessage }) => {
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const [token, setToken] = useState(null);
  const [aiPrompt,setAiPrompt]=useState("")
  
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      user = JSON.parse(user);
      setToken(user.token);
    }
  }, []);

  const [emailDetails, setEmailDetails] = useState({
    subject: "",
    message: "",
    scheduledTime: new Date().toISOString(),
  });


  const handleChange = (field, value) => {
    setEmailDetails((prevDetails) => ({
      ...prevDetails,
      [field]: field === "scheduledTime" ? value.toISOString() : value,
    }));
  };

 

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="93vh" bgcolor="#f4f6f8">
      <Card sx={{ maxWidth: 500, p: 3, boxShadow: 3, borderRadius: 3, backgroundColor: "white" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold" color="primary">
            Yudo-Reminder Scheduler <NotificationsActive/>
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
          <TextField
            label="Generate Using AI..."
            fullWidth
            margin="normal"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          { !waiting? (<IconButton color="primary" onClick={()=>generateAIContent(aiPrompt,setEmailDetails,setWaiting,setMessage,emailDetails)}>
              <AutoAwesomeIcon />
            </IconButton>)
        :    
            (<div class="spinner-border text-dark" style={{width:"15px",height:"15px"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div>) }
            </Box>
            <TextField
              label="Subject"
              fullWidth
              margin="normal"
              value={emailDetails.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
        
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={emailDetails.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Scheduled Time"
              value={dayjs(emailDetails.scheduledTime)}
              onChange={(newValue) => handleChange("scheduledTime", newValue)}
              slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={waiting}
            sx={{ mt: 3, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
            onClick={() => scheduleEmail(emailDetails, setMessage, navigate, setWaiting, token)}
          >
            {waiting ? "Please Wait... " : "Schedule Reminder"}
          </Button>
        </CardContent>    
      </Card>
    </Box>
  );
};

export default YuduGramEmailScheduler;
