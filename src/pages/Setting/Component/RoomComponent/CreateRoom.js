import React, { Fragment } from "react";
import { Row, Col, Form, Label, FormGroup, Button } from "reactstrap";
import { Password, ConfirmPassword, Previous, Next } from "../../../../Constant";
import { useForm } from "react-hook-form";
import { H5 } from "../../../../AbstractElements";

const CreateRoom = ({ setSteps, setFormdata, formdata }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data) {
      setFormdata((prev) => ({ ...prev, ...data }));
      setSteps((pre) => pre + 1);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col sm="12">
        <H5>Room Configuration</H5>
          <Form onSubmit={handleSubmit(onSubmit)} className="form-bookmark needs-validation">
            <FormGroup className="mb-3">
              <Label htmlFor="room_name">Block Name</Label>
              <input className={`form-control ${errors.room_name && "is-invalid"}`} id="room_name" type="room_name" name="room_name" defaultValue={formdata.room_name || ""} {...register("room_name", { required: true })} />
              <span className="text-danger">{errors.room_name && "Room name is required"}</span>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label htmlFor="floor_no">No of Floors</Label>
              <input className={`form-control ${errors.floor_no && "is-invalid"}`} id="floor_no" type="text" name="floor_no" defaultValue={formdata.floor_no || ""} {...register("floor_no", { required: true })} />
              <span className="text-danger">{errors.floor_no && "floor no is required"}</span>
            </FormGroup>
            <FormGroup className="mb-3">
            <Label htmlFor="room_no">No of Rooms</Label>
            <input className={`form-control ${errors.room_no && "is-invalid"}`} id="room_no" type="text" name="room_no" defaultValue={formdata.room_no || ""} {...register("room_no", { required: true })} />
            <span className="text-danger">{errors.room_no && "room no is required"}</span>
          </FormGroup>
          
            <div className="text-end">
              <Button className="secondary me-2" onClick={() => setSteps((pre) => pre - 1)}>
                {Previous}
              </Button>
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

export default CreateRoom;
