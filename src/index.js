import './css/styles.css';
import fetchCountries from './fetchCountries';
const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
let name = '';
refs.searchInput.addEventListener('focus', onInput);
const searchParam = new URLSearchParams {
    fields: 'capital',
}
// ,capital,population,flags.svg,languages

function onInput(e) {
    name = e.target.value;
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=flags.svg`).then(
        response => {
            if(!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        }).then( 
            countryname =>  
            countryname.forEach(countryInfo => {
                console.log(countryInfo);
            }) )
}

const DEBOUNCE_DELAY = 300;
