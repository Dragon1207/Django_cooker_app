import React, {useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Container} from "@material-ui/core";
import {Delete, Edit} from '@material-ui/icons'
import {Link} from "react-router-dom";

export default function ListBlog() {

    const [articles, setArticles] = useState([{id: '1', title: 'Article 1'}, {id: '2', title: 'Article 2'}]);

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
            <h1>Administrer les articles</h1>
            <Link to="/admin/blog/create">
                <Button variant="contained" color="primary" style={{marginBottom: '20px'}}>
                    Créer un article
                </Button>
            </Link>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Titre de l'article</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map((article) => (
                            <StyledTableRow key={article.title}>
                                <StyledTableCell component="th" scope="row">
                                    {article.title}
                                </StyledTableCell>
                                <TableCell align="right">
                                    <Link to={'/admin/blog/' + article.id + '/edit'}><Edit fontSize="large" style={{marginRight: '15px'}} /></Link>
                                    <Delete color="secondary" fontSize="large" />
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </>
    );
}