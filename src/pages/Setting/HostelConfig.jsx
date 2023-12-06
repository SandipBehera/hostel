import React, { Fragment } from 'react'
import CreateAmenities from './Hostel-Config/CreateAmenities'
import CreateRoomType from './Hostel-Config/CreateRoomType'
import CreateDesignation from './Hostel-Config/CreateDesignation'
import { Breadcrumbs } from '../../AbstractElements'

export default function HostelConfig() {
  return (
    <Fragment>
    <Breadcrumbs
        parent="Settings"
        mainTitle="Hostel Config"
        
        title="Hostel Config"
      />
    <CreateAmenities/>
    <CreateRoomType />
    <CreateDesignation />
    </Fragment>
    
  )
}
