import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import CKEditors from "react-ckeditor-component";
import { Breadcrumbs, H5 } from "../../AbstractElements";
export default function ComplainAction() {
  const [content, setContent] = useState("content");
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };
  const [data, setData] = useState([
    {
      id: 4,
      text: "Rahul Mishra",
      room: 104,
      hostel: "Hostel-4",
      assignedEmployee: "Abhishek Gupta",
      complaintDetails:
        "There have been instances where the quality of ingredients used in the preparation of meals has been questionable. Freshness and hygiene are crucial aspects of a healthy diet, and I believe ensuring the procurement of high-quality ingredients is essential.",
      
    },
  
  ]);
  return (
    <Fragment>
      <Breadcrumbs
        parent="General"
        mainTitle="Complaint Status"
        title="Complaint Status"
      />
      <div className="page-wrapper " id="pageWrapper">
        <Card className="my-2 complaint-card">
          <CardBody>
            <CardTitle tag="h5" style={{ textAlign: "center" }}>
              Complaint Status
            </CardTitle>
            <CardText>
              {data.map((complaint) => (
                <>
                  <div key={complaint.id} className="">
                    <p><strong>Name:</strong> {complaint.text}</p>
                    <p><strong>Room: </strong>{complaint.room}</p>
                    <p><strong>Hostel: </strong>{complaint.hostel}</p>
                    <h6><strong>Complaint Description</strong></h6>
                    <p>{complaint.complaintDetails}</p>

                    <div>
                      <Container fluid={true}>
                        <Row>
                          <Col sm="12">
                            <Card>
                              <H5>Status</H5>

                              <CardBody>
                                <CKEditors
                                  activeclassName="p10"
                                  content={content}
                                  events={{
                                    change: onChange,
                                  }}
                                />
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </Container>
                    </div>

                    <div></div>
                  </div>
                </>
              ))}
            </CardText>
            <CardText></CardText>
          </CardBody>
          <CardFooter className="complaint-status-footer">
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </Fragment>
  );
}
