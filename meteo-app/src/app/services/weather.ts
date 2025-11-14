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

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.baseUrl}?city=${city}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}