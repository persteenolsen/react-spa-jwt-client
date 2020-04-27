import React from 'react';
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom';

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


import { ErrorPage } from '@/ErrorPage';


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
					  
					   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                         						 
                          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                             <span class="navbar-toggler-icon"></span>
                          </button>
						
                          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                           							 
                           { currentUser && 
					            
							  <div class="navbar-nav">
                         		                         			
								<Link className="nav-item nav-link" to="/about" >About this App</Link>
                                <Link className="nav-item nav-link" to="/persons" >List of Persons</Link>
                                <Link className="nav-item nav-link" to="/createperson" >Create a Person</Link>
                                <a className="nav-item nav-link" onClick={this.logout} >Logout</a>
						      
							  </div>
							               
                            }
                     					                   

                           { ! currentUser &&      
                              <div class="navbar-nav">                			
						       
							    <Link className="nav-item nav-link" to="/about" >About</Link>		  
                       	        <Link className="nav-item nav-link" to="/login" >Login</Link>
						                       
                              </div>
								
                           }

				 					  
					   </div>
						 
                    </nav>
				   
				    
  				     { ! currentUser &&  
						 <div>
                          <p></p>
                         </div> 
					  }
						
					
					  { currentUser && 
                            <div style={usercss}>
                             You are logged in as: {currentUser.firstName}
                         </div> 
                      }
					  
                      
 					   <div className="container">
                        
						 <div className="row">
                            
							<div className="col-xs-auto col-md-auto" >
                                
								
                         <Switch> 
                               <PrivateRoute exact path="/persons" component={ListPersonsPage} />                              
                               <PrivateRoute exact path="/editperson" component={EditPersonPage} />
                               <PrivateRoute exact path="/createperson" component={CreatePersonPage} />

                               <PrivateRoute exact path="/testgetpersons" component={PersonPage} />
                                   
                               <Route exact path="/" component={AboutPage} />
                               <Route exact path="/about" component={AboutPage} />

                               <Route exact path="/login" component={LoginPage} />
							  
							   <Route path="*" component={ErrorPage} />
 
                                
                             </Switch> 
                               </div>
                             </div>
                        </div>
                    </div>

            </Router>
          
        );
    }
}

export { App }; 