const data = "./data.json";

// const photographersInfos = document.getElementById("photographerInfos");

// recuperation de la chaine de requete dans l'url

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
    console.log(photographer);

    displayPhotographerInfosFromData(photographer);

    const media = data.media.filter(
      (media) => media.photographerId === parseInt(id)
    );
    console.log(media);
    displayMediaFromData(media);
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
}

function displayMediaFromData(media) {
  const photographersMedias = document.getElementById("photographersMedias");
  media.forEach((media) => {
    photographersMedias.innerHTML += `

            <article class="media-photographer">
              <figure>
                <a class="photographerMedia">
                  <img
                    class="photographerMedia-img"
                    src="./assets/images/${media.image}"
                    alt="media"
                  />
                </a>
                <figcaption class="legendeMedia">
                  <p class="titleMedia"></p>
                  <p class="prixmedia">${media.price} €</p>
                  <p class="likeMedia">${media.likes}</p>
                </figcaption>
              </figure>
            </article>

        `;
  });
}
