import React, { Fragment, useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card } from 'reactstrap';
import Papa from 'papaparse';
import { Breadcrumbs } from '../../AbstractElements';

const PurchaseReport = () => {
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const purchaseData = [
    {
      date: '01/01/2023',
      itemFor: 'Mess',
      itemName: 'Dragon Fruit',
      itemQuantity: 5,
      details: 'Some additional details for the item on this date.',
    },
    {
        date: '02/01/2023',
        itemFor: 'Hostel',
        itemName: ' Kiwi ',
        itemQuantity: 10,
        details: 'Some additional details for the item on this date.',
      },
      {
        date: '03/01/2023',
        itemFor: 'Mess',
        itemName: 'Apricot',
        itemQuantity: 15,
        details: 'Some additional details for the item on this date.',
      },
    // Add more objects for additional rows as needed
  ];

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleViewDetails = (data) => {
    setSelectedItem(data);
    toggleModal();
  };
  const handleExportCSV = () => {
    if (selectedItem) {
      const csvData = Papa.unparse([selectedItem]);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `purchase_data_${selectedItem.date}.csv`);
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
             parent="Purchase Order"
             mainTitle="Purchase Report"
             title="Purchase Report"
             />
             <Card>
    <div>
      <Table bordered className="mt-4">
        <thead>
          <tr>
            <th className="text-center">Date</th>
            <th className="text-center">Item For</th>
            <th className="text-center">Item Name</th>
            <th className="text-center">Item Quantity</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.map((data, index) => (
            <tr key={index}>
              <td className="text-center">{data.date}</td>
              <td className="text-center">{data.itemFor}</td>
              <td className="text-center">{data.itemName}</td>
              <td className="text-center">{data.itemQuantity}</td>
              <td className="text-center">
                <Button color="primary" onClick={() => handleViewDetails(data)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Details</ModalHeader>
        <ModalBody>
          {selectedItem && (
            <>
              <p>Date: {selectedItem.date}</p>
              <p>Item For: {selectedItem.itemFor}</p>
              <p>Item Name: {selectedItem.itemName}</p>
              <p>Item Quantity: {selectedItem.itemQuantity}</p>
              <p>Details: {selectedItem.details}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
          <Button color="success" onClick={handleExportCSV}>Export</Button>
        </ModalFooter>
      </Modal>
    </div>
    </Card>
    </Fragment>
  );
};

export default PurchaseReport;
