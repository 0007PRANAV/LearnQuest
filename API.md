# 📡 LearnQuest API Documentation & Test Examples

## Base URL
```
http://localhost:3000
```

## Content-Type
All requests should include:
```
Content-Type: application/json
```

---

## 🔐 Authentication Endpoints

### Signup - Create New User
```
POST /api/signup

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "learner"
}

Response:
{
  "ok": true,
  "user": {
    "id": 1234567890.123,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "learner",
    "xp": 0,
    "level": 1,
    "createdAt": "2026-03-31T12:00:00.000Z",
    "bio": "",
    "avatar": "👤"
  }
}
```

### Login - Authenticate User
```
POST /api/login

Request Body:
{
  "email": "john@example.com"
}

Response:
{
  "ok": true,
  "user": { /* user object */ }
}
```

---

## 👥 User Management Endpoints

### Get All Users
```
GET /api/users

Response:
[
  { /* user objects */ },
  { /* user objects */ }
]
```

### Get Specific User
```
GET /api/users/:id

Response:
{
  "id": 1234567890.123,
  "name": "John Doe",
  "email": "john@example.com",
  "xp": 250,
  "level": 2,
  // ... other user fields
}
```

### Update User Profile
```
PUT /api/users/:id

Request Body:
{
  "bio": "I'm learning web development!",
  "xp": 500
}

Response:
{ /* updated user object */ }
```

### Delete User
```
DELETE /api/users/:id

Response:
{
  "ok": true
}
```

---

## 🎮 Task/Quest Endpoints

### Get All Tasks
```
GET /api/tasks

Response:
[
  {
    "id": 1,
    "title": "Landing Page Quest",
    "xp": 300,
    "category": "frontend",
    "difficulty": "beginner",
    "createdAt": "2026-03-31T12:00:00.000Z"
  },
  // ... more tasks
]
```

### Get Specific Task
```
GET /api/tasks/:id

Response:
{
  "id": 1,
  "title": "Landing Page Quest",
  "xp": 300,
  "category": "frontend",
  "difficulty": "beginner"
}
```

### Create New Task
```
POST /api/tasks

Request Body:
{
  "title": "Advanced React Challenge",
  "xp": 500,
  "category": "frontend",
  "difficulty": "advanced"
}

Response:
{
  "id": 6,
  "title": "Advanced React Challenge",
  "xp": 500,
  "category": "frontend",
  "difficulty": "advanced",
  "createdAt": "2026-03-31T12:00:00.000Z"
}
```

### Update Task
```
PUT /api/tasks/:id

Request Body:
{
  "title": "Updated Title",
  "xp": 600
}

Response:
{ /* updated task object */ }
```

### Delete Task
```
DELETE /api/tasks/:id

Response:
{
  "ok": true
}
```

---

## 💼 Job Endpoints

### Get All Jobs
```
GET /api/jobs

Response:
[
  {
    "id": 1,
    "title": "Frontend Intern",
    "company": "NovaLabs",
    "salary": "$25k-$30k",
    "location": "Remote"
  },
  // ... more jobs
]
```

### Create New Job
```
POST /api/jobs

Request Body:
{
  "title": "Senior Developer",
  "company": "TechCorp",
  "salary": "$100k-$120k",
  "location": "San Francisco"
}

Response:
{
  "id": 5,
  "title": "Senior Developer",
  "company": "TechCorp",
  "salary": "$100k-$120k",
  "location": "San Francisco"
}
```

---

## 📊 Submission Endpoints

### Submit Completed Task
```
POST /api/submissions

Request Body:
{
  "userId": 1234567890.123,
  "taskId": 1,
  "taskTitle": "Landing Page Quest",
  "xpEarned": 300,
  "status": "completed"
}

Response:
{
  "id": 1234567890.456,
  "userId": 1234567890.123,
  "taskId": 1,
  "taskTitle": "Landing Page Quest",
  "xpEarned": 300,
  "status": "completed",
  "createdAt": "2026-03-31T12:00:00.000Z"
}
```

### Get User's Submissions
```
GET /api/submissions/:userId

Response:
[
  { /* submission object */ },
  { /* submission object */ }
]
```

---

## 🏆 Leaderboard Endpoints

### Get Leaderboard (Ranked Users)
```
GET /api/leaderboard

Response:
[
  {
    "rank": 1,
    "id": 1234567890.123,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "xp": 2500,
    "level": 6,
    "avatar": "👤",
    "createdAt": "2026-03-01T00:00:00.000Z"
  },
  {
    "rank": 2,
    "id": 9876543210.456,
    "name": "John Doe",
    "email": "john@example.com",
    "xp": 1500,
    "level": 4,
    "avatar": "👤",
    "createdAt": "2026-03-15T00:00:00.000Z"
  },
  // ... more users ranked by XP
]
```

---

## 📈 Statistics Endpoints

### Get Platform Statistics
```
GET /api/stats

Response:
{
  "totalUsers": 42,
  "totalTasks": 12,
  "totalJobs": 8,
  "totalXP": 15750
}
```

### Get All Data
```
GET /api/data

Response:
{
  "users": [ /* all users */ ],
  "tasks": [ /* all tasks */ ],
  "jobs": [ /* all jobs */ ],
  "submissions": [ /* all submissions */ ],
  "comments": [ /* all comments */ ]
}
```

---

## 🧪 CURL Examples for Testing

### Test Signup
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "role": "learner"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

### Get All Tasks
```bash
curl http://localhost:3000/api/tasks
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Get Leaderboard
```bash
curl http://localhost:3000/api/leaderboard
```

### Get Statistics
```bash
curl http://localhost:3000/api/stats
```

### Create New Task (Admin)
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Python Basics",
    "xp": 200,
    "category": "backend",
    "difficulty": "beginner"
  }'
```

### Update User
```bash
curl -X PUT http://localhost:3000/api/users/1234567890.123 \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Passionate developer learning new skills!"
  }'
```

### Submit Task Completion
```bash
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1234567890.123,
    "taskId": 1,
    "taskTitle": "Landing Page Quest",
    "xpEarned": 300,
    "status": "completed"
  }'
```

---

## 📝 Common Response Codes

| Code | Meaning |
|------|---------|
| 200 | ✅ Success |
| 201 | ✅ Created |
| 400 | ❌ Bad Request |
| 404 | ❌ Not Found |
| 500 | ❌ Server Error |

---

## 🔍 Error Handling

All error responses follow this format:

```json
{
  "error": "User not found"
}
```

Common errors:
- `Email already exists` - During signup with duplicate email
- `User not found` - During login with non-existent email
- `Name and email required` - Missing required fields
- `Task not found` - Accessing non-existent task

---

## 💡 Tips for Testing

1. **Use Postman or Insomnia** - GUI tools for API testing
2. **Save User IDs** - You'll need them for subsequent requests
3. **Test in Order** - Signup first, then other operations
4. **Check Console** - Browser DevTools shows frontend API calls
5. **Monitor Server** - Terminal shows server logs

---

## 🚀 Ready to Build?

These APIs provide everything needed for:
- Building mobile apps
- Creating admin dashboards
- Integrating with third-party services
- Building alternative frontends
- Analytics and reporting

Start by testing endpoints with curl or Postman!
