// Fetch Data

const dataPath = "./data.json";
const photographersCards = document.getElementById("photographersCards");

// Data from json file
fetch(dataPath)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    photographerUtilities.displayPhotographerFromData(data);
  })
  .catch((err) => {
    console.log(err);
  });

class photographerUtilities {
  static displayPhotographerFromData(data) {
    const photographersCards = document.querySelector(".photographersCards");
    data.photographers.forEach((photographer) => {
      photographersCards.innerHTML += `
            <figure class="photographers-profil ${photographer.tags.join(
              " "
            )}" >

              <a href="./photographer-page.html?id=${
                photographer.id
              }" aria-label=" photo portrait de ${photographer.name}">
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
                  ${photographerUtilities.displayTags(photographer.tags)}
              </figcaption>
            </figure>
            `;
    });
    photographerUtilities.onClickNavTag();
  }

  static onClickNavTag() {
    const tags = document.querySelectorAll(".nav__navigation__item");
    tags.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        e.target.classList.toggle("active");
        photographersCards.classList.toggle(e.target.getAttribute("target"));
        const actives = document.querySelectorAll(
          ".nav__navigation__item.active"
        );
        if (actives.length === 0) {
          photographersCards.classList.add("all");
        } else {
          photographersCards.classList.remove("all");
        }
      });
    });
  }

  static displayTags(tags) {
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
}
