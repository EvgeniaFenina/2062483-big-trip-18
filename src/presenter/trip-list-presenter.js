import {render} from '../render.js';
import TripListView from '../view/trip-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import EventPointView from '../view/event-point-view.js';


export default class TripListPresenter {
  tripListComponent = new TripListView();

  init = (tripListContainer, eventPointsModel) => {
    this.tripListContainer = tripListContainer;
    this.eventPointsModel = eventPointsModel;
    this.eventPointsList = [...this.eventPointsModel.getEventPoints()];

    render(new EditFormView(this.eventPointsList[0]), this.tripListComponent.getElement());
    render(this.tripListComponent, this.tripListContainer);

    for (let i = 0; i < this.eventPointsList.length; i++) {
      render(new EventPointView(this.eventPointsList[i]), this.tripListComponent.getElement());
    }
  };
}
