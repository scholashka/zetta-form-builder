import { Field } from "../types/formTypes";

export type ValidationResult = { valid: boolean; error?: string };

function toRegex(source?: string): RegExp | null {
    if (!source) return null;
    try {
        return new RegExp(source);
    } catch {
        return null;
    }
}

export function validateField(
    field: Field,
    value: unknown,
    allValues: Record<string, any>
): ValidationResult {
    const v = field.validations;
    if (!v) return { valid: true };

    // required
    if (v.required) {
        if (field.type === "checkbox") {
            if (value !== true) {
                return {
                    valid: false,
                    error: v.message || `${field.label} is required`,
                };
            }
        } else {
            const str = (value ?? "").toString();
            if (str.trim() === "") {
                return {
                    valid: false,
                    error: v.message || `${field.label} is required`,
                };
            }
        }
    }

    // min/max length
    const str = (value ?? "").toString();

    if (typeof v.minLength === "number" && str.length < v.minLength) {
        return {
            valid: false,
            error:
                v.message ||
                `${field.label} must be at least ${v.minLength} characters long`,
        };
    }
    if (typeof v.maxLength === "number" && str.length > v.maxLength) {
        return {
            valid: false,
            error:
                v.message ||
                `${field.label} must be at most ${v.maxLength} characters long`,
        };
    }

    // dependent pattern or plain pattern
    let pattern = v.pattern || "";
    if (v.dependsOn && v.rules) {
        const depValue = allValues[v.dependsOn];
        if (typeof depValue === "string" && v.rules[depValue]) {
            pattern = v.rules[depValue];
        }
    }

    const rx = toRegex(pattern);
    if (rx && !rx.test(str)) {
        return {
            valid: false,
            error: v.message || `${field.label} has an invalid format`,
        };
    }

    return { valid: true };
}
