import React, { useEffect } from "react";
import { WebApi } from "../../../api";
import { Col, Container, Row } from "reactstrap";
import SimpleMDE from "react-simplemde-editor";

const StudentComplaint = ({ setComplaint }) => {
  return (
    <div>
      <Container fluid={true}>
        <Row>
          <Col sm="12" md="12" xxl="12">
            Enter Complaint
            <SimpleMDE
              id="editor_container"
              onChange={setComplaint}
              //   value={complaint}
              options={{
                autofocus: true,
                spellChecker: false,
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentComplaint;
