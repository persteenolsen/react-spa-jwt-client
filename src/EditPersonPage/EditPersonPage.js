import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import queryString from 'query-string';

import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';


class EditPersonPage extends React.Component {

    constructor(props) {

      super(props);
      this.state = {id: '', name: '', email: '', age: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
    	
	  const value = queryString.parse(this.props.location.search);
    const urlid = value.id;
       
	 // By web.config CORS are enable and method GET, POST, PUT and DELETE are allowed in my Node.js app at Azure
	 //fetch('https://pso-node-react-spa.azurewebsites.net/getperson/' + urlid )
		
   // fetch('getperson/' + urlid)
    const requestOptions = { 
          method: 'GET', 
          headers: authHeader() 
         };

    fetch(`${config.apiUrl}/persons/` + urlid, requestOptions)
	
    .then(response => {
        return response.json();
    }).then(result => {

    // console.log(result);
     this.setState({
      id:result.id,
      name:result.name,
      email:result.email,
      age:result.age
     });
    });

    }


    handleChange(event) {
     const state = this.state
     state[event.target.name] = event.target.value
     this.setState(state);
    }


    handleSubmit(event) {
		
     event.preventDefault();
     	 
	  // By web.config CORS are enable and method GET, POST, PUT and DELETE are allowed in my Node.js app at Azure
	   const requestOptions = { 
           method: 'PUT', 
           body: JSON.stringify({ id: this.state.id, name: this.state.name, email:  this.state.email, age:  this.state.age  }), 
           headers: authHeader() 
         };
       
 fetch(`${config.apiUrl}/persons/` + this.state.id, requestOptions)

 .then(response => {

      // If the New Person was create the server will responde with 200 or 202
      if(response.status == 200 || response.status == 202 ) {
        alert("The Person was updated successfully");
              		
        // React: The user is redirected to the admin list of Persons using withRouter from react-router-dom
		   this.props.history.push("/persons");
				  
      }
      else
          alert("One or more values may be wrong and the Person was not updated!");
     });
    }
    
    render() {
      return (
     <div id="container">
          
		<br/>
		
		<Link to="/persons">View the list of Persons</Link>        
		
		<br/> <br/>

        <form onSubmit={this.handleSubmit}>

           <table className="react-table-edit">
            
            <tr>
             <td colSpan="2">
                 <input type="hidden" name="id" value={this.state.id}/>
              </td>
            </tr>

            <tr>
              <td>
                 <label>Name:</label>
             </td>
            
             <td>
               <input className="react-input-text" type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Length 2 to 30 letters" />
             </td>
           </tr>

           <tr>
              <td>
             <label>Email:</label>
             </td>
             
             <td>
             <input className="react-input-text" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="xxx@yyy.com" />
             </td>
           </tr>
            
           <tr>
              <td>
              <label>Age:</label>
              </td>
             
             <td>
             <input className="react-input-text" type="text" name="age" value={this.state.age} onChange={this.handleChange} placeholder="Number from 18 to 125" />
             </td>
           </tr>

           <tr>
              <td colSpan="2">	
			  
			   <button type="submit" class="btn btn-outline-primary">Submit</button>
			  
             </td>
           </tr>
          </table>

        </form>
        </div>
      );
    }
  }

  export { EditPersonPage };
  
  