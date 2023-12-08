import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item} from 'app/modules/admin/apps/file-manager/file-manager.types';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { FormDataFormulir } from './details/details.types';
import { SharedDataService } from 'app/services/shared-date-service';
import { environment } from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class FileManagerService
{
    // Private
    private _item: BehaviorSubject<Item | null> = new BehaviorSubject(null);
    private _items: BehaviorSubject<Item[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private _sharedDataService: SharedDataService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for items
     */
    get items$(): Observable<Item[]>
    {
        return this._items.asObservable();
    }

    /**
     * Getter for item
     */
    get item$(): Observable<Item>
    {
        return this._item.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get items
     */
    getItems(): Observable<Item[]>
    {
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
        });


        return this._httpClient
        .get<Item[]>(environment.apiUrl+'formManager', {headers}).pipe(tap((data: any) => {
            this._items.next(data);
            })
        );
    }

    /**
     * Get item by id
     */
    getItemById(id: string): Observable<Item>
    {
        return this._items.pipe(
            take(1),
            map((items) =>
            {
                // Find within the folders and files
                const item = [...items].find(value => value.id === id) || null;

                // Update the item
                this._item.next(item);

                // Return the item
                return item;
            }),
            switchMap((item) =>
            {
                if ( !item )
                {
                    return throwError('Could not found the item with id of ' + id + '!');
                }

                return of(item);
            }),
        );
    }

    esignIn(esignData: FormDataFormulir): Observable<any> {
        return this.getItemById(esignData.formulirId).pipe(
            switchMap((item) => {
                const mergedItem = { 'pasienId': esignData.pasienId, ...item };
                this._sharedDataService.setEsignData(mergedItem);
                return of(mergedItem);
            })
        );
    }
}
