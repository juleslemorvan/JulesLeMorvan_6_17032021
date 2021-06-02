const data = "./data.json";

// const photographersInfos = document.getElementById("photographerInfos");

// recuperation de la chaine de requete dans l'url

const urlSearchParams = new URLSearchParams(window.location.search);

// extraction de l'ID
const id = urlSearchParams.get("id");
console.log(id);

fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data.photographers);
    const photographer = data.photographers.find(
      (photographer) => photographer.id === parseInt(id)
    );
    console.log(photographer);
  })
  .catch((err) => {
    console.log(err);
  });

//methode pour recuperer l'objet photographe par sa clé "id"

// function displayPhotographerInfosFromData(data) {
//   data.photographers((photographer) => {
//     console.log(photographer);

//     photographersInfos.innerHTML += `
//             <p>salut</p>
//             `;
//   });
// }
