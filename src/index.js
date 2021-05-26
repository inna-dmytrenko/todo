import './sass/main.scss';
import fetchPhoto from './js/api';

import cardMarkup from './templates/cards.hbs';
import axios from 'axios';
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import './css/basicLightbox.min.css';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
// import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial';

const refs = {
  button: document.querySelector('.button'),
  input: document.querySelector('.input'),
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  li: document.querySelector('.gallery-card'),
};

let pageNumber = 1;

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  //   const photoQuery = e.target[0].value;
  pageNumber = 1;
  //   console.log(e.target[0].value);
  refs.gallery.innerHTML = '';
  if (refs.input.value === '' || refs.input.value === ' ' || refs.input.value === '  ') {
    return error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    fetchPhoto(refs.input.value, pageNumber).then(renderPhoto);
  }
  if (refs.gallery !== 0) {
    // fetchPhoto(refs.input.value, pageNumber).then(renderPhoto);
    // console.log(refs.gallery.getElementsByTagName('li').lenght);
  } else {
    return error({
      text: '404',
      delay: 2000,
    });
  }

  //   if (e.currentTarget.elements.query.value === '') {
  //     PNotify.error({
  //       text: '404 Not fount',
  //     });
  //   } else {
  //   }
  //   console.log(e.currentTarget.elements.query.value);
});
function renderPhoto(data) {
  refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(data));
  refs.gallery.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
}

refs.button.addEventListener('click', e => {
  e.preventDefault();
  pageNumber += 1;
  fetchPhoto(refs.input.value, pageNumber).then(renderPhoto);
});

refs.gallery.addEventListener('click', e => {
  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    basicLightbox.create(`<img src="${e.target.dataset.source}" width="800" height="600">`).show();
  }
  console.log(e.target.dataset.source);
});

// refs.form.addEventListener('input', debounce(onSearchPhoto, 1000));

// function onSearchPhoto({ target: { value } }) {
//   if (value.trim() !== '') {
//     fetchPhoto(value.trim()).then(data => console.log(data));
//   }
// }

// function renderCard(hits) {
//   refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(hits));
// }
// function searchFormInput(e) {
//   const searchQuery = e.target.value;
//   console.log(searchQuery);
//   if (searchQuery.length > 0) {
//     fetchCountries(searchQuery).then(data => {});
//   }
// }

// function insertListItem(items) {
//   refs.list.insertAdjacentHTML('beforeend', items);
//   console.log(items);
// }

// function buildCountriesList(items) {
//   return countriesListTemplate(items);
// }

// function buildListMarkup(items) {
//   return countryListTemplate(items);
// }

// function clearListItems() {
//   refs.list.innerHTML = '';
// }

// console.log(fetchCountries());
// refs.button.addEventListener('click', e => {
//   console.log(e);
// });

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '21764210-8d882ab68fe5176a0369b7247';

// function getData() {
//   return axios(
//     `${BASE_URL}?image_type=photo&orientation=horizontal&q=''&page=1&per_page=12&key=${API_KEY}`,
//   ).then(({ data }) => data);
// }
// // console.log(data);
// console.log(getData());
