import { registerUser } from "./dbInteractions.js";
let infoDIV = document.getElementById("infoDIV");

document.getElementById("register").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    infoDIV.innerHTML = "Please fill in all fields.";
    infoDIV.style.visibility = "visible";
    return;
  }
  if (!email.includes("@")) {
    infoDIV.innerHTML = "Please enter a valid email adress.";
    infoDIV.style.visibility = "visible";
    return;
  }
  if (password.length < 8 || !/\d/.test(password)) {
    infoDIV.innerHTML =
      "Password must be at least 8 characters long and contain at least one number.";
    infoDIV.style.visibility = "visible";
    return;
  }
  if (password !== confirmPassword) {
    infoDIV.innerHTML = "Passwords do not match.";
    infoDIV.style.visibility = "visible";
    return;
  }

  register(username, email, password);
});

async function register(username, email, password) {
  let data = await registerUser(username, email, password);

  if (data === "success") {
    infoDIV.style.color = "green";
    infoDIV.style.border = "solid green";
    infoDIV.innerHTML = "Registered successfully!";
    infoDIV.style.visibility = "visible";
    timer = setTimeout(() => {
      window.location.href = "login.html";
    });
  } else if (data === "u-exists") {
    infoDIV.style.color = "red";
    infoDIV.style.border = "solid red";
    infoDIV.innerHTML = "Username already in use!";
    infoDIV.style.visibility = "visible";
  } else if (data === "e-exists") {
    infoDIV.style.color = "red";
    infoDIV.style.border = "solid red";
    infoDIV.innerHTML = "Email already in use!";
    infoDIV.style.visibility = "visible";
  } else {
    infoDIV.style.color = "red";
    infoDIV.style.border = "solid red";
    infoDIV.innerHTML = "An error occurred!";
    infoDIV.style.visibility = "visible";
  }
}

async function uploadPost(quote, author, tags) {}

// async function hashPassword(password) {
//   const saltRounds = 10; // The cost factor controls how much time is needed to calculate a single bcrypt hash. Higher values are more secure but also slower.
//   try {
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log("Hashed Password:", hashedPassword);
//     return hashedPassword;
//   } catch (error) {
//     console.error("Error hashing password:", error);
//   }
// }
