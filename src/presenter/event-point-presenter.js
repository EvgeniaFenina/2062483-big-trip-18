import EventPointView from '../view/event-point-view.js';
import EditFormView from '../view/edit-form-view.js';
import {isPressEscape} from '../utils/common.js';
import {Mode} from '../constants.js';
import {
  render,
  replace,
  remove
} from '../framework/render.js';

export default class EventPointPresenter {
  #tripListContainer = null;
  #changeData = null;
  #changeMode = null;

  #eventPointComponent = null;
  #editEventPointComponent = null;

  #eventPoint = null;
  #offers = null;
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor(tripListContainer, changeData, changeMode) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (eventPoint, destinations, offers) => {
    this.#eventPoint = eventPoint;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevEventPointComponent = this.#eventPointComponent;
    const prevEditEventPointComponent = this.#editEventPointComponent;

    this.#eventPointComponent = new EventPointView(this.#eventPoint, this.#destinations, this.#offers);
    this.#editEventPointComponent = new EditFormView(this.#eventPoint, this.#destinations, this.#offers);


    this.#eventPointComponent.setExpandButtonClickHandler(this.#onOpenFormEdit);
    this.#eventPointComponent.setFavoriteClickHandler(this.#onFavoriteClick);
    this.#editEventPointComponent.setCollapseButtonClickHandler(this.#onCloseFormEdit);
    this.#editEventPointComponent.setEditFormSubmitHandler(this.#onCloseFormEdit);

    if (prevEventPointComponent === null || prevEditEventPointComponent === null) {
      render(this.#eventPointComponent, this.#tripListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventPointComponent, prevEditEventPointComponent);
    }

    remove(prevEventPointComponent);
    remove(prevEditEventPointComponent);
  };

  destroy = () => {
    remove(this.#eventPointComponent);
    remove(this.#editEventPointComponent);
  };

  #replaceEventPointToEditForm = () => {
    replace(this.#editEventPointComponent, this.#eventPointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToEventPoint = () => {
    replace(this.#eventPointComponent, this.#editEventPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToEventPoint();
    }
  };

  #onEscKeyDown = (evt) => {
    if (isPressEscape(evt)) {
      evt.preventDefault();
      this.#replaceEditFormToEventPoint();
      this.#mode = Mode.DEFAULT;
    }
  };

  #onOpenFormEdit = () => this.#replaceEventPointToEditForm();

  #onCloseFormEdit = () => this.#replaceEditFormToEventPoint();

  #onFavoriteClick = () => this.#changeData({...this.#eventPoint, isFavorite: !this.#eventPoint.isFavorite});
}
