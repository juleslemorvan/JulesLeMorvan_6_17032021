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
  })
  .catch((err) => {
    console.log(err);
  });

function displayPhotographerInfosFromData(photographer) {
  const photographersInfos = document.getElementById("photographerInfos");

  photographersInfos.innerHTML += `
            <p>${photographer.name}</p>
        `;
}
