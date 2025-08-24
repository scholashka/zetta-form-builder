# Zetta Form Builder (React + TypeScript + Vite)

A component-based form renderer built with **React + TypeScript + Vite + MUI**. Paste a JSON schema and the app renders a live form with:

-   Field-level **validation** (required, patterns, length)
-   **Visibility rules** via `visibleWhen`
-   **Nested groups** with clear visual hierarchy
-   **Mock API autofill** (e.g., user profile, address lookup)
-   **Auto-save** of both the editor JSON and form values (localStorage)
-   **Hierarchical submission** output JSON (hidden & empty fields removed)

---

## Quick start

```bash
# install dependencies
npm install

# run dev server
npm run dev

# run tests
npm run test
```

---

## Tech stack
- React + TypeScript
- Vite
- MUI UI components
- Jest + @testing-library/react (unit tests)
- localStorage for auto-save

---

## Project structure (key parts)

```
src/
  assets/
    examples/                # example JSON schemas
      basic.json
      visibility.json
      nested.json
      validation.json
      autofill-user.json
      autofill-address.json
  components/
    FormRenderer.tsx          # renders groups/fields, validation, autofill, submit
    GroupWrapper.tsx          # visual shell for groups
    SchemaEditor.tsx          # JSON editor panel with live validation
    JsonPreview.tsx           # drawer view showing the output JSON
    inputs/                   # reusable input components for each field type
      TextInput.tsx
      TextArea.tsx
      Dropdown.tsx
      CheckboxInput.tsx
      RadioGroupInput.tsx
      ValidatedInput.tsx
    pages/
      FormBuilder.tsx         # two-panel UI (JSON editor + form) + submission drawer
  lib/
    validators.ts             # field validations
    submission.ts             # builds submission JSON
    autofill.ts               # utilities for mock API autofill
    apiMock.ts                # mock APIs (userProfile, addressLookup)
    autosave.ts               # saves {schema, values} to localStorage
    panelColors.ts            # simple color helpers for styling panels and groups
  types/
    formTypes.ts              # schema types (Field, Group, FormSchema)
  tests/                      # unit tests for core features
    FormRenderer.test.tsx
    validation.test.tsx
    visibility.test.tsx
    autofill.calls.test.tsx
    autofill.test.tsx
    submission.test.tsx
    schemaEditor.test.tsx
```

---

## How to use
1. **Paste JSON** in the left _Form Schema (JSON)_ editor. Invalid JSON shows an error.
2. The **form renders** on the right. Fill fields as needed.
3. **Auto-save**: the JSON and all field values saves to localStorage. Refresh to verify.
4. **Submit**: a right-side drawer shows the submission JSON.

---

## JSON schema format

```ts
// Field types supported
export type FieldType =
  | "text"
  | "textarea"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "validatedInput";

export type Field = {
  id: string;               // unique per form
  type: FieldType;
  label: string;
  options?: string[];       // for dropdown/radio
  validations?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;       // regex source string
    message?: string;       // custom error text
    dependsOn?: string;     // id of another field this validation depends on
    rules?: Record<string, string>; // when dependsOn === key, use this regex (value)
  };
  visibleWhen?: Record<string, string>; // string equality checks only
};

export type Group = {
  id: string;
  label: string;
  fields: Field[];
  groups?: Group[];         // nested groups
  visibleWhen?: Record<string, string>; // string equality checks

  // Optional mock autofill (group-level)
  autoFill?: {
    api: string;               // e.g., "userProfile" | "addressLookup"
    inputFields: string[];     // required inputs to trigger the call
    map: Record<string, string>; // { apiResponseKey: destinationFieldId }
  };
};

export type FormSchema = {
  title: string;
  groups: Group[];
};
````



The schema format supports visibility rules, inline validation, and hierarchical submissions:
- Use `visibleWhen` for simple show/hide logic based on other field values.
- Each field can have inline validations that show below the input.
- The submitted JSON mirrors the group structure and excludes hidden or empty fields.

---

## Mock APIs (src/lib/apiMock.ts)

The project includes simple mock APIs that simulate external data:

- `userProfile({ firstName, lastName })`
  Returns fake user data like `{ fullName, email }`.

- `addressLookup({ zip, country })`
  Returns fake address data like `{ street, city, region }`.

You can connect these mocks to a group using the `autoFill` property.
When the required input fields are filled, the form will call the mock API and automatically fill the mapped fields.

---

## Auto-save behavior (src/lib/autosave.ts)

-   Saves **both** the JSON editor text and the **form values** in localStorage (`form-progress`).
-   Restores on refresh. (Current setup clears the draft on successful submit; remove that line if you prefer to keep drafts.)

---

## Design

The app uses **Material UI (MUI)** to keep everything looking clean and consistent:
- Groups and panels use spacing and shadows so it’s easy to see the structure.
- Error messages show up right under the fields using MUI’s built-in styles.
- Colors and fonts come from the MUI theme, and you can change them easily with a `ThemeProvider`.

This makes the forms simple to use and easy to read.

---

## Tests

This project uses **Jest** as the test runner and **React Testing Library** for rendering components and interacting with the DOM in tests. Together they ensure the form builder behaves correctly under different scenarios.

Coverage includes:

- **Form rendering** – checks that the form is created correctly from a JSON schema
- **Visibility** – checks that fields and groups show or hide based on other values
- **Autofill (mapping)** – checks that mock API responses are correctly inserted into mapped fields
- **Autofill (calls)** – checks that mock API calls trigger correctly and only when inputs are complete
- **Submission** – checks that the output JSON is built correctly (hierarchical, no hidden/empty values)
- **Schema editor** – checks that an error appears when the JSON is invalid
- **Validation** – checks that required fields and rules (length, pattern) show errors properly

Run: `npm run test`

---

## Example schemas

Ready-to-use examples live in `src/assets/examples/`:

-   [Basic](src/assets/examples/basic.json)
-   [Visibility](src/assets/examples/visibility.json)
-   [Nested groups](src/assets/examples/nested.json)
-   [Validation showcase](src/assets/examples/validation.json)
-   [Autofill – user](src/assets/examples/autofill-user.json)
-   [Autofill – address](src/assets/examples/autofill-address.json)

**Tip:** Open any file above, copy its JSON, and paste it into the left editor panel to render the form.
