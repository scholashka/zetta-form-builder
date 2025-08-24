import { useEffect, useState } from "react";
import {
    AppBar, Toolbar, Typography, Container, Paper, Drawer, Box, IconButton, Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SchemaEditor } from "../../components/SchemaEditor";
import { FormRenderer } from "../../components/FormRenderer";
import { FormSchema } from "../../types/formTypes";
import { JsonPreview } from "../../components/JsonPreview";
import { clearProgress, loadProgress, saveProgress } from "../../lib/autosave";

export default function FormBuilder() {
    const [jsonInput, setJsonInput] = useState<string>("");
    const [schema, setSchema] = useState<FormSchema | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [values, setValues] = useState<Record<string, any>>({});

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [submission, setSubmission] = useState<any | null>(null);

    useEffect(() => {
        const saved = loadProgress();
        if (saved?.schema) {
            setJsonInput(saved.schema);
            try {
                const parsed = JSON.parse(saved.schema) as FormSchema;
                setSchema(parsed);
                setError(null);
            } catch {
                setSchema(null);
                setError("Invalid JSON");
            }
        }
        if (saved?.values) {
            setValues(saved.values);
        }
    }, []);

    const handleJsonChange = (data: string) => {
        setJsonInput(data);
        try {
            const parsed = JSON.parse(data) as FormSchema;
            setSchema(parsed);
            setError(null);
            saveProgress(data, values);   // valid schema
        } catch {
            setSchema(null);
            setError("Invalid JSON");
            saveProgress(data, values);   // still save invalid schema
        }
    };
    // debounce save on value changes
    useEffect(() => {
        const id = setTimeout(() => {
            saveProgress(jsonInput, values);
        }, 400);
        return () => clearTimeout(id);
    }, [jsonInput, values]);

    const handleSubmitted = (output: any) => {
        setSubmission(output);
        setDrawerOpen(true);
        clearProgress();
        setValues({});
    };

    return (
        <>
            <AppBar position="sticky" color="default" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flex: 1 }}>
                        Zetta Form Builder
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-start">
                    {/* Left: Schema editor (sticky) */}
                    <Box sx={{ width: { xs: "100%", md: "40%", lg: "33%" } }}>
                        <SchemaEditor
                            value={jsonInput}
                            onChange={handleJsonChange}
                            error={error}

                        />
                    </Box>

                    {/* Right: Form area */}
                    <Box sx={{ flex: 1, width: { xs: "100%", md: "60%", lg: "67%" } }}>
                        <Paper elevation={2} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Live Form
                            </Typography>
                            {!schema ? (
                                <Typography color="text.secondary">
                                    Paste a valid JSON schema on the left to render the form.
                                </Typography>
                            ) : (
                                <FormRenderer
                                    schema={schema}
                                    onSubmitted={handleSubmitted}
                                    initialValues={values}
                                    onValuesChange={setValues}
                                />
                            )}
                        </Paper>
                    </Box>
                </Stack>
            </Container>

            {/* Right-side drawer for submission JSON */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: { xs: 360, sm: 420, md: 520 }, p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Typography variant="h6" sx={{ flex: 1 }}>
                            Submission JSON
                        </Typography>
                        <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {submission ? (
                        <JsonPreview data={submission} />
                    ) : (
                        <Typography color="text.secondary">No submission yet.</Typography>
                    )}
                </Box>
            </Drawer>
        </>
    );
}