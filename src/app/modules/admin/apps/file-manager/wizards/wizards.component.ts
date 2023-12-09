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
import { FormBuilderService } from 'app/modules/admin/master/form-builder/build-form.service';
import { DynamicForm } from 'app/modules/admin/master/form-builder/build-form.type';
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
    @Input() formData: DynamicForm;
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
        private _formBuilderService : FormBuilderService,
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
        this.form = this.createForm();
        this._route.params.subscribe((params: Params) => {
            const formulirId = params['formulirId'];
            this._formBuilderService.onGetById(formulirId).subscribe({
                next: (value) => {
                    this.formData = value;
                }, error: (err) => {
                    console.log(err);
                }
            });
        })
    }

    createForm() {
        const formGroup = {};

        this.formData[0].formFields.forEach((field) => {
          if (field.type === 'checkbox') {
            const checkboxesGroup = {};
            field.options.forEach((option) => {
              checkboxesGroup[option] = this.fb.control(false);
            });
            formGroup[field.label] = this.fb.group(checkboxesGroup, { validators: [this.checkboxValidator] });
          } else if (field.type === 'radio') {
            formGroup[field.label] = this.fb.control('', { validators: [Validators.required] });
          } else {
            const validators = field.validators || [];
            formGroup[field.label] = this.fb.control('', { validators: validators });
          }
        });

        return this.fb.group(formGroup);
      }

      checkboxValidator(group: FormGroup) {
        const controls = Object.values(group.controls);

        const isValid = controls.some(control => control.value === true);

        return isValid ? null : { atLeastOne: true };
      }

    getFormControl(fieldName: string) {
        return this.form.get(fieldName);
    }

    onSubmit() {
      if (this.form.valid) {
        const formData = this.form.value;
        console.log(formData);
      } else {
        this.markFormGroupTouched(this.form);
      }
    }

    // Helper function to mark all controls in a form group as touched
    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }
}
