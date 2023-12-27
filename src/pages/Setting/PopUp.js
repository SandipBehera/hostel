import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Tooltip,
} from "reactstrap";
import StudentTooltip from "./StudentToolTip";

const PopUp = ({ data, id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    const filterData = data.filter((item) => item.id === id);
    setModalData(filterData);
  };
  console.log("modalData",modalData);
  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
  };
  console.log(selectedFloor);

  const defineClassName = (length, capacity) => {
    if (length === 0) {
      return "bg-success";
    }
    if (length == capacity) {
      return "bg-danger";
    }
    if (length < capacity) {
      return "bg-primary";
    }
  };

  return (
    <div>
      <Button color="primary" onClick={toggleModal}>
        View
      </Button>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>All Room Detail</ModalHeader>
        <ModalBody>
          {modalData[0]?.room_details ? (
            <>
              <Label>Select Floor:</Label>
              <Input
                type="select"
                onChange={handleFloorChange}
                value={selectedFloor}
              >
                <option value="" disabled>
                  Select Floor
                </option>
                {[
                  ...new Set(
                    modalData[0].room_details.map((room) => room.floor)
                  ),
                ].map((floor) => (
                  <option key={floor} value={floor}>
                    {floor}
                  </option>
                ))}
              </Input>
              <div className="room-grid row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {modalData[0].room_details
                  .filter((room) => room.floor === parseInt(selectedFloor))
                  .map((room, index) => {
                    const filterData = modalData[0].users_details.filter(
                      (item) =>
                        parseInt(item.floor_id) === parseInt(selectedFloor) &&
                        item.room_id === room.details.room_no
                    );
                    console.log(filterData);
                    let name = "";
                    filterData?.map((tool, index)=>{
                      if(index===0){
                        name+=tool.name
                      }
                      else{
                        name+= `, ${tool.name}`
                      }
                    })
                    const stu = filterData.length>0? {id:index, tooltip:name}:{id:index, tooltip:"Vacant"}
                    return (
                      <div key={room.room} className="col mb-4">
                        <div className="room-box d-flex flex-row align-items-center justify-content-center mt-2">
                          <div className="d-flex flex-column text-center">
                            <p className="text-center">
                              Room no: {room.details?.room_no}
                            </p>
                            <p className="text-center">
                              Capacity {room.details?.capacity}
                            </p>
                           

                            <div className="d-flex justify-content-center">
                           
                              <div
                                className={`${defineClassName(
                                  filterData?.length,
                                  room.details?.capacity
                                )}`}
                                style={{
                                  height: "2rem",
                                  width: "2rem",
                                  borderRadius: "10%",
                                }}
                                id={'Tooltip-' + index}
                              
                              ></div>
                       
                                
                             <StudentTooltip item={stu}/>
                            
                               
                              
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr></hr>

              <div className="d-flex justify-content-around ">
                <div className="d-flex align-items-center gap-1">
                  <div
                    className="bg-success"
                    style={{
                      height: "1rem",
                      width: "1rem",
                      borderRadius: "20%",
                    }}
                  ></div>
                  <small>Completely Vacant</small>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div
                    className="bg-primary"
                    style={{
                      height: "1rem",
                      width: "1rem",
                      borderRadius: "20%",
                    }}
                  ></div>
                  <small>Vacant</small>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div
                    className="bg-danger"
                    style={{
                      height: "1rem",
                      width: "1rem",
                      borderRadius: "20%",
                    }}
                  ></div>
                  <small>Occupied</small>
                </div>
              </div>
            </>
          ) : (
            <p>No room details available</p>
          )}
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
