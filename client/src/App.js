import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import './App.css';
// import Nav from './components/Nav/Nav'
import {auth} from './config/database';
import Login from './views/Login/LoginForm';
import Recipe from './views/Recipe/Recipe';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
// import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import theme from './config/theme';


// import RaisedButton from 'material-ui/RaisedButton';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import {AuthRoute} from './utilities/PrivateRoutes'

// import styles from './components/Nav/nav.css';
class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    componentWillMount() {
        const comp = this;
        auth.onAuthStateChanged(function handleAuthChange() {
            if (auth.currentUser) {
                comp.setState({
                    loggedIn: true
                });
            } else {
                comp.setState({
                    loggedIn: false
                });
            }
        })
    }

    handleTitleTap() {
        // history.push('/')
    }

    handleDrawerToggle = () => this.setState({open: !this.state.open});

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        return (

            <BrowserRouter>
                <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                    <Paper style={{minHeight: '100vh'}}>


                        <AppBar title="The Drink Ninja" style={{position: 'fixed', top: 0}}
                                onTitleTouchTap={this.handleTitleTap}
                                onLeftIconButtonTouchTap={this.handleDrawerToggle}/>
                        <div className="App">


                        {/*<Nav routes={routes} open={this.state.open} handleClose={this.handleDrawerClose}/>*/}

                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route path="/recipe/:id" component={Recipe}/>)
                            {routes.map((route, index) => (
                                    route.private ?
                                        <AuthRoute key={index} exact={route.exact} path={route.path}
                                                   component={route.main}/> :
                                        <Route key={index} exact={route.exact} path={route.path}
                                               component={route.main}/>
                                )
                            )}
                        </Switch>
                        </div>


                    </Paper>
                </MuiThemeProvider>
            </BrowserRouter >
        )
    }
}

export default App;
