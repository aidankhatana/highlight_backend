// We'll create a minimal Node.js + Express backend with placeholder endpoints
// This is just a skeleton, returning mock data or minimal logic.
// Later, we'll integrate a PostgreSQL database, an ORM, and real business logic.

const express = require('express');
const app = express();

app.use(express.json());

// Placeholder data:
let mockUsers = [
  { id: 1, email: 'test@example.com', password: 'hashedpassword', streak: 2 },
];

let mockHighlights = [
  {
    id: 1,
    userId: 1,
    content: 'Hello, this is my first highlight!',
    createdAt: new Date().toISOString(),
    visibleFrom: null, // not visible yet
    visibleTo: null,
  },
];

// Basic route to check server status
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Auth endpoints
// [POST] /register
app.post('/register', (req, res) => {
  // TODO: input validation, hashing password, storing in DB
  const { email, password } = req.body;

  // For now, just push to mock array
  const newUser = {
    id: mockUsers.length + 1,
    email,
    password, // obviously not storing plain text in production
    streak: 0,
  };
  mockUsers.push(newUser);
  // Return the user (omitting password ideally)
  res.json({ id: newUser.id, email: newUser.email, streak: newUser.streak });
});

// [POST] /login
app.post('/login', (req, res) => {
  // TODO: real authentication, password hashing comparison, JWT tokens
  const { email, password } = req.body;
  const user = mockUsers.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Return a mock token or user object in real scenario
  res.json({ message: 'Login successful', userId: user.id });
});

// Highlights endpoints
// [GET] /highlights
app.get('/highlights', (req, res) => {
  // For now, return all mock highlights
  res.json({ highlights: mockHighlights });
});

// [POST] /highlights
app.post('/highlights', (req, res) => {
  // TODO: authenticate user, read content, store in DB
  const { userId, content } = req.body;
  const newHighlight = {
    id: mockHighlights.length + 1,
    userId,
    content,
    createdAt: new Date().toISOString(),
    visibleFrom: null,
    visibleTo: null,
  };

  mockHighlights.push(newHighlight);

  res.json(newHighlight);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
