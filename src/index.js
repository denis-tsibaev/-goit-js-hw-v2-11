import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchPixabay from './service-api.js';
import galleryMarkup from './templates/cards-template.js';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.load-more');
const fetchPixabayInstance = new FetchPixabay();

formEl.addEventListener('submit', inputHandler);
loadMoreBtn.addEventListener('click', onLoadMoreHandler);

async function inputHandler(event) {
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  event.preventDefault();
  fetchPixabayInstance.query = searchQuery;
  fetchPixabayInstance.resetPage();

  if (searchQuery === '') {
    Notify.failure('Ooops! You are trying to send an empty request...');
    event.target.reset();
    clearGallery();
    return;
  }
  try {
    fetchPixabayInstance.fetchApi().then(data => {
      if (data.total === 0) {
        Notify.failure('Sorry, there are no images matching your search query');
        event.target.reset();
        clearGallery();
        return;
      }

      if (data.total > fetchPixabayInstance.perPage) {
        loadMoreBtn.classList.remove('is-hidden');
      }
      clearGallery();
      render(data);
    });
  } catch (error) {
    console.log('error message in try-catch: ', error.message);
  }
}

async function onLoadMoreHandler() {
  loadMoreBtn.classList.add('is-hidden');
  try {
    fetchPixabayInstance.fetchApi().then(render);
    slowScrollDown();
    loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log('error message in try-catch: ', error.message);
  }
}

function render(data) {
  galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(data));
  lightbox();
}

function clearGallery() {
  galleryEl.innerHTML = '';
}

function lightbox() {
  new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.8,
  });
}

function slowScrollDown() {
  const { height: cardHeight } = document
    .querySelector('.js-gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
