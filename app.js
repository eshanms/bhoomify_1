// ===== USERS =====
let users = [
  { name: "Eshan", password: "123", role: "student", points: 120, history: [] },
  { name: "Aneya", password: "123", role: "student", points: 95, history: [] },
  { name: "Arathy", password: "123", role: "student", points: 80, history: [] },
  { name: "Faculty1", password: "admin", role: "faculty" }
];

// ===== LOAD USERS =====
function loadUsers() {
  let data = localStorage.getItem("users");

  if (data) {
    users = JSON.parse(data);
  } else {
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// ===== SAVE USERS =====
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ===== LOGIN =====
function login() {
  loadUsers();

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

// ===== LOGOUT =====
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ===== ASSIGN POINTS =====
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

// ===== REDEEM =====
function redeem(reward) {
  let name = localStorage.getItem("user");
  let user = users.find(u => u.name === name);

  if (!user) return;


   






   
