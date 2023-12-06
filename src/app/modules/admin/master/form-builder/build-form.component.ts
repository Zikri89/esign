import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BuildForm } from './build-form.type';

@Component({
    selector       : 'build-form',
    templateUrl    : './build-form.component.html',
    standalone     : true,
    imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule],
})
export class FormBuilderComponent implements OnInit
{
    form: FormGroup;
    formFields: BuildForm[] = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({});
    }

    addField(field: BuildForm): void {
        const control = this.fb.control('', Validators.required);
        this.form.addControl(field.name, control);
        this.formFields.push(field);
    }

    removeField(index: number): void {
        const fieldName = this.formFields[index].name;
        this.form.removeControl(fieldName);
        this.formFields.splice(index, 1);
    }

    onSubmit(): void {
        if (this.form.valid) {
            console.log('Form submitted!', this.form.value);
        }
    }
}
