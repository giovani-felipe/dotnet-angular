import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environemnt } from 'src/environments/environment';
import { CountryRate } from 'src/model/country-rate';

const API_URL = environemnt.ApiUrl;

@Injectable({
  providedIn: 'root',
})
export class CountryRateService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<CountryRate[]> {
    return this.http.get<CountryRate[]>(`${API_URL}/CountryRate`);
  }
}
