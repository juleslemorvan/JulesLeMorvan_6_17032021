export default function getJsonData(callback) {
  fetch("./data.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
