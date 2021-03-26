import React, {useState} from "react";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import axiosInstance from "../../axios";

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const handleSubmit = () => {
        var pad = function(num) { return ('00'+num).slice(-2) };
        var date;
        date = new Date();
        date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + ' ' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());
        axiosInstance.post('blog/posts', {
            title: title,
            content: content,
            published: date,
            author: 1
        })
    }

    return (
        <Container maxWidth="lg">
            <h1>Créer un article</h1>
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
                    Créer
                </Button>
            </form>
        </Container>
    );
}