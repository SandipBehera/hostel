import React, { Fragment, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";
import { WebApi } from "../../api";

const OutingForm = () => {
  const [formData, setFormData] = useState({
    regd: "",
    date: "",
    destination: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      studentid: formData.regd,
      date: formData.date,
      destination: formData.destination,
      reason: formData.reason,
      branch_id : localStorage.getItem("branchId"),
    };

    console.log("Form submitted:", formData);

    try {
      const response = await fetch(`${WebApi}/add_outing`, {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        // },
      });

      console.log("response", response);

      if (response.status === 200) {
        console.log("Outing entry success");
      } else {
        console.log("Unsuccessful");
      }
    } catch (e) {
      console.log("Error", e);
    }

    setFormData({
      regd: "",
      date: "",
      destination: "",
      reason: "",
    });
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Outing Approval"
        mainTitle="Outing Form"
        title="Outing Form"
      />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="regd">Regd. No.</Label>
          <Input
            type="number"
            name="regd"
            id="regd"
            placeholder="Your Register Id"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="destination">Destination</Label>
          <Input
            type="text"
            name="destination"
            id="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="reason">Reason</Label>
          <Input
            type="textarea"
            name="reason"
            id="reason"
            placeholder="Reason for the outing"
            value={formData.reason}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default OutingForm;
