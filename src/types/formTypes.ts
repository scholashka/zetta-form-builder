export type FieldType =
    | "text"
    | "textarea"
    | "dropdown"
    | "checkbox"
    | "radio"
    | "validatedInput";

export type ValidationConfig = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string; // Simple regex for all cases (string without slashes)
    dependsOn?: string; // Field ID to depend on for dynamic validation
    rules?: Record<string, string>; //Map: when dependsOn === key, use this regex
    message?: string; // Custom error message if validation fails
};
export interface Field {
    id: string;
    type: FieldType;
    label: string;
    options?: string[]; // for dropdown / radio
    validations?: ValidationConfig;
    visibleWhen?: Record<string, string>;
    autoFill?: AutoFillConfig; // API config for auto-filling
}

export interface Group {
    id: string;
    label: string;
    fields: Field[];
    groups?: Group[]; // nested groups
    visibleWhen?: Record<string, string>; // for dynamic visibility
    autoFill?: AutoFillConfig; // API config for auto-filling
}

export interface FormSchema {
    title: string;
    groups: Group[];
}

export type FieldStringProps = {
    field: Field;
    value: string;
    onChange: (id: string, value: string) => void;
    error?: boolean;
    helperText?: string;
    onBlur?: (id: string) => void;
};
export type FieldBooleanProps = {
    field: Field;
    value: boolean;
    onChange: (id: string, value: boolean) => void;
    error?: boolean;
    helperText?: string;
    onBlur?: (id: string) => void;
};
export type AutoFillConfig = {
    api: string;
    inputFields: string[];
    map: Record<string, string>; // Map API response keys to field IDs
    whenVisibleOnly?: boolean; // Only fill if the form is visible
};

export type SubmittedGroup = {
    id: string;
    label: string;
    fields: { id: string; label: string; value: any }[];
    groups: SubmittedGroup[];
};
