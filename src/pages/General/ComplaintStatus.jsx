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

import CKEditors from 'react-ckeditor-component';
import { Breadcrumbs,   H5 } from "../../AbstractElements";
export default function ComplaintStatus() {

    const [content, setContent] = useState('content');
    const onChange = (evt) => {
        const newContent = evt.editor.getData();
        setContent(newContent);
    };
  const [data, setData] = useState([
    {
      id: 4,
      text: "Rahul",
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
                    <p>Name: {complaint.text}</p>
                    <p>Room: {complaint.room}</p>
                    <p>Hostel: {complaint.hostel}</p>
                    <p>Assigned Employee: {complaint.assignedEmployee}</p>
                    <h6>Complaint Description</h6>
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
                                            'change': onChange
                                        }}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    </Container>
                    
                    </div>



                    <div>
                    
                    </div>
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

// import React, { Fragment, useState, useEffect } from "react";
// import {Link} from "react-router-dom";
// import "./Complaints.css";
// import {
//   Table,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Label,
//   Input
// } from "reactstrap";
// import { Breadcrumbs } from "../../AbstractElements";

// const ViewComplain = (args) => {
//   const [complaints, setComplaints] = useState([
//     {
//       id: 1,
//       text: "Abhishek Gupta",
//       room: 101,
//       hostel: "Hostel-1",
//       assignedEmployee: null,
//     },
//     {
//       id: 2,
//       text: "Rahul",
//       room: 102,
//       hostel: "Hostel-2",
//       assignedEmployee: null,
//     },
//     {
//       id: 3,
//       text: "Dhanajaya",
//       room: 103,
//       hostel: "Hostel-3",
//       assignedEmployee: null,
//     },
//     {
//       id: 4,
//       text: "Sandip",
//       room: 104,
//       hostel: "Hostel-4",
//       assignedEmployee: null,
//     },
//   ]);

//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [viewModal, setViewModal] = useState(false);
//   const [actionModal, setActionModal] = useState(false);
//   const [assignedEmployee, setAssignedEmployee] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [selectedComplaintId, setSelectedComplaintId] = useState(null);
//   const [inProcessingComplaints, setInProcessingComplaints] = useState([]);
//   const [data, setData] =useState([]);

//   console.log(new Set(inProcessingComplaints));

//   useEffect(() => {
//     const storedData = localStorage.getItem("assignedEmployeeData");
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       setAssignedEmployee(parsedData.assignedEmployee);
//       setSuccessMessage(parsedData.successMessage);
//       setSelectedComplaintId(parsedData.selectedComplaintId);
//       setInProcessingComplaints(parsedData.inProcessingComplaints || []);
//     }
//   }, []);

//   useEffect(() => {
//     const dataToStore = {
//       assignedEmployee,
//       selectedComplaintId,
//       inProcessingComplaints,
//     };
//     localStorage.setItem("assignedEmployeeData", JSON.stringify(dataToStore));
//   }, [assignedEmployee, successMessage, selectedComplaintId, inProcessingComplaints]);

//   const openViewModal = (complaint) => {
//     setSelectedComplaint(complaint);
//     setViewModal(!viewModal);
//   };

//   const openActionModal = (complaint) => {
//     if (complaint) {
//       setSelectedComplaint(complaint);
//       setSuccessMessage("");
//       setAssignedEmployee(complaint.assignedEmployee || null);
//       setSelectedComplaintId(complaint.id);
//       setActionModal(!actionModal);
//     }
//     else {
//       setActionModal(false);

//     }
//   };

//   const handleEmployeeSelection = (employee) => {
//     setAssignedEmployee(employee);
//     setSuccessMessage(`${employee} has been assigned.`);

//     setInProcessingComplaints((prevInProcessing) => [
//       ...prevInProcessing,
//       selectedComplaintId,
//     ]);
//   };

//   return (
//     <Fragment>
//       <Breadcrumbs
//         parent="General"
//         mainTitle="View Complain"
//         title="View Complain"
//       />

//       <Table style={{ textAlign: "center" }}>
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Student</th>
//             <th>Hostel</th>
//             <th>Room</th>
//             <th>View</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {complaints.map((complaint) => (
//             <tr key={complaint.id}>
//               <th scope="row">{complaint.id}</th>
//               <td>{complaint.text}</td>
//               <td>{complaint.hostel}</td>
//               <td>{complaint.room}</td>
//               <td className="modal-body">
//                 <Button onClick={() => openViewModal(complaint)}>View</Button>
//               </td>
//               <td>
//               <Button
//               color="success"
//               size="sm"
//               className="mr-2"
//               onClick={() => openActionModal(complaint)}
//               disabled={complaint.assignedEmployee !== null}
//             >
//               {assignedEmployee && inProcessingComplaints.includes(complaint.id)
//                 ? <Link to={`/view-complain/complain-status/${complaint.id}`} className="link-text">In Processing</Link>
//                 : "Start Process"}
//             </Button>

//                 <Modal
//                   isOpen={viewModal}
//                   toggle={() => openViewModal(null)}
//                   {...args}
//                 >
//                   <ModalHeader
//                     toggle={() => openViewModal(null)}
//                     className="modal-header"
//                   >
//                     {selectedComplaint ? "Complaint Details" : ""}
//                   </ModalHeader>
//                   <ModalBody>
//                     {selectedComplaint ? (
//                       <>
//                         Complaint Description
//                       </>
//                     ) : null}
//                   </ModalBody>
//                   <ModalFooter>
//                     <Button
//                       color="secondary"
//                       onClick={() => openViewModal(null)}
//                     >
//                       Close
//                     </Button>
//                   </ModalFooter>
//                 </Modal>

//                 <Modal
//                   isOpen={actionModal}
//                   toggle={() => openActionModal(null)}
//                   {...args}
//                 >
//                   <ModalHeader
//                     toggle={() => openActionModal(null)}
//                     className="modal-header"
//                   >
//                     {selectedComplaint ? "Assign Employee" : ""}
//                   </ModalHeader>
//                   <ModalBody>
//                     {assignedEmployee === null && (
//                       <>

// <Label className="col-form-label">Primary Select</Label>
// <Input className="form-control form-control-primary-fill btn-square" name="select" type="select"  value={assignedEmployee}
// onChange={(e) =>
//   handleEmployeeSelection(e.target.value)
// }>
//     <option value="opt1">Select Employee</option>
//     <option value="opt2">Employee-1</option>
//     <option value="opt3">Employee-2</option>
//     <option value="opt4">Employee-3</option>
//     <option value="opt5">Employee-4</option>
//     <option value="opt6">Employee-5</option>
//     <option value="opt7">Employee-6</option>
//     <option value="opt8">Employee-7</option>
// </Input>
//                       </>
//                     )}
//                     <p>{successMessage}</p>
//                   </ModalBody>
//                   <ModalFooter>
//                     <Button
//                       color="secondary"
//                       onClick={() => openActionModal(null)}
//                     >
//                       Close
//                     </Button>
//                   </ModalFooter>
//                 </Modal>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Fragment>
//   );
// };

// export default ViewComplain;
