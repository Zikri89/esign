import { CdkScrollable } from '@angular/cdk/scrolling'
import { TextFieldModule } from '@angular/cdk/text-field'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatOptionModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { FormBuilderService } from './build-form.service'
import {
    MatSnackBar,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import {
    DynamicForm,
    DynamicFormField,
    DynamicFormFieldValidation,
} from './build-form.type'
import { FormManagerService } from '../form-manager/form-manager.service'
import { FormManagerData } from '../form-manager/form-manager.types'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'

@Component({
    selector: 'build-form',
    templateUrl: './build-form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        RouterLink,
        MatButtonModule,
        CdkScrollable,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatSidenavModule,
        RouterOutlet,
        NgIf
    ],
})
export class FormBuilderComponent {
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    items: DynamicForm
    dynamicFormId: string
    formId: string
    formManagerData: FormManagerData

    constructor(
        private formBuilderService: FormBuilderService,
        private _snackBar: MatSnackBar,
        private _activatedRoute: ActivatedRoute,
        private _formManagerService: FormManagerService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private cdr: ChangeDetectorRef,
    ) {

    }

    addCustomField() {
        // Go back to the list
       this._router.navigate(['./add-field'], {relativeTo: this._activatedRoute});

       // Mark for check
       this._changeDetectorRef.markForCheck();
    }



    // removeField(index: number) {
    //     this.formFields.splice(index, 1)
    // }

    // onSubmit() {
    //     const angularFormValue = this.form.value
    //     const finalFormData = this.formFields.map(field => ({
    //         ...angularFormValue[field.label],
    //         ...field,
    //     }))

    //     this.items = {
    //         formFields: finalFormData,
    //     }

    //     this._activatedRoute.paramMap.subscribe(params => {
    //         this.formId = params.get('id')
    //     })

    //     this.formBuilderService.onPost(this.items).subscribe({
    //         next: response => {
    //             this.addDynamicFormToFormManager(response)
    //             this._snackBar.open('Data posted successfully', 'Close', {
    //                 duration: 3000,
    //                 verticalPosition: 'top' as MatSnackBarVerticalPosition,
    //             })

    //             // this._router.navigate(['../'], {relativeTo: this._activatedRoute});
    //             // this._changeDetectorRef.markForCheck();
    //         },
    //         error: error => {
    //             let errorMessage = 'Error posting data'

    //             if (error && error.error && error.error.message) {
    //                 errorMessage = error.error.message
    //             }

    //             this._snackBar.open(errorMessage, 'Close', {
    //                 duration: 3000,
    //                 verticalPosition: 'top' as MatSnackBarVerticalPosition,
    //             })
    //         },
    //     })
    // }

    addDynamicFormToFormManager(response) {
        this.dynamicFormId = response['result']['id']
        this.formManagerData = {
            dynamicForm: this.dynamicFormId,
        }

        this._formManagerService
            .onPut(this.formManagerData, this.formId)
            .subscribe({
                next: value => {
                    console.log(value)
                },
                error: err => {
                    console.log(err)
                },
            })
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
}
