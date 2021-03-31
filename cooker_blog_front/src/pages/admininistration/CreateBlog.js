import React, {useState} from "react";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import axiosInstance from "../../axios";
import {useHistory} from "react-router-dom";
import Creatable from "react-select/creatable";

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ingredients, setIngredients] = useState([{label: "Tomate", value: "tomate"}]);
    const [status, setStatus] = useState('draft');
    const [errors, setErrors] = useState({});

    let history = useHistory();

    const handleSubmit = () => {
        setErrors({});
        if(!title) {
            setErrors(prevState => ({
                ...prevState,
                title: 'Titre requis'
            }));
            return;
        }

        if(!content) {
            setErrors(prevState => ({
                ...prevState,
                content: 'Contenu requis'
            }));
            return;
        }

        axiosInstance.post('blog/posts/', {
            title: title,
            content: content,
            status: status,
            author: localStorage.getItem('Id_User'),
            ingredient: ingredients
        }).then((res) => {
            history.push('/admin/blog', {success: 'Poste créé avec succès.'});
        }).catch((e) => {
            setErrors(prevState => ({
                ...prevState,
                global: 'Une erreur est survenue.'
            }));
        })
    }

    return (
        <Container maxWidth="lg">
            <h1>Créer un poste</h1>
            {errors.global &&
            <Alert severity="error" style={{marginBottom: '20px'}}>
                {errors.global}
            </Alert>
            }
            <form>
                <TextField
                    id="outlined-basic"
                    label="Titre"
                    variant="outlined"
                    error={errors.title ? true : false}
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
                    error={errors.title ? true : false}
                    helperText={errors.content}
                    required
                    fullWidth
                    multiline
                    rows={10}
                    onChange={(e) => {setContent(e.target.value)}}
                    value={content}
                />
                <Creatable
                    isMulti
                    onChange={(value, actionMeta) => {
                        console.log(value);
                    }}
                    options={ingredients}
                />
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