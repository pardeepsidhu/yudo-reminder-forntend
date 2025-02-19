import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  CircularProgress, Typography } from "@mui/material";
import {
  TextField,
  Button,
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import OTPInput from "react-otp-input";
import Alert from "./Alert";
import { handleSignIn, sendOtp, verifyOtp } from "../api/auth.api";

function AuthPage({setUser,setMessage}) {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [recievedOtp,setRecievedOtp]=useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const navigate = useNavigate();
  const [waiting,setWaiting]=useState(false);

  useEffect(()=>{
    let user = localStorage.getItem("user");
    if(user) navigate("/")
  },[])

  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  const handleSendOtp = () => {
    if (!email  || !password || !confirmPassword) {
      setMessage("Please enter valid data!");
      return;
    }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    setMessage("Please enter a valid email address");
    return;
  }
    if (password.length < 8) {
      setMessage("Password must have at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    // if (phone.length !== 10 || !/^[6789]\d{9}$/.test(phone)) {
    //   setMessage("Please enter a valid WhatsApp number!");
    //   return;
    // }
    sendOtp(email, password,setMessage,setRecievedOtp,setOtpSent,setOtpTimer,setWaiting)
      .catch(() => {
        // setMessage("Some error occurred!");
      });
  };

  // const handleOtpVerify = ()
  const resetForm = () => {
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setOtpSent(false);
    setOtpTimer(0);
  };

  

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5, textAlign: "center" }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent} margin="normal" variant="outlined"
            InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }}
          />
          {/* {tabValue === 1 && (
            <TextField fullWidth label="WhatsApp Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              disabled={otpSent} margin="normal" variant="outlined"
              InputProps={{ startAdornment: (<IconButton position="start"><WhatsAppIcon /></IconButton>) }}
            />
          )} */}
          <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            disabled={otpSent} margin="normal" variant="outlined"
            InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>) }}
          />
          {tabValue === 1 && (
            <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={otpSent} margin="normal" variant="outlined"
              InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>) }}
            />
          )}


          {tabValue === 1 && otpSent && (
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <OTPInput style={{display:"flex",justifyContent:"center",textAlign:"center"}} value={otp} onChange={setOtp} numInputs={4} separator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{display:"flex", width: "40px", height: "40px", margin: "5px", fontSize: "20px", justifyContent:"center", textAlign: "center", border: "1px solid #ccc", borderRadius: "5px" }}
            />
            </div>
          )}



          <Grid container spacing={2} sx={{ mt: 2 }}>
            {tabValue === 1 && (
              <Grid item xs={12}>
                <Button style={{ width: "44%", marginRight: "3%" }} variant="outlined" onClick={handleSendOtp} disabled={otpTimer > 0}>
                  {otpTimer ? `Resend in ${otpTimer}s` : "Send OTP"}
                </Button>
                <Button style={{ width: "44%", marginLeft: "3%" }} variant="outlined" onClick={resetForm}>
                  Reset
                </Button>
              </Grid>
            )}



            <Grid item xs={12}>
              <Button  disabled={tabValue===0?waiting: (waiting || !otpSent)} fullWidth onClick={tabValue===0 ?(e)=>handleSignIn(email,password,setMessage,e,navigate,setWaiting,setUser) :(e)=>verifyOtp(email,otp,setMessage,e,navigate,setWaiting,setUser)} variant="contained" type="submit">
                {waiting ? "Please Wait... ":tabValue === 0 ? "Sign In" : "Sign Up"}
              </Button>
              
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {/* <div class="spinner-border text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
</div> */}
    </Container>
  );
}

export default AuthPage;
