import makeFilter from './make-filter';
import makeTask from './make-task';

const mainNavigation = document.querySelector(`.main-navigation`);
const filmsListContainer = document.querySelectorAll(`.films-list__container`);
const initialNumberOfTasks = 7;
const initialNumberOfTasksRecomented = 2;
const filters = [
  {
    link: `#all`,
    className: `main-navigation__item main-navigation__item--active`,
    title: `All movies`
  },
  {
    link: `#watchlist`,
    className: `main-navigation__item`,
    title: `Watchlist`,
    count: 13
  },
  {
    link: `#history`,
    className: `main-navigation__item`,
    title: `History`,
    count: 4
  },
  {
    link: `#favorites`,
    className: `main-navigation__item`,
    title: `Favorites`,
    count: 8
  },
  {
    link: `#stats`,
    className: `main-navigation__item main-navigation__item--additional`,
    title: `Stats`
  }
];
const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

const addFilters = (enterEltment, filtersArr, counter) => {
  if (counter === filtersArr.length) {
    return;
  }
  const link = filtersArr[counter].link;
  const className = filtersArr[counter].className;
  const title = filtersArr[counter].title;
  const count = filtersArr[counter].count;
  enterEltment.insertAdjacentHTML(`beforeend`, makeFilter(link, className, title, count));
  addFilters(enterEltment, filtersArr, ++counter);
};

addFilters(mainNavigation, filters, 0);

const addTask = (enterElement, count) => {
  const iter = (counter) => {
    if (counter === count) {
      return;
    }
    enterElement.insertAdjacentHTML(`beforeend`, makeTask());
    iter(++counter);
  };
  iter(0);
};

addTask(filmsListContainer[0], initialNumberOfTasks);
addTask(filmsListContainer[1], initialNumberOfTasksRecomented);
addTask(filmsListContainer[2], initialNumberOfTasksRecomented);

const addRandomTasks = (e) => {
  const target = e.target;
  if (target.classList.contains(`main-navigation__item`)) {
    filmsListContainer[0].innerHTML = ``;
    const countTasks = randomInteger(1, 4);
    addTask(filmsListContainer[0], countTasks);
  }
};

mainNavigation.addEventListener(`click`, addRandomTasks);
