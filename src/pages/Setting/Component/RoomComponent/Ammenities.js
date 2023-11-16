import React from "react";
import { Row, Col, Form, Label, Button, FormGroup, Input } from "reactstrap";
import { H5 } from "../../../../AbstractElements";
import { useForm } from "react-hook-form";

const amenitiesList = [
  "TV",
  "Fan",
  "Free Wi-Fi",
  "Bed",
  "Air Conditioning",
  "Table",
  "Chair",
];

const Amenities = ({ setSteps, setFormdata, formdata }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: formdata,
  });

  const onSubmit = (data) => {
    // Remove nested objects with 'name' property
    const { selectedAmenities, ...restData } = data;
    setFormdata({ ...restData, selectedAmenities });
    alert("Your Form is Submitted");
    setSteps(1);
  };

  return (
    <div className="page-wrapper" id="pageWrapper">
      <Col sm="12 ps-0">
        <H5>Choose Room Amenities</H5>
      </Col>
      <Form onSubmit={handleSubmit(onSubmit)} className="form-bookmark needs-validation">
        {amenitiesList.map((amenity) => (
          <FormGroup key={amenity}>
            <div className="checkbox checkbox-dark m-squar">
              <Input
                id={`inline-sqr-${amenity}`}
                type="checkbox"
                {...register(`selectedAmenities.${amenity}`, { required: false })}
                onChange={(e) => {
                  setValue(`selectedAmenities.${amenity}`, e.target.checked);
                }}
              />
              <Label className="mt-0" htmlFor={`inline-sqr-${amenity}`}>
                {amenity}
              </Label>
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

export default Amenities;
