import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Link, Redirect} from 'react-router-dom';
// import auth from '../../config/database';
import {auth} from '../../config/database';
import PropTypes from 'prop-types';


// const LoginForm = withRouter(
//     () => ({
//         propTypes: {
//             location: React.PropTypes.object.isRequired,
//             router: React.PropTypes.object.isRequired
//         },
//         getInitialState() {
//             return {email: '', password: '', emailError: '', passwordError: ''};
//         },
//         handleEmailChange(e) {
//             this.setState({email: e.target.value});
//         },
//         handlePasswordChange(e) {
//             this.setState({password: e.target.value});
//         },
//         handleSubmit(event) {
//             event.preventDefault();
//             const email = this.state.email.trim();
//             const password = this.state.password.trim();
//             auth.login(email, password, this.handleLoginSuccess, this.handleLoginFailure);
//         },
//         handleAnon(event) {
//             event.preventDefault();
//             auth.loginAnonymously(this.handleLoginSuccess, this.handleLoginFailure);
//         },
//         handleLoginFailure(error) {
//             return this.setState({
//                 emailError: error.emailError,
//                 passwordError: error.passwordError
//             });
//         },
//         handleLoginSuccess() {
//             const {location} = this.props;
//             const router = this.props.router;
//             if (location.state && location.state.nextPathname) {
//                 console.log(router);
//                 console.log('replacing path with ' + location.state.nextPathname + ' as requested');
//                 // browserHistory.push(location.state.nextPathname);
//                 router.replace(location.state.nextPathname);
//             } else {
//                 console.log('replacing path with \'/\'');
//                 // browserHistory.push('/dashboard');
//                 router.replace('dashboard');
//             }
//         },

// }));


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
            errorMessage: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = this.state.email.trim();
        const password = this.state.password.trim();
        this.login(email, password);
    }

    handleAnon(event) {
        event.preventDefault();
        auth.loginAnonymously(this.handleLoginSuccess, this.handleLoginFailure);
    }

    login = (email, pword) => {
        auth.signInWithEmailAndPassword(email, pword)
            .then((res) => {
                    console.log(res)
                    this.setState({redirectToReferrer: true})
                }
            )
            .catch((error) => {
                this.setState({
                    errorMessage: error.message,
                });
            });
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {redirectToReferrer} = this.state;

        if (redirectToReferrer) {
            console.log(from)
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <Paper className="loginForm">
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Login"/>
                    </ToolbarGroup>
                </Toolbar>
                <form id="loginForm" onSubmit={(e) => this.handleSubmit(e)}>
                    <TextField
                        fullWidth={true}
                        hintText="benjamin@example.com"
                        type="email"
                        floatingLabelText="Email address"
                        errorText={this.state.errorMessage}
                        onChange={(e) => this.handleEmailChange(e)}
                    />
                    <TextField
                        fullWidth={true}
                        hintText="****************"
                        type="password"
                        floatingLabelText="Password"
                        errorText={this.state.passwordError}
                        onChange={(e) => this.handlePasswordChange(e)}
                    />
                    <div className="button-group">
                        <Link to="/register">
                            <RaisedButton label="Register" secondary={true}/>
                        </Link>
                        <RaisedButton label="Login" primary={true} onClick={(e) => this.handleSubmit(e)}/>
                    </div>
                    <p>Don't have/want an account?
                        <br />
                        <FlatButton label='Browse as a guest instead.' onClick={(e) => this.handleAnon(e)}/>
                    </p>

                </form>
            </Paper>
        )
    }
}

Login.propTypes = {
    location: PropTypes.object.isRequired
}


export default Login;
