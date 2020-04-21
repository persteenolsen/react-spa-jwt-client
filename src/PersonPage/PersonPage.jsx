import React from 'react';

import { authenticationService } from '@/_services';

import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

class PersonPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            persons: null
        };
    }

    componentDidMount() {
      
      const requestOptions = { 
        method: 'GET', 
        headers: authHeader() 
        };

        fetch(`${config.apiUrl}/persons`, requestOptions)
       
       .then(response => response.json())
       .then(data => { this.setState({ persons: data }) })
  
    }

    render() {
        const { currentUser, persons } = this.state;
        return (
            <div>
                <h3>Welcome: {currentUser.firstName}!</h3>
               
                <p>Persons from secure api end point:</p>
                {persons &&
                    <ul>
                        {persons.map(person =>
                            <li key={person.id}> {person.name} {person.email} {person.age}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { PersonPage };