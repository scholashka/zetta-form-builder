export type FieldType =
    | "text"
    | "textarea"
    | "dropdown"
    | "checkbox"
    | "radio"
    | "validatedInput";

export interface Field {
    id: string;
    type: FieldType;
    label: string;
    options?: string[]; // for dropdown / radio
    validations?: Record<string, any>;
}

export interface Group {
    id: string;
    label: string;
    fields: Field[];
    visibleWhen?: Record<string, string>; // for dynamic visibility
}

export interface FormSchema {
    title: string;
    groups: Group[];
}
