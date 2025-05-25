const express = require('express');
const router = express.Router();

// Dummy user storage
const users = [];

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).json({ message: 'User already exists' });

  users.push({ username, password });
  res.status(201).json({ message: 'User registered' });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  res.status(200).json({ message: 'Login successful' });
});

module.exports = router;
