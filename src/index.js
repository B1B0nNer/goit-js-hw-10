import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const urlHost = `https://api.thecatapi.com/v1`;
const apiKey = 'live_Sp5v6emKEIvR1gjqxotPiqkbZLCmuPxMih75Cr8p2TPl7bLTd34uS3dHI4QBX3tc'; 

const selectEl = document.querySelector('.breed-select');
const divCatEl = document.querySelector('.cat-info');
const loadEl = document.querySelector('.loader');

selectEl.style.width = "35%";

function fetchBreeds() {

  return fetch(`${urlHost}/breeds`)
      .then(response => {
          if (!response.ok) {

              throw new Error(response.statusText || response.status)}
              return response.json()

          })

};

 function fetchCatByBreed(id) {

  return fetch(`${urlHost}/images/search?breed_ids=${id}&api_key=${apiKey}`)
      .then(response => {
          if (!response.ok) {

              throw new Error(response.statusText || response.status)}
              return response.json()

          })
 }

function createMarkup(array = []) {

  return array.map(({ name, id }) => {
     return `<option value="${id}">${name}</option>` 
  }).join("");

};

function createCatMarkup (catInfo) {
  
  return `
  <div class=block-js>
  <img src="${catInfo.url}">
  <div class=block-text>
  <h3>${catInfo.breeds[0].name} &#128008</h3>
  <p>${catInfo.breeds[0].description}</p>
  <p><strong>Temperament &#128008:</strong> ${catInfo.breeds[0].temperament}</p>
  </div>
  </div>
  ` 
  }
  
function addMarkup(element, mark) {

  element.insertAdjacentHTML('afterBegin', mark)

}; 

window.addEventListener('load', onLoad);

function onLoad() {
  fetchBreeds()
  .then(respone => {

    const markupOption = createMarkup(respone);

    addMarkup(selectEl, markupOption);

    new SlimSelect({

      select: '#selectElement'

    })
  })
  .catch(error => console.log(error.message));
}

selectEl.addEventListener('change', onChange);

function onChange(event) {

      const id = event.target.value;
      loadEl.classList.add('active');
      divCatEl.classList.remove('active');
      fetchCatByBreed(id)
      .then(response => {

          const catInfo = response[0];
          const cat = createCatMarkup(catInfo);
          divCatEl.innerHTML = cat;
          divCatEl.classList.add('active');
          loadEl.classList.remove('active');

      })
      .catch(() => {

          Notiflix.Notify.failure('Oops!!! There is no cat!!! &#128008 Maybe he was scared by an angry dog!!! &#128021', {
          width: '500px',
          timeout: '5000',
          fontSize: '25px',
          opacity: 0.7,

        });
        loadEl.classList.remove('active');
       });
}

