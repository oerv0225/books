import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class MyForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: '',
            title: '',
            author: ''
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        // Child passes its method to the parent
        this.props.shareMethods(this.handleModify.bind(this))
    }

    handleChange = name => event => {
        this.setState({
            [name] : event.target.value
        });
    }

    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    handleModify = book => {
        this.setState({
            id: book.id,
            title: book.title,
            author: book.author
        });
    };

    render() {
        const { id, title, author } = this.state;

        return (
            <div id="form">
                <form noValidate autoComplete="off">
                    <TextField id="title" label="Title" value={title} margin="normal" onChange={this.handleChange('title')} />
                    <TextField id="author" label="Author" value={author} margin="normal" onChange={this.handleChange('author')} />
                    <br />
                    <Button variant="contained" color="primary" onClick={this.submitForm}>Submit</Button>
                </form>
            </div>
        );
    }
}

export default MyForm;
