import getJsonData from "./fetch.js";

let selectOpen = false;
let options = document.querySelectorAll(".option-item");

getJsonData(main);

function main(data) {
  // extraction de l'ID
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  let medias = data.media.filter(
    (media) => media.photographerId === parseInt(id)
  );

  orderMediaByPopularity(medias);

  options.forEach(function (option) {
    addClickEvent(option, medias);
  });

  document
    .getElementById("selected-option")
    .addEventListener("click", function () {
      switchArrow();
      showAllItems();
      selectOpen = !selectOpen;
    });
}

function orderMediaByPopularity(medias) {
  let mediasHTML = document.querySelectorAll(".media-photographer");
  for (let i = 0; i < mediasHTML.length; i++) {
    mediasHTML[i].remove();
  }

  medias.sort(comparePopularity);
  let main = document.getElementById("photographersMedias");
  medias.forEach((media) => {
    mediasHTML.forEach((mediaHTML) => {
      if (mediaHTML.id == media.id) {
        main.appendChild(mediaHTML);
      }
    });
  });
}

function addClickEvent(elem, medias) {
  elem.addEventListener("click", function (event) {
    let selectedOption = document.getElementById("selected-text");
    let oldTextOption = selectedOption.innerText;
    selectedOption.innerText = event.target.innerText;
    event.target.innerText = oldTextOption;
    switchArrow();
    selectOpen = !selectOpen;
    options.forEach(function (option) {
      option.style.display = "none";
    });

    switch (selectedOption.innerText) {
      case "Popularity":
        orderMediaByPopularity(medias);
        break;

      case "Price":
        orderMediaByPrice(medias);
        break;

      default:
        orderMediaByDate(medias);
    }
  });
}

function switchArrow() {
  if (selectOpen) {
    document.getElementById("arrow-up").style.display = "none";
    document.getElementById("arrow-down").style.display = "inline";
  } else {
    document.getElementById("arrow-down").style.display = "none";
    document.getElementById("arrow-up").style.display = "inline";
  }
}

function showAllItems() {
  let options = document.querySelectorAll(".option-item");
  options.forEach(function (option) {
    if (selectOpen) {
      option.style.display = "none";
    } else {
      option.style.display = "flex";
    }
  });
}

function comparePrice(media1, media2) {
  if (media1.price > media2.price) {
    return -1;
  } else if (media1.price < media2.price) {
    return 1;
  } else {
    return 0;
  }
}

function orderMediaByPrice(medias) {
  let mediasHTML = document.querySelectorAll(".media-photographer");
  for (let i = 0; i < mediasHTML.length; i++) {
    mediasHTML[i].remove();
  }

  medias.sort(comparePrice);
  let main = document.getElementById("photographersMedias");
  medias.forEach((media) => {
    mediasHTML.forEach((mediaHTML) => {
      if (mediaHTML.id == media.id) {
        main.appendChild(mediaHTML);
      }
    });
  });
}

// function  compare by Popularity (likes)
function comparePopularity(media1, media2) {
  if (media1.likes > media2.likes) {
    return -1;
  } else if (media1.likes < media2.likes) {
    return 1;
  } else {
    return 0;
  }
}

// function compare by date
function compareDate(media1, media2) {
  let date1 = new Date(media1.date);
  let date2 = new Date(media2.date);
  if (date1 > date2) {
    return -1;
  } else if (date1 < date2) {
    return 1;
  } else {
    return 0;
  }
}

function orderMediaByDate(medias) {
  let mediasHTML = document.querySelectorAll(".media-photographer");
  for (let i = 0; i < mediasHTML.length; i++) {
    mediasHTML[i].remove();
  }

  medias.sort(compareDate);
  console.log(medias);

  let main = document.getElementById("photographersMedias");
  medias.forEach((media) => {
    mediasHTML.forEach((mediaHTML) => {
      if (mediaHTML.id == media.id) {
        main.appendChild(mediaHTML);
      }
    });
  });
}
