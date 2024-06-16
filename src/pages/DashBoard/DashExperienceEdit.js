import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import ExperEdit from '../../wrappers/dashexperience/ExperEdit';

function DashExperienceEdit() {
  return (<DrafBackend titlepage="แก้ไข Experience">
             <ExperEdit />
         </DrafBackend>
  )
}

export default DashExperienceEdit