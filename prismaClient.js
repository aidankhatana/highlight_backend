// prismaClient.js (or db.js)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;


// [POST] /register
app.post('/register', async (req, res) => {
    // 1) Validate input (email, password)
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
  
    // 2) Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
  
    // 3) Insert new user
    // For production, hash the password with bcrypt, e.g.:
    // const hashedPassword = await bcrypt.hash(password, 10);
    // then store `hashedPassword`.
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // TODO: store hashed password in production
        streak: 0,
      },
      select: { id: true, email: true, streak: true }, // omit password
    });
  
    res.json(newUser);
  });

  
  // [POST] /login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // TODO: generate a JWT token
    res.json({ message: 'Login successful', userId: user.id });
  });

  // [POST] /highlights
app.post('/highlights', async (req, res) => {
    const { userId, content } = req.body;
  
    // Basic check
    if (!userId || !content) {
      return res.status(400).json({ error: 'Missing userId or content' });
    }
  
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    const newHighlight = await prisma.highlight.create({
      data: {
        userId,
        content,
        // visibleFrom, visibleTo can be set here or updated by cron job at 9PM
      },
    });
  
    res.json(newHighlight);
  });

  // [GET] /highlights
app.get('/highlights', async (req, res) => {
    // Return all highlights for demonstration
    const highlights = await prisma.highlight.findMany({
      include: { user: true }, // to get user info alongside the highlight
    });
    res.json({ highlights });
  });

  