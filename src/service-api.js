const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22318307-8fc961fa8d00a621cd6d86864';
const queryStringOptions =
  'image_type=photo&orientation=horizontal&safesearch=true';

export default class FetchPixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 6;
  }

  async fetchApi() {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${queryStringOptions}
    	  &page=${this.page}&per_page=${this.perPage}`
    );

    const data = await response.json();
    console.log('this: ', this);
    console.log('data: ', data);
    console.log('total: ', data.total);
    this.incrementPage();
    return data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
