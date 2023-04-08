import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchPixabay from './service-api.js';
import galleryMarkup from './templates/cards-template.js';
// import fetchApi from './fetch.js';

const formEl = document.querySelector('#search-form');
const galleyEl = document.querySelector('.js-gallery');
const FetchPixabay = new FetchPixabay();

formEl.addEventListener('submit', inputHandler);

function inputHandler(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    return alert('empty query');
  }
  console.log('searchQuery: ', searchQuery);
  try {
    // fetchApi(searchQuery).then(render);
    // FetchPixabay.fetchApi(searchQuery).then(render);
    FetchPixabay.fetchApi();
  } catch (error) {
    console.log('error message in try-catch: ', error.message);
  }
}

function render(data) {
  galleyEl.innerHTML = galleryMarkup(data);
  lightbox();
}

function lightbox() {
  new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.8,
  });
}
