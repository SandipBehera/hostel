import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { Button, Card, Col, Input, Label, Row } from "reactstrap";
import Webcam from "react-webcam";
import { WebApi } from "../../api";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const WebcamCapture = ({ onCapture }) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);
  return (
    <>
      <Webcam
        audio={false}
        height={400}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <button className="btn btn-primary" onClick={capture}>
        Capture photo
      </button>
    </>
  );
};

export default function CreateFine() {
  const [aminites, setAminities] = useState([]);
  const [selectedAminities, setSelectedAminities] = useState("");
  const [otherAmenities, setOtherAmenities] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [upload, setUpload] = useState(null);
  const [hostelData, sethostelData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [studentName, setStudent] = useState([]);
  const [studentid, setStudentId] = useState([]);
  const [uploadType, setUploadType] = useState("");
  const [fineAmount, setFineAmount] = useState("");
  const [title, setTitle] = useState("");
  const branchId = localStorage.getItem("branchId");
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");

  const fetchDesignation = async (type) => {
    try {
      const response = await fetch(`${WebApi}/get_config_by_type/${type}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
        },
      });
      const respData = await response.json();
      return respData.data.filter(
        (key) => key.branch_id === parseInt(localStorage.getItem("branchId"))
      );
    } catch (error) {
      console.error("Error fetching room config:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDesignation("ammenities").then((data) => {
      setAminities(data[0].config_type_name.data);
    });
  }, []);

  const handleAmenitiesChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAminities(selectedValue);

    if (selectedValue === "Other") {
      setOtherAmenities("");
    }
  };

  const handleCapturePhoto = (imageSrc) => {
    setCapturedPhoto(imageSrc);
  };

  const roomHostel = async () => {
    const response = await fetch(`${WebApi}/get_student_room/${branchId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: document.cookie,
      },
    });

    const resproom = await response.json();
    const fetchedData = resproom.data;

    if (resproom && resproom.status) {
      sethostelData(fetchedData);
    }
  };
  useEffect(() => {
    roomHostel();
  }, []);
  const handleHostelSelect = (hostelid) => {
    setSelectedHostel(hostelid);
    const floors = hostelid
      ? Array.from(
          new Set(
            hostelData
              .find((hostel) => hostel.hostel_name === hostelid)
              .room_details.map((room) => room.floor)
          )
        )
      : [];
    const floorOptions = floors.map((floor) => {
      return { value: floor, label: `floor ${floor}` };
    });
    setFloorData(floorOptions);
  };
  const hostel_name = hostelData?.map((key) => {
    return { value: `${key.hostel_name}`, label: `${key.hostel_name}` };
  });

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);

    const rooms = hostelData
      .find((hostel) => hostel.hostel_name === selectedHostel)
      .room_details.filter((room) => room.floor === floor)
      .map((room) => ({
        value: room.details.room_no,
        label: `Room ${room.details.room_no}`,
      }));

    setRoomData(rooms);
  };
  const getStudent = (roomid) => {
    setSelectedRoom(roomid);

    const foundHostel = hostelData
      .find((hostel) => hostel.hostel_name === selectedHostel)
      .users_details.filter((room) => room.room_id === roomid);
    if (foundHostel) {
      setStudent(
        foundHostel.map((student) => ({
          value: student.user_id,
          label: student.name,
        }))
      );
    } else {
      // Handle the case when no matching hostel is found
      setStudent([]); // or setStudent(null) depending on your use case
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     studentid: studentid.map((student) => student.value),
  //     fineAmount,
  //     reason: {
  //       title,
  //       broken_item:
  //         selectedAminities === "Other" ? otherAmenities : selectedAminities,
  //       hostel_name: selectedHostel,
  //       floor: selectedFloor,
  //       room_no: selectedRoom,
  //     },
  //     upload_image: upload || capturedPhoto,
  //     branch_id: branchId,
  //   };
  //   data.reason = JSON.stringify(data.reason);
  //   console.log(data);
  //   try {
  //     fetch(`${WebApi}/create_fine`, {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         Cookie: document.cookie,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if (res.status) {
  //           alert("Fine Created Successfully");
  //           window.location.reload();
  //         } else {
  //           alert("Something went wrong");
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fineAmount", fineAmount);
    formData.append("branch_id", branchId);
    formData.append(
      "reason",
      JSON.stringify({
        title,
        broken_item:
          selectedAminities === "Other" ? otherAmenities : selectedAminities,
        hostel_name: selectedHostel,
        floor: selectedFloor,
        room_no: selectedRoom,
      })
    );

    studentid.forEach((student) => {
      formData.append("studentid", student.value);
    });

    // Check if 'upload' or 'capturedPhoto' is present and append it to formData
    if (upload) {
      formData.append("upload_image", upload);
    } else if (capturedPhoto) {
      formData.append("upload_image", capturedPhoto);
    }

    try {
      fetch(`${WebApi}/create_fine`, {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            toast.success("Fine Created Successfully");
            navigate(`${userType}/${userId}/fines/view-collection`);
          } else {
            toast.error("Something went wrong");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Fines"
        mainTitle="Create Fine"
        subParent="Create Fine"
        title="Create Fine"
      />
      <Card className="p-3">
        <form encType="multipart/form-data">
          <Row className="p-2">
            <Col sm={6} className="">
              <Label>Title</Label>
              <Input type="text" onChange={(e) => setTitle(e.target.value)} />
            </Col>
            <Col sm={6} className="">
              <Label>Ammenities</Label>
              <Input
                type="select"
                value={selectedAminities}
                onChange={handleAmenitiesChange}
              >
                <option>Select Ammenities</option>
                {aminites.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
                <option value="Other">Other</option>
              </Input>
            </Col>
          </Row>

          {selectedAminities === "Other" && (
            <>
              <Col sm={12} className="p-2">
                <Label>Other Ammenities</Label>
                <Input
                  type="text"
                  value={otherAmenities}
                  onChange={(e) => setOtherAmenities(e.target.value)}
                />
              </Col>
            </>
          )}

          <Row className="p-2">
            <Col sm={6} className="">
              <Label>Hostel Name</Label>
              <Select
                id="hostelSelect"
                options={hostel_name}
                onChange={(selectedOption) =>
                  handleHostelSelect(selectedOption.value)
                }
              />
            </Col>
            <Col>
              <Label>Floor Number</Label>
              <Select
                id="floorSelect"
                options={floorData}
                onChange={(selectedOption) =>
                  handleFloorSelect(selectedOption.value)
                }
              />
            </Col>
          </Row>
          <Row className="p-2">
            <Col sm={6}>
              <Label className="col-form-label">Select Room No</Label>
              <Select
                id="roomSelect"
                options={roomData}
                onChange={(selectedOption) => getStudent(selectedOption.value)}
              />
            </Col>
            <Col sm={6}>
              <Label className="col-form-label">Culprit Name</Label>
              <Select
                isMulti
                options={studentName}
                onChange={(selectedOption) => setStudentId(selectedOption)}
                // value={selectedCulprits}
                // onChange={(selectedOptions) => setSelectedCulprits(selectedOptions)}
              />
            </Col>
          </Row>
          <Row className="p-2">
            <Col sm={6}>
              <Label>Amount</Label>
              <Input
                type="number"
                className="form-control"
                style={{ appearance: "textfield" }}
                onChange={(e) => setFineAmount(e.target.value)}
              />
            </Col>
            <Col sm={6}>
              <Label>Upload Type</Label>
              <Input
                type="select"
                onChange={(e) => setUploadType(e.target.value)}
              >
                <option>Select Upload Type</option>
                <option value={"upload"}>Upload From Local</option>
                <option value={"tpic"}>Take Picture</option>
              </Input>
            </Col>
          </Row>

          <Row className="p-2">
            {uploadType === "upload" && (
              <Col sm={6} className="">
                <Label>Upload/Take Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  capture
                  onChange={(e) => setUpload(e.target.files[0])}
                />
              </Col>
            )}
            {uploadType === "tpic" && (
              <Col sm={6} className="mt-3">
                {!capturedPhoto && cameraOpen && (
                  <WebcamCapture onCapture={handleCapturePhoto} />
                )}
                {capturedPhoto && <img src={capturedPhoto} alt="Captured" />}
                {!capturedPhoto && (
                  <div className="d-flex">
                    <button
                      className="btn btn-info  m-2 px-3 py-2"
                      onClick={() => setCameraOpen(true)}
                    >
                      Take Photo
                    </button>
                  </div>
                )}
              </Col>
            )}
          </Row>
          <Button onClick={handleSubmit}> Submit</Button>
        </form>
      </Card>
    </Fragment>
  );
}
