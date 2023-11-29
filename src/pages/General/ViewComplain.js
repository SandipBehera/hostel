
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import {Link} from "react-router-dom";
import { Breadcrumbs } from "../../AbstractElements";
import "./Complaints.css";

const ViewComplaint = () => {

  
  const [data, setData] = useState([
    {
      id: 1,
      student: "Student 1",
      hostel: "Hostel A",
      description: "Complaint 1 description",
      processing: false,
    },
    {
      id: 2,
      student: "Student 2",
      hostel: "Hostel B",
      description: "Complaint 2 description",
      processing: false,
    },
    {
      id: 3,
      student: "Student 3",
      hostel: "Hostel A",
      description: "Complaint 1 description",
      processing: false,
    },
    {
      id: 4,
      student: "Student 4",
      hostel: "Hostel B",
      description: "Complaint 2 description",
      processing: false,
    },
    
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setViewModalOpen(true);
    setProcessModalOpen(false); // Close the process modal
  };

  const handleStartProcess = (complaint) => {
    setSelectedComplaint(complaint);
    setProcessModalOpen(true);
    setViewModalOpen(false); // Close the view modal
  };

  const handleProcessSubmit = () => {
    // Perform the process assignment logic here
    // For simplicity, just showing a success message
    setSuccessMessage("Employee assigned successfully!");

    // Update the processing status in the data
    const updatedData = data.map((complaint) =>
      complaint.id === selectedComplaint.id
        ? { ...complaint, processing: true }
        : complaint
    );
    setData(updatedData);

    setProcessModalOpen(false);
  };

  return (
    <div>
      <Breadcrumbs
        parent="General"
        mainTitle="View Complain"
        title="View Complain"
      />
      <Table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Hostel</th>
            <th>View</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.student}</td>
              <td>{complaint.hostel}</td>
              <td>
                <Button color="info" onClick={() => handleView(complaint)}>
                  View
                </Button>
              </td>
              <td>
                <Button
                  color={complaint.processing ? "success" : "primary"}
                  onClick={() => handleStartProcess(complaint)}
                >
                  {complaint.processing ? <Link className="link-text" to={`complain-status/${complaint.id}`}>In processing</Link> : "Start Process"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* View Complaint Modal */}
      <Modal isOpen={viewModalOpen}>
        <ModalHeader>Complaint Details</ModalHeader>
        <ModalBody>
          {selectedComplaint && (
            <div>
              <p>{selectedComplaint.description}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* Start Process Modal */}
      <Modal isOpen={processModalOpen}>
        <ModalHeader>Assign Employee</ModalHeader>
        <ModalBody>
      

          <Input className="form-control form-control-primary-fill btn-square" name="select" type="select" 
          value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
          >
              <option value="opt1">Select Employee</option>
              <option value="opt2">Employee-1</option>
              <option value="opt3">Employee-2</option>
              <option value="opt4">Employee-3</option>
              <option value="opt5">Employee-4</option>
              <option value="opt6">Employee-5</option>
              <option value="opt7">Employee-6</option>
              <option value="opt8">Employee-7</option>
          </Input>


        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleProcessSubmit}>
            Assign
          </Button>{" "}
          <Button color="secondary" onClick={() => setProcessModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Success Message Modal */}
      <Modal isOpen={successMessage !== ""}>
        <ModalHeader>Success!</ModalHeader>
        <ModalBody>
          <p>{successMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setSuccessMessage("")}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewComplaint;
