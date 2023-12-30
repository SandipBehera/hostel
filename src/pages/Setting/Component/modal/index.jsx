

import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";

export default function ViewModal({ data, id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    const fData = data
      .filter((item) => item.id === id)
      .map((_item) => _item.menu_data);

    // Create an array of objects with day and corresponding data
    const dataArray = Object.keys(fData[0]).map((day) => ({
      day,
      data: fData[0][day],
    }));

    // Define the desired order of days
    const desiredOrder = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ];

    // Sort the array based on the desired order
    dataArray.sort((a, b) => desiredOrder.indexOf(a.day) - desiredOrder.indexOf(b.day));

    setModalData(dataArray);
    setFilterData(fData[0]);
  };
  console.log("days are",modalData)
  return (
    <>
      <Button color="primary" onClick={toggleModal}>
        View
      </Button>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>All Room Detail</ModalHeader>
        <ModalBody>
          <Table bordered>
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Week Days Name</th>
                <th>BreakFast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {modalData.map((item) => (
                <tr key={item.day}>
                  <td>{item.day}</td>
                  <td>
                    {item.data.Breakfast.Description}
                    <p>
                      from: {item.data.Breakfast.From} to: {item.data.Breakfast.To}
                    </p>
                    {userType === "employee" ? (
                      <p>{item.data.Breakfast.Price}rs./</p>
                    ) : ""}
                  </td>
                  <td>
                    {item.data.Lunch.Description}
                    <p>
                      from: {item.data.Lunch.From} to: {item.data.Lunch.To}
                    </p>
                    {userType === "employee" ? (
                      <p>{item.data.Lunch.Price}rs./</p>
                    ) : ""}
                  </td>
                  <td>
                    {item.data.Dinner.Description}
                    <p>
                      from: {item.data.Dinner.From} to: {item.data.Dinner.To}
                    </p>
                    {userType === "employee" ? (
                      <p>{item.data.Dinner.Price}rs./</p>
                    ) : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
