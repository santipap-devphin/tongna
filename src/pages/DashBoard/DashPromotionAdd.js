import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import PromotionAdd from '../../wrappers/dashpromotion/PromotionAdd';

const DashPromotionAdd = () => {
  return (<DrafBackend titlepage="เพิ่ม โปรโมชั่น">
                <PromotionAdd />
         </DrafBackend>
  )
}

export default DashPromotionAdd