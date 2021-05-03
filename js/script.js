// Fetch Data

const data = "./data.json";
const photographersCards = document.getElementById("photographersCards");

// Data from json file
fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const photographersCards = document.querySelector(".photographersCards");
    data.photographers.forEach((photographer) => {
      console.log(photographer);

      function displayTags(tags) {
        return `
           <ul class="tagList">
           ${tags
             .map(function (tag) {
               return `<li class="tagItem">${tag}</li>`;
             })
             .join(" ")}
           </ul>
           `;
      }

      photographersCards.innerHTML += `
            <figure  class="photographers-profil">
              <a href="./photographer-page.html?id=${photographer.id}">
                  <img
                    class="photographers-profil__portrait"
                    src="./assets/images/Portraits/${photographer.portrait}"
                    alt="${photographer.name}'s profile"
                  />
              </a>
              <figcaption class="legende">
                      <p class="name">${photographer.name}</p>
                      <p class="position">${photographer.city}, ${
        photographer.country
      }</p>
                      <p class="tagline">${photographer.tagline}</p>
                      <p class="price">${photographer.price} $ / jours</p>
                  ${displayTags(photographer.tags)}
              </figcaption>
            </figure>
            `;
    });
  })
  .catch((err) => {
    console.log(err);
  });
