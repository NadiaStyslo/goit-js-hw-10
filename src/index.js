import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectCat = document.querySelector('.breed-select');
const loadCat = document.querySelector('.loader');
const errorCat = document.querySelector('.error');
const infoCat = document.querySelector('.cat-info');

loadCat.textContent = '';
selectCat.style.margin = '30px';
selectCat.style.fontSize = '1.4rem';
infoCat.style.display = 'flex';
infoCat.style.gap = '15px';
infoCat.style.fontSize = '1.2rem';
infoCat.style.fontFamily = 'Arial';
infoCat.style.backgroundColor = '#F5F5DC';

//selectCat.style.visibility = 'hidden';
errorCat.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    selectCat.style.visibility = 'visible';
    loadCat.style.visibility = 'hidden';
    //  console.log(breeds)
    const breedCat = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');

    selectCat.insertAdjacentHTML('beforeend', breedCat);
  })
  .catch(error => {
    loadCat.style.visibility = 'hidden';
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });
selectCat.addEventListener('change', function () {
  const selectBreed = selectCat.value;
  infoCat.innerHTML = '';
  loadCat.style.visibility = 'visible';

  fetchCatByBreed(selectBreed)
    .then(breeds => {
      loadCat.style.visibility = 'hidden';

      const dataCats = breeds[0];
      console.log(dataCats);
      infoCat.innerHTML = `
        <div><img src="${dataCats.url}" alt="${dataCats.breeds[0].name}" width ="400px";/>
        </div>
        <div>
        <h3>${dataCats.breeds[0].name}</h3>
        <p>${dataCats.breeds[0].description}</p>
        <h4>Characters</h4>
        <p>${dataCats.breeds[0].temperament}</p>
        </div>
        `;
    })

    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});
