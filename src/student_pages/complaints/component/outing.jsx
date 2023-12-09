import React from "react";
import { Col, Container, FormGroup, Input, Row } from "reactstrap";
import { H5 } from "../../../AbstractElements";

const OutingComponent = ({ title, setLeave, setLeaveFrom, setLeaveTo }) => {
  return (
    <div>
      <Container>
        <H5>{title}</H5>
        <Row>
          <Col sm="12" md="12" xxl="12">
            <FormGroup>
              <label>From</label>
              <Input
                type="time"
                name="from"
                id="time"
                onChange={setLeaveFrom}
              />
            </FormGroup>
            <FormGroup>
              <label>To</label>
              <Input type="time" name="to" id="time" onChange={setLeaveTo} />
            </FormGroup>
            <FormGroup>
              <label>Reason</label>
              <textarea className="form-control" onChange={setLeave} />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OutingComponent;
