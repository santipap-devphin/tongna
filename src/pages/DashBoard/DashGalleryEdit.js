import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import GalEdit from '../../wrappers/dashgallery/GalEdit';

const DashGalleryEdit = () => {
  return (<DrafBackend titlepage="แก้ไขรูปภาพ Gallery">
              <GalEdit />
          </DrafBackend>
  )
}

export default DashGalleryEdit