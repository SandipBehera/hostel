import react, { Fragment } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { H5 } from "../../AbstractElements";

const DynamicForm = ({ floor_no, room_count, register }) => {
  const renderForm = () => {
    const formElements = [];
    for (let floor = 1; floor <= floor_no; floor++) {
      const floorField = [];
      for (let room = 1; room <= room_count; room++) {
        const inputName = `floor${floor}_room${room}`;
        const roomCapacity = `floor${floor}_room${room}_capacity`;
        floorField.push(
          <>
            <Col className="col-md-3" key={floor}>
              <FormGroup className="mb-3">
                <Label htmlFor={inputName}>Room No</Label>
                <input
                  className={`form-control`}
                  id={inputName}
                  type="text"
                  name={inputName}
                  {...register(inputName, {
                    required: true,
                  })}
                />
              </FormGroup>
            </Col>
            <Col className="col-md-3" key={floor}>
              <FormGroup className="mb-3">
                <Label htmlFor={inputName}>Room Capacity</Label>
                <input
                  className={`form-control`}
                  id={roomCapacity}
                  type="text"
                  name={roomCapacity}
                  {...register(roomCapacity, {
                    required: true,
                  })}
                />
              </FormGroup>
            </Col>
          </>
        );
      }
      formElements.push(
        <Fragment key={`floor${floor}`}>
          <Row>
            <Col sm="12">
              <H5>{`Floor ${floor}`}</H5>
            </Col>
          </Row>
          <Row>{floorField}</Row>
        </Fragment>
      );
    }
    return formElements;
  };
  return <Fragment>{renderForm()}</Fragment>;
};
export default DynamicForm;
