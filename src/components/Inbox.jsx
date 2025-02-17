import React, { useEffect, useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { scheduleEmail } from "../api/schedule.api";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const YuduGramEmailScheduler = () => {
  const [message,setMessage]=useState("")
  const navigate = useNavigate();
  const [waiting,setWaiting]=useState(false)
  const [token,setToken]=useState(null)
  useEffect(()=>{
    let user = localStorage.getItem("user")
    if(!user){
      navigate("/login")
    }
    else{
      user = JSON.parse(user)
      setToken(user.token)
    }
  },[])
  const [emailDetails, setEmailDetails] = useState({
    subject: "",
    message: "",
    scheduledTime: new Date().toISOString(), // Store as JavaScript string (ISO format)
  });

  const handleChange = (field, value) => {
    console.log(emailDetails)
    setEmailDetails((prevDetails) => ({
      ...prevDetails,
      [field]: field === "scheduledTime" ? value.toISOString() : value, // Convert to string
    }));
  };


  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="93vh" bgcolor="#f4f6f8">
      <Card sx={{ maxWidth: 500, p: 3, boxShadow: 3, borderRadius: 3, backgroundColor: "white" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold" color="primary">
            Yudo-Reminder Email Scheduler
          </Typography>
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
              value={dayjs(emailDetails.scheduledTime)} // Convert string to dayjs
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
            onClick={()=>scheduleEmail(emailDetails,setMessage,navigate,setWaiting,token)}
          >
           { waiting ? "Please Wait... " :"Schedule Email"}
          </Button>
        </CardContent>    
      </Card>
      <Alert message={message} setMessage={setMessage} />
      
    </Box>
  );
};

export default YuduGramEmailScheduler;
