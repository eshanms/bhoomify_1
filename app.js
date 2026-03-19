//const API = "http://localhost:5000"; // change after deployment

function login(e) {
  e.preventDefault();

  let role = document.getElementById("role").value;

  if (role === "student") {
    window.location.href = "student.html";
  } else {
    window.location.href = "faculty.html";
  }
}
const leaderboardData = [
  { name: "Eshan", points: 120 },
  { name: "Aneya", points: 95 },
  { name: "Arathy", points: 80 },
  { name: "Gokul", points: 70 }
];
// Load leaderboard
function loadLeaderboard() {
  let list = document.getElementById("leaderboard");
  list.innerHTML = "";

  leaderboardData.forEach(user => {
    let li = document.createElement("li");
    li.innerText = user.name + " - " + user.points;
    list.appendChild(li);
  });
}

// Assign points
function assignPoints(e) {
  e.preventDefault();
  loadData();
  let name = document.getElementById("studentName").value;
  let points = parseInt(document.getElementById("points").value);

  // Find student
  let student = leaderboardData.find(u => u.name === name);

  if (student) {
    student.points += points;
  } else {
    leaderboardData.push({ name, points });
  }

  alert("Points Assigned!");
  saveData();
}
// Save data
function saveData() {
  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
}

// Load data
function loadData() {
  let data = localStorage.getItem("leaderboard");
  if (data) {
    leaderboardData.splice(0, leaderboardData.length, ...JSON.parse(data));
  }
}
