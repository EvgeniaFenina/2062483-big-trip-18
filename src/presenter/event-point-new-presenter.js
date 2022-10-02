import {remove, render, RenderPosition} from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import {isEscapeKey} from '../utils/common.js';
import {
  UserAction,
  UpdateType,
  EMPTY_POINT
} from '../constants.js';

export default class EventPointNewPresenter {
  #tripListContainer = null;
  #changeData = null;
  #editEventPointComponent = null;
  #destroyCallback = null;
  #destinationModel = null;
  #offerModel = null;

  constructor(tripListContainer, changeData, destinationModel, offerModel) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    const destinations = this.#destinationModel.destinations;
    const offersByType = this.#offerModel.offersByType;

    if (this.#editEventPointComponent !== null) {
      return;
    }

    this.#editEventPointComponent = new EditFormView(EMPTY_POINT, destinations, offersByType);
    this.#editEventPointComponent.setEditFormSubmitHandler(this.#handleFormSubmit);
    this.#editEventPointComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#editEventPointComponent.setCollapseButtonClickHandler(this.#collapseButtonClickHandler);

    render(this.#editEventPointComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editEventPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editEventPointComponent);
    this.#editEventPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#editEventPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#editEventPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editEventPointComponent.shake(resetFormState);
  };

  #handleFormSubmit = (eventPoint) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,

      eventPoint,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #collapseButtonClickHandler = () => {
    this.destroy();
  };
}
