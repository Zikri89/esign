export interface FormManagerData
{
    id?: string;
    name?: string;
    description?: string | null;
    isDeleted? : boolean | false,
    status?: string;
    dynamicForm?: string;
}

export interface FormManagerFormField
{
    id?: string;
    name?: string;
    description?: string | null;
    isDeleted? : boolean | false,
    status?: string;
    dynamicForm?: FormField;
}

export interface FormField
{
    formFields: Array<any>;
}
