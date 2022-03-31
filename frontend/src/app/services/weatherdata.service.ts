import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Measurement } from '../schemas/schemas';

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {

  constructor(private http: HttpClient) { }

  getAllMeasurements(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(`${environment.backend}/measurements/`)
      .pipe(map(arr => arr.map(d => {
        // Hacks to get rid of potential time zone misalignments
        d.date = new Date(new Date(d.date).toDateString());
        d.avg_temp = d.temperature;
        return d;
      })));
  }
}
