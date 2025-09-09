import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { registerSchema, loginSchema } from 'shared';
import { db, users } from 'db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Define custom Request type with user
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    [key: string]: any;
  };
}

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    console.log('REST API Registration Body:', req.body);
    
    // Double-check required fields manually
    if (!req.body.name) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        details: {
          fieldErrors: {
            name: ["Name is required"]
          }
        }
      });
    }
    
    if (!req.body.surname) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        details: {
          fieldErrors: {
            surname: ["Surname is required"]
          }
        }
      });
    }
    
    // Validate input with our schema
    const validationResult = registerSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      console.log('Validation errors:', validationResult.error.flatten());
      return res.status(400).json({ 
        error: 'Validation Error', 
        details: validationResult.error.flatten() 
      });
    }
    
    const { email, password, name, surname } = validationResult.data;
    
    console.log('VALIDATED DATA:', { email, password, name, surname });
    
    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        name, // Required field
        surname, // Required field
      })
      .returning();
      
    return res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
    });
  } catch (error) {
    console.error('Error in registration:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    console.log('REST API Login Body:', req.body);
    
    // Validate input with our schema
    const validationResult = loginSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      console.log('Validation errors:', validationResult.error.flatten());
      return res.status(400).json({ 
        error: 'Validation Error', 
        details: validationResult.error.flatten() 
      });
    }
    
    const { email, password } = validationResult.data;
    console.log(`Login attempt for user: ${email}`);
    
    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      console.log(`Login failed: User not found for email ${email}`);
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Verify password
    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      console.log(`Login failed: Invalid password for user ${email}`);
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    console.log(`Login successful for user ${email}`);
    
    // Generate JWT
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || 'supersecretkey',
      { expiresIn: '7d' }
    );
    
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
    });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey', (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      console.log('JWT verification error:', err.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    
    req.user = decoded;
    next();
  });
};

// Protected route example
app.get('/api/user/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const userId = req.user.id;
    
    // Get user details from database
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Return user profile without sensitive information
    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
