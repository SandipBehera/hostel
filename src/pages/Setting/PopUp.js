import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

const PopUp = ({ data, id }) => {
  console.log("data is",data)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    const filterData = data
      .filter((item) => item.id === id)
      .map((_item) => _item.room_details);
    setModalData(filterData[0]);
  };
console.log("model data",modalData)
  return (
    <div>
      <Button color="primary" onClick={toggleModal}>
        View
      </Button>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>All Room Detail</ModalHeader>
        <ModalBody>
          <Table bordered>
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Floor</th>
                <th>Room</th>
                <th>Room Capacity</th>
                <th>Room Type</th>
                <th>Amenities</th>
                <th>Student Name</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {modalData.map((elem, index) => (
                <tr key={index}>
                  <td>Floor No:-{elem.floor}</td>
                  <td>{elem.details.room_no}</td>
                  <td>{elem.details.capacity}</td>
                  <td>
                    {elem.details.room_type !== undefined ? (
                      elem.details.room_type.map((key) => <p>{key.value}</p>)
                    ) : (
                      <p style={{ color: "red" }}>Not Available</p>
                    )}
                  </td>
                  <td>
                    {elem.details.amenities !== undefined ? (
                      elem.details.amenities.map((key) => <p>{key.value}</p>)
                    ) : (
                      <p style={{ color: "red" }}>Not Available</p>
                    )}
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
    </div>
  );
};

export default PopUp;
