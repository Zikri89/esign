import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { FormManagerData, FormManagerFormField } from './form-manager.types';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FormManagerService {
    private _data: ReplaySubject<FormManagerData> = new ReplaySubject<FormManagerData>(1);
    private _formFields: ReplaySubject<FormManagerFormField> = new ReplaySubject<FormManagerFormField>(1);

    // Inject HttpClient in the constructor
    constructor(private _httpClient: HttpClient) {}

    // Getter for data
    get data$(): Observable<FormManagerData> {
        return this._data.asObservable();
    }

    get formFields$(): Observable<FormManagerFormField> {
        return this._formFields.asObservable();
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

     // Get by id formManagerData data
    onGetById(formId: string): Observable<FormManagerFormField> {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });

        return this._httpClient
        .get<FormManagerFormField>(environment.apiUrl+'formManager/'+formId, {headers}).pipe(tap((data) => {
            this._formFields.next(data);
            })
        );
    }

    onPost(data: FormManagerData): Observable<FormManagerData> {
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        return this._httpClient.post<FormManagerData>(environment.apiUrl + 'formManager', data, { headers });
    }

    onPut(data: FormManagerData, id: string): Observable<FormManagerData> {
        data.id = id;
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        return this._httpClient.put<FormManagerData>(environment.apiUrl + 'formManager/' +id, data, { headers });
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
