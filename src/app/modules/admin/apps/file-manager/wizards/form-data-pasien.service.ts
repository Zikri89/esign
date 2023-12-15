import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { FormDataPasien } from './formulir/formulir.type';

@Injectable({ providedIn: 'root' })
export class FormDataPasienService {
    private _data: ReplaySubject<FormDataPasien> = new ReplaySubject<FormDataPasien>();

    // Inject HttpClient in the constructor
    constructor(private _httpClient: HttpClient) {}

    // Getter for data
    get data$(): Observable<FormDataPasien> {
        return this._data.asObservable();
    }

    // Get by id Form Data pasien Pasien data
    onGetById(noRawat : string): Observable<FormDataPasien> {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });

        return this._httpClient
        .get<FormDataPasien>(environment.apiUrl+'formDataPasien/'+noRawat, {headers}).pipe(tap((data) => {
            this._data.next(data);
            })
        );
    }
}
