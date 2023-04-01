import './sass/index.scss';
import ApiImageService from './js/api-gallery';
import lightbox from './js/lightbox';
import { Notify } from 'notiflix';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

let imagesShown = 0;
const newGallery = new ApiImageService(); // Екземпляр класу запит до бекенду API сервісу Pixabay

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

const options = { root: null, rootMargin: '40px', threshold: 0.25 };
// for description see https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API

const observer = new IntersectionObserver(onLoadMoreBtnClick, options);
// for description see https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API

function onSearch(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  newGallery.query = e.currentTarget.elements.searchQuery.value.trim(); // внесене користувачем значення
  newGallery.resetPage();
  
  fetchGallery();
}

async function fetchGallery() {

  const images = await newGallery.fetchGallery();
  const { hits, total } = images;
  imagesShown += hits.length;

  /* console.log(images);
  console.log(images.totalHits); */

  if (!total) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
  }

  onRenderGallery(hits);
  imagesShown += hits.length;
  lightbox.refresh();

  if (imagesShown < total) {
    Notify.success(`Hooray! We found ${total} images !!!`);
    refs.loadMoreBtn.classList.remove('is-hidden');
  }

  if (imagesShown >= total) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}

function onRenderGallery(data) {
    const markup = data.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => {
        return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
    </div>`;
    }).join('');
    
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onLoadMoreBtnClick() {
    newGallery.incrementPage();
    fetchGallery();
}
