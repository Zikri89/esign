import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { statistik as statistikData } from 'app/mock-api/dashboards/statistik/data';
import { cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class StatistikMockApi
{
    private _statistik: any = statistikData;

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
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/dashboards/statistik')
            .reply(() => [200, cloneDeep(this._statistik)]);
    }
}
