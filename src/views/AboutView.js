import React from 'react';
/**
 * Demonstrates the following React concepts:
 * Arrow function component.
 * Reading data from '.env' file and determine product version.
 */
const AboutView = ({title, description}) =>{

   const jsxContent = (title, description) =>{
      return <>
         <div className="card" >
            <div className="card-body">
               <h5 className="card-title">{title} {process.env.REACT_APP_VERSION}</h5>
               <p class="card-text">{description}</p>
               <p class="card-text">React version: {React.version}</p>
            </div>
         </div>
      </>;
   }

   return (
      <div>
         <h2>About</h2>
         {jsxContent(title,description)} 
      </div>
   )
}
export default AboutView
