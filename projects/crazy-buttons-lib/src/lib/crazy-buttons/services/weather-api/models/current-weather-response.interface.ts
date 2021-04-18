import {ILocation} from './location.interface';
import {ICurrentWeather} from './current-weather.interface';

export interface ICurrentWeatherResponse {
  location: ILocation;
  current: ICurrentWeather;
}
