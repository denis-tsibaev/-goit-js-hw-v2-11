import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function lightbox() {
  new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.8,
  });
}

lightbox();

export default function galleryMarkup(data) {
  const obj = data.hits;
  const cardsByString = obj
    .map(item => {
      const {
        tags,
        largeImageURL,
        webformatURL,
        likes,
        views,
        comments,
        downloads,
      } = item;
      return `
	<div class="photo-card">
    	<a href="${largeImageURL}">
		<img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
		</a>
		<div class="info">
      		<p class="info-item">
        	<b>Likes</b>${likes}
      		</p>
      		<p class="info-item">
        	<b>Views</b>${views}
      		</p>
      		<p class="info-item">
        	<b>Comments</b>${comments}
      		</p>
      		<p class="info-item">
        	<b>Downloads</b>${downloads}
      		</p>
    	</div>
	</div>
	`;
    })
    .join('');

  return cardsByString;
}
