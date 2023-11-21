import React, { useState } from "react";
import { Container, Input, Button, Form, FormGroup, Col } from "reactstrap";

const CreateAmenities = () => {
  const [inputFields, setInputFields] = useState([""]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push("");
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with inputFields data, for example:
    console.log(inputFields);
  };

  const handleCancel = () => {
    // Handle cancel action if needed
    setInputFields([""]); // Reset input fields
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <FormGroup key={index} row>
            <Col sm={8}>
              <div className="input-group">
                <Input
                  type="text"
                  placeholder="Type something..."
                  value={inputField}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <div className="input-group-append">
                  {index === inputFields.length - 1 ? (
                    <>
                      <Button color="primary" onClick={handleAddFields}>
                        +
                      </Button>
                      {index > 0 && (
                        <Button
                          color="danger"
                          onClick={() => handleRemoveFields(index)}
                        >
                          -
                        </Button>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </Col>
          </FormGroup>
        ))}
        <FormGroup row>
          <Col sm={{ size: 8, offset: 2 }}>
            <Button type="submit" color="primary">
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateAmenities;
