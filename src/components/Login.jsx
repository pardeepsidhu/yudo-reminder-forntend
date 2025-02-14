import React, { useState, useEffect } from "react";
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
import { sendOtp } from "../api/auth.api";

function AuthPage() {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  const handleSendOtp = () => {
    if (!email || !phone || !password || !confirmPassword) {
      setMessage("Please enter valid data!");
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
    if (phone.length !== 10 || !/^[6789]\d{9}$/.test(phone)) {
      setMessage("Please enter a valid WhatsApp number!");
      return;
    }
    sendOtp(email, password, phone)
      .then(() => {
        setOtpSent(true);
        setOtpTimer(60);
        setMessage(`OTP sent to ${phone} and email ${email}`);
      })
      .catch(() => {
        setMessage("Some error occurred!");
      });
  };

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
          {tabValue === 1 && (
            <TextField fullWidth label="WhatsApp Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              disabled={otpSent} margin="normal" variant="outlined"
              InputProps={{ startAdornment: (<IconButton position="start"><WhatsAppIcon /></IconButton>) }}
            />
          )}
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
            <OTPInput  value={otp} onChange={setOtp} numInputs={4} separator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{ width: "40px", height: "40px", margin: "5px", fontSize: "20px", justifyContent:"center", textAlign: "center", border: "1px solid #ccc", borderRadius: "5px" }}
            />
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
              <Button fullWidth variant="contained" type="submit">
                {tabValue === 0 ? "Sign In" : "Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Alert message={message} setMessage={setMessage} />
    </Container>
  );
}

export default AuthPage;
