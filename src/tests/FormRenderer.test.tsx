import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormRenderer } from "../components/FormRenderer";
import { FormSchema } from "../types/formTypes";

const schema: FormSchema = {
    title: "Test Form",
    groups: [
        {
            id: "personal",
            label: "Personal",
            fields: [
                { id: "firstName", type: "text", label: "First Name", validations: { required: true } },
                { id: "lastName", type: "text", label: "Last Name" }
            ]
        }
    ]
};

describe("FormRenderer", () => {
    it("renders form fields from schema", () => {
        render(<FormRenderer schema={schema} />);

        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    });

    it("shows validation error when submitting empty required field", () => {
        render(<FormRenderer schema={schema} />);

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
});