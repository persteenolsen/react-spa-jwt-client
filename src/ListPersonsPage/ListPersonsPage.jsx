import React from 'react'

import { Link, withRouter } from 'react-router-dom';

import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';


class ListPersonsPage extends React.Component{

    constructor(props) {

        super(props);

        this.state = {
            persons: []

        };

    }

   componentDidMount() {
       
       this.getPersons();
     
    }

   
   getPersons(){

        const requestOptions = { 
              method: 'GET', 
              headers: authHeader() 
              };

        fetch(`${config.apiUrl}/persons`, requestOptions)
    
        .then(response => response.json())
        .then(data => { this.setState({ persons: data }) })

     }
    

  editPerson(idedit){
     
	    // React: The user is redirected to the admin list of Persons using withRouter from react-router-dom
	    this.props.history.push("/editperson?id=" + idedit );
   
    }



  deletePerson(id)  {

   if(window.confirm("Are you sure want to delete the Person?")) {
       
     const requestOptions = { 
          method: 'DELETE', 
          headers: authHeader() 
          };

      fetch(`${config.apiUrl}/persons/` + id, requestOptions)

      .then(response => { 
              
              // On Success the server will most likely return 204 because no content to return
              if( response.status == 200  || response.status == 204 ) {
                  alert("The Person was deleted successfully");
                                 
                 // Getting the Persons and update the state / GUI
                 this.getPersons();
                
              } 
       })
    }
      
  }


    render() {
		
      return(

        <div>
         
        <br/>	 
       	 <Link to="/createperson">Create a new Person</Link>
        <br/> <br/>

         <table id="persons" className="table table-striped">
          <thead>
           
          <tr><td><b>Name</b></td><td><b>Email</b></td><td><b>Age</b></td><td></td></tr>
                                    
          </thead>
          <tbody>
            {
              this.state.persons.map(function(persons,index) {
                 return <tr key={index} >
                         
                                          
                  <td>{persons.name}</td>
                  <td>{persons.email}</td>
                  <td>{persons.age}</td>

            
                  <td>
				  
				   <button class="btn btn-outline-warning" onClick={this.editPerson.bind(this, persons.id)}>Edit</button>{' '}
				   <button class="btn btn-outline-danger" onClick={this.deletePerson.bind(this, persons.id)}>Delete</button>{' '}
                                    
                 </td>
                 

               </tr>

              }.bind(this))

            }
            
          </tbody>
        </table>
        </div>
      )
    } 

}

export { ListPersonsPage };