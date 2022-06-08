import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { newFetch, fetchLoadMoreBtnClick, imagesPerPage } from './js/api-service';
import galleryCarsMarkup from './js/templates-card';
import { getArrayEmptyMessage, getFoundImegesMessage, getEndGellaryMessage, getEmptySearchMessage } from './js/message';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;

refs.form.addEventListener('submit', onSearchPictures);
refs.loadMoreBtn.addEventListener('click', onLoadMorePictures);

const gallery = new SimpleLightbox('.gallery a');

async function onSearchPictures(e) {
  try {
    e.preventDefault();
    const searchTeg = e.currentTarget.elements.searchQuery.value.trim();

    if (!searchTeg) {
      getEmptySearchMessage();
      return;
    }

    const imegesGallery = await newFetch(searchTeg);

    const foundPictures = imegesGallery.totalHits;

    renderGalleryCards(imegesGallery);

    if (foundPictures < 1) {
      getArrayEmptyMessage();
      refs.loadMoreBtn.classList.add('is-hidden');
      return;
    }

    if (refs.loadMoreBtn.classList.contains('is-hidden') && page <= foundPictures / imagesPerPage) {
      refs.loadMoreBtn.classList.toggle('is-hidden');
    }

    getFoundImegesMessage(imegesGallery);
    e.target.reset();
  } catch {
    err => console.log(err);
  }
}

async function onLoadMorePictures() {
  try {
    refs.loadMoreBtn.classList.toggle('is-hidden');

    const morePictures = await fetchLoadMoreBtnClick();
    const foundPictures = morePictures.totalHits;

    refs.loadMoreBtn.classList.toggle('is-hidden');
    addGalleryCards(morePictures);
    smoothScroll();

    page += 1;

    if (page >= foundPictures / imagesPerPage) {
      refs.loadMoreBtn.classList.toggle('is-hidden');
      getEndGellaryMessage();
    }
  } catch {
    err => console.log(err);
  }
}

function renderGalleryCards(arrayImages) {
  refs.gallery.innerHTML = galleryCarsMarkup(arrayImages.hits);
  gallery.refresh();
}

function addGalleryCards(arrayImages) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryCarsMarkup(arrayImages.hits));
  gallery.refresh();
}

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
