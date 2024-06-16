import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import BlogsMain from '../../wrappers/dashblogs/BlogsMain';

const DashBlogs = () => {
  return (<DrafBackend titlepage="Content Blog">
                    <BlogsMain/>
         </DrafBackend>
  )
}

export default DashBlogs