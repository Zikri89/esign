import { TextFieldModule } from '@angular/cdk/text-field'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core'
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatDrawerToggleResult } from '@angular/material/sidenav'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { MatInputModule } from '@angular/material/input'
import {
    MatSnackBar,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { FormBuilderComponent } from '../build-form.component'
import { FormBuilderService } from '../build-form.service'
import {
    DynamicForm,
    DynamicFormField,
    DynamicFormFieldValidation,
} from '../build-form.type'

@Component({
    selector: 'form-manager-details',
    templateUrl: './add-field.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
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
        CommonModule,
    ],
})
export class AddFieldComponent implements OnInit, OnDestroy {
    formFields: any[] = []
    form: FormGroup
    private _unsubscribeAll: Subject<any> = new Subject<any>()
    typeOptions: string[] = [
        'text',
        'select',
        'number',
        'email',
        'date',
        'textarea',
        'file',
        'radio',
        'checkbox',
    ]
    validationOptions: string[] = [
        'required',
        'email',
        'number',
        'minLength',
        'maxLength',
        'pattern',
    ]
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilderComponent: FormBuilderComponent,
        private _formBuilderService: FormBuilderService,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.initializeForm()

        // Subscribe to changes in the newFieldType control
        this.form
            .get('newFieldType')
            .valueChanges.pipe(
                takeUntil(this._unsubscribeAll) // Unsubscribe when the component is destroyed
            )
            .subscribe((newFieldType: string) => {
                // Show or hide option controls based on the selected field type
                this.toggleOptionControls(newFieldType)
            })

        // Open the drawer
        this._formBuilderComponent.matDrawer.open()
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }

    toggleOptionControls(newFieldType: string): void {
        const showOptionControls = ['select', 'radio', 'checkbox'].includes(
            newFieldType
        )

        if (showOptionControls) {
            this.newFieldOptions.enable() // Enable the option controls
        } else {
            this.newFieldOptions.disable() // Disable the option controls
        }
    }

    shouldShowOptionField(): boolean {
        // Check whether the option field should be shown based on the selected field type
        const selectedFieldType = this.form.get('newFieldType').value
        return ['select', 'radio', 'checkbox'].includes(selectedFieldType)
    }

    initializeForm() {
        this.form = this.fb.group({
            // Initialize your form controls as needed
            newFieldLabel: ['', Validators.required],
            newFieldType: ['text', Validators.required],
            newFieldValidation: [''],
            newOptionField: [''],
            newFieldOptions: this.fb.control('')
        })
    }

    get newFieldOptions() {
        return this.form.get('newFieldOptions') as FormControl
    }

    addField() {
        if (this.form.invalid) {
            // Mark the form as touched to display validation errors
            this.form.markAllAsTouched()
            return
        }

        const label = this.form.get('newFieldLabel').value
        const camelCaseName = this.generateNameFromLabel(label)

        const newField = {
            label: label,
            name: camelCaseName,
            type: this.form.get('newFieldType').value,
            validation: this.form.get('newFieldValidation').value,
            options: [],
        }

        // Create FormControl for each option
        if (
            newField.type === 'checkbox' ||
            newField.type === 'radio' ||
            newField.type === 'select'
        ) {
            newField.options = this.form
                .get('newOptionField')
                .value.split(',')
                .map(option => option.trim())
        }

        this.formFields.push(newField)
        this.form.addControl(newField.name, this.fb.control('', []))

        // Clear the form controls for the next input
        this.form.get('newFieldLabel').setValue('')
        this.form.get('newFieldType').setValue('text')
        this.form.get('newFieldValidation').setValue('')

        // Convert the form data to JSON and send it
        const formData = {
            formFields: this.formFields,
        }

        // Replace this with your actual logic to send the data (e.g., HTTP request)
        console.log('Form Data:', JSON.stringify(formData))
    }

    generateNameFromLabel(label: string): string {
        const sanitizedLabel = label.replace(/[^\w\s]/gi, '') // Remove non-word characters
        const camelCaseName = sanitizedLabel
            .split(' ')
            .map((word, index) =>
                index === 0
                    ? word.toLowerCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join('')

        return camelCaseName
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._formBuilderComponent.matDrawer.close()
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
