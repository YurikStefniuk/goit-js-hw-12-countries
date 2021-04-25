// import './css/styles.css'
import countriesListTpl from './templates/country-list.hbs'
import countryCardTpl from './templates/country.hbs'
import API from './js/api-service.js'
import getRefs from './js/get-refs'
import "@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";
import { text } from 'body-parser';
const debounce = require('lodash.debounce')
const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));

function renderCountryCards(country) {
    const markup = countryCardTpl(country)
    console.log(markup);
    refs.description.innerHTML = markup;
}
function renderCountriesList (country) {
    const listMarkup = countriesListTpl(country);
    refs.description.innerHTML = listMarkup;
}
function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value.trim();
    if (searchQuery.length === 0) return;
    console.log(searchQuery);

    API.fetchCountryByName(searchQuery)
        .then(evt => {
             if (evt.length >= 2 && evt.length <= 10) {
                renderCountriesList(evt);
            }
            else if (evt.length === 1) {
                renderCountryCards(evt);
            }
        }
         )
        .catch(error => {
            console.log(error)
        })
    // .finally(() => searchQuery.reset() )
}
