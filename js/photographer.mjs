import getJsonData from "./fetch.js";

getJsonData(main);

function main(data) {
  // extraction de l'ID
  const urlSearchParams = new URLSearchParams(window.location.search);

  // extraction de l'ID
  const id = urlSearchParams.get("id");

  const photographer = data.photographers.find(
    (photographer) => photographer.id === parseInt(id)
  );

  if (!photographer) {
    window.location = "index.html";
  }

  PhotographerInfosUtilities.displayPhotographerInfosFromData(photographer);

  const medias = data.media.filter(
    (media) => media.photographerId === parseInt(id)
  );

  PhotographerLikesAndPricesUtilities.displayLikesAndPriceFromData(
    photographer,
    medias
  );
  PhotographerMediaUtilities.displayMediaFromData(photographer, medias);
}
// Affichage des infos photographes

class PhotographerInfosUtilities {
  static displayPhotographerInfosFromData(photographer) {
    const photographersInfos = document.getElementById("photographerInfos");
    console.log(photographer);

    photographersInfos.innerHTML += `
              <div class="photographerInfos-left">
              <h1 class="photographerInfos-name" aria-label="name of photographer">${
                photographer.name
              }</h1>
              <p class="photographerInfos-location">${photographer.city}, ${
      photographer.country
    }</p>
              <p class="photographerInfos-line">${photographer.tagline}</p>
              ${PhotographerInfosUtilities.displayTagsOk(photographer.tags)}
            </div>
            <div class="photographerInfos-center" >
              <button class="modalBtn" id="modalBtn"  role="button" tabindex="0">Contactez-moi</button>
            </div>
            <div class="photographerInfos-right">
              <a class="photographerInfos-picture" aria-label="photo portrait de ${
                photographer.name
              }">
                <img
                  class="photographerInfos-img"
                  src="./assets/images/Portraits/${photographer.portrait}"
                  alt="photo portrait de ${photographer.name}"
                />
              </a>
            </div>
          `;
    initModal();
  }
  static displayTagsOk(tags) {
    return `
            <ul class="tagList" role="list">
            ${tags
              .map(function (tag) {
                return `<li class="tagItem" role="list Item">#${tag}</li>`;
              })
              .join(" ")}
            </ul>
            `;
  }
}

class PhotographerMediaUtilities {
  static displayMediaFromData(photographer, medias) {
    const photographersMedias = document.getElementById("photographersMedias");
    const modalContent = document.getElementById("modal-content");
    const name = photographer.name.split(" ")[0].replace("-", " ");

    medias.forEach((media, index) => {
      let mediaHTML = MediaFactory.creator(media, name);
      mediaHTML.generateHTMLMedia(photographersMedias, index + 1);
      mediaHTML.generateHTMLLightbox(modalContent);

      PhotographerMediaUtilities.addLikes();
    });
    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 37:
          document.getElementById("prev").click();
          break;
        case 38:
          console.log("up");
          break;
        case 39:
          document.getElementById("next").click();
          break;
        case 40:
          console.log("down");
          break;
      }
    });
  }

  static addLikes() {
    const likes = document.querySelectorAll(".likeMedia");
    let countLike = document.getElementById("countLike");
    likes.forEach((like) => {
      like.childNodes[1].addEventListener("click", function (e) {
        if (e.target.classList.contains("heartDislike")) {
          like.firstChild.nodeValue = parseInt(like.firstChild.nodeValue) + 1;
          countLike.firstChild.nodeValue =
            parseInt(countLike.firstChild.nodeValue) + 1;
        } else {
          like.firstChild.nodeValue = parseInt(like.firstChild.nodeValue) - 1;
          countLike.firstChild.nodeValue =
            parseInt(countLike.firstChild.nodeValue) - 1;
        }
        e.target.classList.toggle("heartDislike");
      });
    });
  }
}

class PhotographerLikesAndPricesUtilities {
  static displayLikesAndPriceFromData(photographer, media) {
    const likesAndPrice = document.getElementById("likesAndPrice");
    likesAndPrice.innerHTML += `
    <div class="bottomLikesAndPrice" aria-label="general informations">
    <p id="countLike">${PhotographerLikesAndPricesUtilities.countLikes(
      media
    )} <i class="fas fa-heart"></i></p>
    <p>${photographer.price}€/jour</p>
    </div>
    `;
  }

  static countLikes(medias) {
    let total = 0;
    medias.forEach((media) => {
      total += media.likes;
    });
    return total;
  }
}
