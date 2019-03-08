import makeFilter from './make-filter';
import film from './film-data';
import filters from './configs';
import Film from './film';

const mainNavigation = document.querySelector(`.main-navigation`);
const allMoviesContainer = document.querySelector(`.films-list__container--all-movies`);
const topRatedContainer = document.querySelector(`.films-list__container--top-rated`);

const addFilters = (enterEltment, filtersArr) => {
  let counter = 0;
  while (counter < filtersArr.length) {
    const link = filtersArr[counter].link;
    const className = filtersArr[counter].className;
    const title = filtersArr[counter].title;
    const count = filtersArr[counter].count;
    enterEltment.insertAdjacentHTML(`beforeend`, makeFilter(link, className, title, count));
    counter++;
  }
};

addFilters(mainNavigation, filters, 0);

const firstFilm = new Film(film);
firstFilm.render(allMoviesContainer);
const secondFilm = new Film(film);
secondFilm.render(topRatedContainer);
