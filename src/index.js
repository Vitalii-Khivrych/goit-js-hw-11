import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from './js/api-service';
import galleryCarsMarkup from './js/templates-card';

// const DEBOUNCE_DELAY = 300;

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  // countryInfo: document.querySelector('.country-info'),
};

refs.form.addEventListener('submit', onSearchPictures);

function onSearchPictures(e) {
  e.preventDefault();
  const searchTeg = e.currentTarget.elements.searchQuery.value.trim();

  if (!searchTeg) {
    return;
  }

  fetchPictures(searchTeg).then(renderGalleryCards).catch(console.log);

  e.currentTarget.reset();
}

function renderGalleryCards(arrayImages) {
  if (arrayImages.totalHits < 1) {
    onArrayEmpty();
    return;
  }

  refs.gallery.innerHTML = galleryCarsMarkup(arrayImages.hits);
  new SimpleLightbox('.gallery a');
}

function cleareMarkup() {
  if (refs.countriesList.children.length > 0) {
    refs.countriesList.innerHTML = '';
  }

  if (refs.countryInfo.children.length > 0) {
    refs.countryInfo.innerHTML = '';
  }
}

function onArrayEmpty() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onFetchError(error) {
  // cleareMarkup();
  Notify.failure('Oops, there is no country with that name');
}
