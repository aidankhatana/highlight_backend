// We'll create a minimal Node.js + Express backend with placeholder endpoints
// This is just a skeleton, returning mock data or minimal logic.
// Later, we'll integrate a PostgreSQL database, an ORM, and real business logic.

import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from './prismaClient.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user
    next()
  })
}

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, username, password } = req.body

    // Validate input
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        username: true
      }
    })

    // Generate token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

    res.json({ user, token })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      token
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Highlight routes
app.get('/api/highlights', authenticateToken, async (req, res) => {
  try {
    const highlights = await prisma.highlight.findMany({
      where: {
        userId: req.user.userId
      },
      include: {
        tags: true
      }
    })
    res.json(highlights)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/highlights', authenticateToken, async (req, res) => {
  try {
    const { content, source, color, tags } = req.body

    const highlight = await prisma.highlight.create({
      data: {
        content,
        source,
        color,
        userId: req.user.userId,
        tags: {
          connectOrCreate: tags?.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          })) || []
        }
      },
      include: {
        tags: true
      }
    })

    res.json(highlight)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.put('/api/highlights/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { content, source, color, tags } = req.body

    const highlight = await prisma.highlight.update({
      where: {
        id,
        userId: req.user.userId
      },
      data: {
        content,
        source,
        color,
        tags: {
          set: [],
          connectOrCreate: tags?.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          })) || []
        }
      },
      include: {
        tags: true
      }
    })

    res.json(highlight)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.delete('/api/highlights/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.highlight.delete({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    })
    res.json({ message: 'Highlight deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Tag routes
app.get('/api/tags', authenticateToken, async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { highlights: true }
        }
      }
    })
    res.json(tags)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
