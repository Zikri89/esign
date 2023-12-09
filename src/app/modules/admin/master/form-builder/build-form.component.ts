import { CdkScrollable } from '@angular/cdk/scrolling';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilderService } from './build-form.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DynamicForm, DynamicFormField } from './build-form.type';
import { FormManagerService } from '../form-manager/form-manager.service';
import { FormManagerData } from '../form-manager/form-manager.types';

@Component({
    selector       : 'build-form',
    templateUrl    : './build-form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone     : true,
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
        MatDatepickerModule
    ],
})
export class FormBuilderComponent implements OnInit
{
    formFields: DynamicFormField[] = [];
    form: FormGroup;
    items: DynamicForm;
    dynamicFormId: string;
    formId: string;
    formManagerData: FormManagerData;

    constructor(
        private fb: FormBuilder,
        private formBuilderService : FormBuilderService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formManagerService: FormManagerService,
    ) {
        this.form = this.fb.group({});
    }


    ngOnInit() {
        this.formFields.forEach(field => {
            if (field.type !== 'select') {
            this.form.addControl(field.label, this.fb.control(''));
            } else {
            this.form.addControl(field.label, this.fb.control(field.options[0]));
            }
        });
    }

    onSubmit() {
        const angularFormValue = this.form.value;
        const finalFormData = this.formFields.map(field => ({ ...angularFormValue[field.label], ...field }));

        this.items = {
            formFields : finalFormData
        }

        this._activatedRoute.paramMap.subscribe(params => {
            this.formId = params.get('id');
          });

        this.formBuilderService.onPost(this.items).subscribe({
            next: (response) => {
                this.addDynamicFormToFormManager(response);
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
    }

    addDynamicFormToFormManager(response) {
        this.dynamicFormId = response['result']['id'];
        this.formManagerData = {
            dynamicForm : this.dynamicFormId,
        };

        this._formManagerService.onPut(this.formManagerData, this.formId).subscribe({
            next:(value) => {
                console.log(value);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    addTextField() {
        const label = prompt('Enter Label Text:');
        if (label !== null) {
            this.formFields.push({ type: 'text', label: label });
        }
    }

    addEmail() {
        const label = prompt('Enter Label Email:');
        if (label !== null) {
            this.formFields.push({ type: 'email', label: label });
        }
    }

    addCheckbox() {
        const label = prompt('Enter Checkbox Label:');
        const optionsString = prompt('Enter Checkbox Options (comma-separated):');
        if (label !== null && optionsString != null) {
            const options = optionsString ? optionsString.split(',').map(opt => opt.trim()) : ['Option 1'];
            this.formFields.push({ type: 'checkbox', label: label || 'Label Checkbox', options: options });
        }
    }

    addRadio() {
        const label = prompt('Enter Radio Label:');
        const optionsString = prompt('Enter Radio Options (comma-separated):');
        if (label !== null && optionsString != null) {
            const options = optionsString ? optionsString.split(',').map(opt => opt.trim()) : ['Option 1'];
            this.formFields.push({ type: 'radio', label: label || 'Label Radio', options: options });
        }
    }

    addSelect() {
        const label = prompt('Enter Select Label:');
        const options = prompt('Enter Select Options (comma-separated):');
        if (label !== null) {
            const optionsArray = options ? options.split(',').map(opt => opt.trim()) : ['Option 1'];
            this.formFields.push({ type: 'select', label: label || 'Label Select', options: optionsArray });
        }
    }

    addTextarea() {
        const label = prompt('Enter Label Text Area:');
        if (label !== null) {
            this.formFields.push({ type: 'textarea', label: label });
        }
    }

    addDate() {
        const label = prompt('Enter Date Label:');
        if (label !== null) {
            this.formFields.push({ type: 'date', label: label });
            this.form.addControl(label, this.fb.control(''));
        }
    }

    removeField(index: number) {
        this.formFields.splice(index, 1);
    }
}
