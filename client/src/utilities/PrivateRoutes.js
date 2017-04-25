import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {auth} from '../config/database';

export const AuthRoute = ({component: Component, ...rest}) => {

    return (<Route {...rest} render={(props) => (
        auth && auth.currentUser ? (
                <Component/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
    )
    }/>)
}
// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         fakeAuth.isAuthenticated ? (
//                 <Component {...props}/>
//             ) : (
//                 <Redirect to={{
//                     pathname: '/login',
//                     state: { from: props.location }
//                 }}/>
//             )
//     )}/>
// )


export const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        auth && auth.currentUser && auth.currentUser.isAdmin ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/dashboard',
                    state: {from: props.location}
                }}/>
            )
    )}/>
)

