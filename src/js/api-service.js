import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27865517-33e13e683f49d77078a3fb000';

function fetchPictures(teg) {
  const options = {
    params: {
      key: KEY,
      q: teg,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: false,
      page: 1,
      per_page: 40,
    },
  };

  return axios.get(BASE_URL, options).then(res => res.data);
}

// ${BASE_URL}/?key=${KEY}&q=yellow+flowers&image_type=photo

// const QUERY_OPTIONS = 'name,capital,population,flags,languages';
// function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=${QUERY_OPTIONS}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

export { fetchPictures };
