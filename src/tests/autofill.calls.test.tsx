import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormRenderer } from "../components/FormRenderer";
import { FormSchema } from "../types/formTypes";

// Mock the mock-API layer and spy call count
const resp = { fullName: "Simona Cholashka", email: "simona.cholashka@example.com" };
const callMockApi = jest.fn().mockResolvedValue(resp);
jest.mock("../lib/apiMock", () => ({ callMockApi: (...args: any[]) => callMockApi(...args) }));

const schema: FormSchema = {
    title: "Autofill Calls",
    groups: [
        {
            id: "g",
            label: "G",
            autoFill: {
                api: "userProfile",
                inputFields: ["firstName", "lastName"],
                map: { fullName: "fullName", email: "email" },
            },
            fields: [
                { id: "firstName", type: "text", label: "First Name" },
                { id: "lastName", type: "text", label: "Last Name" },
                { id: "fullName", type: "text", label: "Full Name" },
                { id: "email", type: "text", label: "Email" },
                { id: "notes", type: "text", label: "Notes" },
            ],
        },
    ],
};

test("autofill is called once per payload and not retriggered by unrelated changes", async () => {
    render(<FormRenderer schema={schema} />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "Simona" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Cholashka" } });

    await waitFor(() => expect(callMockApi).toHaveBeenCalledTimes(1));

    // Changing an unrelated field should not cause another call for the same payload
    fireEvent.change(screen.getByLabelText(/Notes/i), { target: { value: "hello" } });

    await new Promise((r) => setTimeout(r, 50));
    expect(callMockApi).toHaveBeenCalledTimes(1);

    // And values were mapped
    expect((screen.getByLabelText(/Full Name/) as HTMLInputElement).value).toBe(resp.fullName);
    expect((screen.getByLabelText(/Email/) as HTMLInputElement).value).toBe(resp.email);
});