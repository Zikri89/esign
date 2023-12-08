export interface DynamicForm {
    formName: string;
    formFields: DynamicFormField[];
}

export interface DynamicFormField {
    type: string;
    label: string;
    options?: string[];
    validate?: DynamicFormFieldValidation;
}

export interface DynamicFormFieldValidation {
    required?: boolean;
    email?: boolean;
}
