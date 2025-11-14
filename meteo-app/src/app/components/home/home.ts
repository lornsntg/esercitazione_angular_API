// home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather';
import { Router } from '@angular/router';

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

  constructor(private weatherService: WeatherService,
              private router: Router
  ) {}

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

  viewForecast() {
    if (this.city.trim()) {
      this.router.navigate(['/forecast'], { 
        queryParams: { city: this.city } 
      });
    }
  }

  getWeatherIcon(): string {
    if (!this.weatherData) return 'fas fa-question-circle';

    const code = this.weatherData.weather.code;
    const isDay = this.weatherData.pod === 'd';

    // Mappatura dettagliata basata sui codici Weatherbit
    if (code >= 200 && code <= 233) return 'fas fa-bolt'; // Temporale
    if (code >= 300 && code <= 321) return 'fas fa-cloud-rain'; // Pioviggine
    if (code >= 500 && code <= 504) return 'fas fa-cloud-sun-rain'; // Pioggia leggera
    if (code >= 511 && code <= 511) return 'fas fa-cloud-hail'; // Pioggia gelata
    if (code >= 520 && code <= 531) return 'fas fa-cloud-showers-heavy'; // Pioggia intensa
    if (code >= 600 && code <= 622) return 'fas fa-snowflake'; // Neve
    if (code >= 623 && code <= 623) return 'fas fa-snowman'; // Neve tonda
    if (code >= 700 && code <= 751) return 'fas fa-smog'; // Foschia/Polvere
    if (code >= 800 && code <= 800) return isDay ? 'fas fa-sun' : 'fas fa-moon'; // Sereno
    if (code >= 801 && code <= 801) return isDay ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon'; // Poco nuvoloso
    if (code >= 802 && code <= 802) return 'fas fa-cloud'; // Nuvoloso
    if (code >= 803 && code <= 804) return 'fas fa-clouds'; // Molto nuvoloso
    if (code >= 900 && code <= 900) return 'fas fa-tornado'; // Tornado
    
    return 'fas fa-cloud';
  }

  getTemperatureColor(): string {
    if (!this.weatherData) return 'text-dark';
    
    const temp = this.weatherData.temp;
    if (temp < 0) return 'text-info'; // Blu per freddo estremo
    if (temp < 10) return 'text-primary'; // Blu per freddo
    if (temp < 20) return 'text-success'; // Verde per temperato
    if (temp < 30) return 'text-warning'; // Arancione per caldo
    return 'text-danger'; // Rosso per molto caldo
  }

  getWindDirectionIcon(): string {
    if (!this.weatherData) return 'fas fa-wind';
    
    const windDir = this.weatherData.wind_cdir;
    const directionMap: { [key: string]: string } = {
      'N': 'fas fa-long-arrow-alt-up',
      'NE': 'fas fa-long-arrow-alt-up',
      'E': 'fas fa-long-arrow-alt-right',
      'SE': 'fas fa-long-arrow-alt-down',
      'S': 'fas fa-long-arrow-alt-down',
      'SW': 'fas fa-long-arrow-alt-down',
      'W': 'fas fa-long-arrow-alt-left',
      'NW': 'fas fa-long-arrow-alt-up'
    };
    
    return directionMap[windDir] || 'fas fa-wind';
  }

  getUVIndexLevel(): { class: string, text: string } {
    if (!this.weatherData) return { class: 'text-secondary', text: 'N/A' };
    
    const uv = this.weatherData.uv;
    if (uv <= 2) return { class: 'text-success', text: 'Basso' };
    if (uv <= 5) return { class: 'text-warning', text: 'Moderato' };
    if (uv <= 7) return { class: 'text-orange', text: 'Alto' };
    if (uv <= 10) return { class: 'text-danger', text: 'Molto Alto' };
    return { class: 'text-purple', text: 'Estremo' };
  }
}