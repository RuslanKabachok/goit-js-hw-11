import './sass/main.scss';
import Api from './api';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  list: document.querySelector('.gallery'),
  loadMore: document.querySelector('[data-action="load-more"]'),
};

const api = new Api();

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', onLoadMore);

hideLoadMoreBtn();

function onLoadMore() {
  api
    .fetchImg()
    .then(data => {
      return data;
    })
    .then(data => {
      if (data.hits.length < 40) {
        window.addEventListener('scroll', handleScroll);

        renderCard(data.hits);
        hideLoadMoreBtn();
        return;
      } else {
        renderCard(data.hits);
      }
    });
}

function onFormSubmit(e) {
  e.preventDefault();
  api.query = e.currentTarget.elements.searchQuery.value;
  api.resetPage();

  clearGallery();
  window.removeEventListener('scroll', handleScroll);

  if (api.query === '') {
    return;
  } else {
    api
      .fetchImg()
      .then(data => {
        return data;
      })
      .then(array => {
        if (array.totalHits === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
          );
          hideLoadMoreBtn();
          return;
        } else if (array.hits.length < 40) {
          window.addEventListener('scroll', handleScroll);

          renderCard(array.hits);
          hideLoadMoreBtn();
          // scrollDown();
        } else {
          renderCard(array.hits);
          showLoadMoreBtn();
          Notiflix.Notify.success(`Hooray, we found ${array.totalHits} images!`);
          // scrollDown();
        }
      });
  }
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

  refs.list.insertAdjacentHTML('beforeend', markUp);
}

function clearGallery() {
  refs.list.innerHTML = '';
}

function showLoadMoreBtn() {
  refs.loadMore.classList.remove('is-hiden');
}

function hideLoadMoreBtn() {
  refs.loadMore.classList.add('is-hiden');
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    Notiflix.Notify.warning('We are sorry, but you have reached the end of search results.');
  }
}

// function scrollDown() {
//   const y = document.documentElement.scrollHeight;

//   window.scrollBy({
//     top: y,
//     behavior: 'smooth',
//   });
// }
