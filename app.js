// ===== LOGIN SYSTEM =====
function login(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let role = document.getElementById("role").value;

  // Save session
  localStorage.setItem("user", username);
  localStorage.setItem("role", role);

  // Redirect
  if (role === "student") {
    window.location.href = "student.html";
  } else {
    window.location.href = "faculty.html";
  }
}
// ===== USER (for demo) =====
let currentUser = localStorage.getItem("user");

// ===== Dummy Data =====
let leaderboardData = [
  { name: "Eshan", points: 120 },
  { name: "Aneya", points: 95 },
  { name: "Arathy", points: 80 }
];

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
 

 

