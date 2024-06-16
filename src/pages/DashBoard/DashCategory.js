import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import CategoryMain from '../../wrappers/dashcategory/CategoryMain';

const DashCategory = () => {
  return (<DrafBackend titlepage="หมวดหมู่">
                <CategoryMain />
          </DrafBackend>
  )
}

export default DashCategory