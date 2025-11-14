// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ForecastComponent } from './forecast/forecast';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forecast', component: ForecastComponent }
];