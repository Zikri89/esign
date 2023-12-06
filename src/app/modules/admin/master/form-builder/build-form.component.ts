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
        MatRadioModule
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
        this.formFields.push({ type: 'text', label: 'Label Text' });
    }

    addEmail() {
        this.formFields.push({ type: 'email', label: 'Label Email' });
    }

    addCheckbox() {
        // Modifikasi untuk menentukan label dan opsi
        const label = prompt('Enter Checkbox Label:');
        const option = prompt('Enter Checkbox Option (comma-separated):');
        this.formFields.push({ type: 'checkbox', label: label || 'Label Checkbox', options: [option || 'Option 1'] });
    }

    addRadio() {
        const label = prompt('Enter Radio Label:');
        const option = prompt('Enter Radio Option (comma-separated):');
        this.formFields.push({ type: 'radio', label: label || 'Label Radio', options: [option || 'Option 1'] });
    }

    addSelect() {
        const label = prompt('Enter Select Label:');
        const options = prompt('Enter Select Options (comma-separated):');
        const optionsArray = options ? options.split(',').map(opt => opt.trim()) : ['Option 1'];
        this.formFields.push({ type: 'select', label: label || 'Label Select', options: optionsArray });
      }

      addTextarea() {
        this.formFields.push({ type: 'textarea', label: 'Label Textarea' });
      }
}
