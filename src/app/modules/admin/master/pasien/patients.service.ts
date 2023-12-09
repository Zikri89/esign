import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Patient } from './patients.types';

@Injectable({ providedIn: 'root' })
export class PatientService {
    private _data: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);


    // Inject HttpClient in the constructor
    constructor(private _httpClient: HttpClient) {}

    // Getter for data
    get data$(): Observable<Patient[]> {
        return this._data.asObservable();
    }

    // Get all Patient data
    onGet(): Observable<Patient[]> {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });

        return this._httpClient
        .get<Patient[]>(environment.apiUrl+'pasien', {headers}).pipe(tap((data) => {
            this._data.next(data);
            })
        );
    }

     // Get by id Patient data
    onGetById(formId: string): Observable<Patient> {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });

        return this._httpClient
        .get<Patient>(environment.apiUrl+'pasien/'+formId, {headers}).pipe(tap((data) => {
            this._data.next([data]);
            })
        );
    }

    onPost(data: Patient): Observable<Patient> {
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        return this._httpClient.post<Patient>(environment.apiUrl + 'pasien', data, { headers });
    }

    onPut(data: Patient, id: string): Observable<Patient> {
        data.id = id;
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        return this._httpClient.put<Patient>(environment.apiUrl + 'pasien/' +id, data, { headers });
    }

    onPatch(id: string): Observable<any> {
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        const payload = { status: 'trash' };

        return this._httpClient.patch(environment.apiUrl+'pasien/'+id, payload, { headers });
    }

    onDeleted(id: string): Observable<any> {
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        return this._httpClient.delete(environment.apiUrl+'pasien/'+id, { headers });
    }



}
