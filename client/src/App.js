import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import './App.scss';
import Nav from './components/Nav/Nav'
import auth from './config/database';
import Login from './views/Login/LoginForm';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import RaisedButton from 'material-ui/RaisedButton';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import {AdminRoute, AuthRoute} from './utilities/PrivateRoutes'

// import styles from './components/Nav/nav.css';
class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleDrawerToggle = () => this.setState({open: !this.state.open});

    handleDrawerClose = () => {
        this.setState({open: false});
    }

    render() {
        return (

            <Router>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <div className="app">
                        <RaisedButton
                            label="Toggle Drawer"
                            onTouchTap={this.handleDrawerToggle}
                        />

                        <Nav routes={routes} open={this.state.open} handleClose={this.handleDrawerClose}/>

                        <Switch>
                            <Route path="/login" component={Login}/>
                            {routes.map((route, index) => (
                                    route.private ?
                                        <AuthRoute key={index} exact={route.exact} path={route.path}
                                                   component={route.main}/> :
                                        <Route key={index} exact={route.exact} path={route.path} component={route.main}/>
                                )
                            )}
                        </Switch>

                        {auth && auth.currentUser && auth.currentUser.isAdmin ?
                            <Switch>
                                {routes.map((route, index) => {
                                    return (
                                        <AdminRoute key={index} {...route}/>
                                    )
                                })}
                            </Switch> :
                            ''
                        }
                    </div>

                </MuiThemeProvider>
            </Router >
        )
    }
}

export default App;
