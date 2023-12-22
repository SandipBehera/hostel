import React from "react";
import { Col, Container, FormGroup, Input, Row } from "reactstrap";
import { H5 } from "../../../AbstractElements";

const VacantRequest = ({ title, setLeave, setLeaveFrom, setRoom, setHostel }) => {
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 10); 
  const minDateString = minDate.toISOString().split("T")[0]; 

  return (
    <div>
      <Container>
        <H5>{title}</H5>
        <Row>
          <Col sm="12" md="12" xxl="12">
            <FormGroup>
              <label ><strong>Hostel Name:</strong></label>
              <Input
                type="text"
                name="from"
                id="time"
                onChange={setHostel}
              />
            </FormGroup>
            <FormGroup>
            <label><strong>Room Number:</strong></label>
            <Input
              type="text"
              name="from"
              id="time"
              onChange={setRoom}
            />
          </FormGroup>
            <FormGroup>
              <label><strong>From:</strong></label>
              <Input
                type="date"
                name="from"
                id="time"
                onChange={setLeaveFrom}
                min={minDateString}
              />
            </FormGroup>
            <FormGroup>
              <label><strong>Reason:</strong></label>
              <textarea className="form-control" onChange={setLeave} />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VacantRequest;
