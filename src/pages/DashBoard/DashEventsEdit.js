import React from 'react'
import DrafBackend from '../../component/DrafBackend';
import EventsEdit from '../../wrappers/dashevent/EventsEdit';

const DashEventsEdit = () => {
  return (<DrafBackend titlepage="แก้ไข Events">
                <EventsEdit />
         </DrafBackend>
        )
}

export default DashEventsEdit