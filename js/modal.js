let modalbg;
let modalBtn;
let formData;
let closeBtn;
let submitForm;
let form;
let successForm;
let SuccessBtn;
let first;
let last;
let textarea;
let error;

let formOk;

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Function input firstName must contain at least 2 characters and match the regex
function checkFirst() {
  const nameValid = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
  if (
    nameValid.exec(first.value.trim()) === null ||
    first.value.trim().length < 3
  ) {
    first.parentElement.setAttribute("data-error-visible", "true");
    first.parentElement.setAttribute(
      "data-error",
      "Veuillez renseigner un Prénom valide (3 carracteres min)"
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
    // envoi de mail ici
  }
}

function initModal() {
  modalbg = document.querySelector(".bground");

  modalBtn = document.querySelectorAll(".modalBtn");

  formData = document.querySelectorAll(".formData");
  closeBtn = document.querySelector(".closeModalForm");
  submitForm = document.getElementById("submit");
  form = document.getElementById("form");
  successForm = document.getElementById("successForm");
  successBtn = document.getElementById("successBtn");

  // INPUT ET ERROR

  first = document.getElementById("first");
  last = document.getElementById("last");
  email = document.getElementById("email");
  textarea = document.getElementById("textarea");

  error = document.querySelectorAll("[data-error]");

  formOk = true;

  // button and message success hidden
  successForm.style.display = "none";
  successBtn.style.display = "none";
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // close modal event
  console.log("closeBtn", closeBtn);

  closeBtn.addEventListener("click", () => {
    console.log("test");
    modalbg.style.display = "none";
  });

  form.addEventListener("submit", validate);
}
