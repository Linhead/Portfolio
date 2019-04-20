import config from '../../config.js';


export default function movie (data) {


    const mappingData = mapData(data);



    const html =`
    <a href='${data.id}' class="movie-link">
        <h2 class="movie-title">${mappingData.title}</h2></a>
        <date class = "date">${mappingData.date}</date>
        <div class = "country">${mappingData.country}</div>
        <div class="picture"><img src = '${mappingData.img}'></div>
        <div class = "language">${mappingData.language}</div>
        <!--<div class = "numberOfEpisodes">${mappingData.numberOfEpisodes}</div>-->
        <!--<div class = "numberOfSeasones">${mappingData.numberOfSeasones}</div>-->
        <div class = "overview">${mappingData.overview}</div>
        <div class = "popularity">${mappingData.popularity}</div>
    
    `;
    return html;

}

function mapData (data) {
    const defaultValue = 'н/д';

    return {
        title:data.title || data.original_title || 'Unknown',
        date: data.release_date ||data.first_air_date|| defaultValue,
        country: data.origin_country || defaultValue,
        img: getPictureUrl(),
        language: getOriginalLanguage(),
        // numberOfEpisodes: data.numberOfEpisodes,
        // numberOfSeasones: data.numberOfSeasones,
        overview:data.overview || defaultValue,
        popularity:data.popularity || defaultValue,
        id:data.id || Date.now()
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

}