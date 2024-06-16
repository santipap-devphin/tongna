import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import PromotionMain from '../../wrappers/dashpromotion/PromotionMain';

const DashPromotion = () => {
  return (<DrafBackend titlepage="Promotion">
                <PromotionMain/>
          </DrafBackend>
         )
}

export default DashPromotion