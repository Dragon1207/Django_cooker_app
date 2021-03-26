import React, {useState} from "react";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import axiosInstance from "../../axios";

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [status, setStatus] = useState('draft');
    const [errors, setErrors] = useState({title: false, content: false});

    const handleSubmit = () => {
        if(!title) {
            setErrors(prevState => ({
                ...prevState,
                title: 'Titre requis'
            }));
        }

        if(!content) {
            setErrors(prevState => ({
                ...prevState,
                content: 'Contenu requis'
            }));
        }

        axiosInstance.post('blog/posts/', {
            title: title,
            content: content,
            status: status,
            author: 1
        }).then((result) => {
            console.log(result);
        }).catch((e) => {

        })
    }

    return (
        <Container maxWidth="lg">
            <h1>Créer un article</h1>
            <form>
                <TextField
                    id="outlined-basic"
                    label="Titre"
                    variant="outlined"
                    error={errors.title}
                    helperText={errors.title}
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
                    error={errors.content}
                    helperText={errors.content}
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
                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={status}
                        onChange={(e) => {setStatus(e.target.value)}}
                        label="Status"
                    >
                        <MenuItem value="published">Publié</MenuItem>
                        <MenuItem value="draft">Brouillon</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Créer
                </Button>
            </form>
        </Container>
    );
}