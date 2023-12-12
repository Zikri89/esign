import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Pasien } from './pasien.types';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PasienService {
    private _data: ReplaySubject<Pasien[]> = new ReplaySubject<Pasien[]>(1);

    // Inject HttpClient in the constructor
    constructor(private _httpClient: HttpClient) {}

    // Getter for data
    get data$(): Observable<Pasien[]> {
        return this._data.asObservable();
    }

    // Get all Pasien data
    onGet(): Observable<Pasien[]> {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });

        return this._httpClient
        .get<Pasien[]>(environment.apiUrl+'regPeriksa/patientList', {headers}).pipe(tap((data) => {
            this._data.next(data);
            })
        );
    }

}
