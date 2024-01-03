import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import { useLocation, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { WebApi } from "../../../api";
const EditRoom = () => {
  const location = useLocation();
  const {
    handleSubmit,
    register,
    getValues,
    control,
    formState: { errors },
  } = useForm();
  const { roomDetails } = location.state || {};
  const [hostelName, setHostelName] = useState(roomDetails?.hostel_name || "");
  const [floorNo, setFloorNo] = useState(roomDetails?.floor_count || "");
  const [roomNo, setRoomNo] = useState(roomDetails?.room_count || "");
  const branchId = localStorage.getItem("branchId");
  const [Ammenities, setAmmenities] = useState([]);
  const [RoomType, setRoomType] = useState([]);
  // const[roomType,setRoomType]=useState();
  const fetchRoomConfig = async (type) => {
    try {
      const response = await fetch(`${WebApi}/get_config_by_type/${type}`);
      const respData = await response.json();

      return respData.data.filter(
        (item) => item.branch_id === parseInt(branchId)
      );
    } catch (error) {
      console.error("Error fetching room config:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const amenities = await fetchRoomConfig("ammenities");
        const roomType = await fetchRoomConfig("room_type");
        setAmmenities(amenities[0].config_type_name.data);
        setRoomType(roomType[0].config_type_name.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleEdit = () => {
    const updatedRooms = [];
    let count = 0;
    roomDetails.room_details.map((room, index) => {
      const inputName = `floor${room.floor}_room${room.room}`;
      const roomCapacity = `floor${room.floor}_room${room.room}_capacity`;
      const amenitiesControl = `floor${room.floor}_room${room.room}_amenities`;
      const roomTypeControl = `floor${room.floor}_room${room.room}_roomType`;
      const roomData = {
        floor: room.floor,
        room: room,
        details: {
          room_no: getValues(inputName) || "",
          capacity: parseInt(getValues(roomCapacity) || 0),
          amenities: getValues(amenitiesControl) || [],
          room_type: getValues(roomTypeControl) || [],
        },
        branch_id: branchId,
      };
      console.log(count++);
      updatedRooms.push(roomData);
    });

    const updatedFormdata = {
      rooms: updatedRooms,
    };
    console.log("edit", updatedFormdata);
  };
  const roomDataTypes = RoomType.map((room) => {
    return { value: room, label: room };
  });

  const roomAmenities = Ammenities.map((room) => {
    return { value: room, label: room };
  });
  return (
    <Fragment>
      <Breadcrumbs
        parent="Room Management"
        mainTitle="Update Room Details"
        title="Update Room Details"
      />
      <Card>
        <CardBody>
          <Form
            onSubmit={handleSubmit(handleEdit)}
            className="form-bookmark needs-validation"
          >
            <FormGroup>
              <Label for="name">H-Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={hostelName}
                onChange={(e) => setHostelName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="floors">Number of Floors</Label>
              <Input
                type="text"
                name="floors"
                id="floors"
                value={floorNo}
                onChange={(e) => setFloorNo(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="floors">Number of Rooms</Label>
              <Input
                type="text"
                name="floors"
                id="floors"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
              />
            </FormGroup>

            <hr></hr>
            {roomDetails.room_details.map((room, index) => {
              const inputName = `floor${room.floor}_room${room.room}`;
              const numOfRoom = `floor${room.floor}_room${room.room}_capacity`;
              const amenitiesControl = `floor${room.floor}_room${room.room}_amenities`;
              const roomTypeControl = `floor${room.floor}_room${room.room}_roomType`;
              const roomAmenityOptions =
                room?.details.amenities.map((amenity) => ({
                  value: amenity.label,
                  label: amenity.label,
                })) || [];
              const roomTypeOptions =
                room?.details.room_type.map((type) => ({
                  value: type.label,
                  label: type.label,
                })) || [];
              return (
                <Row key={`room_${index}`}>
                  <Col className="col-md-3" key={`room_${index}`}>
                    <FormGroup className="mb-3">
                      <Label htmlFor={inputName}>Room no</Label>
                      <input
                        className={`form-control`}
                        id={inputName}
                        type="text"
                        name={inputName}
                        defaultValue={room.details.room_no || ""}
                        {...register(inputName, {
                          required: true,
                        })}
                      />
                      <span className="text-danger"></span>
                    </FormGroup>
                  </Col>
                  <Col className="col-md-3" key={`capacity_${index}`}>
                    <FormGroup className="mb-3">
                      <Label htmlFor={numOfRoom}>Room Capacity</Label>
                      <input
                        className={`form-control`}
                        id={numOfRoom}
                        type="text"
                        name={numOfRoom}
                        defaultValue={room?.details.capacity || ""}
                        {...register(numOfRoom, {
                          required: true,
                        })}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-md-3" key={`room_type_${index}`}>
                    <FormGroup className="mb-3">
                      <Label htmlFor={roomTypeControl}>Room Type</Label>
                      <Controller
                        name={roomTypeControl}
                        control={control}
                        defaultValue={roomTypeOptions}
                        {...register(roomTypeControl || roomTypeOptions)}
                        render={({ field }) => (
                          <Select {...field} options={roomDataTypes} isMulti />
                        )}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-md-3" key={`room_amenities_${index}`}>
                    <Label htmlFor={amenitiesControl}>Room Amenities</Label>
                    <Controller
                      name={amenitiesControl}
                      control={control}
                      defaultValue={roomAmenityOptions}
                      {...register(amenitiesControl || roomAmenityOptions)}
                      render={({ field }) => (
                        <Select {...field} options={roomAmenities} isMulti />
                      )}
                    />
                  </Col>
                </Row>
              );
            })}
            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default EditRoom;
