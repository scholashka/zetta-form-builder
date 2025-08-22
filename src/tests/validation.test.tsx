import { render, screen, fireEvent } from "@testing-library/react";
import { FormSchema } from "../types/formTypes";
import { FormRenderer } from "../components/FormRenderer";

const schema: FormSchema = {
    title: "Validation",
    groups: [{
        id: "g", label: "G", fields: [
            { id: "name", type: "text", label: "Name", validations: { required: true, minLength: 3 } },
            { id: "agree", type: "checkbox", label: "Agree", validations: { required: true } },
        ]
    }],
};

test("shows required errors on submit", () => {
    render(<FormRenderer schema={schema} />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Agree is required')).toBeInTheDocument();
});

test("minLength triggers", () => {
    render(<FormRenderer schema={schema} />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "ab" } });
    fireEvent.blur(screen.getByLabelText(/name/i));
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(screen.getByText(/at least 3/i)).toBeInTheDocument();
});