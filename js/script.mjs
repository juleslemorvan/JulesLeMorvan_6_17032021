import getJsonData from "./fetch.js";

const photographersCards = document.getElementById("photographersCards");
const toTop = document.querySelector(".scroll-top");

getJsonData(main);

function main(data) {
  photographerUtilities.displayPhotographerFromData(data);
}

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
                    alt="${photographer.alt}"
                  />
              </a>
              <figcaption class="legende">
                      <h2 class="name">${photographer.name}</h2>
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
        e.preventDefault();
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

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 150) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

toTop.addEventListener("click", function () {
  e.preventDefault();
  window.scrollTo(0, 0);
});
