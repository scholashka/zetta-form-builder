import { render, screen, fireEvent } from "@testing-library/react";
import FormBuilder from "../components/pages/FormBuilder";

test("shows error on invalid JSON in schema editor", () => {
    render(<FormBuilder />);

    const textbox = screen.getByPlaceholderText(/Paste JSON schema here/i);
    fireEvent.change(textbox, { target: { value: "{ invalid json" } });

    expect(screen.getByText(/^Invalid JSON$/i)).toBeInTheDocument();
});