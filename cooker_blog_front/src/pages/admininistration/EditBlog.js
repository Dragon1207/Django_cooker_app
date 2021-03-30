import React, {useEffect, useState} from "react";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import axiosInstance from "../../axios";
import {useHistory, useParams} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Creatable from "react-select";

export default function EditBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [status, setStatus] = useState('draft');
    const [errors, setErrors] = useState({title: false, content: false});

    let history = useHistory();
    let { id } = useParams();

    useEffect( () => {
        (async function getPost() {
            const res = await axiosInstance.get('blog/posts/' + id + '/');
            if(res.status === 200) {
                setTitle(res.data.title);
                setContent(res.data.content);
                setIngredients(res.data.ingredient);
                setStatus(res.data.status);
            }
        })()
    }, [])

    const handleSubmit = () => {
        setErrors({title: false, content: false});
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

        axiosInstance.patch('blog/posts/' + id + '/', {
            title: title,
            content: content,
            status: status,
            ingredient: ingredients
        }).then((res) => {
            history.push('/admin/blog', {success: 'Poste mis à jour avec succès.'});
        }).catch((e) => {
            setErrors(prevState => ({
                ...prevState,
                global: 'Une erreur est survenue.'
            }));
        })
    }

    return (
        <Container maxWidth="lg">
            <h1>Modifier le poste</h1>
            {errors.global &&
            <Alert severity="error" style={{marginBottom: '20px'}}>
                {errors.global}
            </Alert>}
            <form noValidate>
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
                        var newIngredients = [];
                        value.map((item) => {
                            newIngredients.push({name: item.label})
                        })
                        setIngredients(newIngredients);
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
                    Sauvegarder
                </Button>
            </form>
        </Container>
    );
}