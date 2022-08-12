import {render} from '../render.js';
import TripListView from '../view/trip-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';


export default class TripListPresenter {
  tripListComponent = new TripListView();

  init = (tripListContainer) => {
    this.tripListContainer = tripListContainer;

    render(new EditFormView(), this.tripListContainer);
    render(this.tripListComponent, this.tripListContainer);

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.tripListComponent.getElement());
    }
  };
}
