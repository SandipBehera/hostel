import React, { Fragment,useState } from 'react';
import { Card,Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import Papa from 'papaparse';

const ComplaintsReport = () => {
  const [modal, setModal] = useState(false);
  const [assignTo, setAssignTo] = useState('Assignee');
  const [rowData, setRowData] = useState(null);

 
  const viewRowData = (data) => {
    setRowData(data);
    toggleModal();
  };
  // Sample row data (You can replace this with your actual data)
  const rows = [
    { date: '2023-12-01', assignTo: 'Warden', stage: 'Stage 1' },
    // Add more rows here
  ];

  const toggleModal = () => {
    setModal(!modal);
  };

  const changeAssignee = (e) => {
    setAssignTo(e.target.value);
  };
  const handleExport = () => {
    if (rowData) {
      const csvData = Papa.unparse([rowData]);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'exported_data.csv');
        link.style.visibility = 'hidden';
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
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Assign to</th>
            <th>Stage</th>
            <th>Action</th>
          </tr>
        </thead>
          <tbody>
          {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.assignTo}</td>
            <td>{row.stage}</td>
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
        <ModalHeader toggle={toggleModal}>Details</ModalHeader>
        <ModalBody>
        {rowData && (
            <div>
              <p><strong>Date:</strong> {rowData.date}</p>
              <p><strong>Assign to:</strong> {rowData.assignTo}</p>
              <p><strong>Stage:</strong> {rowData.stage}</p>
              {/* Add more data display as needed */}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button color="success" onClick={handleExport }>
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

