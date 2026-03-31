# LearnQuest - Full Stack Web Application

A complete full-stack learning platform where users can complete coding quests, earn XP, climb the leaderboard, and discover job opportunities.

## 🚀 Features

- **User Authentication**: Sign up and login system with persistent user data
- **Quest System**: Complete coding challenges to earn XP and level up
- **XP & Leveling**: Earn experience points and track your progress
- **Leaderboard**: Compete with other learners and see real-time rankings
- **Job Board**: Browse and apply for job opportunities
- **User Profiles**: Customize your profile with bio and avatar
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **RESTful API**: Complete backend API with CRUD operations

## 📋 Tech Stack

**Frontend:**
- HTML5
- CSS3 (Modern styling with animations)
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- CORS support
- JSON file-based database

## 📦 Installation

### Prerequisites
- Node.js 14.0+ installed on your system
- npm (comes with Node.js)

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   
   Or use the provided script:
   ```bash
   ./run.sh
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

## 🎮 Getting Started

1. **Create Account**: Sign up with your name and email
2. **View Dashboard**: See stats, featured quests, and navigation options
3. **Start Quests**: Navigate to Tasks, choose a quest, and complete it to earn XP
4. **Level Up**: Accumulate XP to increase your level
5. **Check Leaderboard**: See your rank among other learners
6. **Browse Jobs**: Check out job opportunities in the Job Board
7. **Update Profile**: Customize your bio and view your statistics

## 📡 API Endpoints

### Authentication
- `POST /api/signup` - Create new user account
- `POST /api/login` - Login to existing account

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Tasks/Quests
- `GET /api/tasks` - Get all available tasks
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task (admin)
- `PUT /api/tasks/:id` - Update task (admin)
- `DELETE /api/tasks/:id` - Delete task (admin)

### Jobs
- `GET /api/jobs` - Get all job listings
- `POST /api/jobs` - Create new job listing (admin)

### Submissions
- `POST /api/submissions` - Submit completed task
- `GET /api/submissions/:userId` - Get user's submissions

### Leaderboard
- `GET /api/leaderboard` - Get ranked user list

### General
- `GET /api/data` - Get all database data
- `GET /api/stats` - Get platform statistics

## 📁 Project Structure

```
learnquest_chrome_fullstack/
├── server.js              # Express server with API routes
├── package.json           # Project dependencies
├── db.json               # JSON database (auto-created)
├── run.sh                # Startup script
├── README.md             # This file
└── public/
    ├── index.html        # Main HTML file
    ├── app.js            # Frontend JavaScript
    └── styles.css        # CSS styling
```

## 💾 Database

The application uses a JSON file (`db.json`) for data storage with the following structure:

```json
{
  "users": [],
  "tasks": [],
  "jobs": [],
  "submissions": [],
  "comments": []
}
```

## 🎨 Features Overview

### Dashboard
- Real-time statistics of users, tasks, and XP
- Featured quests section
- Quick navigation to all features

### Tasks
- Browse all available coding quests
- Filter by category (Frontend, Backend, Full Stack)
- View difficulty levels and XP rewards
- Complete tasks to earn XP

### Leaderboard
- See top performers ranked by XP
- View user levels and join dates
- Special badges for top 3 (🥇🥈🥉)

### Jobs
- Browse job opportunities
- View salary ranges and locations
- Apply for positions

### Profile
- View personal statistics
- Edit biography
- Track completed quests
- See current rank

## 🚀 Advanced Usage

### Add New Tasks
The application comes with seed data, but you can add new tasks via the API:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Quest","xp":300,"category":"frontend","difficulty":"beginner"}'
```

### Add New Jobs
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title":"Developer","company":"TechCorp","salary":"$50k-$70k","location":"Remote"}'
```

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (480px - 767px)
- Small devices (<480px)

## 🔒 Data Persistence

User data is stored in browser's localStorage for the current session.
All persistent data is stored in `db.json` on the server.

## 🐛 Troubleshooting

**Port already in use?**
- Change PORT in `server.js` to another port (e.g., 3001)

**Styles not loading?**
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure you're accessing http://localhost:3000

**API errors?**
- Check browser console (F12) for error messages
- Ensure all dependencies are installed (`npm install`)

## 📚 Learning Outcomes

By using this platform, you'll learn:
- User authentication and data persistence
- RESTful API design and implementation
- Full-stack web development
- Responsive design principles
- JavaScript ES6+ features
- Frontend-backend communication

## 🎯 Future Enhancements

Potential features to add:
- User comments and discussions
- Achievement badges
- Daily challenges
- Tutorial videos integration
- Progress tracking graphs
- Social features (follow users)
- Advanced search and filtering

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📞 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Happy Learning! 🎉**

Run with: `./run.sh` or `npm start`
