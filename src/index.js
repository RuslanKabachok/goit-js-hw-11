import './sass/main.scss';
import Api from './api';

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  list: document.querySelector('.gallery'),
  loadMore: document.querySelector('[data-action="load-more"]'),
};

const api = new Api();

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', onLoadMore);

function onLoadMore() {
  api
    .fetchImg()
    .then(data => {
      return data.hits;
    })
    .then(renderCard);
}

function onFormSubmit(e) {
  e.preventDefault();
  api.query = e.currentTarget.elements.searchQuery.value;

  api
    .fetchImg()
    .then(data => {
      return data.hits;
    })
    .then(renderCard);
}

function renderCard(data) {
  const markUp = data
    .map(
      img => `<div class="photo-card">
  <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" width: 100px height: 70px/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${img.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${img.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${img.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${img.downloads}</b>
    </p>
  </div>
</div>`,
    )
    .join('');

  refs.list.innerHTML = markUp;
}
