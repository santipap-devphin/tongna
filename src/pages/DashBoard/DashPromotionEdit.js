import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import PromotionEdit from '../../wrappers/dashpromotion/PromotionEdit';

function DashPromotionEdit() {
  return (<DrafBackend titlepage="แก้ไข โปรโมชั่น">
                <PromotionEdit />
          </DrafBackend>
        )
}

export default DashPromotionEdit