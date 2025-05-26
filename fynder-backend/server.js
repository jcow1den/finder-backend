const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const listings = [];
const messages = [];

app.post('/api/auth/register', (req, res) => {
  const { username, password, email, phone } = req.body;
  users.push({ username, password, email, phone, verified: true });
  res.json({ message: 'Registration complete', success: true });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const u = users.find(u => u.username === username && u.password === password);
  if (!u) return res.status(401).json({ message: 'Invalid credentials' });
  return res.json({ message: 'Login successful', success: true });
});

app.get('/api/listings', (req, res) => res.json(listings));
app.post('/api/listings', (req, res) => {
  const { title, price } = req.body;
  const id = listings.length + 1;
  listings.push({ id, title, price });
  res.json({ id, title, price });
});

app.get('/api/messages', (req, res) => res.json(messages));
app.post('/api/messages', (req, res) => {
  const { listingId, text } = req.body;
  messages.push({ listingId, text });
  res.json({ message: 'Message received' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
