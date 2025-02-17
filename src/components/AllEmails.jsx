import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton, List, ListItem, ListItemText, Divider, Box, Chip, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { deleteEmail, getAll } from "../api/schedule.api";
import Alert from "./Alert";

const ShowAllEmails = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [token, setToken] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [message, setMessage] = useState("");
  const [total,setTotal]=useState(0)
  const [limit, setLimit] = useState(100);
  const navigate = useNavigate();
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      user = JSON.parse(user);
      let tokenx = user.token;
      setToken(tokenx);
      getAll(tokenx, setMessage, setEmails, setWaiting, limit,setTotal);
    }
  }, []);

  useEffect(() => {
    handleFilterChange(filterStatus);
  }, [emails, filterStatus]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    deleteEmail(deleteId,setMessage,token,setFilteredEmails,filteredEmails,setOpenDialog)
    // setEmails(emails.filter((email) => email.id !== deleteId));
    setOpenDialog(false);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === "All") {
      setFilteredEmails(emails);
    } else if (status === "Pending") {
      setFilteredEmails(emails.filter((email) => new Date(email.scheduleTime) > new Date(date)));
    } else if (status === "Sent") {
      setFilteredEmails(emails.filter((email) => new Date(email.scheduleTime) <= new Date(date)));
    }
  };

  return (
    <>
      {!waiting && (
        <Box sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#E3F2FD" }}>
          <Card style={{ paddingTop: "0px" }} sx={{ width: "100%", height: "100vh", overflow: "auto", p: 2, bgcolor: "white", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <div style={{ position: "sticky", top: "0px", zIndex: "2", background: "white", paddingTop: "10px" }}>
                <Typography align="center" variant="h5" gutterBottom color="primary">
                  <EmailIcon /> All Emails
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap", position: "sticky", zIndex: "5" }}>
                  <FormControl sx={{ flex: 1, minWidth: 150 }}>
                    <InputLabel style={{ color: "#1976d2", fontWeight: "bolder" }} id="status-filter-label">Status Filter</InputLabel>
                    <Select
                      label="Status Filter"
                      labelId="status-filter-label"
                      fullWidth
                      color="primary"
                      variant="outlined"
                      value={filterStatus}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Sent">Sent</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <List>
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((email, index) => (
                    <React.Fragment key={email._id}>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(email.jobId)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1" fontWeight="bold">{email.subject}</Typography>
                              <Chip label={new Date(email.scheduleTime) > new Date(date) ? "Pending" : "Sent"} color={new Date(email.scheduleTime) > new Date(date) ? "warning" : "success"} size="small" />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="textSecondary">
                                {new Date(email.scheduleTime).toLocaleString()}
                              </Typography>
                              <Typography variant="body1" mt={1}>{email.body}</Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < filteredEmails.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <Typography align="center" color="textSecondary" variant="h6">No Emails Available</Typography>
                )}
              </List>
            </CardContent>
          </Card>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this email?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={confirmDelete} color="error">Delete</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      {waiting && (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <div className="spinner-border text-dark" role="status"></div>
          <span>Loading...</span>
        </div>
      )}
      
<Alert message={message} setMessage={setMessage} />

    </>
  );
};

export default ShowAllEmails;
