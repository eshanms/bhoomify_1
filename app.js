let users = [
  { name: "Eshan", password: "123", role: "student" },
  { name: "Faculty1", password: "admin", role: "faculty" }
];

function login() {
  let name = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let user = users.find(u => u.name === name && u.password === pass);

  if (!user) {
    alert("Invalid login!");
    return;
  }


   






   
