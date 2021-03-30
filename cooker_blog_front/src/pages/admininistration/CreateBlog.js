import React, {useEffect, useState} from "react";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import axiosInstance from "../../axios";
import {useHistory} from "react-router-dom";
import Creatable from 'react-select/creatable';

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [status, setStatus] = useState('draft');
    const [errors, setErrors] = useState({});

    let history = useHistory();

    var ingredientOptions = [];
    useEffect( () => {
        (async function getIngredientOptions() {
            const res = await axiosInstance.get('blog/ingredients/');
            if(res.status === 200) {
                res.data.map((item) => {
                    ingredientOptions.push({label: item.name, value: item.id});
                })
            }
        })()
    }, [])

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
            <h1>Créer un article</h1>
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
                    margin="normal"
                    onChange={(e) => {setContent(e.target.value)}}
                    value={content}
                />
                <label>Ingrédients</label>
                <Creatable
                    isMulti
                    onChange={(value, actionMeta) => {
                        var newIngredients = [];
                        value.map((item) => {
                            newIngredients.push({name: item.label})
                        })
                        setIngredients(newIngredients);
                    }}
                    options={ingredientOptions}
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