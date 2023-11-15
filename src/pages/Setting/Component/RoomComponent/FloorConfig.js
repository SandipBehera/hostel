import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Label, FormGroup, Button } from "reactstrap";
import { Next } from "../../../../Constant";
import { H5 } from "../../../../AbstractElements";
import DynamicForm from "../../../../Components/DynamicForm";

const FloorConfig = ({ setSteps, setFormdata, formdata }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setFormdata((prev) => ({ ...prev, ...data }));
    setSteps((prev) => prev + 1);
  };

  const floor_no = formdata.floor_no || {};
  const room_count = formdata.room_no || {};

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
