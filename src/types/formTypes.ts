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
    visibleWhen?: Record<string, string>;
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

export type FieldStringProps = {
    field: Field;
    value: string;
    onChange: (id: string, value: string) => void;
};
export type FieldBooleanProps = {
    field: Field;
    value: boolean;
    onChange: (id: string, value: boolean) => void;
};
