
import React, { Fragment, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';


const OutingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    destination: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     console.log('Form submitted:', formData);

    setFormData({
        name: '',
        date: '',
        destination: '',
        reason: '',
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
      <Label for="name">Name</Label>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Your name"
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
