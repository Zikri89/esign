import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormManagerData } from './form-manager.types';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormManagerService } from './form-manager.service';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector       : 'form-manager',
    templateUrl    : './form-manager.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        MatSidenavModule,
        RouterOutlet,
        NgIf,
        RouterLink,
        NgFor,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatCardModule,
        MatSortModule,
    ],
})
export class FormManagerComponent implements OnInit, OnDestroy
{
    formManagerDataSource: any;
    formManagerTableColumns: string[] = ['id', 'name', 'columnLength', 'description', 'status'];
    items: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _formManagerService: FormManagerService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        const url = 'http://localhost:1337/api/v1/formManager';
        const apiKey = '71eec1b846172e2c6e8e7aadf536f8cf';
        const headers = new HttpHeaders({
            'apikey': apiKey,
        });

        this._formManagerService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {
                // Store the data
                this.items = data;

                // Store the table data
                this.formManagerDataSource = this.items;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {

    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
