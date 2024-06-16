import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import CategoryAdd from '../../wrappers/dashcategory/CategoryAdd';

const DashCategoryAdd = () => {
  return (<DrafBackend titlepage="เพิ่ม หมวดหมู่">
                <CategoryAdd />
          </DrafBackend>
        )
}

export default DashCategoryAdd