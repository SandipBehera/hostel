import React, { Fragment, useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./Complaints.css";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input
} from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";

const ViewComplain = (args) => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      text: "Abhishek Gupta",
      room: 101,
      hostel: "Hostel-1",
      assignedEmployee: null,
    },
    {
      id: 2,
      text: "Rahul",
      room: 102,
      hostel: "Hostel-2",
      assignedEmployee: null,
    },
    {
      id: 3,
      text: "Dhanajaya",
      room: 103,
      hostel: "Hostel-3",
      assignedEmployee: null,
    },
    {
      id: 4,
      text: "Sandip",
      room: 104,
      hostel: "Hostel-4",
      assignedEmployee: null,
    },
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [assignedEmployee, setAssignedEmployee] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [inProcessingComplaints, setInProcessingComplaints] = useState([]);

  

  useEffect(() => {
    const storedData = localStorage.getItem("assignedEmployeeData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setAssignedEmployee(parsedData.assignedEmployee);
      setSuccessMessage(parsedData.successMessage);
      setSelectedComplaintId(parsedData.selectedComplaintId);
      setInProcessingComplaints(parsedData.inProcessingComplaints || []);
    }
  }, []);

  useEffect(() => {
    const dataToStore = {
      assignedEmployee,
      successMessage,
      selectedComplaintId,
      inProcessingComplaints,
    };
    localStorage.setItem("assignedEmployeeData", JSON.stringify(dataToStore));
  }, [assignedEmployee, successMessage, selectedComplaintId, inProcessingComplaints]);

  const openViewModal = (complaint) => {
    setSelectedComplaint(complaint);
    setViewModal(!viewModal);
  };

  const openActionModal = (complaint) => {
    if (complaint) {
      setSelectedComplaint(complaint);
      setSuccessMessage("");
      setAssignedEmployee(complaint.assignedEmployee || null);
      setSelectedComplaintId(complaint.id);
      setActionModal(!actionModal);
    }
    else {
      setActionModal(false);
      
    }
  };

  const handleEmployeeSelection = (employee) => {
    setAssignedEmployee(employee);
    setSuccessMessage(`${employee} has been assigned.`);

    setInProcessingComplaints((prevInProcessing) => [
      ...prevInProcessing,
      selectedComplaintId,
    ]);
  };
  

  return (
    <Fragment>
      <Breadcrumbs
        parent="General"
        mainTitle="View Complain"
        title="View Complain"
      />

      <Table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Student</th>
            <th>Hostel</th>
            <th>Room</th>
            <th>View</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <th scope="row">{complaint.id}</th>
              <td>{complaint.text}</td>
              <td>{complaint.hostel}</td>
              <td>{complaint.room}</td>
              <td className="modal-body">
                <Button onClick={() => openViewModal(complaint)}>View</Button>
              </td>
              <td>
              <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={() => openActionModal(complaint)}
              disabled={complaint.assignedEmployee !== null}
            >
              {assignedEmployee && inProcessingComplaints.includes(complaint.id)
                ? <Link to={`/view-complain/complain-status/${complaint.id}`} className="link-text">In Processing</Link>
                : "Start Process"}
            </Button>

                <Modal
                  isOpen={viewModal}
                  toggle={() => openViewModal(null)}
                  {...args}
                >
                  <ModalHeader
                    toggle={() => openViewModal(null)}
                    className="modal-header"
                  >
                    {selectedComplaint ? "Complaint Details" : ""}
                  </ModalHeader>
                  <ModalBody>
                    {selectedComplaint ? (
                      <>
                        Complaint Description
                      </>
                    ) : null}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="secondary"
                      onClick={() => openViewModal(null)}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>

                <Modal
                  isOpen={actionModal}
                  toggle={() => openActionModal(null)}
                  {...args}
                >
                  <ModalHeader
                    toggle={() => openActionModal(null)}
                    className="modal-header"
                  >
                    {selectedComplaint ? "Assign Employee" : ""}
                  </ModalHeader>
                  <ModalBody>
                    {assignedEmployee === null && (
                      <>
                      

                        <Label className="col-form-label">Primary Select</Label>
                        <Input className="form-control form-control-primary-fill btn-square" name="select" type="select"  value={assignedEmployee}
                        onChange={(e) =>
                          handleEmployeeSelection(e.target.value)
                        }>
                            <option value="opt1">Select Employee</option>
                            <option value="opt2">Employee-1</option>
                            <option value="opt3">Employee-2</option>
                            <option value="opt4">Employee-3</option>
                            <option value="opt5">Employee-4</option>
                            <option value="opt6">Employee-5</option>
                            <option value="opt7">Employee-6</option>
                            <option value="opt8">Employee-7</option>
                        </Input>
                      </>
                    )}
                    <p>{successMessage}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="secondary"
                      onClick={() => openActionModal(null)}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default ViewComplain;




