import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27865517-33e13e683f49d77078a3fb000';

const options = {
  params: {
    key: KEY,
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  },
};

const imagesPerPage = options.params.per_page;

function fetchPictures() {
  return axios.get(BASE_URL, options).then(res => res.data);
}

function newFetch(teg) {
  options.params.q = teg;
  options.params.page = 1;

  return fetchPictures();
}

function fetchLoadMoreBtnClick() {
  options.params.page += 1;

  return fetchPictures();
}

export { newFetch, fetchLoadMoreBtnClick, imagesPerPage };
