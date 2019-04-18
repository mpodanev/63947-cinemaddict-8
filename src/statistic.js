import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import createElement from './create-element';
import moment from 'moment';
import Component from "./component";

export default class Statistic extends Component {

  constructor(films) {
    super();

    this._films = films;
    this._watchedFilms = films.filter((film) => film.isWatched);
    this._chart = null;
  }

  _filterByGenre() {
    let filteredFilms = {};

    this._films.forEach((film) => {
      const genre = film.genre;
      filteredFilms[genre] = filteredFilms[genre] ? filteredFilms[genre] + 1 : 1;
    });

    const genres = Object.keys(filteredFilms);
    const genresCount = Object.values(filteredFilms);

    return [genres, genresCount];
  }

  _generateCharts() {

    const [genreLabels, genreAmounts] = this._filterByGenre();
    const statisticWrapper = this._element.querySelector(`.statistic__chart`);
    const BAR_HEIGHT = 50;
    statisticWrapper.height = BAR_HEIGHT * genreLabels.length;

    this._chart = new Chart(statisticWrapper, this._getChart());

    this._chart.data = {
      labels: genreLabels,
      datasets: [{
        data: genreAmounts,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    };

    this._chart.update();
  }

  _getChart() {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    };
  }

  _getTopGenresTemplate() {
    const [genreLabels, genreAmounts] = this._filterByGenre();
    const max = Math.max(...genreAmounts);
    const maxID = genreAmounts.indexOf(max);

    return `${genreLabels[maxID] ? genreLabels[maxID] : `-`}`;
  }

  _getFilmsDurationTemplate() {
    const totalDuration = this._watchedFilms.reduce((duration, film) => duration + film.duration, 0);
    return `${moment.duration(totalDuration).hours()} <span class="statistic__item-description">h</span> ${moment.duration(totalDuration).minutes()} <span class="statistic__item-description">m</span>`;
  }

  _getWatchedFilmsTemplate() {
    return `${this._watchedFilms.length} <span class="statistic__item-description">movie${this._watchedFilms.length === 1 ? `` : `s`}</span>`;
  }

  get template() {
    return `<div>
      <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text statistic__item-text--watched">${this._getWatchedFilmsTemplate()}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text statistic__item-text--duration">${this._getFilmsDurationTemplate()}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text statistic__item-text--genres">${this._getTopGenresTemplate()}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </div>`;
  }

  render() {
    this._element = createElement(this.template);
    this._generateCharts();
    return this._element;
  }

}
