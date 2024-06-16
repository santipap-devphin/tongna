import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import ContactMain from '../../wrappers/dashcontact/ContactMain';

const DashContact = () =>  {
    return (<DrafBackend titlepage="ข้อความติดต่อ">
                 <ContactMain />
            </DrafBackend>
    )
}

export default DashContact