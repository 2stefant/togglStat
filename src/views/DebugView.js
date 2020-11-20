import React from 'react';
import TogglHack from '../hacks/TogglHack';
import DebugPanel from '../components/DebugPanel';
import ErrorBoundary from "../components/ErrorBoundary";

import ConfigService from "../services/ConfigService";
const config=ConfigService.getSingleton();

const DebugView = ({title, description}) =>{

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
         <ErrorBoundary>
            <TogglHack/>
         </ErrorBoundary>
      </>: null;
    }
  

   return (
      <div>
         <h2>Debug</h2>
         {jsxContent(title,description)} 
         {jsxDebugContent()}
      </div>
   )
}
export default DebugView
