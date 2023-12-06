import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FormWizardWithIcon } from "../../Constant";
import { Breadcrumbs } from "../../AbstractElements";
import CreateRoom from "./Component/RoomComponent/CreateRoom";
import FloorConfig from "./Component/RoomComponent/FloorConfig";

const RoomManagement = () => {
  const [steps, setSteps] = useState(1);
  const [formdata, setFormdata] = useState({});
  console.log(formdata);
  return (
    <Fragment>
      <Breadcrumbs
        parent="Setting"
        mainTitle="Create Room Layout"
        subParent="Room Management"
        title="Create Room Layout"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                {steps === 1 && (
                  <CreateRoom
                    setSteps={setSteps}
                    setFormdata={setFormdata}
                    formdata={formdata}
                  />
                )}

                {steps === 2 && (
                  <FloorConfig
                    setSteps={setSteps}
                    setFormdata={setFormdata}
                    formdata={formdata}
                  />
                )}

                <div className="text-center">
                  <span
                    className={`step ${steps > 1 ? "finish" : ""} ${
                      steps === 1 ? "active" : ""
                    }`}
                  />
                  <span
                    className={`step ${steps > 2 ? "finish" : ""} ${
                      steps === 2 ? "active" : ""
                    }`}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default RoomManagement;
