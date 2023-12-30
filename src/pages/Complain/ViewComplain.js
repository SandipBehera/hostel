import React, { useEffect, useState } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../AbstractElements";
import "./Complaints.css";
import socketIOClient from "socket.io-client";
import { WebApi, WebSocketAPI } from "../../api";
import { toast } from "react-toastify";
import ComplaintActivity from "../../Components/complaints/complaintActivity";
import DataTable from "react-data-table-component";

const ViewComplaint = () => {
  const socket = socketIOClient(WebSocketAPI);
  const branch_id = localStorage.getItem("branchId");

  const [data, setData] = useState([]);
  const user = localStorage.getItem("userType");

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${WebApi}/get_complaints`, {
        method: "GET",
      });
      const respData = await response.json();
      if (user === "admin") {
        setData(
          respData.data.filter(
            (item) =>
              item.branch_id === parseInt(localStorage.getItem("branchId"))
          )
        );
        console.log(respData);
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

  const handleView = (complaintId) => {
    const selected = data.find((item) => item.id === complaintId);
    if (selected) {
      setSelectedComplaint(selected);
      setViewModalOpen(true);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.Issued_by,
    },
    {
      name: "Issue Type",
      selector: (row) => row.issue_type,
    },
    {
      name: "View",
      cell: (row) => (
        <Button color="info" onClick={() => handleView(row.id)}>
          View
        </Button>
      ),
    },
    {
      name: "Action",
      cell: (row) => {
        if (
          row.issue_type === "Complaint" ||
          row.issue_type === "Hostel Issue" ||
          row.issue_type === "Mess Issue" ||
          row.issue_type === "General Issue"
        ) {
          return (
            <div>
              {row.status !== "NEW" ? (
                <Link
                
                  to={`complain-status/${row.id}`}
                >
                  Assigned to:{row.Assigned_to} <br /> Status:
                  {row.status === "" ? "NEW" : row.status}
                </Link>
              ) : (
                "Start Process"
              )}
            </div>
          );
        } else if (
          row.status !== "Approved" &&
          row.status !== "Rejected"
        ) {
          return (
            <div>
              <Button
                color="success"
                size="sm"  style={{padding:"5px 1.5rem"}}
                onClick={() => handleRequestProcess(row.id, "Approved")}
              >
                Approve
              </Button>{" "}
              <Button
                color="danger"
                size="sm"  style={{padding:"5px 1.5rem"}}
                onClick={() => handleRequestProcess(row.id, "Rejected")}
              >
                Reject
              </Button>
            </div>
          );
        } else {
          return (
            <Button
              color={row.status==="Approved"?"success":"danger"} 
              size="sm"  style={{padding:"5px 1.5rem"}}
              onClick={() => handleRequestProcess(row.id, "Approved")}
              disabled={true}
            >
              {row.status}
            </Button>
          );
        }
      },
    },
  ];

  return (
    <div>
      <Breadcrumbs
        parent="General"
        mainTitle="View Complaint"
      />
      <DataTable columns={columns} data={data} pagination  center={true} striped={true}/>

      {/* View Complaint Modal */}
      <Modal isOpen={viewModalOpen}>
        <ModalHeader>{selectedComplaint?.issue_type} Details</ModalHeader>
        <ModalBody>
          {selectedComplaint && (
            <div>
              {selectedComplaint.issue_type === "Complaint" ||
              selectedComplaint.issue_type === "Hostel Issue" ||
              selectedComplaint.issue_type === "Mess Issue" ||
              selectedComplaint.issue_type === "General Issue" ? (
                <ComplaintActivity
                  complaint={selectedComplaint}
                  displayTitle={true}
                />
              ) : (
                <>
                  {selectedComplaint.details && (
                    <>
                      {selectedComplaint.issue_type === "General Issue" ||
                      selectedComplaint.issue_type === "Hostel Issue" ? (
                        <div>
                          <p>
                            <strong>Complaint Details: </strong>
                          </p>
                          <p>{selectedComplaint.details.content}</p>
                        </div>
                      ) : (
                        selectedComplaint.issue_type === "Vacant Hostel Request" ? (
                          <>
                            <p><strong>Name:</strong>{" "}
                            {selectedComplaint.Issued_by}
                            </p>
                            <p><strong>Hostel name: </strong> {" "}
                            {selectedComplaint.details.hostel_id}
                            </p>
                            <p><strong>Room Number: </strong> {" "}
                            {selectedComplaint.details.floor_no}
                            </p>
                            <p><strong>Vacating on: </strong> {" "}
                            {selectedComplaint.details.leave_from}
                            </p>
                            <p><strong>Reason: </strong> {" "}
                            {selectedComplaint.details.reason}
                            </p>                
                          </> 
                          ) : (
                            <div>
                              <p>
                                <strong>From:</strong>{" "}
                                {selectedComplaint.details.leave_from}
                              </p>
                              <p>
                                <strong>To:</strong>{" "}
                                {selectedComplaint.details.leave_to}
                              </p>
                              <p>
                                <strong>Reason:</strong>{" "}
                                {selectedComplaint.details.reason}
                              </p>
                              <p>
                                <strong>Request Date:</strong>{" "}
                                {`${new Date(selectedComplaint.created_at)}`.slice(4, 15)}
                              </p>
                            </div>
                          )
                        )}
                    </>
                  )}
                </>
              )}
            </div>
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
