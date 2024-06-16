import React from 'react';
import DrafBackend from '../../component/DrafBackend';
import RoomEdit from '../../wrappers/dashroom/RoomEdit';

function DashRoomEdit() {
  return (<DrafBackend titlepage={"แก้ไขข้อมูลห้องพัก"}>
              <RoomEdit />
          </DrafBackend>
  )
}

export default DashRoomEdit