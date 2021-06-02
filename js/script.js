// Fetch Data

const data = "./data.json";
const photographersCards = document.getElementById("photographersCards");

// Data from json file
fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    displayPhotographerFromData(data);
  })
  .catch((err) => {
    console.log(err);
  });

function onClickNavTag() {
  const tags = document.querySelectorAll(".nav__navigation__item");
  tags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      console.log(e.target.getAttribute("target"));
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

function displayTagsClass(tags) {
  return tags.join(" ");
}

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

function displayPhotographerFromData(data) {
  const photographersCards = document.querySelector(".photographersCards");
  data.photographers.forEach((photographer) => {
    console.log(photographer);

    photographersCards.innerHTML += `
            <figure class="photographers-profil ${displayTagsClass(
              photographer.tags
            )}" >

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
  onClickNavTag();
}
