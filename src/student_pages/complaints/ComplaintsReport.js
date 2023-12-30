import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import DataTable from "react-data-table-component"; // Import DataTable components
import Papa from "papaparse";
import { WebApi } from "../../api";
import moment from "moment";
import { Breadcrumbs } from "../../AbstractElements";
import ComplaintActivity from "../../Components/complaints/complaintActivity";

const ComplaintsReport = () => {
  const [modal, setModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [rows, setRow] = useState([]);

  useEffect(() => {
    const allComplaints = async () => {
      const response = await fetch(`${WebApi}/get_complaints`, {
        method: "GET",
      });
      const res = await response.json();
      console.log(res.data);
      setRow(
        res.data.filter(
          (item) =>
            item.branch_id ===
              parseInt(localStorage.getItem("branchId")) &&
            item.issued_by === localStorage.getItem("userId")
        )
      );
    };
    allComplaints();
  }, [rows]);

  const viewRowData = (row) => {
    setRowData(row);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleExport = () => {
    if (rowData) {
      const csvData = Papa.unparse([rowData]);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "exported_data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => `${new Date(row.created_at)}`.slice(4, 15),
    },
    {
      name: "Issue Type",
      selector: (row) =>
        row.issue_type
    },
    {
      name: "Status",
      selector: (row) => (row.status === "" ? "New" : row.status),
    },
    {
      name: "Action",
      cell: (row) => (
        <Button color="primary" onClick={() => viewRowData(row)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs
        parent="Complaints"
        mainTitle="Complaints Report"
        title="Complaints Report"
      />
      <Card>
        <DataTable
          columns={columns}
          data={rows}
          pagination
          striped={true}
        />

        {/* Modal */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            Issue Type: {rowData?.issue_type}
          </ModalHeader>
          <ModalBody>
            {rowData && (
              <div>
                <p>
                  <strong>Date:</strong>{" "}
                  {moment(rowData.created_at).format("YYYY-MM-DD HH:mm:ss")}
                </p>
                <p>
                  <strong>Status</strong>{" "}
                  {rowData.status}
                </p>
                
                <p className="text-center">
                  <strong>Request/Complaint Details</strong>{" "}
                
                </p>
                {rowData.issue_type === "Complaint" ? (
                  <ComplaintActivity complaint={rowData} />
                ) : (
                  <>
                    <p>
                      <strong>From: </strong>
                      {rowData.details.leave_from}
                    </p>
                    {rowData.issue_type === "Vacant Hostel Request" ? (
                      ""
                    ) : (
                      <>
                        <p>
                          <strong>To:</strong> {rowData.details.leave_to}
                        </p>
                      </>
                    )}
                    <p>
                      <strong>Reason:</strong> {rowData.details.reason}
                    </p>
                  </>
                )}

                {/* Add more data display as needed */}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button color="success" onClick={handleExport}>
              Export
            </Button>
          </ModalFooter>
        </Modal>
      </Card>
    </Fragment>
  );
};

export default ComplaintsReport;
