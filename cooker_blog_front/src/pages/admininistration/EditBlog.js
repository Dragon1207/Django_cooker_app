import React, {useState} from "react";
import {Button, Container, TextField} from "@material-ui/core";

export default function EditBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <Container maxWidth="lg">
            <h1>Modifier l'article</h1>
            <form noValidate>
                <TextField
                    id="outlined-basic"
                    label="Titre"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    value={title}
                />
                <TextField
                    id="outlined-textarea"
                    label="Contenu"
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={10}
                    margin="normal"
                    onChange={handleChange}
                    value={content}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Sauvegarder
                </Button>
            </form>
        </Container>
    );
}