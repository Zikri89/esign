import { CdkScrollable } from '@angular/cdk/scrolling'
import { TextFieldModule } from '@angular/cdk/text-field'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewEncapsulation,
} from '@angular/core'
import {
    FormBuilder,
    FormControl,
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
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router'
import { MatDatepickerModule } from '@angular/material/datepicker'
import {
    MatSnackBar, MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import {
    DynamicForm, DynamicFormField,
} from './build-form.type'
import { FormManagerService } from '../form-manager/form-manager.service'
import { FormManagerData } from '../form-manager/form-manager.types'
import { MatSidenavModule } from '@angular/material/sidenav'
import { SharedDataService } from 'app/core/share/shared-date-service'
import { FuseDrawerComponent, FuseDrawerPosition } from '@fuse/components/drawer'
import { FormBuilderService } from './build-form.service'
import { EditorModule } from '@tinymce/tinymce-angular';
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
// aktifkan jika menggunakan ckeditor 5 berbayar
// import * as Editor from '../../../../../../ckeditor5-custom-build/build/ckeditor';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular'

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
        NgIf,
        FuseDrawerComponent,
        EditorModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class FormBuilderComponent implements OnInit, AfterViewInit {
    @Input()position: FuseDrawerPosition;
    drawerMode: string
    drawerOpened : boolean
    receivedFormData: any
    items: DynamicForm
    dynamicFormId: string
    formId: string
    formManagerData: FormManagerData
    form: FormGroup;
    formEditor: FormGroup;
    formFields: any[]
    showComponent: boolean | false;
    formData: DynamicFormField[] = [];

    typeOptions: string[] = [
        'text',
        'select',
        'number',
        'email',
        'date',
        'textarea',
        'file',
        'radio',
        'checkbox'
    ]
    validationOptions: string[] = [
        'required',
        'email',
        'number',
        'minLength',
        'maxLength',
        'pattern',
    ]


    constructor(
        private _snackBar: MatSnackBar,
        private _activatedRoute: ActivatedRoute,
        private _formManagerService: FormManagerService,
        private fb: FormBuilder,
        private _formBuilderService: FormBuilderService,
        private messageService: MessageService,
    ) {
        this.form = this.fb.group({});
    }

    ngOnInit(): void {
        this.initializeForm()
        this.formEditor = this.fb.group({
            editor: ['']
          });
        this.drawerMode = 'side';
        this.drawerOpened = false;
        this._formManagerService.formFields$.subscribe({
            next: (res) => {
                if(res.dynamicForm != null){
                    this.formFields = res.dynamicForm['formFields']
                    this.showComponent = true;
                }else {
                    this.formFields = []
                    this.showComponent = false;
                }
            },
            error: (err) => {
                console.log(err)
            }
        })

        this._formBuilderService.data$.subscribe({
            next: (res) => {
                this.items = res
                this.formEditor = this.fb.group({
                    editor: this.items.formulir
                  });
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    ngAfterViewInit(): void {
        // aktifkan jika menggunakan ckeditor5 berbayar
        // this.Editor.create('#editor', {
        //     plugins: [ ],
        //     // licenseKey: 'ZWt0UlIyQS9ZMjh5T1FpVTA5czlYWE8ra294dFE3bko5N1p2bjhKMzNncWhRY1B5ZGY2cFVGeG1PWmtGLU1qQXlOREF4TVRJPQ==',
        //     toolbar: [],
        // })
    }

    // public onReady(editor: any) {
    //     console.log("CKEditor5 Angular Component is ready to use!", editor);
    // }

    initializeForm() {
        this.form = this.fb.group({
            // Initialize your form controls as needed
            newFieldLabel: ['', Validators.required],
            newFieldType: ['text', Validators.required],
            newFieldValidation: [''],
            newOptionField: [''],
            editor: ['editor', Validators.required],
            newFieldOptions: this.fb.control(''),
        })
    }

    get newFieldOptions() {
        return this.form.get('newFieldOptions') as FormControl
    }

    toggleDrawerMode(): void
    {
        this.drawerMode = this.drawerMode === 'side' ? 'over' : 'side';
    }

    toggleDrawerOpen(): void
    {
        this.drawerOpened = !this.drawerOpened;
    }

    drawerOpenedChanged(opened: boolean): void
    {
        this.drawerOpened = opened;
    }

    shouldShowOptionField(): boolean {
        // Check whether the option field should be shown based on the selected field type
        const selectedFieldType = this.form.get('newFieldType').value
        return ['select', 'radio', 'checkbox'].includes(selectedFieldType)
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

        this.formData.push(newField)
        this.form.addControl(newField.name, this.fb.control('', []))

        // Clear the form controls for the next input
        this.form.get('newFieldLabel').setValue('')
        this.form.get('newFieldType').setValue('text')
        this.form.get('newFieldValidation').setValue('')

        // Convert the form data to JSON and send it
        this.formFields = this.formData
        this.drawerOpened = false;
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

    removeField(index: number) {
        this.formFields.splice(index, 1)
    }

    onSubmit() {
        const angularFormValue = this.form.value
        const finalFormData = this.formFields.map(field => ({
            ...angularFormValue[field.name],
            ...field,
        }))

        this.items = {
            formFields: finalFormData,
        }

        this._activatedRoute.paramMap.subscribe(params => {
            this.formId = params.get('id')
        })

        this._formBuilderService.onPost(this.items).subscribe({
            next: response => {
                this.addDynamicFormToFormManager(response)
                this._snackBar.open('Data posted successfully', 'Close', {
                    duration: 3000,
                    verticalPosition: 'top' as MatSnackBarVerticalPosition,
                })

                this.showComponent = true;

                // this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                // this._changeDetectorRef.markForCheck();
            },
            error: error => {
                let errorMessage = 'Error posting data'

                if (error && error.error && error.error.message) {
                    errorMessage = error.error.message
                }

                this._snackBar.open(errorMessage, 'Close', {
                    duration: 3000,
                    verticalPosition: 'top' as MatSnackBarVerticalPosition,
                })
            },
        })
    }

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

    onSubmitFormat() {
        const editorContent = this.formEditor.get('editor').value;
        this._activatedRoute.paramMap.subscribe(params => {
            this.formId = params.get('id')
        })

        this.items = {
            formulir : editorContent
        }

        this._formBuilderService.onPut(this.items, this.formId).subscribe({
            next: (res) => {
                // this.items.formulir
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Formulir berhasil di buat` });
                console.log(res);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error});
                console.log(err)
            }
        })
      }

}
