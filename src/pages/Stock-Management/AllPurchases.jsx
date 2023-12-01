import React, { Fragment, useState } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import './stock.css';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Papa from 'papaparse';
import {Link} from "react-router-dom";
export default function AllPurchases() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const data = [
    {
      id: 1,
      date: '2023-11-30',
      purchasedBy: 'Abhishek Gupta',
      items: [
        { itemName: 'Rice', quantity: 2, price: 1000 },
        { itemName: 'Oil', quantity: 2, price: 200 },
      ],
    },
    // Add more data as needed
  ];

  const handleView = (purchase) => {
    console.log('Viewing purchase:', purchase);
    toggleModal();
  };

  const calculateTotalPrice = () => {
    return data[0].items.reduce((total, item) => total + item.price, 0);
  };

  const handleExport = () => {
    const csvData = Papa.unparse(data[0].items, { header: true });
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', 'purchase_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Fragment>
      <Breadcrumbs parent="Stock Management" mainTitle="All Purchase" title="All Purchase" />

      <div>
        <Table className='text-center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date of Purchase</th>
              <th>Purchased From</th>
              <th>Purchased Item</th>
            </tr>
          </thead>
          <tbody>
            {data.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.id}</td>
                <td>{purchase.date}</td>
                <td>{purchase.purchasedBy}</td>
                <td>
                  <Button color="info" onClick={() => handleView(purchase)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            Purchase Details -
          </ModalHeader>

          <ModalBody>
          <div className='d-flex justify-content-between' >
          <div>
          <p> Purchase From: {data[0].purchasedBy}</p> <p>Dated: {data[0].date}</p>

          </div>
            <Link to="#" target='_blank' className='btn btn-primary' style={{height: "2.5em"}}>View Bill</Link>
          </div>
            
            <Table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className='pl-3'>
              
                {data[0].items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p className='pl-3 total-price'>Total Price: {calculateTotalPrice()}/-</p>
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
    </Fragment>
  );
}
