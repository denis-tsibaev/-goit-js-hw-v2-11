// Задание - поиск изображений
// Создай фронтенд часть приложения поиска и просмотра изображений по ключевому
// слову.Добавь оформление элементов интерфейса.Посмотри демо видео работы приложения.
// Форма поиска
// Форма изначально есть в HTML документе.Пользователь будет вводить строку для поиска
// в текстовое поле, а при сабмите формы необходимо выполнять HTTP - запрос.
/*{ <form class="search-form" id="search-form">
  <input
    type="text"
    name="searchQuery"
    autocomplete="off"
    placeholder="Search images..."
  />
  <button type="submit">Search</button>
</form>; }*/
//
// HTTP-запросы
// В качестве бэкенда используй публичный API сервиса Pixabay.Зарегистрируйся, получи
// свой уникальный ключ доступа и ознакомься с документацией.
//
// Список параметров строки запроса которые тебе обязательно необходимо указать:
//
// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.
// В ответе будет массив изображений удовлетворивших критериям параметров запроса.
// Каждое изображение описывается объектом, из которого тебе интересны только следующие свойства:
//
// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.
// Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
// В таком случае показывай уведомление с текстом "Sorry, there are no images matching
// your search query.Please try again.".Для уведомлений используй библиотеку notiflix.
//
// Галерея и карточка изображения
// Элемент div.gallery изначально есть в HTML документе, и в него необходимо рендерить
// разметку карточек изображений.При поиске по новому ключевому слову необходимо полностью
// очищать содержимое галереи, чтобы не смешивать результаты.
/*{ <div class="gallery">
  <!-- Карточки изображений -->
</div> }*/
// Шаблон разметки карточки одного изображения для галереи.
/*{ <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; }*/
//
// Пагинация
// Pixabay API поддерживает пагинацию и предоставляет параметры page и per_page.Сделай так,
// 	чтобы в каждом ответе приходило 40 объектов(по умолчанию 20).

// Изначально значение параметра page должно быть 1.
// При каждом последующем запросе, его необходимо увеличить на 1.
// При поиске по новому ключевому слову значение page надо вернуть в исходное, так как будет
// пагинация по новой коллекции изображений.
// В HTML документе уже есть разметка кнопки при клике по которой необходимо выполнять запрос
// за следующей группой изображений и добавлять разметку к уже существующим элементам галереи.

// <button type="button" class="load-more">Load more</button>
// Изначально кнопка должна быть скрыта.
// После первого запроса кнопка появляется в интерфейсе под галереей.
// При повторном сабмите формы кнопка сначала прячется, а после запроса опять отображается.
// В ответе бэкенд возвращает свойство totalHits - общее количество изображений которые подошли
// под критерий поиска(для бесплатного аккаунта).Если пользователь дошел до конца коллекции,
// 	прячь кнопку и выводи уведомление с текстом "We're sorry, but you've reached the end
// 	of search results.".
// Дополнительно
// ⚠️ Следующий функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Уведомление
// После первого запроса при каждом новом поиске выводить уведомление в котором будет написано
// сколько всего нашли изображений(свойство totalHits).Текст уведомления "Hooray! We found totalHits
// images."
//
// Библиотека SimpleLightbox
// Добавить отображение большой версии изображения с библиотекой SimpleLightbox для полноценной
// галереи.
//
// В разметке необходимо будет обернуть каждую карточку изображения в ссылку, как указано в
// документации.
// У библиотеки есть метод refresh() который обязательно нужно вызывать каждый раз после добавления
// новой группы карточек изображений.
// Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме
// того который описан в документации.
// Описан в документации
// import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
// import 'simplelightbox/dist/simple-lightbox.min.css';
//
// Прокрутка страницы
// Сделать плавную прокрутку страницы после запроса и отрисовки каждой следующей группы изображений.
// Вот тебе код подсказка, а разберись в нём самостоятельно.
/*const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});*/
//
// Бесконечный скролл
// Вместо кнопки «Load more» можно сделать бесконечную загрузку изображений при прокрутке
// страницы.Мы предоставлям тебе полную свободу действий в реализации, можешь использовать
// любые библиотеки.

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

// Прокрутка страницы
function slowScrollDown() {
  const { height: cardHeight } = document
    .querySelector('.js-gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
