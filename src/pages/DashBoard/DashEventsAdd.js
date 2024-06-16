import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import EventsAdd from '../../wrappers/dashevent/EventsAdd';

const DashEventsAdd = () => {
  return (<DrafBackend titlepage="เพิ่ม Events">
                <EventsAdd/>
          </DrafBackend>
  )
}

export default DashEventsAdd