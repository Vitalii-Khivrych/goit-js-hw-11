import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import {
  newFetch,
  fetchLoadMoreBtnClick,
  imagesPerPage,
} from './js/api-service';
import galleryCarsMarkup from './js/templates-card';
import {
  getArrayEmptyMessage,
  getFoundImegesMessage,
  getEndGellaryMessage,
} from './js/message';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;

refs.form.addEventListener('submit', onSearchPictures);
refs.loadMoreBtn.addEventListener('click', onLoadMorePictures);

const gallery = new SimpleLightbox('.gallery a');

function onSearchPictures(e) {
  e.preventDefault();
  const searchTeg = e.currentTarget.elements.searchQuery.value.trim();

  if (!searchTeg) {
    return;
  }

  newFetch(searchTeg)
    .then(hits => {
      renderGalleryCards(hits);

      if (hits.totalHits < 1) {
        getArrayEmptyMessage();
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
      }

      if (
        refs.loadMoreBtn.classList.contains('is-hidden') &&
        page <= hits.totalHits / imagesPerPage
      ) {
        refs.loadMoreBtn.classList.toggle('is-hidden');
      }

      getFoundImegesMessage(hits);
    })
    .catch(console.log);

  e.currentTarget.reset();
}

function onLoadMorePictures() {
  refs.loadMoreBtn.classList.toggle('is-hidden');

  fetchLoadMoreBtnClick().then(hits => {
    refs.loadMoreBtn.classList.toggle('is-hidden');
    addGalleryCards(hits);
    smoothScroll();

    page += 1;

    if (page >= hits.totalHits / imagesPerPage) {
      refs.loadMoreBtn.classList.toggle('is-hidden');
      getEndGellaryMessage();
    }
  });
}

function renderGalleryCards(arrayImages) {
  refs.gallery.innerHTML = galleryCarsMarkup(arrayImages.hits);
  gallery.refresh();
}

function addGalleryCards(arrayImages) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    galleryCarsMarkup(arrayImages.hits)
  );

  gallery.refresh();
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
