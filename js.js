const API = "http://localhost:5000"; // change after deployment

function login(e) {
  e.preventDefault();

  let role = document.getElementById("role").value;

  if (role === "student") {
    window.location.href = "student.html";
  } else {
    window.location.href = "faculty.html";
  }
}

// Load leaderboard
async function loadLeaderboard() {
  let res = await fetch(API + "/leaderboard");
  let data = await res.json();

  let list = document.getElementById("leaderboard");
  list.innerHTML = "";

  data.forEach(user => {
    let li = document.createElement("li");
    li.innerText = user.name + " - " + user.points;
    list.appendChild(li);
  });
}

// Assign points
async function assignPoints(e) {
  e.preventDefault();

  let name = document.getElementById("studentName").value;
  let points = document.getElementById("points").value;

  await fetch(API + "/assign-points", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, points })
  });

  alert("Points Assigned!");
}

