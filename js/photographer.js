const data = "./data.json";

// const photographersInfos = document.getElementById("photographerInfos");

// recuperation de la chaine de requete dans l'url

// extraction de l'ID
const urlSearchParams = new URLSearchParams(window.location.search);

// extraction de l'ID
const id = urlSearchParams.get("id");

fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const photographer = data.photographers.find(
      (photographer) => photographer.id === parseInt(id)
    );

    displayPhotographerInfosFromData(photographer);

    const medias = data.media.filter(
      (media) => media.photographerId === parseInt(id)
    );

    displayLikesAndPriceFromData(photographer, medias);
    displayMediaFromData(photographer, medias);
  })
  .catch((err) => {
    console.log(err);
  });

function displayTagsPhotographer(tags) {
  return tags.join(" ");
}

function displayTagsOk(tags) {
  return `
           <ul class="tagList">
           ${tags
             .map(function (tag) {
               return `<li class="tagItem">#${tag}</li>`;
             })
             .join(" ")}
           </ul>
           `;
}

function displayPhotographerInfosFromData(photographer) {
  const photographersInfos = document.getElementById("photographerInfos");

  photographersInfos.innerHTML += `
            <div class="photographerInfos-left">
            <p class="photographerInfos-name">${photographer.name}</p>
            <p class="photographerInfos-location">${photographer.city}, ${
    photographer.country
  }</p>
            <p class="photographerInfos-line">${photographer.tagline}</p>
            ${displayTagsOk(photographer.tags)}
          </div>
          <div class="photographerInfos-center">
            <button class="modalBtn" id="modalBtn">Contactez-moi</button>
          </div>
          <div class="photographerInfos-right">
            <a class="photographerInfos-picture">
              <img
                class="photographerInfos-img"
                src="./assets/images/Portraits/${photographer.portrait}"
                alt="photo portrait du photographe"
              />
            </a>
          </div>
        `;
  initModal();
}

function displayMediaFromData(photographer, medias) {
  const photographersMedias = document.getElementById("photographersMedias");
  const name = photographer.name.split(" ")[0].replace("-", " ");

  medias.forEach((media, index) => {
    photographersMedias.innerHTML += `

            <article id="${media.id}"class="media-photographer" >
              <figure>
                <a class="photographerMedia">
                  <img
                    class="photographerMedia-img"
                    src="./assets/images/${name}/${media.image}"
                    alt="media"
                    onclick="openModal(); currentSlide(${index + 1})"
                    
                  />
                </a>
                <figcaption class="legendeMedia">
                  <p class="titleMedia">${media.titleMedia}</p>
                  <p class="prixMedia">${media.price}€</p>
                  <p class="likeMedia">${
                    media.likes
                  }<i class="fas fa-heart heartDislike" ></i></p>
                </figcaption>
              </figure>
            </article>

        `;

    displayMediaLightbox(media, name);
    addLikes();
  });
}

function addLikes() {
  const likes = document.querySelectorAll(".likeMedia");
  let countLike = document.getElementById("countLike");
  likes.forEach((like) => {
    like.childNodes[1].addEventListener("click", function (e) {
      e.target.classList.toggle("heartDislike");
      if (e.target.classList.contains("heartDislike")) {
        like.firstChild.nodeValue = parseInt(like.firstChild.nodeValue) + 1;
        countLike.firstChild.nodeValue =
          parseInt(countLike.firstChild.nodeValue) + 1;
      } else {
        like.firstChild.nodeValue = parseInt(like.firstChild.nodeValue) - 1;
        countLike.firstChild.nodeValue =
          parseInt(countLike.firstChild.nodeValue) - 1;
      }
    });
  });
}

function countLikes(medias) {
  let total = 0;
  medias.forEach((media) => {
    total += media.likes;
  });
  return total;
}

function displayLikesAndPriceFromData(photographer, media) {
  const likesAndPrice = document.getElementById("likesAndPrice");
  likesAndPrice.innerHTML += `
  <div class="bottomLikesAndPrice">
  <p id="countLike">${countLikes(media)} <i class="fas fa-heart"></i></p>
  <p>${photographer.price}€/jour</p>
  </div>
  `;
}
