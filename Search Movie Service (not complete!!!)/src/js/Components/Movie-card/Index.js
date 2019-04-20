import config from '../../config.js';
const listWrapper = document.querySelector('.list-wrapper');
const movieWrapper = document.querySelector('.movie-wrapper');

function renderMovie (data) {


    const mappingData = mapData(data);



    const html =`
    <a class="back" type="button"> Назад </a>
    <a href='${data.id}' class="movie-link">
        <h2 class="movie-title">${mappingData.title}</h2></a>
        <date class = "date">${mappingData.date}</date>
        <div class = "country">${mappingData.country}</div>
        <div class="picture"><img src = '${mappingData.img}'></div>
        <div class = "language">${mappingData.language}</div>
        <div class = "genre">${mappingData.genre}</div>
        <div class = "spoken_languages">${mappingData.spoken_languages}</div>
        <div class = "overview">${mappingData.overview}</div>
        <div class = "popularity">${mappingData.popularity}</div>
        <div class = "homepage">${mappingData.homeUrl}</div>
    
    `;
    render(html);

}

function mapData (data) {
    const defaultValue = 'н/д';

    return {
        title:data.title || data.original_title || 'Unknown',
        date: data.release_date ||data.first_air_date|| defaultValue,
        country: data.origin_country || defaultValue,
        img: getPictureUrl(),
        language: getOriginalLanguage(),
        genre: getGenres(),
        spoken_languages: getSpokenLanguages(),
        overview:data.overview || defaultValue,
        popularity:data.popularity || defaultValue,
        id:data.id || Date.now(),
        homeUrl: data.homepage|| defaultValue
    }

    function getPictureUrl() {
        const url = data.backdrop_path || data.poster_path;

        if (url) {
            return config.imageSrc + url;
        } else {
            return config.noImageSrc;
        }

    }

    function getOriginalLanguage() {
        const lang = data.original_language;

        switch (lang) {
            case "en" :
                return 'английский'
                break

            case "ru" :
                return 'русский'
                break

            case "sp":
                return 'испанский'
                break

            case "fr":
                return 'французский'
                break

            case "it":
                return 'итальянский'
                break

            case "ch":
                return 'китайский'
                break

            default :
                return data.original_language
        }
    }

    function getGenres() {
        const genres = data.genres;
        let genresName = new Array;
        genres.forEach(genre => {
            genresName.push (genre.name);
        })
        const genre = genresName.join(", ");


        return genre;

    }

    function getSpokenLanguages() {
        const spokenlanguages = data.spoken_languages;
        let spokenlanguagesName = new Array;
        spokenlanguages.forEach(language => {
            spokenlanguagesName.push (language.name);
        })

        const spokenlanguage = spokenlanguagesName.join (", ");

        return spokenlanguage;


    }

}

function render(html) {

    const element = document.createElement ('article');



    element.classList.add ('movie');
    element.innerHTML = html;
    movieWrapper.style.display = "block"
    listWrapper.style.display = 'none';
    movieWrapper.innerHTML = '';
    movieWrapper.appendChild(element)

    const backButton = document.querySelector(".back");

    backButton.addEventListener("click", back)

}

function back() {
    listWrapper.style.display = "block";
    movieWrapper.style.display = "none"
}

export default {
    renderMovie,
    back
}

