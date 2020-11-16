import React from 'react';

const AboutView = ({title, description}) =>{

   const jsxContent = (title, description) =>{
      return <>
         <label>{title}</label>
         <p>{description}</p>
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
