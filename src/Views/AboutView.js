import React from 'react';
import ConfigService from "../services/ConfigService";
import TogglHack from '../hacks/TogglHack';

const config=ConfigService.getSingleton();

const AboutView = ({title, description}) =>{

   const jsxContent = (title, description) =>{
      return <>
         <label>{title}</label>
         <p>{description}</p>
      </>;
   }

   const jsxDebugContent =()=>{
      return (config.getLocalStorageDefaultValues()
         .debugMode ) ? 
      <>
         <hr/>
         <h3>=== Debug ===</h3>
         <TogglHack/>
      </>: null;
    }
  

   return (
      <div>
         <h2>About</h2>
         {jsxContent(title,description)} 
         {jsxDebugContent()}
      </div>
   )
}
export default AboutView
