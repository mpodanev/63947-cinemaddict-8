import Component from './component';
import moment from 'moment';

export default class FilmPopup extends Component {
  constructor({title, image, description, rating, year, duration, genre, comments, isAnimate, ratings, userRating}) {
    super();
    this._title = title;
    this._image = image;
    this._description = description;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._comments = comments;
    this._ratings = ratings;
    this._isAnimate = isAnimate;
    this._userRating = userRating;

    this._onClose = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);

    this._changeRating = null;
    this._onChangeRating = this._onChangeRating.bind(this);

    this._onAddComment = this._onAddComment.bind(this);
  }


  _onCloseButtonClick() {
    this._isAnimate = true;
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const newData = this._processForm(formData);

    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }

    this.update(newData);
  }

  _processForm() {
    const entry = {
      comments: this._comments,
      userRating: this._userRating,
    };

    return entry;
  }

  _onAddComment(evt) {
    if (evt.ctrlKey || evt.metaKey && evt.keyCode === 13) {
      evt.preventDefault();
      const newComment = {};
      const message = this._element.querySelector(`.film-details__comment-input`);
      newComment.text = message.value;
      newComment.author = `Some author`;
      newComment.emoji = this._element.querySelector(`.film-details__emoji-item:checked + label`).textContent;
      newComment.date = moment();

      this._comments.push(newComment);
      message.value = ``;
      this._element.querySelector(`.film-details__add-emoji`).checked = false;
      this._isAnimate = false;

      this.unbind();
      this._partialUpdate();
      this.bind();
    }
  }

  _getCommentsTemplate() {
    return this._comments.map((comment) => `<li class="film-details__comment">
          <span class="film-details__comment-emoji">${comment.emoji}</span>
          <div>
            <p class="film-details__comment-text">${comment.text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${moment(comment.date).fromNow()}</span>
            </p>
          </div>
        </li>`).join(``);
  }

  _getRatingTamplate() {
    return this._ratings.map((rating) => `<input
      type="radio"
      name="score"
      class="film-details__user-rating-input visually-hidden"
      value="${rating.number}"
      id="rating-${rating.number}"
      ${rating.isChecked ? `checked` : ``}>
    <label class="film-details__user-rating-label" for="rating-${rating.number}">${rating.number}</label>`).join(``);
  }

  _onChangeRating(evt) {
    if (evt.target.classList.contains(`film-details__user-rating-label`)) {
      const index = evt.target.innerText;
      this._userRating = index;
      this._ratings.forEach((rating) => {
        rating.isChecked = false;
      });
      this._ratings[index - 1].isChecked = true;

      this._isAnimate = false;

      this.unbind();
      this._partialUpdate();
      this.bind();
    }
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }


  set onClose(fn) {
    this._onClose = fn;
  }

  get template() {
    return `<section class="film-details ${this._isAnimate ? `film-details--animate` : ``}">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${this._image}" alt="incredables-2">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">Original: Невероятная семейка</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
              <p class="film-details__user-rating">${this._userRating ? `Your rate ${this._userRating}` : ``}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">Brad Bird</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">Brad Bird</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">Samuel L. Jackson, Catherine Keener, Sophia Bush</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${moment(this._year).format(`D MMM YYYY`)} (USA)</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${moment.duration(this._duration).asMinutes()} min</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${this._genre}</span>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${this._description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" checked>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>

      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${this._getCommentsTemplate()}
        </ul>

        <div class="film-details__new-comment">
          <div>
            <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
            <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
              <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
              <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
            </div>
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
          </label>
        </div>
      </section>

      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
          <button class="film-details__watched-reset" type="button">undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${this._image}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">Incredibles 2</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              ${this._getRatingTamplate()}
            </div>
          </section>
        </div>
      </section>
    </form>
  </section>
  `;
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__user-rating-score`).addEventListener(`click`, this._onChangeRating);
    this._element.querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._onAddComment);
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__user-rating-score`).removeEventListener(`click`, this._onChangeRating);
    this._element.querySelector(`.film-details__comment-input`).removeEventListener(`keydown`, this._onAddComment);
  }

  update({comments, userRating}) {
    this._comments = comments;
    this._userRating = userRating;
  }

}
