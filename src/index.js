const formEl = document.querySelector('#search-form');

formEl.addEventListener('submit', inputHandler);

function inputHandler(event) {
  event.preventDefault();
  const searchQuery = event.target.searchQuery.value.trim();

  console.log('searchQuery: ', searchQuery);
}
