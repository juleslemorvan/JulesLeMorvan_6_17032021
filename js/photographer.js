const data = "./data.json";
const photographersInfos = document.getElementById("photographerInfos");

function displayPhotographerInfosFromData(data) {
  const photographerinfos = document.querySelector(".photographersInfos");
  data.photographers((photographer) => {
    console.log(photographer);

    photographersInfos.innerHTML += `
            <p>salut</p>
            `;
  });
}

fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    displayPhotographerInfosFromData(data);
  })
  .catch((err) => {
    console.log(err);
  });
