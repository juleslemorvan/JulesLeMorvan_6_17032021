const data = "./data.json";

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
