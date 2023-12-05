import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { FormManagerData } from './form-manager.types';
import { environment } from '../../../../../environments/environment';

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
    onGet(): Observable<FormManagerData> {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });

        return this._httpClient
        .get<FormManagerData>(environment.apiUrl+'formManager', {headers}).pipe(tap((data) => {
            this._data.next(data);
            })
        );
    }

    onPost(data: FormManagerData): Observable<FormManagerData> {
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        return this._httpClient.post<FormManagerData>(environment.apiUrl + 'formManager', data, { headers });
    }

    onPatch(id: string): Observable<any> {
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        const payload = { status: 'trash' };

        return this._httpClient.patch(environment.apiUrl+'formManager/'+id, payload, { headers });
    }

    onDeleted(id: string): Observable<any> {
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        return this._httpClient.delete(environment.apiUrl+'formManager/'+id, { headers });
    }



}
