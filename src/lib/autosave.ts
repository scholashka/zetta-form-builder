// localStorage helpers

export type SavedPayload = {
    schema: string;
    values: Record<string, any>;
    savedAt: number;
};

const STORAGE_KEY = "form-progress";

export function loadProgress(): SavedPayload | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as SavedPayload;
    } catch {
        return null;
    }
}

export function saveProgress(schema: string, values: Record<string, any>) {
    try {
        const payload: SavedPayload = {
            schema,
            values,
            savedAt: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
        // error saving, ignore
    }
}

export function clearProgress() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // error clearing, ignore
    }
}
