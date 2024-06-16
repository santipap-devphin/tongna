import React  from 'react';
import DrafBackend from '../../component/DrafBackend';
import RoomAdd from '../../wrappers/dashroom/RoomAdd';

function DashRoomAdd() {
  return (<DrafBackend titlepage={"เพิ่มห้องพัก"}>
              <RoomAdd />
          </DrafBackend>
  )
}

export default DashRoomAdd