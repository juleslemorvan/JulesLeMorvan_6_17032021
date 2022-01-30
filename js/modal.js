let modalbg;
let modalBtn;
let formData;
let closeBtn;
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
  document.getElementById("first").focus();
  document.getElementById(
    "photographerNameModal"
  ).innerHTML = document.querySelector(".photographerInfos-name").innerHTML;
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
    last.parentElement.setAttribute("data-error-visible", "false");
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
    modalbg.style.display = "none";

    successForm.style.fontSize = "50px";
    successForm.style.maxHeight = "600px";
    successForm.style.textAlign = "center";
    successForm.style.display = "flex";
    document.getElementById("successBtn").focus();

    successBtn.addEventListener("click", function () {
      successForm.style.display = "none";
      first.value = "";
      last.value = "";
      email.value = "";
      textarea.value = "";
    });
    // envoi de mail ici
    console.log("First name : ", document.getElementById("first").value);
    console.log("Last name : ", document.getElementById("last").value);
    console.log("Email : ", document.getElementById("email").value);
    console.log("Message: ", document.getElementById("textarea").value);
  }
}

function initModal() {
  modalbg = document.querySelector(".bground");
  modalBtn = document.querySelectorAll(".modalBtn");
  formData = document.querySelectorAll(".formData");
  closeBtn = document.querySelector(".closeModalForm");
  form = document.getElementById("form");
  form.style.display = "block";
  successForm = document.getElementById("successForm");
  successBtn = document.getElementById("successBtn");

  // INPUT ET ERROR

  first = document.getElementById("first");
  last = document.getElementById("last");
  email = document.getElementById("email");
  textarea = document.getElementById("textarea");
  first.value = "";
  last.value = "";
  email.value = "";
  textarea.value = "";

  error = document.querySelectorAll("[data-error]");

  formOk = true;

  // button and message success hidden
  successForm.style.display = "none";

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // close modal event

  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      document.getElementById("bground").style.display = "none";
      document.getElementById("myModal").style.display = "none";
      document.getElementById("successForm").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    modalbg.style.display = "none";
    initModal();
  });

  form.addEventListener("submit", validate);
}
