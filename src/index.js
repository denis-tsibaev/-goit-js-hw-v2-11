import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22318307-8fc961fa8d00a621cd6d86864';
const queryStringOptions =
  'image_type=photo&orientation=horizontal&safesearch=true';
import galleryMarkup from './templates/cards-template.js';

// const options = {
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// };

async function fetchApi(query) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&${queryStringOptions}`
  );
  const data = await response.json();
  console.log('data: ', data);
  return data;
}

const formEl = document.querySelector('#search-form');
const galleyEl = document.querySelector('.js-gallery');

formEl.addEventListener('submit', inputHandler);

function inputHandler(event) {
  event.preventDefault();
  const searchQuery = event.target.searchQuery.value.trim();
  try {
    fetchApi(searchQuery).then(render);
    console.log('searchQuery: ', searchQuery);
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
