import React from "react";
import { Col, Container, FormGroup, Row } from "reactstrap";
import { H5 } from "../../../AbstractElements";

export default function StudentLeave({
  title,
  setLeave,
  setLeaveFrom,
  setLeaveTo,
}) {
  return (
    <div>
      <Container>
        <Row>
          <Col sm="12" md="12" xxl="12">
            <H5>{title}</H5>
            <FormGroup>
              <label><strong>From:</strong></label>
              <input
                type="date"
                className="form-control"
                onChange={setLeaveFrom}
              />
            </FormGroup>
            <FormGroup>
              <label><strong>To:</strong></label>
              <input
                type="date"
                className="form-control"
                onChange={setLeaveTo}
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
}
