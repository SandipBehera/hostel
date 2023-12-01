import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

export default function ViewModal({ data, id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [userType, setUserType]= useState(localStorage.getItem("userType"))

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    const fData = data
      .filter((item) => item.id === id)
      .map((_item) => _item.menu_data);
    const days = Object.keys(fData[0]);
    setModalData(days);
    setFilterData(fData[0]);
  };
  console.log(modalData);
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
                <th>BrakFast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {modalData.map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>
                    {filterData[day].Breakfast.Description}
                    <p>
                      from:{filterData[day].Breakfast.From} to:{" "}
                      {filterData[day].Breakfast.To}
                    </p>
                    {userType==="employee"? (
                      <p>{filterData[day].Breakfast.Price}rs./</p>
                    ):""}
                   
                  </td>
                  <td>
                    {filterData[day].Lunch.Description}
                    <p>
                      from:{filterData[day].Lunch.From} to:{" "}
                      {filterData[day].Lunch.To}
                    </p>
                    {userType==="employee"? (
                      <p>{filterData[day].Lunch.Price}rs./</p>
                    ):""}
                  </td>
                  <td>
                    {filterData[day].Dinner.Description}
                    <p>
                      from:{filterData[day].Dinner.From} to:{" "}
                      {filterData[day].Dinner.To}
                    </p>
                    {userType==="employee"? (
                      <p>{filterData[day].Dinner.Price}rs./</p>
                    ):""}
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
