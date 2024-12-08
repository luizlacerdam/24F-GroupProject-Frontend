import {
    Box,
    Button,
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { requestDataWithToken, requestPostWithToken } from "../utils/requests";
  
  const CreateNewTicketForm = ({ user, fetchTickets }) => {
    const [ticketDescription, setTicketDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [userCellphone, setUserCellphone] = useState("");
  
    // Generate a record number based on the current date and sequence
    const generateRecordNumber = async () => {
      const date = new Date();
      const dateString = date.toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD
  
      try {
        const { token } = user;
        // Fetch the existing tickets created today
        const todayTickets = await requestDataWithToken(`/tickets`, token);
        console.log("Today's Tickets:", todayTickets);
        
        // Determine the next sequence number
        const nextSequence = todayTickets.length + 1;
  
        // Format sequence as a zero-padded 7-digit number
        const sequenceString = String(nextSequence).padStart(7, "0");
  
        // Combine date and sequence to form the record number
        return `${dateString}-${sequenceString}`;
      } catch (error) {
        console.error("Error generating record number:", error);
        return `${dateString}-0000001`; // Fallback if fetching fails
      }
    };
  
    // Responsible for creating a new ticket:
    const handleCreateTicket = async () => {
      try {
        const { id, token } = user;
  
        // Generate the record number
        const recordNumber = await generateRecordNumber();
  
        const newTicket = await requestPostWithToken(
          "/tickets",
          {
            status: "New",
            customerId: id,
            recordNumber, // Use the generated record number
            cellphone: userCellphone,
            description: ticketDescription,
            priority,
          },
          token
        );
        console.log("New Ticket Created:", newTicket);
  
        // Reload the tickets after successful ticket creation
        fetchTickets();
      } catch (error) {
        console.error("Error creating ticket:", error);
      }
    };
  
    return (
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Create a New Ticket
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField fullWidth variant="outlined" value={user.username} disabled />
          </Grid2>
  
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField fullWidth variant="outlined" value={user.email} disabled />
          </Grid2>
  
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="User Cellphone"
              variant="outlined"
              value={userCellphone}
              onChange={(e) => setUserCellphone(e.target.value)}
            />
          </Grid2>
  
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
  
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Ticket Description"
              variant="outlined"
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
            />
          </Grid2>
  
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" color="primary" onClick={handleCreateTicket}>
                Create Ticket
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Paper>
    );
  };
  
  CreateNewTicketForm.propTypes = {
    user: PropTypes.object.isRequired,
    fetchTickets: PropTypes.func.isRequired,
  };
  
  export default CreateNewTicketForm;
  