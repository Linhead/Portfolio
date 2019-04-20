import movieList from './Components/Movie-list/index.js';
import moviesService from './movies-service.js';
import movieCard from './Components/Movie-card/index.js'



const input = document.querySelector('.search-input');
const movList = document.querySelector('.movies');
const list = new movieList();
const filters = document.querySelector(".filters");

input.addEventListener('input', e => {
const searchText = e.target.value;


if (!searchText) {
    list.clearList(movList);
    return;
}

    moviesService.getVideoByText (searchText)

        .then (data => {
            list.init (data);
            list.renderMovies(data.results)

            list.drawToDom (movList);
        })


});

filters.addEventListener('click', (e) => {
    e.preventDefault();
    debugger;
    const target = e.target;
    const dataAttr = target.getAttribute ('data-filter');

    if (!dataAttr) {
        return;
    }
    list.sort(dataAttr);
});

movList.addEventListener('click', e => {
    const target = e.target;
    const link = target.closest ('.movie-link');
    let id;
    e.preventDefault();

    if (!link) {
        return
    }

    id = link.getAttribute('href');
    moviesService.getVideoById(id)
        .then (data => {
            movieCard.renderMovie(data);
            }
        )
});

