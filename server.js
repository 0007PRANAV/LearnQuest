const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB = 'db.json';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize database with seed data
const seed = {
  users: [],
  tasks: [
    { id: 1, title: 'Landing Page Quest', xp: 300, category: 'frontend', difficulty: 'beginner' },
    { id: 2, title: 'Portfolio Website', xp: 250, category: 'fullstack', difficulty: 'intermediate' },
    { id: 3, title: 'REST API Challenge', xp: 400, category: 'backend', difficulty: 'intermediate' },
    { id: 4, title: 'Database Design', xp: 350, category: 'backend', difficulty: 'advanced' },
    { id: 5, title: 'React Components', xp: 300, category: 'frontend', difficulty: 'intermediate' }
  ],
  jobs: [
    { id: 1, title: 'Frontend Intern', company: 'NovaLabs', salary: '$25k-$30k', location: 'Remote' },
    { id: 2, title: 'UI/UX Designer', company: 'PixelForge', salary: '$35k-$45k', location: 'San Francisco' },
    { id: 3, title: 'Full Stack Developer', company: 'TechCore', salary: '$60k-$80k', location: 'New York' },
    { id: 4, title: 'Backend Engineer', company: 'CloudSys', salary: '$70k-$90k', location: 'Remote' }
  ],
  submissions: [],
  comments: []
};

// Database functions
const readDB = () => {
  if (!fs.existsSync(DB)) {
    fs.writeFileSync(DB, JSON.stringify(seed, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB, 'utf8'));
};

const writeDB = (data) => {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
};

// Helper to generate IDs
const generateId = () => Date.now() + Math.random();

// ==================== AUTH APIs ====================
app.post('/api/signup', (req, res) => {
  try {
    const db = readDB();
    const { name, email, role } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }
    
    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const user = {
      id: generateId(),
      name,
      email,
      role: role || 'learner',
      xp: 0,
      level: 1,
      createdAt: new Date().toISOString(),
      bio: '',
      avatar: '👤'
    };
    
    db.users.push(user);
    writeDB(db);
    
    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', (req, res) => {
  try {
    const db = readDB();
    const { email } = req.body;
    
    const user = db.users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== USERS APIs ====================
app.get('/api/users', (req, res) => {
  try {
    const db = readDB();
    res.json(db.users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/:id', (req, res) => {
  try {
    const db = readDB();
    const user = db.users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', (req, res) => {
  try {
    const db = readDB();
    const user = db.users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    Object.assign(user, req.body);
    writeDB(db);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', (req, res) => {
  try {
    const db = readDB();
    db.users = db.users.filter(u => u.id != req.params.id);
    writeDB(db);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== TASKS APIs ====================
app.get('/api/tasks', (req, res) => {
  try {
    const db = readDB();
    res.json(db.tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tasks/:id', (req, res) => {
  try {
    const db = readDB();
    const task = db.tasks.find(t => t.id == req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', (req, res) => {
  try {
    const db = readDB();
    const task = {
      id: Math.max(...db.tasks.map(t => t.id), 0) + 1,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    db.tasks.push(task);
    writeDB(db);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/tasks/:id', (req, res) => {
  try {
    const db = readDB();
    const task = db.tasks.find(t => t.id == req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    Object.assign(task, req.body);
    writeDB(db);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  try {
    const db = readDB();
    db.tasks = db.tasks.filter(t => t.id != req.params.id);
    writeDB(db);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== JOBS APIs ====================
app.get('/api/jobs', (req, res) => {
  try {
    const db = readDB();
    res.json(db.jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/jobs', (req, res) => {
  try {
    const db = readDB();
    const job = {
      id: Math.max(...db.jobs.map(j => j.id), 0) + 1,
      ...req.body
    };
    db.jobs.push(job);
    writeDB(db);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== SUBMISSIONS APIs ====================
app.post('/api/submissions', (req, res) => {
  try {
    const db = readDB();
    const submission = {
      id: generateId(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    db.submissions.push(submission);
    writeDB(db);
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/submissions/:userId', (req, res) => {
  try {
    const db = readDB();
    const submissions = db.submissions.filter(s => s.userId == req.params.userId);
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== LEADERBOARD APIs ====================
app.get('/api/leaderboard', (req, res) => {
  try {
    const db = readDB();
    const leaderboard = db.users
      .map(u => ({
        ...u,
        rank: 0
      }))
      .sort((a, b) => b.xp - a.xp)
      .map((u, i) => ({ ...u, rank: i + 1 }));
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== GENERAL APIs ====================
app.get('/api/data', (req, res) => {
  try {
    const db = readDB();
    res.json(db);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const db = readDB();
    res.json({
      totalUsers: db.users.length,
      totalTasks: db.tasks.length,
      totalJobs: db.jobs.length,
      totalXP: db.users.reduce((sum, u) => sum + u.xp, 0)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 LearnQuest is running at http://localhost:${PORT}\n`);
  console.log('📚 Full Stack Edition - Complete with API endpoints\n');
});
