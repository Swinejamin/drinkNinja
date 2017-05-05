import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import styles from './nav.sass'

import RaisedButton from 'material-ui/RaisedButton';

import {auth} from '../../config/database'

class Nav extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    handleClose = () => {
        this.props.handleClose();
    };

    render() {
        const closer = this.props.handleClose;
        const LoginButton = withRouter(({ history }) => (
            <RaisedButton
                label="Log Out"
                onTouchTap={function(){
                    auth.signOut().then(function(){
                        history.push('/login');
                        closer();
                    });
                }}
            />));

        return (
            <nav className={styles.nav}>
                <Drawer open={this.props.open}>
                    <LoginButton/>
                    {this.props.routes.map((route, index) => {
                        return (

                            <Link to={route.path} key={index}>
                                <MenuItem onTouchTap={this.props.handleClose}>{route.name}</MenuItem>
                            </Link>

                        )
                    })}
                </Drawer>

            </nav>
        );
    }
}
;

Nav.propTypes = {
    routes: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};
export default withRouter(Nav);
