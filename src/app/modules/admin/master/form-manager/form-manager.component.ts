import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormManagerService } from './form-manager.service';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { MatChipsModule } from '@angular/material/chips';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
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
        TableModule,
        MatCardModule,
        MatSortModule,
        FuseDrawerComponent,
        MatChipsModule,
        CommonModule
    ],
    animations: [
        trigger('buttonAnimation', [
          state('normal', style({
            transform: 'scale(1)',
          })),
          state('hovered', style({
            transform: 'scale(1.1)',
          })),
          transition('normal <=> hovered', animate('200ms ease-in-out')),
        ]),
      ],
})

export class FormManagerComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    formManagerDataSource: any;
    formManagerTableColumns: string[] = ['name', 'description', 'action'];
    items: any;
    drawerOpened: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _formManagerService: FormManagerService,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseConfirmationService: FuseConfirmationService,
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
        this._formManagerService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {
                // Store the data
                this.items = data;
                this.items.forEach((data) => (data.createdAt = new Date(<Date>data.createdAt)));
                this.items.sort((a, b) => (b.createdAt.getTime() - a.createdAt.getTime()));
            });

        this._fuseMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((state) =>
            {
                // Calculate the drawer mode
                this.drawerMode = state.matches ? 'side' : 'over';

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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

    /**
     * On Create Form clicked
     */
   onCreateClicked(): void
   {
       // Go back to the list
       this._router.navigate(['./create-form'], {relativeTo: this._activatedRoute});

       // Mark for check
       this._changeDetectorRef.markForCheck();
   }

   /**
     * On backdrop clicked
     */
   onBackdropClicked(): void
   {
       // Go back to the list
       this._router.navigate(['./'], {relativeTo: this._activatedRoute});

       // Mark for check
       this._changeDetectorRef.markForCheck();
    }

    onDelete(el): void {
         // Go back to the list
       this._router.navigate(['./confirm'], {relativeTo: this._activatedRoute});
       // Mark for check
       this._changeDetectorRef.markForCheck();
        const confirm = this._fuseConfirmationService.open();
        confirm.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this._formManagerService.onDeleted(el.id).subscribe({
                    next: (res) => {
                        this._router.navigate(['./'], {relativeTo: this._activatedRoute});
                        this._changeDetectorRef.markForCheck();
                    },
                    error: (err) => {
                        console.log(err);
                    }
                })
            } else {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute});
                this._changeDetectorRef.markForCheck();
            }
        })
    }

    onEdit(el): void {
        this._router.navigate(['./edit-form/'+el.id], {relativeTo: this._activatedRoute});

       // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
