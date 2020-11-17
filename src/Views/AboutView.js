import React from 'react';
import ConfigService from "../services/ConfigService";
import TogglHack from '../hacks/TogglHack';
import DebugPanel from '../components/DebugPanel';

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
         <DebugPanel/>
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
