import MenuIcon from "@mui/icons-material/Menu";
import {
    Alert,
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Snackbar,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getItem, setItem } from "../../utils/localStorageHandling";
import { requestPatchWithToken } from "../../utils/requests";

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = getItem("user");
    if (storedUser) {
      setUser(storedUser);
      setFormData({ username: storedUser.username, email: storedUser.email });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.username.trim() || !formData.email.trim()) {
      setError("Both fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const { token, id } = user;
      const updateUser = {
        username: formData.username,
        email: formData.email,
      };

      // API call to update user
      await requestPatchWithToken(`/users/${id}`, updateUser, token);

      // Update local storage and state
      const updatedUser = { ...user, ...formData };
      setItem("user", updatedUser); // Save updated user to localStorage
      setUser(updatedUser); // Update component state
      setSuccess(true); // Show success message
      setError(null); // Clear errors
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

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
          <Button type="button" href="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button type="button" onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Update Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            type="email"
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Update Information
          </Button>
        </Box>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Profile;
