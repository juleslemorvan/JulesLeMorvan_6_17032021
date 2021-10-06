class MediaFactory {
  static creator(media, name) {
    if (!media.video) {
      return new ImageMedia(
        name,
        media.titleMedia,
        media.id,
        media.alt,
        media.likes,
        media.image
      );
    } else {
      return new VideoImageMedia(
        name,
        media.titleMedia,
        media.id,
        media.alt,
        media.likes,
        media.image,
        media.video
      );
    }
  }
}

class ImageMedia {
  constructor(name, title, id, alt, likes, image) {
    this.name = name;
    this.title = title;
    this.id = id;
    this.alt = alt;
    this.likes = likes;
    this.image = image;
  }

  generateHTMLMedia(contentDiv, index) {
    contentDiv.innerHTML += `

            <article id="${this.id}" class="media-photographer" aria-label=" all of the photographer's media">
              <figure>
                <a class="photographerMedia" aria-label="${this.title}">
                  <img
                    class="photographerMedia-img"
                    src="./assets/images/${this.name}/${this.image}"
                    alt="${this.alt}"
                    tabindex="0"
                    onkeypress="openModal(); currentSlide(${index})"
                    onclick="openModal(); currentSlide(${index})"
                    
                  />
                </a>
                <figcaption class="legendeMedia">
                  <p class="titleMedia">${this.title}</p>
                  <p class="likeMedia">${this.likes}<i class="fas fa-heart heartDislike" ></i></p>
                </figcaption>
              </figure>
            </article>

        `;
  }

  generateHTMLLightbox(lightbox) {
    lightbox.innerHTML += `<div class="mySlides">
          <img src="assets/images/${this.name}/${this.image}" aria-label="${this.title}" role="img" style="width:100%">
    </div>`;
  }
}

class VideoImageMedia extends ImageMedia {
  constructor(name, title, id, alt, likes, image, video) {
    super(name, title, id, alt, likes, image);
    this.video = video;
  }

  generateHTMLLightbox(lightbox) {
    lightbox.innerHTML += `
    <div class="mySlides">
      <video class="videoModal" width="80%" height="100%" controls>
        <source src="assets/images/${this.name}/${this.video}" type="video/mp4" aria-label="${this.title}" role="video">
        Your browser does not support the video tag.
      </video>
    </div>
    `;
  }
}
