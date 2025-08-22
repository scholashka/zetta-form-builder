import { render, screen, fireEvent } from "@testing-library/react";
import { FormSchema } from "../types/formTypes";
import { FormRenderer } from "../components/FormRenderer";

const schema: FormSchema = {
    title: "Visibility",
    groups: [
        {
            id: "t", label: "Type", fields: [
                { id: "kind", type: "dropdown", label: "Kind", options: ["A", "B"] }
            ]
        },
        {
            id: "onlyA", label: "Only A", visibleWhen: { kind: "A" }, fields: [
                { id: "aField", type: "text", label: "A Field" }
            ]
        }
    ]
};

test("renders conditional group only when dependency matches", () => {
    render(<FormRenderer schema={schema} />);
    expect(screen.queryByText(/Only A/)).not.toBeInTheDocument();
    fireEvent.mouseDown(screen.getByLabelText(/Kind/)); // open select
    fireEvent.click(screen.getByRole("option", { name: "A" }));
    expect(screen.getByText(/Only A/)).toBeInTheDocument();
});