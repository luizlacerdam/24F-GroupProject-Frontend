import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <Box>
      {/* Header */}
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          py: 8,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to TicketSystem
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Manage and streamline your ticketing processes with ease. Stay organized, improve response times, and provide better support.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" size="large" sx={{ mx: 2 }}>
              Get Started
            </Button>
            <Button variant="outlined" color="primary" size="large" sx={{ mx: 2 }}>
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Why Choose TicketSystem?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Easy to Use
              </Typography>
              <Typography>
                An intuitive interface makes it easy to create and manage tickets without any hassle.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Customizable
              </Typography>
              <Typography>
                Tailor your ticket system to fit your specific business needs.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Reliable Support
              </Typography>
              <Typography>
                Our team is here to help you 24/7 with any issues or questions.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;