import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import WebAdd from '../../wrappers/dashweb/WebAdd';

const DashWebAdd = () => {
  return (<DrafBackend titlepage="เพิ่มข้อมูลเว็บ">
              <WebAdd />
          </DrafBackend>
        )
}

export default DashWebAdd