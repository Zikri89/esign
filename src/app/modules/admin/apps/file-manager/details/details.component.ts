import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileManagerService } from 'app/modules/admin/apps/file-manager/file-manager.service';
import { Item } from 'app/modules/admin/apps/file-manager/file-manager.types';
import { FileManagerListComponent } from 'app/modules/admin/apps/file-manager/list/list.component';
import { FuseAlertType } from '@fuse/components/alert';
import { Subject, takeUntil } from 'rxjs';
import { FormDataFormulir } from 'app/modules/admin/apps/file-manager/details/details.types';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
    selector       : 'file-manager-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule, RouterLink, MatIconModule, NgIf, FormsModule, MatFormFieldModule, NgClass, TextFieldModule, ReactiveFormsModule, MatSelectModule],
})
export class FileManagerDetailsComponent implements OnInit, OnDestroy
{
    item: Item;
    selectedPasien: string;
    formFieldHelpers: string[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fileManagerListComponent: FileManagerListComponent,
        private _fileManagerService: FileManagerService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private snackBar: MatSnackBar
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
        // Open the drawer
        this._fileManagerListComponent.matDrawer.open();

        // Get the item
        this._fileManagerService.item$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((item: Item) =>
            {
                // Open the drawer in case it is closed
                this._fileManagerListComponent.matDrawer.open();

                // Get the item
                this.item = item;

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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._fileManagerListComponent.matDrawer.close();
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

    makeEsign(formData : FormDataFormulir): void
    {
        if (!this.selectedPasien) {
            const verticalPosition: MatSnackBarVerticalPosition = 'top';
            // Tampilkan alert danger menggunakan MatSnackBar
            this.snackBar.open('Pilih Nama Pasien terlebih dahulu.', 'OK', {
                duration: 3000,
                verticalPosition: verticalPosition,
            });

            return ;
        }
        // Sign in
        this._fileManagerService.esignIn(formData).subscribe({
            next: (res) => {
                // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || 'apps/file-manager/formulir/'+formData.formulirId;
                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);
            },
            error: (err) => {
                // Tampilkan alert danger menggunakan MatSnackBar
                this.snackBar.open(err, 'OK', {
                    duration: 3000,
                });
            }
        });
    }
}
