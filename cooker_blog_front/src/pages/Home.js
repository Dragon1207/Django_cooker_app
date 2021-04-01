import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Button, Container} from "@material-ui/core";
import axiosInstance from "../axios";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
}));

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        (async function getPosts() {
            const res = await axiosInstance.get('blog/posts/');
            if(res.status === 200) {
                setPosts(res.data.sort((x, y) => y.published - x.published).slice(0, 4));
            }
        })()
    }, [])
    
    const classes = useStyles();

    return (<>
        <div>
            <div class="banner" style={{ background: 'url(/food.jpeg) no-repeat fixed 50% 0', height: '15em', position: 'relative', overflow: 'hidden', width: '100%', }}>
            </div>
            <h2 style={{ marginTop: '5%', textAlign: 'center', fontWeight: 'bold' }}>Liste des recettes postés récemment :</h2>
            <Box display="flex" style={{ margin: '5% 10% 0 10%' }}>
            {posts.map((post) => (
                <Card className={classes.root} style={{ margin: 'auto', width: '24%', padding: '0%'}}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                    }
                    title={post.title}
                    subheader={moment(post.published).format("L")}
                />
                <CardMedia
                    className={classes.media}
                    image="https://picsum.photos/200/300/?blur"
                    title={post.title}
                />
                <CardContent style={{ textAlign: 'center' }}>
                <Button size="small" variant="outlined" color="primary" href={'/post/'+post.id}>Voir plus</Button>
                </CardContent>
                </Card>
            ))}
            </Box>
            {!localStorage.getItem('access') &&
            <div style={{margin: '5% 0 5% 0', textAlign: 'center', fontWeight: 'bold'}}>
                <div>
                    <h1>Envie de partager vos recette ?</h1>
                    <h5 style={{marginTop: '3%'}}>Vous n'avez pas de compte : </h5>
                    {/* <AddCircleRoundedIcon /><a style={{ fontWeight: 'italic' }} to={'/login'} href="/login"> Inscrivez-vous</a> */}
                    <Button variant="contained" to={'/register'} href="/register"><AddCircleRoundedIcon/>&nbsp;Inscrivez-vous</Button>
                    <h5 style={{marginTop: '2%'}}>Sinon : </h5>
                    {/* <AccountCircleIcon /><a style={{ fontWeight: 'italic' }} to={'/register'} href="/register"> Connectez-vous</a> */}
                    <Button variant="contained" to={'/login'} href="/login"><AccountCircleIcon/>&nbsp;Connectez-vous</Button>
                </div>
            </div>
            }
        </div>
    </>);
}