import { CdkScrollable } from '@angular/cdk/scrolling';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
export class FormBuilderComponent
{
    formFields: any[] = [];

    ngOnInit() {
    }

    addTextField() {
        this.formFields.push({ type: 'text', label: 'Label Text' });
    }

    addEmail() {
        this.formFields.push({ type: 'email', label: 'Label Email' });
    }

    addCheckbox() {
        this.formFields.push({ type: 'checkbox', label: 'Label Checkbox' });
    }

    addRadio() {
        this.formFields.push({ type: 'radio', label: 'Label Radio' });
    }

    addSelect() {
        this.formFields.push({ type: 'select', label: 'Label Select Option', options: ['Option 1', 'Option 2', 'Option 3'] });
    }

    addTextarea() {
        this.formFields.push({ type: 'textarea', label: 'Label Textarea' });
    }
}
