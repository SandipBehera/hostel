import React, { Fragment, useState } from 'react'
import { Button, Card, CardBody, FormGroup, Input, Label } from 'reactstrap'
import { Breadcrumbs } from '../../../AbstractElements'
import {useLocation,useParams} from 'react-router-dom'
import { useForm } from "react-hook-form";
import DynamicRoom from './DynamicRoom'
const EditRoom = () => {
    const location=useLocation();
    const { register, getValues, control,formState: { errors } } = useForm();
      const { roomDetails } = location.state || {};
    const[hostelName,setHostelName]=useState(roomDetails?.hostel_name || "")
    const[floorNo,setFloorNo]=useState(roomDetails?.floor_count || "")
    const[roomNo,setRoomNo]=useState(roomDetails?.room_count || "")
    // const[roomType,setRoomType]=useState();
    const handleEdit=()=>{
       console.log(hostelName,floorNo,roomNo)
    }
  return (
    <Fragment>
         <Breadcrumbs
        parent="Room Management"
        mainTitle="Update Room Details"
        title="Update Room Details"
      />
      <Card>
         <CardBody>
         <FormGroup>
          <Label for="name">H-Name</Label>
          <Input type="text" name="name" id="name" value={hostelName} onChange={(e)=>setHostelName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="floors">Number of Floors</Label>
          <Input type="text" name="floors" id="floors" value={floorNo} onChange={(e)=>setFloorNo(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="floors">Number of Rooms</Label>
          <Input type="text" name="floors" id="floors" value={roomNo} onChange={(e)=>setRoomNo(e.target.value)} />
        </FormGroup>
        
             <hr></hr>
        <DynamicRoom 
        hostelName={hostelName}
         floorNo={floorNo}
          roomNo={roomNo}
           roomDetails={roomDetails}
           control={control}
           register={register}
           />
         
        {/* {roomDetails.room_details?.map((room)=>
       
        {
          console.log("room",room)
        // return  <h1>{room.details.room_no}</h1>
        return(
          <input
          className={`form-control`}
          type="text"
          name={room.details.room_no}
         
        />
        )
        })} */}
        <Button color="primary" onClick={handleEdit}>
          Save Changes
        </Button>
         </CardBody>
     </Card>  
       
        
      
    </Fragment>

  )
}

export default EditRoom
