export interface DynamicForm {
    formFields?: DynamicFormField[];
    formulir?: any;
}

export interface DynamicFormField {
    type: string;
    label: string;
    name: string;
    options?: string[];
    value?: string;
    validate?: DynamicFormFieldValidation;
}

export interface DynamicFormFieldValidation {
    required?: boolean;
    email?: boolean;
    number?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    validationMessage?: string;
}
