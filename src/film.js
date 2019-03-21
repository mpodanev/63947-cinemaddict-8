import Component from './component';
import moment from 'moment';

export default class Film extends Component {
  constructor({title, image, description, rating, year, duration, genre, comments}) {
    super();
    this._title = title;
    this._image = image;
    this._description = description;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._commentsCount = comments.length;

    this._onComment = null;

    this._onCommentButtonClick = this._onCommentButtonClick.bind(this);
  }

  _onCommentButtonClick() {
    if (typeof this._onComment === `function`) {
      this._onComment();
    }
  }

  set onComment(fn) {
    this._onComment = fn;
  }

  get template() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
      <span class="film-card__duration">${moment.duration(this._duration).hours()}h ${moment.duration(this._duration - moment.duration(this._duration).hours()).minutes()}m</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="${this._image}" alt="" class="film-card__poster">
    <p class="film-card__description">${this._description}</p>
    <button class="film-card__comments">${this._commentsCount} comments</button>

    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">
        <!--Add to watchlist--> WL</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">
        <!--Mark as watched-->WTCHD</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">
        <!--Mark as favorite-->FAV</button>
    </form>
    </article>`;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentButtonClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentButtonClick);
  }

  update({rating, comments}) {
    this._rating = rating;
    this._commentsCount = comments.length;
  }

}
