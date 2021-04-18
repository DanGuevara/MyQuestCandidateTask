import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICurrentWeatherResponse} from './models/current-weather-response.interface';
import {Injectable} from '@angular/core';

const BASE_URL: string = 'http://api.weatherapi.com/v1/';
const API_KEY: string = 'f4adfec58394496ea1684801210404';

@Injectable()
export class WeatherApiService {

  constructor(private httpClient: HttpClient) {
  }

  public getCurrentWeatherByCity(cityName: string): Observable<ICurrentWeatherResponse> {
    return this.httpClient.get<ICurrentWeatherResponse>(`${BASE_URL}current.json?key=${API_KEY}&q=${cityName}&aqi=no`);
  }
}
