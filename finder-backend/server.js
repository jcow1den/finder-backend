const express = require('express');
const app = express();
app.use(express.json());

// In-memory user store
const users = [];

// --- AUTH ROUTES INLINE ---
// Register
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'User registered' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!users.find(u => u.username === username && u.password === password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ message: 'Login successful' });
});
// --- END AUTH ---

// (You can add other routes here, or inline them in the same way)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
