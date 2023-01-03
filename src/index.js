import './css/styles.css';
import fetchCountries from './fetchCountries';
const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
let name = '';
refs.searchInput.addEventListener('input', onInput);
fetchCountries(name).than(response => console.log(1)) 

function onInput(e) {
    name = e.target.value;
}

const DEBOUNCE_DELAY = 300;
