import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherAnalysisComponent } from './weather-analysis/weather-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherAnalysisComponent,
    // canActivate: [SocketGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
