import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Label, FormGroup, Button } from "reactstrap";
import { Next } from "../../../../Constant";
import { H5 } from "../../../../AbstractElements";

const FloorConfig = ({ setSteps, setFormdata, formdata }) => {
  const {
    register,
    handleSubmit,
  } = useForm();

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
          <Form onSubmit={handleSubmit(onSubmit)} className="form-bookmark needs-validation">
            {Object.keys(floor_no).map((floorElement, floorIndex) => (
              <Fragment key={floorIndex}>
                <Row>
                  <Col sm="12">
                    <H5>FloorNo: {floor_no[floorElement]}</H5>
                  </Col>
                </Row>
                <Row>
                  {Array.from({ length: parseInt(room_count[floorElement], 10) }).map((_, roomIndex) => (
                    <Col className="col-md-3" key={roomIndex}>
                      <FormGroup className="mb-3">
                        <Label htmlFor={`fname-${floorElement}-${roomIndex + 1}`}>Room No</Label>
                        <input
                          className={`form-control`}
                          id={`fname-${floorElement}-${roomIndex + 1}`}
                          type="text"
                          name={`fname-${floorElement}-${roomIndex + 1}`}
                          {...register(`fname-${floorElement}-${roomIndex + 1}`, { required: true })}
                        />
                      </FormGroup>
                    </Col>
                  ))}
                </Row>
              </Fragment>
            ))}
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
