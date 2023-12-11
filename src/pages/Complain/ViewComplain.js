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
import { LocalApi, LocalSocketAPI, WebApi, WebSocketAPI } from "../../api";
import { Selected } from "../../Constant";
import ComplaintActivity from "../../Components/complaints/complaintActivity";
import { toast } from "react-toastify";


const ViewComplaint = () => {
  const socket = socketIOClient(WebSocketAPI);
  const branch_id = localStorage.getItem("branchId");

  const [data, setData] = useState([]);
  const user = localStorage.getItem("userType");

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch(`${WebApi}/get_complaints`, {
        method: "GET",
      });
      const respData = await response.json();
      if (user === "admin") {
        setData(
          respData.data
          .filter(item =>
              item.branch_id === parseInt(localStorage.getItem("branchId"))
          )
        );

        console.log(respData.data);
      } else {
        setData(
          respData.data.filter(
            (item) => item.assigned_to === localStorage.getItem("userId")
          )
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, for example, set an error state
    }
  };
  useEffect(() => {
    const handleNewComplaint = () => {
      fetchData();
    };
    fetchData();
    socket.on("newComplaint", handleNewComplaint);
    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off("newComplaint", handleNewComplaint);
    };
  }, []);

  const handleView = (complaintId) => {
    const selected = data.find((item) => item.id === complaintId);
    if (selected) {
      setSelectedComplaint(selected);
      setViewModalOpen(true);
      setProcessModalOpen(false);
    }
  };
  

  const handleStartProcess = (complaint) => {
    setSelectedComplaint(complaint);
    setProcessModalOpen(true);
    setViewModalOpen(false); // Close the view modal
  };

  const handleRequestProcess = async (id, type) => {
    const getData = data.filter((item) => item.id === id);

    const updatedata = {
      complaint_id: getData[0].id,
      status: type,
      assignedEmployee: localStorage.getItem("userId"),
      content: getData[0].details,
    };

    updatedata.content = JSON.stringify(updatedata.content);
    const response = await fetch(`${WebApi}/update_complaint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedata),
    });
    const respData = await response.json();
    if (respData.status === "success") {
      toast.success(respData.message);
      fetchData();
    } else {
      toast.error(respData.message);
    }
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
                  {complaint.issue_type === "Complaint" ? (
                    <Button
                      color={complaint.status ? "success" : "primary"}
                      onClick={() => handleStartProcess(complaint)}
                    >
                      {complaint.status !== "NEW" ? (
                        <Link
                          className="link-text"
                          to={`complain-status/${complaint.id}`}
                        >
                          Assigned to:{complaint.assigned_to} <br /> Status:
                          {complaint.status === "" ? "NEW" : complaint.status}
                        </Link>
                      ) : (
                        "Start Process"
                      )}
                    </Button>
                  ) : complaint.status !== "Approved" &&
                    complaint.status !== "Rejected" ? (
                    <div>
                      <Button
                        color="success"
                        onClick={() =>
                          handleRequestProcess(complaint.id, "Approved")
                        }
                      >
                        Approve
                      </Button>{" "}
                      <Button
                        color="danger"
                        onClick={() =>
                          handleRequestProcess(complaint.id, "Rejected")
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Button
                      color="success"
                      onClick={() =>
                        handleRequestProcess(complaint.id, "Approved")
                      }
                      disabled={true}
                    >
                      {complaint.status}
                    </Button>
                  )}
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
        <ModalHeader>{selectedComplaint?.issue_type} Details</ModalHeader>
        <ModalBody>
  {selectedComplaint && (
    <>
      <div>
        {selectedComplaint.issue_type === "Complaint" ? (
          <ComplaintActivity
            complaint={selectedComplaint}
            displayTitle={true}
          />
        ) : (
          <>
            {selectedComplaint.details && (
              <>
               {(selectedComplaint.issue_type==="Mess Issue" || selectedComplaint.issue_type==="General Issue")?
              <div>
              <p><strong>Complaint Details: </strong></p>
              <p>{selectedComplaint.details.content}</p>

              </div>:
            <div>
            <p>
            <strong>Issue Type </strong>
            {selectedComplaint.details.leave_from}
          </p>
          <p>
            <strong>To:</strong> {selectedComplaint.details.leave_to}
          </p>
          <p>
            <strong>Reason:</strong>{" "}
            {selectedComplaint.details.reason}
          </p>
            </div>}
              </>
            )}
          </>
        )}
      </div>
    </>
  )}
</ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      
    </div>
  );
};

export default ViewComplaint;
