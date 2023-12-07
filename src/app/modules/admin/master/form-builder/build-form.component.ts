import { CdkScrollable } from '@angular/cdk/scrolling';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    formFields: any[] = [];
    form: FormGroup;
    items: string;

    constructor(private fb: FormBuilder, private http: HttpClient) {
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
        const finalFormData = { ...angularFormValue, customFields: this.formFields };
        this.items = JSON.stringify(finalFormData);
        console.log(this.items);
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
