import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { requestPost } from '../../utils/requests';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    try {
      const user = await requestPost('/users', {username, email, password});
      setMessage('User created successfully.');
      console.log(user);
    } catch (error) {
      if (error.response && error.response.status === 409) {
      setMessage('Something went wrong. Please try again.');
      } else {
      setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container>
            <Grid item>
              <Link href="/sign-in" variant="body2">
                {"Already have a account? Sign in."}
              </Link>
            </Grid>
          </Grid>
          {message && <Typography>{message}</Typography>}
      </Box>
    </Container>
  );
};

export default SignUp;
