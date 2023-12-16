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
    formulirId: string;

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

            if(field.label == 'Dokter Pelaksana Tindakan'){
                initialValue = this.regPeriksa.rows[0].nm_dokter
            }

            if(field.label == 'Nama Pasien Atau Wali'){
                initialValue = this.regPeriksa.rows[0].png_jawab
            }

            if(field.label == 'Nama Pasien'){
                initialValue = this.regPeriksa.rows[0].nm_pasien
            }

            if(field.label == 'Umur Pasien'){
                initialValue = this.regPeriksa.rows[0].umurdaftar
            }

            if(field.label == 'Alamat Pasien'){
                initialValue = this.regPeriksa.rows[0].alam_pasien
            }

            if(field.label == 'No. Rekam Medis') {
                initialValue = this.regPeriksa.rows[0].no_rkm_medis
            }

            if(field.label == 'Nama Dokter I'){
                initialValue = this.regPeriksa.rows[0].nm_dokter
            }

            if(field.label == 'Nama Dokter II'){
                initialValue = this.regPeriksa.rows[0].nm_dokter
            }


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
                this.formulirId = params.get('formulirId');
              });

            this.formDatas = {
                noRawat : this.noRawat,
                formulir : this.formulirId,
                dataJson: formData,
            }

            const noRawat = encodeURIComponent(this._activatedRoute.snapshot.paramMap.get('noRawat'));
            const noRkmMedis = encodeURIComponent(this._activatedRoute.snapshot.paramMap.get('noRkmMedis'));

            this._formDataService.onPost(this.formDatas).subscribe({
                next: (res) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Formulir ${this.formData.name} berhasil di buat` });
                    setTimeout(() => {
                        this._router.navigate([`apps/file-manager/formulir/${this.formData.id}/${noRawat}/${noRkmMedis}/formulir`])
                    }, 1000);
                },
                error : (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });
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
