import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchPixabay from './service-api.js';
import galleryMarkup from './templates/cards-template.js';
// import fetchApi from './fetch.js';

const formEl = document.querySelector('#search-form');
const galleyEl = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.load-more');
const fetchPixabayInstance = new FetchPixabay();

formEl.addEventListener('submit', inputHandler);
loadMoreBtn.addEventListener('click', onLoadMoreHandler);

function inputHandler(event) {
  event.preventDefault();
  fetchPixabayInstance.query =
    event.currentTarget.elements.searchQuery.value.trim();
  try {
    fetchPixabayInstance.fetchApi().then(render);
  } catch (error) {
    console.log('error message in try-catch: ', error.message);
  }
}

function render(data) {
  galleyEl.innerHTML = galleryMarkup(data);
  lightbox();
}

function onLoadMoreHandler() {
  try {
    fetchPixabayInstance.fetchApi().then(render);
  } catch (error) {
    console.log('error message in try-catch: ', error.message);
  }
}

function lightbox() {
  new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.8,
  });
}
