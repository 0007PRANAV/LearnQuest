// ==================== STATE MANAGEMENT ====================
let currentUser = null;
let currentFilter = 'all';
let allTasks = [];
let allJobs = [];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('learnquest_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateUserStatus();
    showPage('home');
  } else {
    showPage('auth');
  }
  loadStats();
});

// ==================== PAGE NAVIGATION ====================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  
  const page = document.getElementById(`page-${pageId}`);
  if (page) {
    page.style.display = 'block';
    
    if (pageId === 'home') loadHome();
    if (pageId === 'tasks') loadTasks();
    if (pageId === 'jobs') loadJobs();
    if (pageId === 'leaderboard') loadLeaderboard();
    if (pageId === 'profile') loadProfile();
  }
}

// ==================== AUTH FUNCTIONS ====================
async function handleSignup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;

  if (!name || !email) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role: 'learner' })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Signup failed');
      return;
    }

    currentUser = data.user;
    localStorage.setItem('learnquest_user', JSON.stringify(currentUser));
    updateUserStatus();
    showPage('home');
    alert(`Welcome, ${name}! Your account has been created.`);
  } catch (error) {
    console.error('Signup error:', error);
    alert('An error occurred during signup');
  }
}

async function handleLogin() {
  const email = document.getElementById('loginEmail').value;

  if (!email) {
    alert('Please enter your email');
    return;
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Login failed');
      return;
    }

    currentUser = data.user;
    localStorage.setItem('learnquest_user', JSON.stringify(currentUser));
    updateUserStatus();
    showPage('home');
    alert(`Welcome back, ${currentUser.name}!`);
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login');
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    currentUser = null;
    localStorage.removeItem('learnquest_user');
    updateUserStatus();
    showPage('auth');
  }
}

function updateUserStatus() {
  const userStatus = document.getElementById('userStatus');
  if (currentUser) {
    userStatus.innerHTML = `
      <span>👤 ${currentUser.name}</span>
      <span>⭐ Level ${currentUser.level} (${currentUser.xp} XP)</span>
    `;
  } else {
    userStatus.innerHTML = '<button onclick="showPage(\'auth\')" class="btn-primary">Login/Sign Up</button>';
  }
}

// ==================== HOME PAGE ====================
async function loadHome() {
  await loadStats();
  await loadFeaturedTasks();
}

async function loadStats() {
  try {
    const response = await fetch('/api/stats');
    const stats = await response.json();
    
    document.getElementById('statUsers').textContent = stats.totalUsers;
    document.getElementById('statTasks').textContent = stats.totalTasks;
    document.getElementById('statJobs').textContent = stats.totalJobs;
    document.getElementById('statXP').textContent = stats.totalXP.toLocaleString();
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

async function loadFeaturedTasks() {
  try {
    const response = await fetch('/api/tasks');
    allTasks = await response.json();
    
    const featured = allTasks.slice(0, 3);
    const container = document.getElementById('featuredTasks');
    
    container.innerHTML = featured.map(task => `
      <div class="task-card">
        <h3>🎮 ${task.title}</h3>
        <p>${task.category}</p>
        <div class="task-meta">
          <span class="badge">⭐ ${task.xp} XP</span>
          <span class="badge difficulty-${task.difficulty}">${task.difficulty}</span>
        </div>
        <button onclick="completeTask(${task.id})" class="btn-primary" style="margin-top: 1rem; width: 100%;">
          Start Quest
        </button>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading featured tasks:', error);
  }
}

// ==================== TASKS PAGE ====================
async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    allTasks = await response.json();
    displayTasks(allTasks);
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

function filterTasks(category) {
  currentFilter = category;
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  const filtered = category === 'all' 
    ? allTasks 
    : allTasks.filter(t => t.category === category);
  
  displayTasks(filtered);
}

function displayTasks(tasks) {
  const container = document.getElementById('tasksList');
  
  if (tasks.length === 0) {
    container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No tasks found</p>';
    return;
  }
  
  container.innerHTML = tasks.map(task => `
    <div class="task-card">
      <h3>🎮 ${task.title}</h3>
      <p>${task.category}</p>
      <p style="font-size: 0.9rem; color: #999;">Quest Description: Complete this ${task.difficulty} level quest to earn XP.</p>
      <div class="task-meta" style="margin-top: auto;">
        <span class="badge">⭐ ${task.xp} XP</span>
        <span class="badge difficulty-${task.difficulty}">${task.difficulty}</span>
      </div>
      ${currentUser ? `<button onclick="completeTask(${task.id})" class="btn-primary" style="margin-top: 1rem; width: 100%;">Start Quest</button>` : '<p style="color: #ff6b9d; margin-top: 1rem;">Login to start quests</p>'}
    </div>
  `).join('');
}

async function completeTask(taskId) {
  if (!currentUser) {
    alert('Please login first');
    return;
  }

  const task = allTasks.find(t => t.id === taskId);
  if (!task) return;

  try {
    const submission = {
      userId: currentUser.id,
      taskId: taskId,
      taskTitle: task.title,
      xpEarned: task.xp,
      status: 'completed'
    };

    const response = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });

    if (!response.ok) throw new Error('Failed to submit task');

    currentUser.xp += task.xp;
    currentUser.level = Math.floor(currentUser.xp / 500) + 1;
    localStorage.setItem('learnquest_user', JSON.stringify(currentUser));
    updateUserStatus();

    alert(`🎉 Quest Completed! +${task.xp} XP`);
  } catch (error) {
    console.error('Error completing task:', error);
    alert('Failed to complete task');
  }
}

// ==================== JOBS PAGE ====================
async function loadJobs() {
  try {
    const response = await fetch('/api/jobs');
    allJobs = await response.json();
    
    const container = document.getElementById('jobsList');
    container.innerHTML = allJobs.map(job => `
      <div class="job-card">
        <h3>💼 ${job.title}</h3>
        <p><strong>${job.company}</strong></p>
        <p>📍 ${job.location}</p>
        <p>💰 ${job.salary}</p>
        <div class="job-meta" style="margin-top: 1rem;">
          ${currentUser ? `<button onclick="applyJob(${job.id})" class="btn-primary">Apply Now</button>` : '<p style="color: #ff6b9d;">Login to apply</p>'}
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading jobs:', error);
  }
}

function applyJob(jobId) {
  if (!currentUser) {
    alert('Please login first');
    return;
  }

  const job = allJobs.find(j => j.id === jobId);
  if (!job) return;

  alert(`Your application to ${job.company} for ${job.title} has been submitted!`);
}

// ==================== LEADERBOARD PAGE ====================
async function loadLeaderboard() {
  try {
    const response = await fetch('/api/leaderboard');
    const leaderboard = await response.json();
    
    const tbody = document.getElementById('leaderboardBody');
    
    if (leaderboard.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No players yet</td></tr>';
      return;
    }
    
    tbody.innerHTML = leaderboard.map((user, index) => {
      let rankClass = '';
      if (index === 0) rankClass = 'rank-1';
      else if (index === 1) rankClass = 'rank-2';
      else if (index === 2) rankClass = 'rank-3';
      
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐';
      
      return `
        <tr>
          <td class="${rankClass}"><strong>${medal} #${index + 1}</strong></td>
          <td>${user.name}</td>
          <td>Level ${user.level}</td>
          <td><strong>${user.xp} XP</strong></td>
          <td>${new Date(user.createdAt).toLocaleDateString()}</td>
        </tr>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
}

// ==================== PROFILE PAGE ====================
async function loadProfile() {
  if (!currentUser) {
    showPage('auth');
    return;
  }

  document.getElementById('profileAvatar').textContent = currentUser.avatar;
  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileEmail').textContent = currentUser.email;
  document.getElementById('profileLevel').textContent = `Level ${currentUser.level}`;
  document.getElementById('profileXP').textContent = currentUser.xp;
  document.getElementById('profileBio').value = currentUser.bio || '';

  try {
    const response = await fetch('/api/leaderboard');
    const leaderboard = await response.json();
    const rank = leaderboard.findIndex(u => u.id === currentUser.id) + 1;
    document.getElementById('profileRank').textContent = rank || '-';
  } catch (error) {
    console.error('Error loading rank:', error);
  }

  try {
    const response = await fetch(`/api/submissions/${currentUser.id}`);
    const submissions = await response.json();
    document.getElementById('profileTasksCompleted').textContent = submissions.length;
  } catch (error) {
    console.error('Error loading submissions:', error);
  }
}

async function updateProfile() {
  if (!currentUser) return;

  const bio = document.getElementById('profileBio').value;

  try {
    const response = await fetch(`/api/users/${currentUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio })
    });

    if (!response.ok) throw new Error('Failed to update profile');

    currentUser.bio = bio;
    localStorage.setItem('learnquest_user', JSON.stringify(currentUser));
    alert('Profile updated successfully! ✅');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile');
  }
}
