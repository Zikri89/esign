export interface DynamicForm {
    formManager: string;
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
