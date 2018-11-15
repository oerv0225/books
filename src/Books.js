import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const MyTableHeader = props => { 
    const { a, b, c} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell>{a}</TableCell>
                <TableCell>{b}</TableCell>
                <TableCell>{c}</TableCell>
            </TableRow>
        </TableHead>
    );
}

class Books extends Component {
    render() {
        const { bookData, removeBook, loadBook } = this.props;

        return (
            <Table>
                <MyTableHeader a='Title' b='Author' c='Action' />
                <TableBody>
                    { bookData.map((row, index) => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.author}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => loadBook(row.id)}>Modify</Button>
                                    <Button variant="contained" color="secondary" onClick={() => removeBook(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}

export default Books;
