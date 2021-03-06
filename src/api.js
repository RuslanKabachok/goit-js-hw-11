import axios from 'axios';

export default class Api {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImg() {
    const URL = `https://pixabay.com/api/?key=25284059-64aa950e28f1ef43b7bf646a1&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&lang=en,ru&page=${this.page}&per_page=40`;
    this.page += 1;

    const response = await axios.get(URL);
    const images = await response.data;
    return images;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
