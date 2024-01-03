import React, { Fragment } from "react";
import { Row, Col, Form, Label, FormGroup, Button } from "reactstrap";
import { Previous, Next } from "../../../../Constant";
import { useForm } from "react-hook-form";
import { H5 } from "../../../../AbstractElements";

const CreateRoom = ({ setSteps, setFormdata, formdata }) => {
  const {
    register,
    handleSubmit,
    reset, // Add the reset function from react-hook-form
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data) {
      setFormdata((prev) => ({ ...prev, ...data }));
      setSteps((pre) => pre + 1);
      reset(); // Reset the form fields after successful submission
    }
  };

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <H5>Room Configuration</H5>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="form-bookmark needs-validation"
          >
            <FormGroup className="mb-3">
              <Label htmlFor="hostel_name">Hostel Name</Label>
              <input
                className={`form-control ${errors.hostel_name && "is-invalid"}`}
                id="hostel_name"
                type="hostel_name"
                name="hostel_name"
                // defaultValue={formdata.hostel_name || ""}
                {...register("hostel_name", { required: true })}
              />
              <span className="text-danger">
                {errors.hostel_name && "Hostel name is required"}
              </span>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label htmlFor="floor_count">No of Floors</Label>
              <input
                className={`form-control ${errors.floor_count && "is-invalid"}`}
                id="floor_count"
                type="text"
                name="floor_count"
                // defaultValue={formdata.floor_count || ""}
                {...register("floor_count", { required: true })}
              />
              <span className="text-danger">
                {errors.floor_count && "floor count is required"}
              </span>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label htmlFor="room_count">No of Rooms</Label>
              <input
                className={`form-control ${errors.room_count && "is-invalid"}`}
                id="room_count"
                type="text"
                name="room_count"
                // defaultValue={formdata.room_count || ""}
                {...register("room_count", { required: true })}
              />
              <span className="text-danger">
                {errors.room_count && "room count is required"}
              </span>
            </FormGroup>
            <div className="text-end">
        
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
