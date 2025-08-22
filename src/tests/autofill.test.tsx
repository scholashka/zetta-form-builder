import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormSchema } from "../types/formTypes";
import { FormRenderer } from "../components/FormRenderer";

const schema: FormSchema = {
    title: "Autofill",
    groups: [{
        id: "p", label: "Personal",
        autoFill: {
            api: "userProfile",
            inputFields: ["firstName", "lastName"],
            map: { fullName: "fullName", email: "email" }
        },
        fields: [
            { id: "firstName", type: "text", label: "First Name" },
            { id: "lastName", type: "text", label: "Last Name" },
            { id: "fullName", type: "text", label: "Full Name" },
            { id: "email", type: "text", label: "Email" }
        ]
    }]
};

test("autofill populates mapped fields", async () => {
    render(<FormRenderer schema={schema} />);
    fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: "Simona" } });
    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: "Cholashka" } });

    await waitFor(() => {
        expect((screen.getByLabelText(/Full Name/) as HTMLInputElement).value).toBe("Simona Cholashka");
    });
    expect((screen.getByLabelText(/Email/) as HTMLInputElement).value).toMatch(/simona\.cholashka@/i);
});