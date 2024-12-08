import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    Button,
    Container,
    FormControl,
    Grid2,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CreateNewTicketForm from "../../components/CreateNewTicketForm";
import { getItem } from "../../utils/localStorageHandling";
import {
    requestDataWithToken,
    requestPatchWithToken,
    requestPostWithToken,
} from "../../utils/requests";
  
  function Dashboard() {
    const [user, setUser] = useState({
      username: "",
      email: "",
    });
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [ticketLogs, setTicketLogs] = useState([]);
    const [showAllTickets, setShowAllTickets] = useState(false);
    const [resolution, setResolution] = useState("");

    const handleOpenModal = (ticket) => {
      setSelectedTicket(ticket);
      const validStatus = ticket.status === "New" ? "in-progress" : ticket.status;
      setUpdatedStatus(validStatus || "in-progress");
      fetchTicketLogs(ticket._id);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedTicket(null);
      setNewComment("");
      setTicketLogs([]);
    };
  
    const fetchTickets = async () => {
      try {
        const storedUser = getItem("user");
        if (storedUser.role === "admin") {
          const fetchedTickets = await requestDataWithToken(
            `/tickets`,
            storedUser.token
          );
          setTickets(fetchedTickets);          
          return;
        } else {
        const fetchedTickets = await requestDataWithToken(
          `/tickets/user/${storedUser.id}`,
          storedUser.token
        );
        setTickets(fetchedTickets);
        return;
    }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
  
    const fetchTicketLogs = async (ticketId) => {
      try {
        const fetchedTicketLogs = await requestDataWithToken(
          `/ticketLogs/${ticketId}`,
          user.token
        );
        console.log("Fetched Ticket Logs:", fetchedTicketLogs);
        setTicketLogs(fetchedTicketLogs);
      } catch (error) {
        console.error("Error fetching ticket logs:", error);
      }
    };
  
    const handleCreateTicketLog = async () => {
      try {
        const { token } = user;
        const newTicketLog = {
          ticketId: selectedTicket._id,
          customerId: user.id,
          status: updatedStatus,
          comment: updatedStatus === "closed" ? resolution : newComment,
        };
        console.log("New Ticket Log:", newTicketLog);
  
        await requestPostWithToken(`/ticketLogs`, newTicketLog, token);
        handleCloseModal();
      } catch (error) {
        console.error("Error creating ticket log:", error);
      }
    };
  
    const handleUpdateTicket = async () => {
        if (!newComment.trim() && updatedStatus !== "closed") {
            console.error("Comment is required.");
            return;
          }
        
          if (updatedStatus === "closed" && !resolution.trim()) {
            console.error("Resolution is required to close the ticket.");
            return;
          }
      
        try {
            const { token } = user;
            const updatedTicket = {
                status: updatedStatus,
            };
      
          await requestPatchWithToken(
            `/tickets/${selectedTicket._id}`,
            updatedTicket,
            token
          );
          fetchTickets();
          handleCreateTicketLog();
        } catch (error) {
          console.error("Error updating ticket:", error);
        }
    };
  
    const handleLogout = () => {
      localStorage.removeItem("user");
      window.location.href = "/";
    };
  
    useEffect(() => {
      const storedUser = getItem("user");
      setUser(storedUser);
      fetchTickets();
    }, []);
  
    const filteredTickets = showAllTickets
      ? tickets
      : tickets.filter((ticket) => ticket.status !== "closed" && ticket.status !== "cancelled");
  
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TicketSystem
            </Typography>
            <Button type="button" href="/profile" color="inherit">
              Profile
            </Button>
            <Button type="button" onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
  
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Dashboard
            </Typography>
           
          </Box>
  
          {user.role !== "admin" && (
            <CreateNewTicketForm user={user} fetchTickets={fetchTickets} />
          )}
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
            <Typography variant="h6" gutterBottom>
                Tickets List
            </Typography>
            <Button
                variant="contained"
                onClick={() => setShowAllTickets((prev) => !prev)}
            >
                {showAllTickets ? "Show Open Tickets" : "Show All Tickets"}
            </Button>
            </Box>

          {filteredTickets.length > 0 ? (
            <Grid2 container spacing={2}>
              {filteredTickets.map((ticket) => (
                <Grid2 size={{ xs: 12 }} key={ticket._id}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenModal(ticket)}
                  >
                    <Typography variant="h6" gutterBottom>
                      Ticket #{ticket._id}
                    </Typography>
                    <Typography variant="h8" gutterBottom>
                      Created at {new Date(
                          ticket.createdAt
                        ).toLocaleString()}
                    </Typography>
                    {user.role === "admin" && (
                      <Typography variant="body2" color="textSecondary">
                        User: {ticket.customerId.username}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      Status: {ticket.status}
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
            <Typography>No tickets to display.</Typography>
          )}
        </Container>
  
        <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
                sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                }}
            >
                {selectedTicket && (
                <>
                    <Typography variant="h6" gutterBottom>
                    Ticket Logs
                    </Typography>
                    <List sx={{ mt: 2, maxHeight: 200, overflow: "auto" }}>
                    {ticketLogs.map((log, index) => (
                        <ListItem key={index} divider>
                        <ListItemText
                            primary={`Status: ${log.status} - ${new Date(log.createdAt).toLocaleString()}`}
                            secondary={`Comment by ${log.customerId.username}: ${log.comment}`}
                        />
                        </ListItem>
                    ))}
                    </List>
                    {selectedTicket.status !== "closed" && selectedTicket.status !== "cancelled" ? (
                    <>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            value={updatedStatus || "in-progress"}
                            onChange={(e) => setUpdatedStatus(e.target.value)}
                        >
                            {user.role === "admin"
                            ? [
                                <MenuItem key="in-progress" value="in-progress">
                                    In Progress
                                </MenuItem>,
                                <MenuItem key="dispatched" value="dispatched">
                                    Dispatched
                                </MenuItem>,
                                <MenuItem key="closed" value="closed">
                                    Closed
                                </MenuItem>,
                                ]
                            : [
                                <MenuItem key="cancelled" value="cancelled">
                                    Cancelled
                                </MenuItem>,
                                ]}
                        </Select>
                        </FormControl>

                        {/* Conditional Field for Ticket Resolution */}
                        {updatedStatus === "closed" ? (
                        <TextField
                            fullWidth
                            label="Ticket Resolution"
                            variant="outlined"
                            value={resolution}
                            onChange={(e) => setResolution(e.target.value)}
                            sx={{ mt: 2 }}
                            required
                            error={!resolution.trim()}
                            helperText={!resolution.trim() ? "Resolution is required to close the ticket" : ""}
                        />
                        ) : (
                        <TextField
                            fullWidth
                            label="Add Comment"
                            variant="outlined"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{ mt: 2 }}
                            required
                            error={!newComment.trim()}
                            helperText={!newComment.trim() ? "Comment is required" : ""}
                        />
                        )}

                        <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 3,
                        }}
                        >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdateTicket}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        </Box>
                    </>
                    ) : (
                    <Typography variant="body2" color="textSecondary">
                        Cant update a closed or cancelled ticket.
                    </Typography>
                    )}
                </>
                )}
            </Box>
        </Modal>

      </>
    );
  }
  
  export default Dashboard;
  