import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Container} from "@material-ui/core";
import {Link, useLocation} from "react-router-dom";
import axiosInstance from "../axios";
import Alert from "@material-ui/lab/Alert";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const location = useLocation();

    useEffect( () => {
        (async function getPosts() {
            const res = await axiosInstance.get('blog/posts/');
            if(res.status === 200) {
                setPosts(res.data.sort((x, y) => y.published - x.published).slice(0, 3));
            }
        })()
    }, [])

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);
    
    return (<>
            <Container maxWidth="lg">
            <h1>Lister les postes</h1>
            {location.state !== undefined && location.state.success &&
                <Alert severity="success" style={{marginBottom: '20px'}}>
                    {location.state.success}
                </Alert>
            }
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Titre</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post) => (
                            <StyledTableRow key={post.title}>
                                <StyledTableCell component="th" scope="row">
                                    {post.title}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {post.status} - {post.published}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </>
    );
}