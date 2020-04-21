import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { PersonPage } from '@/PersonPage';
import { AboutPage } from '@/AboutPage';
import { LoginPage } from '@/LoginPage';

import { ListPersonsPage } from '@/ListPersonsPage';
import { CreatePersonPage } from '@/CreatePersonPage';

import { EditPersonPage } from '@/EditPersonPage';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {

        const usercss = {
            color: "black",
            backgroundColor: "whitesmoke",
            padding: "10px",
            textAlign: "right",
            fontFamily: "verdana"
          };

        const { currentUser } = this.state;
        return (
            
               <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">

                                <Link to="/about" className="nav-item nav-link">About this App</Link>
                                <Link to="/persons" className="nav-item nav-link">List of Persons</Link>
                                <Link to="/createperson" className="nav-item nav-link">Create a Person</Link>
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>

                            </div>
                        </nav>
                     }

                     { currentUser && 
                      <div style={usercss}>
                          You are logged in as: {currentUser.firstName}
                       </div> 
                     }

                     { ! currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                
                                <Link to="/about" className="nav-item nav-link">About this App</Link>
                                <Link to="/login" className="nav-item nav-link">Login</Link>
                            </div>
                        </nav>
                    }

                   { ! currentUser && 
                      <div>
                        <p></p>
                       </div> 
                     }
                        <div className="container">
                        <div className="row">
                             <div className="col-xs-auto col-md-auto" >
                                   
                                    <PrivateRoute exact path="/persons" component={ListPersonsPage} />                              
                                    <PrivateRoute exact path="/editperson" component={EditPersonPage} />
                                    <PrivateRoute exact path="/createperson" component={CreatePersonPage} />

                                    <PrivateRoute exact path="/testgetpersons" component={PersonPage} />
                                   
                                    <Route exact path="/" component={AboutPage} />
                                    <Route exact path="/about" component={AboutPage} />

                                    <Route exact path="/login" component={LoginPage} />
                              
                                    </div>
                             </div>
                        </div>
                    </div>

                
            </Router>
        );
    }
}

export { App }; 