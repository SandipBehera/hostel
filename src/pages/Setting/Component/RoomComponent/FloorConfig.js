import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Label, FormGroup, Button } from "reactstrap";
import { Next } from "../../../../Constant";
import { H5 } from "../../../../AbstractElements";
import DynamicForm from "../../../../Components/DynamicForm";

const FloorConfig = ({ setSteps, setFormdata, formdata }) => {
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = (data) => {
    const rooms = [];

    for (let floor = 1; floor <= formdata.floor_count; floor++) {
      for (let room = 1; room <= formdata.room_count; room++) {
        const inputName = `floor${floor}_room${room}`;
        const roomCapacity = `floor${floor}_room${room}_capacity`;

        const roomData = {
          floor: floor,
          room: room,
          details: {
            room_no: getValues(inputName) || "",
            capacity: parseInt(getValues(roomCapacity) || 0),
          },
        };

        rooms.push(roomData);
      }
    }

    setFormdata((prev) => ({ ...prev, rooms: rooms }));
    setSteps((prev) => prev + 1);
  };

  const floor_no = formdata.floor_count || {};
  const room_count = formdata.room_count || {};

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
            />
            <div className="text-end btn-mb">
              <Button className="primary" type="submit">
                {Next}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default FloorConfig;
