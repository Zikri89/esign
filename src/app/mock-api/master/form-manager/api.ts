import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { dataTable as itemsData } from 'app/mock-api/master/form-manager/data';
import { FormManagerData } from 'app/modules/admin/master/form-manager/form-manager.types';
import { cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class FormManagerMockApi
{
    private _dataTable: FormManagerData = itemsData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        this._fuseMockApiService
            .onGet('api/master/form-manager/dataTable')
            .reply(() => {
                console.log('Mock API Response:', cloneDeep(this._dataTable));
                return [200, cloneDeep(this._dataTable)];
            });
    }
}
