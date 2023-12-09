import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { FormManagerService } from 'app/modules/admin/master/form-manager/form-manager.service';
import { FormManagerData } from 'app/modules/admin/master/form-manager/form-manager.types';

@Component({
    selector     : 'forms-wizards',
    templateUrl  : './wizards.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [
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
        RouterLink

    ]
})
export class FormsWizardsComponent implements OnInit
{
    @Input() formData: any[];
    form: FormGroup;

    formFieldHelpers: string[] = [''];
    fixedSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
    /**
     * Constructor
     */
    constructor(
        private _route: ActivatedRoute,
        private _formManagerService : FormManagerService,
        private fb: FormBuilder
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
        this.formData = [
            {
              "createdAt": 1702046686664,
              "updatedAt": 1702046686664,
              "id": "65733c93b8389a274c222563",
              "formName": "Rekam Medis Rawat Jalan",
              "description": "memiliki fungsi untuk merekam terjadinya transaksi pelayanan yang dilakukan di unit rawat jalan. Formulir ini mencakup : Identitas pasien Anamnesa/pemeriksaan fisik Diagnosa Terapi yang diberikan Nama dan tanda tangan dokter Rekam asuhan keperawatan Formulir hasil-hasil penunjang medik Copy resep",
              "formFields": [
                {
                  "type": "textarea",
                  "label": "Alamat"
                },
                {
                  "type": "text",
                  "label": "Nama"
                },
                {
                  "type": "date",
                  "label": "Tanggal Lahir"
                },
                {
                  "type": "select",
                  "label": "Pasien",
                  "options": [
                    "Baru",
                    "Lama"
                  ]
                },
                {
                  "type": "checkbox",
                  "label": "Rawatan",
                  "options": [
                    "Rawat 1",
                    "Rawat2"
                  ]
                },
                {
                    "type": "radio",
                    "label": "Jenis Kelamin",
                    "options": [
                      "L",
                      "P"
                    ]
                },
                {
                    "type": "radio",
                    "label": "Status",
                    "options": [
                      "Suami",
                      "Istri",
                      "Anak",
                    ]
                },
                {
                    "type": "email",
                    "label": "Email",
                }
              ]
            }
          ];

        this.form = this.createForm();

        this._route.params.subscribe((params: Params) => {
            const formId = params['formulirId'];

            // this._formManagerService.onGetById(formId).subscribe({
            //     next: (value) => {
            //         this.esignData = value;
            //     }, error: (err) => {
            //         console.log(err);
            //     }
            // });
        })
    }

    createForm() {
        const formGroup = {};
        this.formData[0].formFields.forEach((field) => {
          if (field.type === 'checkbox') {
            field.options.forEach((option) => {
              formGroup[`${field.label}_${option}`] = this.fb.control(false);
            });
          } else {
            formGroup[field.label] = this.fb.control('');
          }
        });
        return this.fb.group(formGroup);
      }

      getFormControl(fieldName: string) {
        return this.form.get(fieldName);
      }

    onSubmit() {
        console.log(this.form.value);
    }
}
