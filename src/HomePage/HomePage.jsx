import React from 'react';

import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
            Welcome to a React client and a Node.js Web API secured by JWT
                            
            </div>
        );
    }
}

export { HomePage };