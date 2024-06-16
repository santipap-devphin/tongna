import React  from 'react';
import DrafBackend from '../../component/DrafBackend';
import RoomList from '../../wrappers/dashroom/RoomList';

function DashRoom() {
  return (<DrafBackend titlepage={"ห้องพัก"}>
              <RoomList />
          </DrafBackend>
         )
}

export default DashRoom