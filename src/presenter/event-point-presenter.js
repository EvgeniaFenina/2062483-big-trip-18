import EventPointView from '../view/event-point-view.js';
import EditFormView from '../view/edit-form-view.js';
import {isEscapeKey} from '../utils/common.js';
import {
  Mode,
  UserAction,
  UpdateType
} from '../constants.js';
import {
  render,
  replace,
  remove
} from '../framework/render.js';
import {
  isDatesEqual,
  isDurationEqual,
  isPriceEqual
} from '../utils/event-point.js';

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
    this.#editEventPointComponent.setEditFormSubmitHandler(this.#onFormEditSubmit);
    this.#editEventPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevEventPointComponent === null || prevEditEventPointComponent === null) {
      render(this.#eventPointComponent, this.#tripListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventPointComponent, prevEditEventPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventPointComponent);
    remove(prevEditEventPointComponent);
  };

  destroy = () => {
    remove(this.#eventPointComponent);
    remove(this.#editEventPointComponent);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editEventPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editEventPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editEventPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editEventPointComponent.shake(resetFormState);
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
      this.#editEventPointComponent.reset(this.#eventPoint, this.#destinations, this.#offers);
      this.#replaceEditFormToEventPoint();
    }
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#editEventPointComponent.reset(this.#eventPoint, this.#destinations, this.#offers);
      this.#replaceEditFormToEventPoint();
    }
  };

  #onOpenFormEdit = () => this.#replaceEventPointToEditForm();

  #onCloseFormEdit = () => {
    this.#editEventPointComponent.reset(this.#eventPoint, this.#destinations, this.#offers);
    this.#replaceEditFormToEventPoint();
  };

  #onFormEditSubmit = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#eventPoint, update) || !isDurationEqual(this.#eventPoint, update) || !isPriceEqual(this.#eventPoint, update);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
  };

  #handleDeleteClick = (eventPoint) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      eventPoint,
    );
  };

  #onFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#eventPoint, isFavorite: !this.#eventPoint.isFavorite}
    );
  };
}
