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
import { useParams } from "react-router";
export default function ComplaintStatus() {
  const id = useParams();
  const [content, setContent] = useState("content");
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${WebApi}/get_complaints`, {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: document.cookie,
          },
        });
        const respData = await response.json();
        setData(respData.data.filter((complaint) => complaint.id === id));
        console.log(respData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, for example, set an error state
      }
    };
    fetchData();
  }, []);
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
                    {/* <p>Name: {complaint.text}</p> */}
                    {/* <p>Room: {complaint.room}</p>
                    <p>Hostel: {complaint.hostel}</p>
                    <p>Assigned Employee: {complaint.assignedEmployee}</p>
                    <h6>Complaint Description</h6>
                    <p>{complaint.complaintDetails}</p> */}

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
