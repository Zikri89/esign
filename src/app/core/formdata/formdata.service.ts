import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { FormData } from './formdata.types';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class FormDataService
{
    private _httpClient = inject(HttpClient);
    private _formData: ReplaySubject<FormData> = new ReplaySubject<FormData>(1);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for FormData
     */
    get formData$(): Observable<FormData>
    {
        return this._formData.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all FormData data
     */
    onGet(): Observable<FormData>
    {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });


        return this._httpClient
        .get<FormData[]>(environment.apiUrl+'formData', {headers}).pipe(tap((data: any) => {
            this._formData.next(data);
            })
        );
    }

    onGetById(noRkmMedis: string): Observable<FormData>
    {
        return this._formData.pipe(
            take(1),
            map((formData) =>
            {
                // Find within the folders and files
                const item = [formData].find(value => value.noRkmMedis === noRkmMedis) || null;

                // Update the item
                this._formData.next(item);

                // Return the item
                return item;
            }),
            switchMap((item) =>
            {
                if ( !item )
                {
                    return throwError('Could not found the data with id of ' + noRkmMedis + '!');
                }

                return of(item);
            }),
        );
    }

    onPost(data: FormData): Observable<FormData> {
        const headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
        });

        return this._httpClient.post<FormData>(environment.apiUrl + 'formDataPasien', data, { headers });
    }
}
