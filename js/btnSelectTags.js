// 100, 0, 10 --> base

// 0, 100, 10
// 0, 10, 100

const dataPath = "./data.json";
let jsonData;

let medias;

// Data from json file
fetch(dataPath)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    medias = data.media.filter(
      (media) => media.photographerId === parseInt(id)
    );

    SortUtilities.orderMediaByPopularity();
  })
  .catch((err) => {
    console.log(err);
  });

class SortUtilities {
  static orderMediaByPopularity() {
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
}

// function  compare by price (price)
let selectOpen = false;

let options = document.querySelectorAll(".option-item");
options.forEach(function (option) {
  addClickEvent(option);
});

function addClickEvent(elem) {
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
        SortUtilities.orderMediaByPopularity();
        console.log("popularity");
        break;

      case "Price":
        orderMediaByPrice();
        console.log("price");
        break;

      default:
        orderMediaByDate();
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

document
  .getElementById("selected-option")
  .addEventListener("click", function () {
    switchArrow();
    showAllItems();
    selectOpen = !selectOpen;
  });

document.getElementById("order-date").addEventListener("click", function () {});

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

function orderMediaByPrice() {
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

function orderMediaByDate() {
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
