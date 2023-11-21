

import React, { useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  Input,
  CardTitle,
  Label,
  Button,
  Container,
  CardBody,
  CardSubtitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import Select from "react-select";
import { options2 } from "../../Components/Forms/FormWidget/FormSelect2/OptionDatas";
import { H5 } from "../../AbstractElements";
import "../styles/take_attendence.css";
import { data } from "./data";

const Take_Attendence = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [zoomedInIds, setZoomedInIds] = useState([]);
  const [student, setStudent] = useState(data);
  const [absentDetails, setAbsentDetails] = useState(null);

  const [msg, setMsg] = useState("");

  const currentDate = new Date();
  const time = currentDate.toTimeString();

  const toggleZoom = (id) => {
    setZoomedInIds((prevIds) =>
    prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
  );
   
  };

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  function present(name, regidNo, room, hostel, available) {
    const data = {
      name,
      regidNo,
      room,
      hostel,
      available,
      time,
    };
    console.log(data);
  }
  function absent(name, regidNo, room, hostel, available,msg) {
    const data = {
      name,
      regidNo,
      room,
      hostel,
      available,
      time,
      msg
    };
    setAbsentDetails(data);
    openModal();
    console.log(data);
  }

  return (
    <>
      <Card>
        <H5>Take Attendence</H5>
        {/*drop down*/}
        <Row style={{ padding: "4px" }}>
          <Col md="4">
            <div className="mb-2" style={{ width: "100%" }}>
              <Label className="col-form-label">Select Hostel name</Label>
              <Select
                options={options2}
                className="js-example-basic-single col-sm-12"
              />
            </div>
          </Col>
          <Col md="4">
            <div className="mb-2" style={{ width: "100%" }}>
              <Label className="col-form-label">Select Floor Name</Label>
              <Select
                options={options2}
                className="js-example-basic-single col-sm-12"
              />
            </div>
          </Col>
          <Col md="4">
            <div className="mb-2" style={{ width: "100%" }}>
              <Label className="col-form-label">Select Room No</Label>
              <Select
                options={options2}
                className="js-example-basic-single col-sm-12"
              />
            </div>
          </Col>
        </Row>

        <hr></hr>
        {/*student available in room */}
        <Container className="mt-4" style={{ margintop: "10px" }}>
          <Row>
          {student.map((stud, index) => (
            <Col md="4" style={{ margintop: "50px" }}>
              
                <Button
                  onClick={() => toggleZoom(stud.Regd_no)}
                  color="none"
                  style={{ border: "none", outline: "none" }}
                  key={index}
                >
                  <Card
                  className={`zoomable-image ${
                    zoomedInIds.includes(stud.Regd_no) ? "zoomed-out" :  "zoomed-in" 
                  }`}
                    style={{
                      width: "18rem",
                    }}
                  >
                    <img alt="Sample" src="https://picsum.photos/300/200" />
                    <CardBody>
                      <CardTitle tag="h5">Name:{stud.name}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Regd_no: {stud.Regd_no}
                      </CardSubtitle>
                      <CardText>Room_no:{stud.Room_no}</CardText>
                      <CardText>HostelName:{stud.Hostel_name}</CardText>
                      <CardText>available:{stud.available}</CardText>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Button
                          color="success"
                          onClick={() =>
                            present(
                                stud.name,
                              stud.Regd_no,
                              stud.Room_no,
                              stud.Hostel_name,
                              stud.available
                            )
                          }
                        >
                          present
                        </Button>
                        <Button
                          color="danger"
                          onClick={() =>
                            openModal()
                          }
                        >
                          absent
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Button>
           {/*modal */}
      <div>
      <Modal isOpen={modalOpen} toggle={openModal}>
        <ModalHeader toggle={openModal}>where are you ....</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleText">write here</Label>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              rows="5"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() =>absent(
            stud.name,
          stud.Regd_no,
          stud.Room_no,
          stud.Hostel_name,
          stud.available,
          msg
        )
           } >
            send
          </Button>
          {/* Additional buttons or actions can be added here */}
        </ModalFooter>
      </Modal>
    </div>
            </Col>
            ))}
          </Row>
        </Container>
      </Card>

      
    </>
  );
};

export default Take_Attendence;
