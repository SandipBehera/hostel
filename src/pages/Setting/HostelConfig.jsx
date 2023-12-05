import React, { Fragment } from 'react'
import CreateAmenities from './Hostel-Config/CreateAmenities'
import CreateRoomType from './Hostel-Config/CreateRoomType'
import CreateDesignation from './Hostel-Config/CreateDesignation'

export default function HostelConfig() {
  return (
    <Fragment>
    <CreateAmenities/>
    <CreateRoomType />
    <CreateDesignation />
    </Fragment>
    
  )
}
