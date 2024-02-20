import React from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { LocalStore, WebStore } from "../../../../api";

const ViewDetails = ({ headder, onclick, isViewOpen, data }) => {
  return (
    <Modal isOpen={isViewOpen} toggle={() => onclick(!isViewOpen)}>
      <ModalHeader toggle={() => onclick(!isViewOpen)}>{headder}</ModalHeader>
      <ModalBody>
        <div>
          <Table className="text-center">
            <tr>
              <img
                src={`${WebStore}fine/${data?.image}`}
                alt="image"
                style={{ height: "10em", width: "10em" }}
              />
            </tr>
          </Table>
          <p>Student Name: {data?.name}</p>
          <p>Student ID: {data?.studentid}</p>
          <p>Fine Amount: {data?.fine}</p>
          <p>Fine Date: {data?.created_at}</p>
          <p>Reason: {data?.reason.broken_item}</p>
          <p>Remarks: {data?.reason.title}</p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewDetails;
