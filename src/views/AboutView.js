import React from 'react';

const AboutView = ({title, description}) =>{

   const jsxContent = (title, description) =>{
      return <>
         <label>{title}</label>
         <br/>
         <label>Product version: <strong>{process.env.REACT_APP_VERSION}</strong></label>
         <br/>
         <p>{description}</p>
         <br/>
         <label>React version: <strong>{React.version}</strong></label>
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
