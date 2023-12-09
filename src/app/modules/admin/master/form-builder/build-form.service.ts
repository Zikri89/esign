import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DynamicForm } from './build-form.type';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {
    private _data: ReplaySubject<DynamicForm> = new ReplaySubject<DynamicForm>(1);

    // Inject HttpClient in the constructor
    constructor(private _httpClient: HttpClient) {}

    // Getter for data
    get data$(): Observable<DynamicForm> {
        return this._data.asObservable();
    }

    onPost(data: DynamicForm): Observable<DynamicForm> {
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        return this._httpClient.post<DynamicForm>(environment.apiUrl + 'dynamicForm', data, { headers });
    }

    onGetById(params: any): Observable<DynamicForm> {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });

        return this._httpClient
        .get<DynamicForm>(environment.apiUrl+'dynamicForm/'+params['formulirId'], {headers}).pipe(tap((data) => {
            this._data.next(data);
            })
        );
    }

}
