import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import Papa from "papaparse";
import { LocalApi, WebApi } from "../../api";
import moment from "moment";
import { Textarea } from "../../Constant";
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
            parseInt(
              localStorage.getItem("branchId")) &&
                item.issued_by === localStorage.getItem("userId")
            
        )
      );
    };
    allComplaints();
  }, []);
  console.log(rows);
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

  return (
    <Fragment>
      <Breadcrumbs
        parent="Complaints"
        mainTitle="Complaints Report"
        title="Complaints Report"
      />
      <Card>
        <div>
          <Table className="text-center">
            <thead>
              <tr>
                <th>Date</th>
                <th>Assign to</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{`${new Date(row.created_at)}`.slice(4, 15)}</td>
                  <td>
                    {row.assigned_to === "" ? "Not Assigned" : row.assigned_to}
                  </td>
                  <td>{row.status === "" ? "New" : row.status}</td>
                  <td>
                    <Button color="primary" onClick={() => viewRowData(row)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

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
                    <strong>Assign to:</strong>{" "}
                    {rowData.assigned_to === ""
                      ? "Not Assigned"
                      : rowData.emp_name}
                  </p>
                  <p>
                    <strong>Stage:</strong> {rowData.status}
                  </p>
                  <Table className="text-center">
                    <strong className="text-center">Request/Complain Details:</strong>{" "}
                  </Table>
                  {rowData.issue_type === "Complaint" ? (
                    <ComplaintActivity complaint={rowData} />
                  ) : (
                    <>
                      <p>
                        {" "}
                        <strong>From: </strong>
                        {rowData.details.leave_from}
                      </p>
                      <p>
                      {rowData.issue_type === "Vacant Hostel Request" ? "":
                    <><strong>To:</strong> {rowData.details.leave_to}
                    </>}
                      </p>
                     
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
        </div>
      </Card>
    </Fragment>
  );
};

export default ComplaintsReport;
