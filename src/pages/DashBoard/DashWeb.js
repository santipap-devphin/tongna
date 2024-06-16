import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import WebMain from '../../wrappers/dashweb/WebMain';

const DashWeb = () => {
  return (<DrafBackend titlepage={"Web"}>
             <WebMain />
          </DrafBackend>
  )
}

export default DashWeb