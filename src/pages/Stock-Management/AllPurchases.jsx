import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import './stock.css';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Papa from 'papaparse';
import {Link} from "react-router-dom";
import { WebApi } from '../../api';
import { method } from 'lodash';
export default function AllPurchases() {
  const [modal, setModal] = useState(false);
  const [data, setData]= useState([]);
  const toggleModal = () => setModal(!modal);
  // const [data, setData] = useState([])

  const branchId = localStorage.getItem("branchId");
  useEffect(() => {
    const fetchAllPurchase = async () => {
      try {
        const response = await fetch(`${WebApi}/get_stock`, { method: "GET" });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Error: ${response.status} - ${response.statusText}`, errorData);
          return;
        }
  
        const res = await response.json();
        const fetched = res.data;
        
        console.log(fetched);
        setData(fetched
          ?.filter((key)=>key.branch_id === parseInt(branchId))
          ?.map((item) => ({
          id: item.id,
          date: item.created_at,
          purchasedBy: item.purchased_from,
          items: [{ itemName: item.item_name, quantity: parseInt(item.quantity), price: parseInt(item.total_price) }]
        })));
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
  
    fetchAllPurchase();
  }, []);
  
  console.log(data)

  // const data = [
  //   {
  //     id: 1,
  //     date: '2023-11-30',
  //     purchasedBy: 'Abhishek Gupta',
  //     items: [
  //       { itemName: 'Rice', quantity: 2, price: 1000 },
  //       { itemName: 'Oil', quantity: 2, price: 200 },
  //     ],
  //   },
  //   // Add more data as needed
  // ];

  const handleView = (purchase) => {
    console.log('Viewing purchase:', purchase);
    toggleModal();
  };

  const calculateTotalPrice = () => {
    
    return (data[0].items.reduce((total, item) => total + parseInt(item.price), 0))
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
      <Breadcrumbs parent="Setings"   subParent="Item Management" mainTitle="All Purchase" title="All Purchase" />

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
                <td>{`${new Date(purchase.date)}`.slice(4,15)}</td>
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
          <p> Purchased From: {data[0]?.purchasedBy}</p> <p>Dated: {`${new Date(data[0]?.date )}`.slice(4,15)}</p>

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
              
                {data[0]?.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p className='pl-3 total-price'>Total Price: {data.length >0 && calculateTotalPrice()}/-</p>
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
