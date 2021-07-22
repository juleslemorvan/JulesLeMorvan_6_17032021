function displayMediaLightbox(media, name) {
  const modalContent = document.getElementById("modal-content");
  let splittedPath;
  //console.log(media.image);
  if (!media.video) {
    splittedPath = media.image.split(".");
  } else {
    splittedPath = media.video.split(".");
  }

  const fileExtension = splittedPath[splittedPath.length - 1];

  if (fileExtension == "jpg") {
    modalContent.innerHTML += `
    <div class="mySlides">
      <img src="assets/images/${name}/${media.image}" style="width:100%">
    </div>
    `;
  } else {
    modalContent.innerHTML += `
    <div class="mySlides">
      <video class="videoModal" width="80%" height="100%" controls>
        <source src="assets/images/${name}/${media.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    `;
  }
}

var slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  console.log(slides);

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  console.log(slideIndex - 1);
  console.log(slides[slideIndex - 1]);
  slides[slideIndex - 1].style.display = "block";
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
