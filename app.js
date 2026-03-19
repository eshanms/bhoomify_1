// ===== USERS (DUMMY DATABASE) =====
let users = [
  { name: "Eshan", password: "123", role: "student", points: 120, history: [] },
  { name: "Aneya", password: "123", role: "student", points: 95, history: [] },
  { name: "Arathy", password: "123", role: "student", points: 80, history: [] },
  { name: "Faculty1", password: "admin", role: "faculty" }
];

// Load from storage
function loadUsers() {
  let data = localStorage.getItem("users");
  if (data) users = JSON.parse(data);
}

// Save users
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ===== LOGIN =====
function login(e) {
  e.preventDefault();

  let name = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let user = users.find(u => u.name === name && u.password === pass);

  if (!user) {
    alert("Invalid login!");
    return;
  }

  localStorage.setItem("user", user.name);
  localStorage.setItem("role", user.role);

  if (user.role === "student") {
    window.location.href = "student.html";
  } else {
    window.location.href = "faculty.html";
  }
}


let rewards = [
  { name: "Eco Badge", cost: 50 },
  { name: "Plant Sapling 🌱", cost: 100 },
  { name: "Certificate", cost: 150 }
];

// ===== Load Data =====
function loadData() {
  let data = localStorage.getItem("leaderboard");
  if (data) {
    leaderboardData = JSON.parse(data);
  }
}

// ===== Save Data =====
function saveData() {
  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
}

// ===== Show Points =====
function showPoints() {
  let user = leaderboardData.find(u => u.name === currentUser);
  document.getElementById("points").innerText = user ? user.points : 0;
}

// ===== Leaderboard =====
function loadLeaderboard() {
  showPoints();

  let list = document.getElementById("leaderboard");
  list.innerHTML = "";

  leaderboardData.sort((a, b) => b.points - a.points);

  leaderboardData.forEach(user => {
    let li = document.createElement("li");
    li.innerText = user.name + " - " + user.points;
    list.appendChild(li);
  });
}

// ===== Rewards =====
function loadRewards() {
  let div = document.getElementById("rewards");
  div.innerHTML = "";

  rewards.forEach((reward, index) => {
    let btn = document.createElement("button");
    btn.innerText = reward.name + " (" + reward.cost + " pts)";
    btn.onclick = () => redeemReward(index);
    div.appendChild(btn);
  });
}

// ===== Redeem =====
function redeemReward(index) {
  let user = leaderboardData.find(u => u.name === currentUser);

  if (!user) return;

  let reward = rewards[index];

  if (user.points >= reward.cost) {
    user.points -= reward.cost;
    alert("Redeemed: " + reward.name);
    saveData();
    loadLeaderboard();
  } else {
    alert("Not enough points!");
  }
}

// ===== Assign Points (Faculty) =====
function assignPoints(e) {
  e.preventDefault();

  let name = document.getElementById("studentName").value;
  let points = parseInt(document.getElementById("points").value);

  let student = leaderboardData.find(u => u.name === name);

  if (student) {
    student.points += points;
  } else {
    leaderboardData.push({ name, points });
  }

  saveData();
  alert("Points Assigned!");
}
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
function showUser() {
  let user = localStorage.getItem("user");
  document.getElementById("userName").innerText = user;
}

 

