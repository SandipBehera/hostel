import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import "./stock.css";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Papa from "papaparse";
import DataTable from "react-data-table-component";
import { WebApi } from "../../api";

const AllPurchases = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentPurchase, setCurrentPurchase] = useState(null);

  const toggleModal = () => setModal(!modal);

  const branchId = localStorage.getItem("branchId");

  useEffect(() => {
    const fetchAllPurchase = async () => {
      try {
        const response = await fetch(`${WebApi}/get_stock`, { method: "GET" });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            `Error: ${response.status} - ${response.statusText}`,
            errorData
          );
          return;
        }

        const res = await response.json();
        const fetched = res.data;

        setData(
          fetched
            ?.filter((key) => key.branch_id === parseInt(branchId))
            ?.map((item) => ({
              id: item.id,
              date: item.created_at,
              purchasedBy: item.purchased_from,
              items: [
                {
                  itemName: item.item_name,
                  quantity: parseInt(item.quantity),
                  price: parseInt(item.total_price),
                },
              ],
            }))
        );
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchAllPurchase();
  }, []);

  const handleView = (purchase) => {
    setModal(true);
    setCurrentPurchase(purchase);
  };

  const calculateTotalPrice = (purchase) => {
    return purchase.items.reduce(
      (total, item) => total + parseInt(item.price),
      0
    );
  };

  const handleExport = () => {
    const csvData = Papa.unparse(currentPurchase.items, { header: true });
    const csvBlob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement("a");
    link.href = csvUrl;
    link.setAttribute("download", "purchase_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { name: "ID", selector: (row, index)=>index+1 },
    { name: "Date of Purchase", selector: (row) => `${new Date(row.date)}`.slice(4, 15) },

    { name: "Purchased From", selector: "purchasedBy" },
    {
      name: "Actions",
      cell: (row) => (
        <Button color="info" onClick={() => handleView(row)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs
        parent="Settings"
        subParent="Item Management"
        mainTitle="All Purchase"
        title="All Purchase"
      />

      <DataTable
        columns={columns}
        data={data}
        pagination
        striped
        highlightOnHover
        responsive
      />

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Purchase Details</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-between">
            <div>
              <p> Purchased From: {currentPurchase?.purchasedBy}</p>{" "}
              <p>
                Dated: {`${new Date(currentPurchase?.date)}`.slice(4, 15)}
              </p>
            </div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                {/* <th>Price</th> */}
              </tr>
            </thead>
            <tbody className="pl-3">
              {currentPurchase?.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  {/* <td>{item.price_per}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
          <p className="pl-3 total-price">
            Total Price:{" "}
            {currentPurchase && calculateTotalPrice(currentPurchase)}/-
          </p>
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
    </Fragment>
  );
};

export default AllPurchases;
