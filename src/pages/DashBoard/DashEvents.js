import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import EventsMain from '../../wrappers/dashevent/EventsMain';

const DashEvents = () => {
  return (<DrafBackend titlepage="Events">
                <EventsMain />
          </DrafBackend>
        )
}

export default DashEvents