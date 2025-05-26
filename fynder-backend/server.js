const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const listings = [];
const messages = [];

// --- Auth Routes ---
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });
  if (users.find(u => u.username === username)) return res.status(400).json({ message: 'User already exists' });
  users.push({ username, password });
  res.json({ message: 'User registered', success: true });
});
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful', success: true });
});

// --- Listings Routes ---
app.get('/api/listings', (req, res) => res.json(listings));
app.post('/api/listings', (req, res) => {
  const { title, price } = req.body;
  if (!title || !price) return res.status(400).json({ message: 'Title and price are required' });
  const id = listings.length + 1;
  listings.push({ id, title, price });
  res.status(201).json({ id, title, price });
});

// --- Messages Routes ---
app.get('/api/messages', (req, res) => res.json(messages));
app.post('/api/messages', (req, res) => {
  const { listingId, text } = req.body;
  if (!listingId || !text) return res.status(400).json({ message: 'listingId and text are required' });
  messages.push({ listingId, text });
  res.json({ message: 'Message received', success: true });
});

// --- Start Server ---
const PORT = 3000;
app.listen(PORT, () => console.log(`Fynder API running on http://localhost:${PORT}`));