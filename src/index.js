import './sass/main.scss';
import fetchPhoto from './js/api';

import cardMarkup from './templates/cards.hbs';
import axios from 'axios';

import * as basicLightbox from 'basiclightbox';
import './css/basicLightbox.min.css';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

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

  pageNumber = 1;

  refs.gallery.innerHTML = '';
  if (refs.input.value === '' || refs.input.value === ' ' || refs.input.value === '  ') {
    return error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    fetchPhoto(refs.input.value, pageNumber).then(renderPhoto);
  }
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
});
