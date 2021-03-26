import React, {useState} from "react";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

export default function EditBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const handleSubmit = () => {
        console.log(title)
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
                    margin="normal"
                    onChange={(e) => {setTitle(e.target.value)}}
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
                    onChange={(e) => {setContent(e.target.value)}}
                    value={content}
                />
                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-outlined-label">Ingrédients</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={ingredients}
                        multiple
                        onChange={(e) => {setIngredients(e.target.value)}}
                        label="Ingrédients"
                    >
                        <MenuItem value="1">Ingrédient 1</MenuItem>
                        <MenuItem value="2">Ingrédient 2</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Sauvegarder
                </Button>
            </form>
        </Container>
    );
}