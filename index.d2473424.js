const e={searchInput:document.querySelector("#search-box"),countryList:document.querySelector(".country-list"),countryInfo:document.querySelector(".country-info")};let t="";e.searchInput.addEventListener("focus",(function(e){t=e.target.value,fetch(`https://restcountries.com/v3.1/name/${t}?fields=flags.svg`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>e.forEach((e=>{console.log(e)}))))}));new URLSearchParams;
//# sourceMappingURL=index.d2473424.js.map
