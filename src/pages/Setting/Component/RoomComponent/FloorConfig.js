import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Label, FormGroup, Button } from "reactstrap";
import { Next } from "../../../../Constant";
import { H5 } from "../../../../AbstractElements";
import DynamicForm from "../../../../Components/DynamicForm";
import { LocalApi, WebApi } from "../../../../api";
import { toast } from "react-toastify";

const FloorConfig = ({ setSteps, setFormdata, formdata }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [Ammenities, setAmmenities] = useState([]);
  const [RoomType, setRoomType] = useState([]);

  const branchId = localStorage.getItem("branchId");

  const fetchRoomConfig = async (type) => {
    try {
      const response = await fetch(`${WebApi}/get_config_by_type/${type}`);
      const respData = await response.json();
      console.log("data is", respData.data);
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

  const onSubmit = async () => {
    const encounteredRoomNumbers = new Set();
    let isDuplicate = false;

    for (let floor = 1; floor <= formdata.floor_count; floor++) {
      for (let room = 1; room <= formdata.room_count; room++) {
        const inputName = `floor${floor}_room${room}`;
        const roomNumber = getValues(inputName) || "";

        if (encounteredRoomNumbers.has(roomNumber)) {
          isDuplicate = true;
          break;
        }

        encounteredRoomNumbers.add(roomNumber);
      }

      if (isDuplicate) {
        break;
      }
    }

    if (isDuplicate) {
      toast.error(
        "Duplicate room numbers found. Please use unique room numbers."
      );
      // {errors, "room count is required"}
      return;
    }

    const updatedRooms = [];

    for (let floor = 1; floor <= formdata.floor_count; floor++) {
      for (let room = 1; room <= formdata.room_count; room++) {
        const inputName = `floor${floor}_room${room}`;
        const roomCapacity = `floor${floor}_room${room}_capacity`;
        const amenitiesControl = `floor${floor}_room${room}_amenities`;
        const roomTypeControl = `floor${floor}_room${room}_roomType`;
        const roomData = {
          floor: floor,
          room: room,
          details: {
            room_no: getValues(inputName) || "",
            capacity: parseInt(getValues(roomCapacity) || 0),
            amenities: getValues(amenitiesControl) || [],
            room_type: getValues(roomTypeControl) || "",
          },
          branch_id: branchId,
        };

        updatedRooms.push(roomData);
      }
    }

    const updatedFormdata = {
      ...formdata,
      rooms: updatedRooms,
    };

    setFormdata(updatedFormdata);

    const sendData = {
      hostel_name: updatedFormdata.hostel_name,
      floor_count: parseInt(updatedFormdata.floor_count) || 0,
      room_count: parseInt(updatedFormdata.room_count) || 0,
      rooms: updatedFormdata.rooms,
      branch_id: branchId,
    };

    sendData.rooms = JSON.stringify(sendData.rooms);
    try {
      const response = await fetch(`${WebApi}/create_rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      const respData = await response.json();

      if (respData.status === "success") {
        toast.success(respData.message);
        setSteps(1);
      } else {
        toast.error(respData.message);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const floor_no = formdata.floor_count || {};
  const room_count = formdata.room_count || {};
  console.log(formdata);
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="form-bookmark needs-validation"
          >
            <DynamicForm
              floor_no={floor_no}
              room_count={room_count}
              register={register}
              RoomType={RoomType}
              Ammenities={Ammenities}
              control={control}
              errors={errors}
            />
            <div className="text-end btn-mb">
              <Button color="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default FloorConfig;
