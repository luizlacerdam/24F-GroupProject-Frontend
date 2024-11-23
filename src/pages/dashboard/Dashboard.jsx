
// Responsible for importing necessary components and icons
import DeleteIcon from "@mui/icons-material/Delete";

import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getItem } from "../../utils/localStorageHandling";

// Responsible for handling API requests with tokens:
import { requestDataWithToken, requestDeleteWithToken, requestPostWithToken } from "../../utils/requests"; 


function Dashboard() {
    // Responsible for managing user state
    const [user, setUser] = useState({});
    // Responsible for managing tickets state
    const [tickets, setTickets] = useState([]);
    // Responsible for managing ticket description input
    const [ticketDescription, setTicketDescription] = useState("");
    // Responsible for managing ticket priority input
    const [priority, setPriority] = useState("low");

    // Responsible for fetching tickets for the current user:
    const fetchTickets = async () => {
        try {
            const storedUser = getItem("user");
            const fetchedTickets = await requestDataWithToken(`/tickets/user/${storedUser.id}`, storedUser.token);
            // Responsible for logging the fetched tickets to verify data retrieval:
            console.log("Fetched Tickets:", fetchedTickets); 
            setTickets(fetchedTickets);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };


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


    // Responsible for deleting a ticket by its ID:
    const handleDeleteTicket = async (ticketId) => {
        try {
            const { token } = user;
            await requestDeleteWithToken(`/tickets/${ticketId}`, token);
            console.log(`Ticket ${ticketId} deleted.`);
            // For updating the state to remove deleted ticket:
            setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== ticketId)); 
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

    // Responsible for logging the user out:
    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };


    // Responsible for setting the user state and fetching tickets on component mount: 
    useEffect(() => {
        const storedUser = getItem("user");
        setUser(storedUser);
        // Would  Load the tickets on initial page load:
        fetchTickets(); 
    }, []);


    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                {/* Responsible for displaying the dashboard title */}
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>

                {/* Responsible for displaying the logout button */}
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mx: 2 }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
            

            {/* Responsible for rendering the ticket creation form: */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Create a New Ticket
                </Typography>
                <Grid container spacing={2}>

                    
                    {/* Responsible for handling ticket priority selection: */}
                    <Grid item xs={12} md={6}>
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
                    </Grid>

                    {/* Responsible for handling ticket description input: */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Ticket Description"
                            variant="outlined"
                            value={ticketDescription}
                            onChange={(e) => setTicketDescription(e.target.value)}
                        />
                    </Grid>

                    {/* Responsible for creating a new ticket on button click: */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateTicket}
                        >
                            Create Ticket
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Responsible for rendering the tickets list: */}
            <Typography variant="h6" gutterBottom>
                Your Tickets
            </Typography>

            {tickets.length > 0 ? (
                <Grid container spacing={2}>
                    {tickets.map((ticket) => (
                        <Grid item xs={12} md={4} key={ticket._id}>
                            <Paper elevation={3} sx={{ p: 2, position: "relative" }}>

                                {/* Responsible for handling ticket deletion: */}
                                <IconButton
                                    onClick={() => handleDeleteTicket(ticket._id)}
                                    color="error"
                                    sx={{ position: "absolute", top: 8, right: 8 }}
                                >
                                    <DeleteIcon />
                                </IconButton>

                                {/* Responsible for displaying ticket details: */}
                                <Typography variant="h6" gutterBottom>
                                    Ticket #{ticket._id}
                                </Typography>
                                <Typography>{ticket.description}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Priority: {ticket.priority}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography> No tickets created yet. </Typography>
            )}
        </Container>
    );
}

export default Dashboard;
