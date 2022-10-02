import ApiService from '../framework/api-service.js';
import {Method} from '../constants.js';

export default class EventPointApiService extends ApiService {
  get eventPoints() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updateEventPoint = async (eventPoint) => {
    const response = await this._load({
      url: `points/${eventPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(eventPoint)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (eventPoint) => {
    const adaptedPoint = {
      ...eventPoint,
      'base_price': Number(eventPoint.basePrice),
      'date_from': new Date(eventPoint.dateFrom).toISOString(),
      'date_to': new Date(eventPoint.dateTo).toISOString(),
      'is_favorite': eventPoint.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  };
}
