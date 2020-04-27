import React from 'react';

import { authenticationService } from '@/_services';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
           
        };
    }

    componentDidMount() {
     
    }

    render() {
        const { currentUser } = this.state;
        return (
         
         <div>
           
             This React client ( SPA ) is consuming JSON data from a secure Node.js and Express Web API
             <br/> <br/>
          
          <ul>
            <li>Manuel configuration of the Webpack serving as a module bundler</li>
			<li>This React Application is NOT made by "Create React App" </li>
            <li>Babel for transpiling JavaScript React ES6 to JavaScript ES5 ready for browsers</li>
            <li>The login system is using a JSON Web Token ( JWT )</li>
            <li>The user will have access to the secure endpoints of 
              the Web API passing login and using the JWT</li>
           </ul> 
          
           <ul>
            <li>The endpoints of the Web API are secured by JWT</li>
            <li>The Web API is secured by CORS allowing only the 
              subdomain containing the SPA client making HTTPS request</li>
            </ul>

          
          <ul>
             <li>React, HTML, CSS, JavaScript ES5 and ES6</li>
             <li>Traditionel Bootstrap by CDN for the responsive design</li>
	         <li>React BrowserRouter for navigation</li>
         </ul>

          <ul>
            <li>Node.js</li>
            <li>Express</li>
         </ul>
   
          <ul>
           <li>MySQL as the database</li>
           <li>The Web API is hosted at Micosoft Azure App Service using Windows and iisnode</li>
        </ul>

         <ul>
           <li>Visual Studio Code as Text Editor</li>
        </ul>

       </div>

	   
      );

    }
}

export { AboutPage };