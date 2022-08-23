import {render} from '../render.js';
import TripListView from '../view/trip-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import EventPointView from '../view/event-point-view.js';

export default class TripListPresenter {
  tripListComponent = new TripListView();

  init = (tripListContainer, eventPointsModel, destinationModel, offerModel) => {
    this.tripListContainer = tripListContainer;
    this.eventPointsModel = eventPointsModel;
    this.destinationModel = destinationModel;
    this.offerModel = offerModel;
    this.eventPointsList = [...this.eventPointsModel.getEventPoints()];
    this.eventDestinations = [...this.destinationModel.getDestination()];
    this.eventOffersByType = [...this.offerModel.getOfferByType()];

    render(new EditFormView(this.eventPointsList[0], this.eventDestinations, this.eventOffersByType), this.tripListComponent.getElement());
    render(this.tripListComponent, this.tripListContainer);

    this.eventPointsList.forEach((_, i) => {
      render(new EventPointView(this.eventPointsList[i], this.eventDestinations, this.eventOffersByType), this.tripListComponent.getElement());
    });
  };
}
