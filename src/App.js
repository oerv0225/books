import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Books from './Books';
import MyForm from './MyForm';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            chosen_id: -1,
            drawer_open: false,
        };
        let myThis = this;

        fetch('http://localhost:3001/get', {
            method: 'GET'
        }).then(function(response) {
              if (response.status >= 400) {
                  throw new Error('Bad response from server')
              }
              return response.json();
          }).then(function(data) {
              console.log(data);
              myThis.setState({ books: data});
          }).catch(function(error) {
              console.log(error);
          });
    } 

    handleDrawerOpen = () => {
        this.setState({ drawer_open: true });
      };
    
    handleDrawerClose = () => {
        this.setState({ drawer_open: false });
    };

    acceptMethods = (childhandleModify) => {
        // Parent stores the method that the child passed
        this.childhandleModify = childhandleModify;
    };

    loadBook = id => {
        const { books } = this.state;

        const book = books.filter((book, i) =>  {
            return id === book.id;
        });

        this.childhandleModify(book[0]);
        this.setState({ chosen_id: id });
    }

    removeBook = id => {
        const { books } = this.state;

        this.setState({
            books: books.filter((book, i) => { 
                return book.id !== id;
            })
        });
        this.setState({ chosen_id: -1 });

        fetch('http://localhost:3001/remove', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ 'id': id})
        }).then(result => result.json())
          .then(result => {
          });
    }

    handleSubmit = book => {
        const { books, chosen_id } = this.state;
        let myThis = this;

        if (chosen_id >= 0) {
            let index = -1;
            for (var i in books) {
                if (chosen_id === books[i].id) {
                    index = i;
                }
            }

            books[index] = book;
            this.setState({ books: books});
            this.setState({ chosen_id: -1 });
        }
        else {
            book.id = -1;
        }

        fetch('http://localhost:3001/save', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(book)
        }).then(function(response) {
              if (response.status >= 400) {
                  throw new Error('Bad response from server')
              }
              return response.json();
          }).then(function(data) {
              console.log(data);
              if (book.id === -1) {
                  book.id = data.insertId;
                  myThis.setState({books: [...myThis.state.books, book]});
              }
          }).catch(function(error) {
              console.log(error);
          });
    }

    render() {
        const { books } = this.state;

        return (
            <div id="books_container" className="books_container">
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            Books
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.drawer_open}>
                    <div>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Divider />
                        <List>
                            {['Link 1', 'Link 2', 'Link 3'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['Link 4', 'Link 5', 'Link 6'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
               </Drawer>
                <main>
                    <Grid container spacing={24} style={{padding: 24}}>
                        <Grid item key="mygrid" xs={12} sm={6} lg={4} xl={3} className="mygrid">
                            <Books bookData={books} removeBook={this.removeBook} loadBook={this.loadBook} />
                            <MyForm handleSubmit={this.handleSubmit} shareMethods={this.acceptMethods} />
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

export default App;
