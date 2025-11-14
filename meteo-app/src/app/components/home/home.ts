// home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  city = '';
  weatherData: any = null;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    if (!this.city.trim()) return;

    this.loading = true;
    this.error = '';
    this.weatherData = null;

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (response) => {
        this.weatherData = response.data[0];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Errore nel recupero dei dati meteorologici';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }
}