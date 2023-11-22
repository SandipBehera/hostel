// RoomAmenities.jsx
import React from "react";
import { Col, Form, Button, FormGroup, Input } from "reactstrap";
import { H5 } from "../../../../AbstractElements";
import { useForm } from "react-hook-form";
import { LocalApi, WebApi } from "../../../../api";

const amenitiesList = [
  "TV",
  "Fan",
  "Free Wi-Fi",
  "Bed",
  "Air Conditioning",
  "Table",
  "Chair",
];

const RoomAmenities = ({ setSteps, setFormdata, formdata }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: formdata,
  });

  const onSubmit = async (data) => {
    const selectedAmenities = {};

    amenitiesList.forEach((amenity) => {
      selectedAmenities[amenity] = data.selectedAmenities[amenity] || false;
    });

    const sendData = {
      hostel_name: formdata.hostel_name,
      floor_count: parseInt(formdata.floor_count) || 0,
      room_count: parseInt(formdata.room_count) || 0,
      rooms: formdata.rooms,
      ammenities: selectedAmenities,
    };

    // Convert the JavaScript objects to JSON strings
    sendData.rooms = JSON.stringify(sendData.rooms);
    sendData.ammenities = JSON.stringify(sendData.ammenities);

    try {
      const response = await fetch(`${WebApi}/create_rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      if (response.status === 200) {
        alert("Your Form is Submitted");
        setSteps(1);
      } else {
        alert("Your Form is not Submitted");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="page-wrapper" id="pageWrapper">
      <Col sm="12 ps-0">
        <H5>Choose Room Amenities</H5>
      </Col>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form-bookmark needs-validation"
      >
        {amenitiesList.map((amenity) => (
          <FormGroup key={amenity}>
            <div className="checkbox checkbox-dark m-squar">
              <Input
                id={`inline-sqr-${amenity}`}
                type="checkbox"
                {...register(`selectedAmenities.${amenity}`, {
                  required: false,
                })}
                onChange={(e) => {
                  setValue(`selectedAmenities.${amenity}`, e.target.checked);
                }}
              />
              <label className="mt-0" htmlFor={`inline-sqr-${amenity}`}>
                {amenity}
              </label>
            </div>
          </FormGroup>
        ))}
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RoomAmenities;
