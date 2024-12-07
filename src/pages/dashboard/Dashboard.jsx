
// Responsible for importing necessary components and icons
import DeleteIcon from "@mui/icons-material/Delete";

import {
    Box,
    Button,
    Container,
    Grid2,
    IconButton,
    Paper,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { getItem } from "../../utils/localStorageHandling";

// Responsible for handling API requests with tokens:
import CreateNewTicketForm from "../../components/CreateNewTicketForm";
import { requestDataWithToken, requestDeleteWithToken } from "../../utils/requests";


function Dashboard() {
    const [user, setUser] = useState({
        username: "",
        email: "",
      });
    const [tickets, setTickets] = useState([]);
    

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
            {user.role === 'admin' ? '' : (

                <CreateNewTicketForm user={user} fetchTickets={fetchTickets} />
            )}


            {/* Responsible for rendering the tickets list: */}
            <Typography variant="h6" gutterBottom>
                Your Tickets
            </Typography>

            {tickets.length > 0 ? (
                <Grid2 container spacing={2}>
                    {tickets.map((ticket) => (
                        <Grid2 size={{xs:12}} key={ticket._id}>
                            <Paper elevation={3} sx={{ p: 2, position: "relative" }}>
                                {/* Ticket deletion button */}
                                <IconButton
                                    onClick={() => handleDeleteTicket(ticket._id)}
                                    color="error"
                                    sx={{ position: "absolute", top: 8, right: 8 }}
                                >
                                    <DeleteIcon />
                                </IconButton>

                                {/* Ticket details */}
                                <Typography variant="h6" gutterBottom>
                                    Ticket #{ticket._id}
                                </Typography>
                                <Typography>{ticket.description}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Priority: {ticket.priority}
                                </Typography>
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>
            ) : (
                <Typography>No tickets created yet.</Typography>
            )}

        </Container>
    );
}

export default Dashboard;
