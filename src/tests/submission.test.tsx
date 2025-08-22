import { render, screen, fireEvent } from "@testing-library/react";
import { FormSchema } from "../types/formTypes";
import { FormRenderer } from "../components/FormRenderer";

const schema: FormSchema = {
    title: "Submit",
    groups: [
        { id: "g1", label: "G1", fields: [{ id: "name", type: "text", label: "Name" }] },
        { id: "g2", label: "G2", visibleWhen: { name: "show" }, fields: [{ id: "x", type: "text", label: "X" }] }
    ]
};

test("builds hierarchical submission and omits empty", () => {
    const onSubmitted = jest.fn();
    render(<FormRenderer schema={schema} onSubmitted={onSubmitted} />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "show" } });
    fireEvent.change(screen.getByLabelText(/^X$/), { target: { value: "1" } });
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmitted).toHaveBeenCalled();
    const submission = onSubmitted.mock.calls[0][0];
    expect(submission.title).toBe("Submit");
    // has G1 with name, has G2 with X, nothing empty
    expect(JSON.stringify(submission)).not.toMatch(/\"value\":\"\"/);
});