// forecast/forecast.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../services/weather';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast.html',
  styleUrls: ['./forecast.css']
})
export class ForecastComponent implements OnInit {
  city = '';
  forecastData: any = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.city = params['city'];
      if (this.city) {
        this.loadForecast();
      }
    });
  }

  loadForecast() {
    this.loading = true;
    this.error = '';
    
    this.weatherService.get16DayForecast(this.city).subscribe({
      next: (response) => {
        this.forecastData = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Errore nel recupero delle previsioni';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  convertToCelsius(fahrenheit: number): number {
    return Math.round((fahrenheit - 32) * 5/9);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}