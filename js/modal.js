// DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitForm = document.getElementById("submit");
const form = document.getElementById("form");
const successForm = document.getElementById("successForm");
const successBtn = document.getElementById("successBtn");

// INPUT ET ERROR

const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");

const error = document.querySelectorAll("[data-error]");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modalbg.style.display = "none";
}

let formOk = true;

// button and message success hidden
successForm.style.display = "none";
successBtn.style.display = "none";

// Function input firstName must contain at least 2 characters and match the regex
function checkFirst() {
  const nameValid = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
  if (
    nameValid.exec(first.value.trim()) === null ||
    first.value.trim().length < 2
  ) {
    first.parentElement.setAttribute("data-error-visible", "true");
    first.parentElement.setAttribute(
      "data-error",
      "Veuillez renseigner un Prénom valide (2 carracteres min)"
    );
    formOk = false;
  } else {
    first.parentElement.setAttribute("data-error-visible", "false");
  }
}

// Function input lastName must contain at least 2 characters and match the regex
function checkLast() {
  const nameValid = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
  if (
    nameValid.exec(last.value.trim()) === null ||
    last.value.trim().length < 2
  ) {
    last.parentElement.setAttribute("data-error-visible", "true");
    last.parentElement.setAttribute(
      "data-error",
      "Veuillez renseigner un Nom valide (2 carracteres min)"
    );
    formOk = false;
  } else {
    first.parentElement.setAttribute("data-error-visible", "false");
  }
}
// Function input email
function checkEmail() {
  const emailValid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  // test@test.com (valid)
  if (emailValid.exec(email.value.trim()) === null) {
    email.parentElement.setAttribute("data-error-visible", "true");
    email.parentElement.setAttribute(
      "data-error",
      "Veuillez renseigner un Email valide"
    );
    formOk = false;
  } else {
    email.parentElement.setAttribute("data-error-visible", "false");
  }
}

//function Validate form

form.addEventListener("submit", validate);

function validate(event) {
  event.preventDefault();
  formOk = true;

  checkFirst();

  checkLast();

  checkEmail();

  //display the success form

  if (formOk) {
    form.style.display = "none";
    successForm.style.fontSize = "50px";
    successForm.style.minHeight = "300px";
    successForm.style.textAlign = "center";
    successBtn.style.display = "flex";
    successForm.style.display = "flex";
    successBtn.addEventListener("click", closeModal);
  }
}
