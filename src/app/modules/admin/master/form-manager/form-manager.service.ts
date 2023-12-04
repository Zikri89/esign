import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { FormManagerData } from './form-manager.types';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class FormManagerService {
  private _data: ReplaySubject<FormManagerData> = new ReplaySubject<FormManagerData>(1);

  // Inject HttpClient in the constructor
  constructor(private _httpClient: HttpClient) {}

  // Getter for data
  get data$(): Observable<FormManagerData> {
    return this._data.asObservable();
  }

  // Get all formManagerData data
  get(): Observable<FormManagerData> {
    const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
    });

    return this._httpClient
      .get<FormManagerData>(environment.apiUrl+'formManager', {headers}).pipe(tap((data) => {
          this._data.next(data);
        })
      );
  }

  post(data: FormManagerData): Observable<FormManagerData> {
    const url = 'http://localhost:1337/api/v1/formManager';
    const apiKey = '71eec1b846172e2c6e8e7aadf536f8cf';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });

    return this._httpClient.post<FormManagerData>(url, data, { headers });
  }
}
