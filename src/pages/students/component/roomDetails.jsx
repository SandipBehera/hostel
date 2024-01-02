import react from "react";
import CommonTooltip from "../../Setting/Hostel-Config/CommonTooltip";

const RoomDetails = ({ data, selectedFloor, setSelectedRoom }) => {
  console.log(data);
  const [clickedRoom, setClickedRoom] = react.useState(null);

  const clicked = (room) => {
    if (clickedRoom === room) {
      setClickedRoom(null);
      setSelectedRoom(null);
      return;
    } else {
      setClickedRoom(room);
      setSelectedRoom(room);
    }
  };

  const divStyle = (roomNo) => ({
    margin: "2rem", // Example margins
    padding: "1rem", // Example padding
    backgroundColor: clickedRoom === roomNo ? "#e6f7ff" : "transparent",
    borderStyle: clickedRoom === roomNo ? "outset" : "none",
    // Add any other styles you want here
  });
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
    <>
      {data?.length > 0 && (
        <>
          <div className="room-grid row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {data[0]?.room_details
              .filter((room) => room.floor === parseInt(selectedFloor))
              .map((room, index) => {
                const filterData = data[0]?.users_details.filter(
                  (item) =>
                    parseInt(item.floor_id) === parseInt(selectedFloor) &&
                    item.room_id === room.details.room_no
                );
                console.log(filterData);
                let name = "";
                filterData?.map((tool, index) => {
                  if (index === 0) {
                    name += tool.name;
                  } else {
                    name += `, ${tool.name}`;
                  }
                });
                const stu =
                  filterData.length > 0
                    ? { id: index, tooltip: name }
                    : { id: index, tooltip: "Vacant" };
                return (
                  <div
                    key={room.room}
                    className="col mb-4"
                    onClick={() => {
                      if (room.details?.capacity - filterData.length !== 0) {
                        clicked(room.details?.room_no);
                      }
                    }}
                  >
                    <div className="room-box d-flex flex-row align-items-center justify-content-center mt-2">
                      <div className="d-flex flex-column text-center">
                        <p className="text-center">
                          Room no: {room.details?.room_no}
                        </p>
                        <p className="text-center">
                          Capacity: {room.details?.capacity - filterData.length}
                          /{room.details?.capacity}
                        </p>

                        <div className="d-flex justify-content-center">
                          <div
                            className={`${defineClassName(
                              filterData?.length,
                              room.details?.capacity
                            )}`}
                            style={{
                              ...divStyle(room.details?.room_no),
                              height: "2rem",
                              width: "2rem",
                              borderRadius: "10%",
                            }}
                            id={"Tooltip-" + index}
                          ></div>

                          <CommonTooltip item={stu} />
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
          <hr></hr>
        </>
      )}
    </>
  );
};
export default RoomDetails;
