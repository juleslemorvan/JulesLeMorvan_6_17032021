// 100, 0, 10 --> base

// 0, 100, 10
// 0, 10, 100

// function  compare by price (price)
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

function orderMediaByPopularity(JSON_medias) {
  let medias = document.querySelectorAll(".media-photographer");
  for (let i = 0; i < medias.length; i++) {
    medias[i].remove();
  }

  JSON_medias.sort(compareDate);
  console.log(JSON_medias);
}
