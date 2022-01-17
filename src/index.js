import './sass/main.scss';

const refs = {
  formEl: document.querySelector('form'),
  inputEl: document.querySelector('input'),
  listEl: document.querySelector('.gallery'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const name = refs.inputEl.value;

  fetchImg(name)
    .then(data => {
      return data.hits;
    })
    .then(renderCard);
}

function fetchImg(imgName) {
  const URL = `https://pixabay.com/api/?key=25284059-64aa950e28f1ef43b7bf646a1&q=${imgName}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(URL).then(response => {
    return response.json();
  });
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

  refs.listEl.innerHTML = markUp;
}
