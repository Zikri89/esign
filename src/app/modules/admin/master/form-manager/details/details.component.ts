import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { FormManagerComponent } from '../form-manager.component';
import { MatInputModule } from '@angular/material/input';
import { FormManagerService } from '../form-manager.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
    selector       : 'file-manager-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports: [
        MatButtonModule,
        RouterLink,
        MatIconModule,
        MatInputModule,
        NgIf,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        TextFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
})
export class FormManagerDetailsComponent implements OnInit, OnDestroy
{
    formFieldHelpers: string[] = [''];
    myForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formManagerComponent: FormManagerComponent,
        private _formManagerService: FormManagerService,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
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

        this.myForm = this.fb.group({
            name: ['', Validators.required],
            columnLength: ['', Validators.required],
            description: ['', Validators.required]
        });
        // Open the drawer
        this._formManagerComponent.matDrawer.open();
        // Mark for check
        this._changeDetectorRef.markForCheck();
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

    get formControls() {
        return this.myForm.controls;
    }

    onSubmit() {
        if (this.myForm.valid) {
            this._formManagerService.post(this.myForm.value).subscribe({
                next: (response) => {
                    this._snackBar.open('Data posted successfully', 'Close', {
                        duration: 3000,
                        verticalPosition: 'top' as MatSnackBarVerticalPosition,
                    });

                    this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                    this._changeDetectorRef.markForCheck();
                }, error: (error) => {

                    let errorMessage = 'Error posting data';

                    if (error && error.error && error.error.message) {
                        errorMessage = error.error.message;
                    }

                    this._snackBar.open(errorMessage, 'Close', {
                        duration: 3000,
                        verticalPosition: 'top' as MatSnackBarVerticalPosition,
                    });
                }
            })
        } else {
            this.myForm.markAllAsTouched();
        }
    }

    hasError(controlName: string, errorName: string) {
        return this.myForm.get(controlName).hasError(errorName);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._formManagerComponent.matDrawer.close();
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
