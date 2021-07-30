// 100, 0, 10 --> base

// 0, 100, 10
// 0, 10, 100

const dataPath = "./data.json";
let jsonData;

// Data from json file
fetch(dataPath)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    jsonData = data;
    orderMediaByPopularity(data.media);
  })
  .catch((err) => {
    console.log(err);
  });

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
        orderMediaByPopularity(jsonData.media);
        console.log("popularity");
        break;

      case "Price":
        orderMediaByPrice(jsonData.media);
        console.log("price");
        break;

      default:
      //
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
    return 1;
  } else if (media1.price < media2.price) {
    return -1;
  } else {
    return 0;
  }
}

function orderMediaByPrice(JSON_medias) {
  let medias = document.querySelectorAll(".media-photographer");
  for (let i = 0; i < medias.length; i++) {
    medias[i].remove();
  }

  JSON_medias.sort(comparePrice);
  console.log(JSON_medias);
}

// function  compare by Popularity (likes)
function comparePopularity(media1, media2) {
  if (media1.likes > media2.likes) {
    return 1;
  } else if (media1.likes < media2.likes) {
    return -1;
  } else {
    return 0;
  }
}

function orderMediaByPopularity(JSON_medias) {
  let medias = document.querySelectorAll(".media-photographer");
  for (let i = 0; i < medias.length; i++) {
    medias[i].remove();
  }

  JSON_medias.sort(comparePopularity);
  console.log(JSON_medias);
  let main = document.getElementById("photographersMedias");
  JSON_medias.forEach((Json_media) => {
    medias.forEach((media) => {
      if (media.id == Json_media.id) {
        main.appendChild(media);
      }
    });
  });
}

// function compare by date
function compareDate(media1, media2) {
  let date1 = new Date(media1.date);
  let date2 = new Date(media2.date);
  if (date1 > date2) {
    return 1;
  } else if (date1 < date2) {
    return -1;
  } else {
    return 0;
  }
}

function orderMediaByDate(JSON_medias) {
  let medias = document.querySelectorAll(".media-photographer");
  for (let i = 0; i < medias.length; i++) {
    medias[i].remove();
  }

  JSON_medias.sort(compareDate);
  console.log(JSON_medias);
}
