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
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
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

      if (data.totalHits > fetchPixabayInstance.perPage) {
        loadMoreBtn.classList.remove('is-hidden');
      }
      event.target.reset();
      clearGallery();
      render(data);
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    });
  } catch (error) {
    console.log('error message in try-catch: ', error.message);
  }
}

async function onLoadMoreHandler() {
  loadMoreBtn.classList.add('is-hidden');
  try {
    fetchPixabayInstance.fetchApi().then(data => {
      const totalPages = Math.ceil(
        data.totalHits / fetchPixabayInstance.perPage
      );

      if (totalPages <= fetchPixabayInstance.page - 1) {
        loadMoreBtn.classList.add('is-hidden');
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        render(data);
        slowScrollDown();
        return;
      }
      render(data);
      slowScrollDown();
    });
    loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log('error message in try-catch: ', error.message);
  }
}

function render(data) {
  galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(data));
  gallery.refresh();
}

function clearGallery() {
  galleryEl.innerHTML = '';
}

let gallery = new SimpleLightbox('.photo-card a', {
  enableKeyboard: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

function slowScrollDown() {
  const { height: cardHeight } = document
    .querySelector('.js-gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
