import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../AbstractElements";
import "./Complaints.css";
import socketIOClient from "socket.io-client";
import { LocalApi, WebApi, WebSocketAPI } from "../../api";

const ViewComplaint = () => {
  const socket = socketIOClient(WebSocketAPI);

  const [data, setData] = useState([]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${WebApi}/get_complaints`, {
          method: "GET",
        });
        const respData = await response.json();
        setData(respData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, for example, set an error state
      }
    };
    const handleNewComplaint = (newComplaint) => {
      setData((prevComplaints) => [...prevComplaints, newComplaint]);
    };
    fetchData();
    socket.on("newComplaint", handleNewComplaint);
    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off("newComplaint", handleNewComplaint);
    };
  }, []);

  const handleView = (complaint) => {
    data.filter((item) => {
      if (item.id === complaint) {
        setSelectedComplaint(item);
      }
    });
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
  console.log(data);
  console.log(selectedComplaint);

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
            <th>Name</th>
            <th>Issue Type</th>
            <th>View</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined && data.length > 0 ? (
            data.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.issued_by}</td>
                <td>{complaint.issue_type}</td>
                <td>
                  <Button color="info" onClick={() => handleView(complaint.id)}>
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    color={complaint.status ? "success" : "primary"}
                    onClick={() => handleStartProcess(complaint)}
                  >
                    {complaint.status !== "NEW" ? (
                      <Link
                        className="link-text"
                        to={`complain-status/${complaint.id}`}
                      >
                        Assigned to:{complaint.assigned_to} and Status:
                        {complaint.status}
                      </Link>
                    ) : (
                      "Start Process"
                    )}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                <p style={{ color: "red" }}>No Data Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* View Complaint Modal */}
      <Modal isOpen={viewModalOpen}>
        <ModalHeader>Complaint Details</ModalHeader>
        <ModalBody>
          {selectedComplaint && (
            <div
              dangerouslySetInnerHTML={{
                __html: selectedComplaint.details.content,
              }}
            />
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
          <Input
            className="form-control form-control-primary-fill btn-square"
            name="select"
            type="select"
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
