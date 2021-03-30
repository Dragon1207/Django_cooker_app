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
import dateFormat from 'dateformat';
import Box from '@material-ui/core/Box';

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

    return (
        <Container>
            <Box display="flex" style={{ marginTop: '10%' }}>
            {posts.map((post) => (
                <Card className={classes.root} style={{ margin: 'auto' }}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                    }
                    title={post.title}
                    subheader={post.published}
                />
                <CardMedia
                    className={classes.media}
                    image="https://picsum.photos/200/300"
                    title={post.title}
                />
                <CardContent style={{ textAlign: 'center' }}>
                <Button size="small" variant="outlined" color="primary">Voir plus</Button>
                </CardContent>
                </Card>
            ))}
            </Box>
        </Container>
    );
}