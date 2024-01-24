import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ViewDetails = (headder, onclick, isViewOpen) => {
  return (
    <Modal isOpen={isViewOpen} toggle={() => onclick(!isViewOpen)}>
      <ModalHeader toggle={() => onclick(!isViewOpen)}>{headder}</ModalHeader>
      <ModalBody></ModalBody>
    </Modal>
  );
};

export default ViewDetails;
