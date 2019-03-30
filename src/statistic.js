import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import createElement from './create-element';
import moment from 'moment';

// Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
const chart = (statisticCtx, films) => {
  const getFilmsStatistic = () => {
    let filteredFilms = {};

    films.forEach((film) => {
      filteredFilms[film.genre] = filteredFilms[film.genre] ? filteredFilms[film.genre] + 1 : 1;
    });

    const genres = Object.keys(filteredFilms);
    const genresCount = Object.values(filteredFilms);

    return [genres, genresCount];
  };

  getFilmsStatistic();

  const [genres, genresCount] = getFilmsStatistic();

  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * genres.length;
  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [
        {
          data: genresCount,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40
        }
      },
      scales: {
        yAxes: [
          {
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
          }
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });

  myChart();
};

const statisticTemplate = (films) => {
  const initialValue = 0;
  let sumDuration = films.reduce((accumulator, currentValue) => accumulator + currentValue.duration, initialValue);
  return `<section class="statistic visually-hidden">
  <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters visually-hidden">
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
      <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${moment.duration(sumDuration).hours()} <span class="statistic__item-description">h</span> ${moment.duration(sumDuration).minutes()} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">Sci-Fi</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};

const statisticElement = (template) => {
  return createElement(template);
};

export {chart, statisticTemplate, statisticElement};
