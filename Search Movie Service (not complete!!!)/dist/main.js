/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/js/config.js
var API_KEY = '1a882a7c5d40ee7d1a833f5a2f87172a';
/* harmony default export */ var config = ({
  searchMovieUrl: "https://api.themoviedb.org/3/search/multi?api_key=1a882a7c5d40ee7d1a833f5a2f87172a&query=",
  imageSrc: 'http://image.tmdb.org/t/p/w185',
  noImageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
  baseMovieUrl: 'https://api.themoviedb.org/3/',
  queryMovieById: 'movie/',
  apiKey: '?api_key=1a882a7c5d40ee7d1a833f5a2f87172a'
});
// CONCATENATED MODULE: ./src/js/Components/Movie/Index.js

function movie(data) {
  var mappingData = mapData(data);
  var html = "\n    <a href='".concat(data.id, "' class=\"movie-link\">\n        <h2 class=\"movie-title\">").concat(mappingData.title, "</h2></a>\n        <date class = \"date\">").concat(mappingData.date, "</date>\n        <div class = \"country\">").concat(mappingData.country, "</div>\n        <div class=\"picture\"><img src = '").concat(mappingData.img, "'></div>\n        <div class = \"language\">").concat(mappingData.language, "</div>\n        <!--<div class = \"numberOfEpisodes\">").concat(mappingData.numberOfEpisodes, "</div>-->\n        <!--<div class = \"numberOfSeasones\">").concat(mappingData.numberOfSeasones, "</div>-->\n        <div class = \"overview\">").concat(mappingData.overview, "</div>\n        <div class = \"popularity\">").concat(mappingData.popularity, "</div>\n    \n    ");
  return html;
}

function mapData(data) {
  var defaultValue = 'н/д';
  return {
    title: data.title || data.original_title || 'Unknown',
    date: data.release_date || data.first_air_date || defaultValue,
    country: data.origin_country || defaultValue,
    img: getPictureUrl(),
    language: getOriginalLanguage(),
    // numberOfEpisodes: data.numberOfEpisodes,
    // numberOfSeasones: data.numberOfSeasones,
    overview: data.overview || defaultValue,
    popularity: data.popularity || defaultValue,
    id: data.id || Date.now()
  };

  function getPictureUrl() {
    var url = data.backdrop_path || data.poster_path;

    if (url) {
      return config.imageSrc + url;
    } else {
      return config.noImageSrc;
    }
  }

  function getOriginalLanguage() {
    var lang = data.original_language;

    switch (lang) {
      case "en":
        return 'английский';
        break;

      case "ru":
        return 'русский';
        break;

      case "sp":
        return 'испанский';
        break;

      case "fr":
        return 'французский';
        break;

      case "it":
        return 'итальянский';
        break;

      case "ch":
        return 'китайский';
        break;

      default:
        return data.original_language;
    }
  }
}
// CONCATENATED MODULE: ./src/js/Components/Movie-list/index.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Movie_list_MovieList =
/*#__PURE__*/
function () {
  function MovieList() {
    _classCallCheck(this, MovieList);
  }

  _createClass(MovieList, [{
    key: "init",
    value: function init(data) {
      this.data = data;
    }
  }, {
    key: "drawToDom",
    value: function drawToDom(selector) {
      this.selector = selector;
      this.clearList(selector);
      selector.appendChild(this.fragment);
    }
  }, {
    key: "renderMovies",
    value: function renderMovies(data) {
      var _this = this;

      this.fragment = document.createDocumentFragment();
      data.forEach(function (data) {
        var article = document.createElement('article');
        article.classList.add('movie');
        article.innerHTML = movie(data);

        _this.fragment.appendChild(article);
      });
    }
  }, {
    key: "clearList",
    value: function clearList(selector) {
      selector.innerHTML = "";
    }
  }, {
    key: "sort",
    value: function sort(filter) {
      var data = _toConsumableArray(this.data.results);

      if (filter === "rating-max") {
        this.sortByMaxRaiting(data);
      }

      if (filter === "rating-min") {
        this.sortByMinRaiting(data);
      }

      if (filter === "date-new") {
        this.sortByNew(data);
      }

      if (filter === "date-old") {
        this.sortByOld(data);
      }
    }
  }, {
    key: "sortByMaxRaiting",
    value: function sortByMaxRaiting(data) {
      data.sort(function (a, b) {
        if (a.popularity < b.popularity) {
          return 1;
        }

        if (a.popularity > b.popularity) {
          return -1;
        }
      });
      this.renderMovies(data);
      this.drawToDom(document.querySelector('.movies'));
    }
  }, {
    key: "sortByMinRaiting",
    value: function sortByMinRaiting(data) {
      data.sort(function (a, b) {
        if (a.popularity > b.popularity) {
          return 1;
        }

        if (a.popularity < b.popularity) {
          return -1;
        }
      });
      this.renderMovies(data);
      this.drawToDom(document.querySelector('.movies'));
    }
  }, {
    key: "sortByNew",
    value: function sortByNew(data) {
      data.sort(function (a, b) {
        if (new Date(a.release_date) < new Date(b.release_date)) {
          return 1;
        }

        if (new Date(a.release_date) > new Date(b.release_date)) {
          return -1;
        }
      });
      this.renderMovies(data);
      this.drawToDom(document.querySelector('.movies'));
    }
  }, {
    key: "sortByOld",
    value: function sortByOld(data) {
      data.sort(function (a, b) {
        if (new Date(a.release_date) > new Date(b.release_date)) {
          return 1;
        }

        if (new Date(a.release_date) < new Date(b.release_date)) {
          return -1;
        }
      });
      this.renderMovies(data);
      this.drawToDom(document.querySelector('.movies'));
    }
  }, {
    key: "hide",
    value: function hide() {
      this.selector.style.display = 'none';
    }
  }]);

  return MovieList;
}();


// CONCATENATED MODULE: ./src/js/movies-service.js


function getVideoByText(text) {
  if (!text) {
    return;
  }

  return fetch(config.searchMovieUrl + text).then(function (r) {
    return r.json();
  });
}

function getVideoById(id) {
  var url = "".concat(config.baseMovieUrl).concat(config.queryMovieById).concat(id).concat(config.apiKey);
  return fetch(url).then(function (r) {
    return r.json();
  });
}

/* harmony default export */ var movies_service = ({
  getVideoByText: getVideoByText,
  getVideoById: getVideoById
});
// CONCATENATED MODULE: ./src/js/Components/Movie-card/index.js

var listWrapper = document.querySelector('.list-wrapper');
var movieWrapper = document.querySelector('.movie-wrapper');

function renderMovie(data) {
  var mappingData = Movie_card_mapData(data);
  var html = "\n    <a class=\"back\" type=\"button\"> \u041D\u0430\u0437\u0430\u0434 </a>\n    <a href='".concat(data.id, "' class=\"movie-link\">\n        <h2 class=\"movie-title\">").concat(mappingData.title, "</h2></a>\n        <date class = \"date\">").concat(mappingData.date, "</date>\n        <div class = \"country\">").concat(mappingData.country, "</div>\n        <div class=\"picture\"><img src = '").concat(mappingData.img, "'></div>\n        <div class = \"language\">").concat(mappingData.language, "</div>\n        <div class = \"genre\">").concat(mappingData.genre, "</div>\n        <div class = \"spoken_languages\">").concat(mappingData.spoken_languages, "</div>\n        <div class = \"overview\">").concat(mappingData.overview, "</div>\n        <div class = \"popularity\">").concat(mappingData.popularity, "</div>\n        <div class = \"homepage\">").concat(mappingData.homeUrl, "</div>\n    \n    ");
  render(html);
}

function Movie_card_mapData(data) {
  var defaultValue = 'н/д';
  return {
    title: data.title || data.original_title || 'Unknown',
    date: data.release_date || data.first_air_date || defaultValue,
    country: data.origin_country || defaultValue,
    img: getPictureUrl(),
    language: getOriginalLanguage(),
    genre: getGenres(),
    spoken_languages: getSpokenLanguages(),
    overview: data.overview || defaultValue,
    popularity: data.popularity || defaultValue,
    id: data.id || Date.now(),
    homeUrl: data.homepage || defaultValue
  };

  function getPictureUrl() {
    var url = data.backdrop_path || data.poster_path;

    if (url) {
      return config.imageSrc + url;
    } else {
      return config.noImageSrc;
    }
  }

  function getOriginalLanguage() {
    var lang = data.original_language;

    switch (lang) {
      case "en":
        return 'английский';
        break;

      case "ru":
        return 'русский';
        break;

      case "sp":
        return 'испанский';
        break;

      case "fr":
        return 'французский';
        break;

      case "it":
        return 'итальянский';
        break;

      case "ch":
        return 'китайский';
        break;

      default:
        return data.original_language;
    }
  }

  function getGenres() {
    var genres = data.genres;
    var genresName = new Array();
    genres.forEach(function (genre) {
      genresName.push(genre.name);
    });
    var genre = genresName.join(", ");
    return genre;
  }

  function getSpokenLanguages() {
    var spokenlanguages = data.spoken_languages;
    var spokenlanguagesName = new Array();
    spokenlanguages.forEach(function (language) {
      spokenlanguagesName.push(language.name);
    });
    var spokenlanguage = spokenlanguagesName.join(", ");
    return spokenlanguage;
  }
}

function render(html) {
  var element = document.createElement('article');
  element.classList.add('movie');
  element.innerHTML = html;
  movieWrapper.style.display = "block";
  listWrapper.style.display = 'none';
  movieWrapper.innerHTML = '';
  movieWrapper.appendChild(element);
  var backButton = document.querySelector(".back");
  backButton.addEventListener("click", back);
}

function back() {
  listWrapper.style.display = "block";
  movieWrapper.style.display = "none";
}

/* harmony default export */ var Movie_card = ({
  renderMovie: renderMovie,
  back: back
});
// CONCATENATED MODULE: ./src/js/index.js



var input = document.querySelector('.search-input');
var movList = document.querySelector('.movies');
var list = new Movie_list_MovieList();
var filters = document.querySelector(".filters");
input.addEventListener('input', function (e) {
  var searchText = e.target.value;

  if (!searchText) {
    list.clearList(movList);
    return;
  }

  movies_service.getVideoByText(searchText).then(function (data) {
    list.init(data);
    list.renderMovies(data.results);
    list.drawToDom(movList);
  });
});
filters.addEventListener('click', function (e) {
  e.preventDefault();
  debugger;
  var target = e.target;
  var dataAttr = target.getAttribute('data-filter');

  if (!dataAttr) {
    return;
  }

  list.sort(dataAttr);
});
movList.addEventListener('click', function (e) {
  var target = e.target;
  var link = target.closest('.movie-link');
  var id;
  e.preventDefault();

  if (!link) {
    return;
  }

  id = link.getAttribute('href');
  movies_service.getVideoById(id).then(function (data) {
    Movie_card.renderMovie(data);
  });
});

/***/ })
/******/ ]);