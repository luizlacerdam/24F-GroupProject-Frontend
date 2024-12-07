import { Box, Button, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { requestPostWithToken } from "../utils/requests";

const CreateNewTicketForm = ({user, fetchTickets}) => {
    const [ticketDescription, setTicketDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [userCellphone, setUserCellphone] = useState("");

    // Responsible for creating a new ticket:
    const handleCreateTicket = async () => {
        try {
            const { id, token } = user;
            const newTicket = await requestPostWithToken(
                "/tickets",
                {
                    status: "open",
                    customerId: id,
                    description: ticketDescription,
                    priority,
                },
                token
            );
            console.log("New Ticket Created:", newTicket);

            // For reloading teh tickets after successful ticket creation:
            fetchTickets(); 

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Create a New Ticket
                </Typography>
                <Grid2 container spacing={2}>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={user.username}
                            disabled
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={user.email}
                            disabled
                        />
                    </Grid2>
                    
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="User Cellphone"
                            variant="outlined"
                            value={userCellphone} // Add this state in your component
                            onChange={(e) => setUserCellphone(e.target.value)} // Handle the input change
                        />
                    </Grid2>
                    
                        {/* Responsible for handling ticket priority selection: */}
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

                    {/* Responsible for handling ticket description input: */}
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
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateTicket}
                            >
                                Create Ticket
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Paper>
    )
}

export default CreateNewTicketForm;

CreateNewTicketForm.propTypes = {
    user: PropTypes.object.isRequired,
    fetchTickets: PropTypes.func.isRequired,
};