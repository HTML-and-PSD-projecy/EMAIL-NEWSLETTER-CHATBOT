let signUpBtn = document.querySelector(".signupbtn");
let signInBtn = document.querySelector(".signinbtn");
let nameField = document.querySelector(".namefield");
let title = document.querySelector(".title");
let underline = document.querySelector(".underline");
let text = document.querySelector(".text");
let miss = document.querySelector(".miss");

signInBtn.addEventListener("click", () => {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Let's sign you in!";
  text.innerHTML = "LOST PASSWORD ";
  signUpBtn.classList.add("disable");
  signInBtn.classList.remove("disable");
  underline.style.transform = "translateX(35)";
  miss.innerHTML = "Welcome back, You've been missed!";
});

signUpBtn.addEventListener("click", () => {
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Create new account";
  text.innerHTML = "PASSWORD SUGGESTIONS ";
  signUpBtn.classList.remove("disable");
  signInBtn.classList.add("disable");
  underline.style.transform = "translateX(0))";
  miss.innerHTML = "Listen music for free!";
});
