import React from "react";
import { Controller } from "react-hook-form";
import { Col, FormGroup, Label, Row } from "reactstrap";
import Select from "react-select";
const DynamicRoom = ({
  hostelName,
  floorNo,
  roomNo,
  roomDetails,
  control,
  register,
}) => {
  console.log("room detail", roomDetails);
  const { room_details } = roomDetails;
  console.log(room_details.details?.amenities)
  const renderInputBoxes = () => {
    // const roomAmenity = room_details.details?.amenities.map((amenity) => {

    //   return amenity;
    // });
    const roomAmenity=room_details?.map((details)=>details.details.amenities?.map((aminity)=>{
        return aminity[0][0]
    }))
  console.log("room aminity",roomAmenity)
    const roomType = room_details[0].details.room_type.map((room) => {
      console.log(room);
      return { value: room, label: room };
    });

    const inputBoxes = [];

    for (let floor = 1; floor <= floorNo; floor++) {
      for (let room = 1; room <= roomNo; room++) {
        const inputName = `floor${floor}_room${room}`;
        const numOfRoom = `floor${floor}_room${room}_capacity`;
        const amenitiesControl = `floor${floor}_room${room}_amenities`;
        const roomTypeControl = `floor${floor}_room${room}_roomType`;
        inputBoxes.push(
          <>
            <Row key={`row${floor}_${room}`}>
              <Col className="col-md-3" key={floor}>
                <FormGroup className="mb-3">
                  <Label htmlFor={inputName}>Room no</Label>
                  <input
                    className={`form-control`}
                    id={inputName}
                    type="text"
                    name={inputName}
                    {...register(inputName, {
                      required: true,
                    })}
                  />
                  <span className="text-danger"></span>
                </FormGroup>
              </Col>
              <Col className="col-md-3" key={floor}>
                <FormGroup className="mb-3">
                  <Label htmlFor={numOfRoom}>Room Capacity</Label>
                  <input
                    className={`form-control`}
                    id={numOfRoom}
                    type="text"
                    name={numOfRoom}
                    {...register(numOfRoom, {
                      required: true,
                    })}
                  />
                </FormGroup>
              </Col>
              <Col className="col-md-3" key={floor}>
                <FormGroup className="mb-3">
                  <Label htmlFor={roomTypeControl}>Room Type</Label>
                  <Controller
                    name={roomTypeControl}
                    control={control}
                    defaultValue={[]}
                    {...register(roomTypeControl, {
                      required: true,
                    })}
                    render={({ field }) => (
                      <Select {...field} options={roomType} isMulti />
                    )}
                  />
                </FormGroup>
              </Col>
              <Col className="col-md-3" key={floor}>
                <Label htmlFor={amenitiesControl}>Room Amenities</Label>

                <Controller
                  name={amenitiesControl}
                  control={control}
                  defaultValue={[]}
                  {...register(amenitiesControl, {
                    required: true,
                  })}
                  render={({ field }) => (
                    <Select {...field} options={roomAmenity} isMulti />
                  )}
                />
              </Col>
            </Row>
          </>
        );
      }
    }

    return inputBoxes;
  };

  return <div>{renderInputBoxes()}</div>;
};

export default DynamicRoom;
