import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '@/_services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to about with the return url
          // return <Redirect to={{ pathname: '/about', state: { from: props.location } }} />
           return <Redirect to={{ pathname: '/about' }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)