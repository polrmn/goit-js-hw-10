import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
let name = '';
const DEBOUNCE_DELAY = 300;
const searchParams = new URLSearchParams ({
    fields: ['capital', 'name.official', 'population', 'flags.svg','languages'],
});

refs.searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    name = e.target.value.trim();  
    fetchCountries(name)
      .then(countryname => {
        if (countryname.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countryname.length >= 2) {
          countryname.forEach(element =>
            refs.countryList.insertAdjacentHTML(
              'beforeend',
              `
                    <li class="country-item">
                        <img 
                            class="country-item__flag" 
                            src="${element.flags.svg}" 
                            alt="/"
                        />
                    <p class="country-name">${element.name}</p>
                `
            )
          );
        } else {
          countryname.forEach(
            element =>
              (refs.countryInfo.innerHTML = `
                            <img 
                                class="country-info__flag" 
                                src="${element.flags.svg}" 
                                alt="/"
                            />
                            <h1 class="country-info__name">${element.name}</h1>
                            <ul class="country-info__list">
                                <li class="country-info__item">
                                    <span class="country-info__tag">Capital:</span>
                                    <p class="country-info__value">${
                                      element.capital
                                    }</p>
                                </li>
                                <li class="country-info__item">
                                    <span class="country-info__tag">Population:</span>
                                    <p class="country-info__value">${
                                      element.population
                                    }</p>
                                </li>
                                <li class="country-info__item">
                                    <span class="country-info__tag">Languages:</span>
                                    <p class="country-info__value">${element.languages.map(
                                      lang => lang.name
                                    )}</p>
                                </li>
                            </ul>
                        `)
          );
        }
      })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
            // refs.searchInput.value = '';
      }
        
      );
}

