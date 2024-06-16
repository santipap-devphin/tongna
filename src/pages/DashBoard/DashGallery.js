import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import GalleryMain from '../../wrappers/dashgallery/GalleryMain';


const DashGallery = () => {
  return (<DrafBackend titlepage="Gallery">
                <GalleryMain />
          </DrafBackend>
         )
}

export default DashGallery