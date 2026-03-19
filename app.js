// ===== USERS (DUMMY DATABASE) =====
let users = [
  { name: "Eshan", password: "123", role: "student", points: 120, history: [] },
  { name: "Aneya", password: "123", role: "student", points: 95, history: [] },
  { name: "Arathy", password: "123", role: "student", points: 80, history: [] },
  { name: "Faculty1", password: "admin", role: "faculty" }
];
console.log(users);

// Load from storage
function loadUsers() {
  let data = localStorage.getItem("users");
  if (data) users = JSON.parse(data);
}else{
  localStorage.setItem("users",JSON.stringify(users));
  }
}

// Save users
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ===== LOGIN =====
function login(e) {
  e.preventDefault();
  loadUsers();
  let name = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  console.log("Trying login:",name,pass);
  console.log("Users:",users);
  
  let user = users.find(u => u.name === name && u.password === pass);

  if (!user) {
    alert("Invalid login!");
    return false;
  }
  alert("Login function running");
  localStorage.setItem("user", user.name);
  localStorage.setItem("role", user.role);

  if (user.role === "student") {
    window.location.href = "student.html";
  } else {
    window.location.href = "faculty.html";
  }
  return false;
}
function initStudent() {
  let name = localStorage.getItem("user");
  document.getElementById("userName").innerText = name;

  let user = users.find(u => u.name === name);

  document.getElementById("points").innerText = user.points;

  // Leaderboard
  let list = document.getElementById("leaderboard");
  users.filter(u => u.role === "student")
       .sort((a,b) => b.points - a.points)
       .forEach(u => {
         let li = document.createElement("li");
         li.innerText = u.name + " - " + u.points;
         list.appendChild(li);
       });

  // Rewards
  let rewards = [
    { name: "Eco Badge", cost: 50 },
    { name: "Sapling 🌱", cost: 100 }
  ];

  let div = document.getElementById("rewards");

  rewards.forEach((r, i) => {
    let btn = document.createElement("button");
    btn.innerText = r.name + " (" + r.cost + ")";
    btn.onclick = () => redeem(r);
    div.appendChild(btn);
  });

  // History
  let hist = document.getElementById("history");
  user.history.forEach(h => {
    let li = document.createElement("li");
    li.innerText = h;
    hist.appendChild(li);
  });




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
function redeem(reward) {
  let name = localStorage.getItem("user");
  let user = users.find(u => u.name === name);

  if (user.points >= reward.cost) {
    user.points -= reward.cost;
    user.history.push("Redeemed: " + reward.name);

    saveUsers();
    location.reload();
  } else {
    alert("Not enough points!");
  }
}
// ===== Assign Points (Faculty) =====
function assignPoints(e) {
  e.preventDefault();

  let name = document.getElementById("studentName").value;
  let points = parseInt(document.getElementById("points").value);

  let user = users.find(u => u.name === name && u.role === "student");

  if (user) {
    user.points += points;
    user.history.push("Earned " + points + " points");

    saveUsers();
    alert("Points assigned!");
  } else {
    alert("Student not found");
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
function showUser() {
  let user = localStorage.getItem("user");
  document.getElementById("userName").innerText = user;
}

 

