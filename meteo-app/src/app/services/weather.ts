// services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.weatherbitKey;
  private baseUrl = environment.weatherbitUrl;
  private forecastUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.baseUrl}?city=${city}&key=${this.apiKey}`;
    return this.http.get(url);
  }
  get16DayForecast(city: string): Observable<any> {
    const url = `${this.forecastUrl}?city=${city}&key=${this.apiKey}&days=16&lang=it`;
    return this.http.get(url);
  }
}