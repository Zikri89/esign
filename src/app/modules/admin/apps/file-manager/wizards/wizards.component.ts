import { TextFieldModule } from '@angular/cdk/text-field'
import { CommonModule, NgClass } from '@angular/common'
import {
    AfterViewChecked,
    AfterViewInit,
    Component,
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
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router'
import { FormDataService } from 'app/core/formdata/formdata.service'
import { FormData } from 'app/core/formdata/formdata.types'
import { FormManagerService } from 'app/modules/admin/master/form-manager/form-manager.service'
import { FormManagerFormField } from 'app/modules/admin/master/form-manager/form-manager.types'
import { RegPeriksaService } from 'app/modules/admin/pasien/regperiksa/regperiksa.service'
import { RegPeriksa } from 'app/modules/admin/pasien/regperiksa/regperiksa.type'
import { MessageService } from 'primeng/api'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { EditorModule } from 'primeng/editor'
import { ToastModule } from 'primeng/toast';

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
        EditorModule,
        ToastModule
    ],
    providers: [DynamicDialogRef, MessageService]
})
export class FormsWizardsComponent implements OnInit, AfterViewInit {

    formData: FormManagerFormField
    form: FormGroup
    formDatas: FormData;
    noRawat: string;
    regPeriksa: RegPeriksa;

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
        public _regPeriksaService: RegPeriksaService,
        private messageService: MessageService,
        private _router: Router
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
                this.regPeriksa = this._activatedRoute.snapshot.data.formData['regData'];
                this.createForm()
            },
            error: err => {
                console.log(err)
            },
        })

        this.ref.close();
    }

    ngAfterViewInit(): void {
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
                initialValue = {};

                for (const option of field.options) {
                    initialValue[option] = false;
                }

            } else if (field.type === 'number') {
                initialValue = null;
            }

            if (field.type === 'select' || field.type === 'radio') {
                const options = field.options || [];
                initialValue = options.length > 0 ? options[0] : null;
            }

            // General Concent Formulir
            if(field.label == 'Nama'){
                initialValue = this.regPeriksa.rows[0].nm_pasien;
            }

            if(field.label == 'Tanggal Lahir'){
                initialValue = this.regPeriksa.rows[0].tgl_lahir;
            }

            if(field.label == 'Alamat'){
                initialValue = this.regPeriksa.rows[0].alam_pasien;
            }

            if(field.label == 'No. Telpon'){
                initialValue = this.regPeriksa.rows[0].tlp_pasien;
            }
            // end general concent

            formField[field.name] = new FormControl(initialValue, validators);
        }
        this.form = this.fb.group(formField);
      }

    getFormControl(name: string) {
        return this.form.get(name)
    }

    onSubmit() {
        if (this.form.valid) {
            const formData = this.form.value
            this._activatedRoute.paramMap.subscribe(params => {
                this.noRawat = params.get('noRawat');
              });

            this.formDatas = {
                noRawat : this.noRawat,
                dataJson: formData,
            }

            const noRawat = encodeURIComponent(this._activatedRoute.snapshot.paramMap.get('noRawat'));
            const noRkmMedis = encodeURIComponent(this._activatedRoute.snapshot.paramMap.get('noRkmMedis'));

            this._formDataService.onPost(this.formDatas).subscribe({
                next: (res) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Formulir ${this.formData.name} berhasil di buat` });
                    this._router.navigate([`apps/file-manager/formulir/${this.formData.id}/${noRawat}/${noRkmMedis}/formulir`])
                },
                error : (err) => {
                    if(err.error.error == 'Unique constraint violated.'){
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Pasien ' + this.regPeriksa.rows[0].nm_pasien + ' ' + noRawat + ' sudah membuat formulir ' + this.formData.name});
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
                    }
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
