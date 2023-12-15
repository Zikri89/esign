import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { RegPeriksa } from './regperiksa.type';

@Injectable({ providedIn: 'root' })
export class RegPeriksaService {
    private _data: ReplaySubject<RegPeriksa> = new ReplaySubject<RegPeriksa>(1);

    // Inject HttpClient in the constructor
    constructor(private _httpClient: HttpClient) {}

    // Getter for data
    get data$(): Observable<RegPeriksa> {
        return this._data.asObservable();
    }

    onGetById(noRawat: string): Observable<RegPeriksa> {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });

        return this._httpClient
        .get<RegPeriksa>(environment.apiUrl+'regPeriksa/'+noRawat, {headers}).pipe(tap((data) => {
            this._data.next(data);
            })
        );
    }
}
