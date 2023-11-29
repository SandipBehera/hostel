import React, { Fragment, useState } from 'react'
import { Input, Button, Form, FormGroup, Label, Card } from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";
const CreateComplain = () => {
    const [complaint, setComplaint] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
      
        console.log("Complaint submitted:", complaint);
       
        setComplaint("");
      };
  return (
    <Fragment>
    <Breadcrumbs
    parent="General"
    mainTitle="Create Complain"
    title="Create Complain"
  />
    <Card>
    <Form onSubmit={handleSubmit} style={{padding:"2px"}}>
    <FormGroup >
      <Label for="complaint">Complaint:</Label>
      <Input 
        type="textarea"
        name="complaint"
        id="complaint"
        placeholder="Type your complaint here..."
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}

      />
    </FormGroup>
    <Button color="primary" type="submit">
      Submit Complaint
    </Button>
  </Form>
    </Card>
  
    </Fragment>
  )
}

export default CreateComplain