import { TextFieldModule } from '@angular/cdk/text-field'
import { CommonModule, NgClass } from '@angular/common'
import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
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
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatOptionModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { ActivatedRoute, Params, RouterLink } from '@angular/router'
import { FormDataService } from 'app/core/formdata/formdata.service'
import { FormData } from 'app/core/formdata/formdata.types'
import { FormManagerService } from 'app/modules/admin/master/form-manager/form-manager.service'
import { FormManagerData, FormManagerFormField } from 'app/modules/admin/master/form-manager/form-manager.types'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { EditorModule } from 'primeng/editor'
import SignaturePad from 'signature_pad'

@Component({
    selector: 'forms-wizards',
    templateUrl: './wizards.component.html',
    styleUrl: './wizards.component.css',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        CommonModule,
        MatCheckboxModule,
        MatRadioModule,
        RouterLink,
        ReactiveFormsModule,
        EditorModule
    ],
    providers: [DynamicDialogRef]
})
export class FormsWizardsComponent implements OnInit, AfterViewInit {
    formData: FormManagerFormField
    form: FormGroup
    formDatas: FormData;
    noRawat: string;

    signPad: any
    @ViewChild('signPadCanvas', { static: false }) signaturePadElement: any
    signImage: any

    formFieldHelpers: string[] = ['']
    fixedSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ])
    dynamicSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ])
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ])
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ])
    /**
     * Constructor
     */
    constructor(
        private _route: ActivatedRoute,
        private _formManagerService: FormManagerService,
        private _formDataService: FormDataService,
        private _activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        public ref: DynamicDialogRef,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._formManagerService.formFields$.subscribe({
            next: value => {
                this.formData = value
                this.createForm()
            },
            error: err => {
                console.log(err)
            },
        })

        this.ref.close();
    }

    ngAfterViewInit() {
        if (this.signaturePadElement) {
            this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
        }
    }


    startSignPadDrawing(event: Event) {
        console.log(event)
    }

    movedFinger(event: Event) {}

    undoSign() {
        const data = this.signPad.toData()
        if (data) {
            data.pop() // remove the last step
            this.signPad.fromData(data)
        }
    }

    clearSignPad() {
        this.signPad.clear()
    }

    createForm() {
        const formField = {};
        for (const field of this.formData.dynamicForm['formFields']) {
          const validators = [];

          if (field.required) {
            validators.push(Validators.required);
          }

          let initialValue: string | { [key: string]: boolean } | number = '';

            if (field.type === 'checkbox') {
                initialValue = {}; // For checkboxes, initialize as an empty object

                for (const option of field.options) {
                    initialValue[option] = false;
                }

            } else if (field.type === 'number') {
                initialValue = null; // For numbers, initialize as null or another appropriate value
            }

            if (field.type === 'select' || field.type === 'radio') {
                // For select and radio, you might want to provide options and default value
                const options = field.options || [];
                initialValue = options.length > 0 ? options[0] : null;
            }

          formField[field.name] = new FormControl(initialValue, validators);
        }
        console.log(formField);
        this.form = this.fb.group(formField);
      }

    getFormControl(name: string) {
        return this.form.get(name)
    }

    onSubmit() {
        if (this.form.valid) {
            const formData = this.form.value
            // aktfikan jika mau ada ttd digital di bagian form, jangan lupa aktifkan juga attribute model di backend nya
            // const base64ImageData = this.signPad.toDataURL()
            // this.signImage = base64ImageData
            formData.signature = this.signImage;
            this._activatedRoute.paramMap.subscribe(params => {
                this.noRawat = params.get('noRawat');
              });

            this.formDatas = {
                noRawat : this.noRawat,
                dataJson: formData,
            }

            this._formDataService.onPost(this.formDatas).subscribe({
                next: (res) => {
                    console.log(res);
                },
                error : (err) => {
                    console.log(err);
                }
            });
        } else {
            this.markFormGroupTouched(this.form)
        }
    }

    // Helper function to mark all controls in a form group as touched
    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched()

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control)
            }
        })
    }
}
