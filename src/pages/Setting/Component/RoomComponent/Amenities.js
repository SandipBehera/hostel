// import React, { Fragment } from 'react';
// import { CardHeader,Col } from 'reactstrap';
// import { H5 } from '../../../../AbstractElements';
// // import { H5 } from '../../AbstractElements';

// const Amenities = () => {
//   return (
//    <Fragment>
//     <Col sm='12'>
//         <CardHeader>
//         <H5 className="mb-0">AMENITIES</H5>
//         </CardHeader>


//     </Col>
//    </Fragment>
//   )
// }

// export default Amenities



//trial version 2
// import React from "react";
// import { Button, Col, FormGroup, Label, Row } from "reactstrap";
// import IncrementButton from "./components/incrementButton";
// import InputFields from "./components/incrementInputs";
// import { defaultInputTypes } from "../../../../Data/InputTypes";
// const InputGenerator = () => {
//   const [InputElements, setInputElements] = React.useState([
//     <InputFields
//       key={0}
//       type={"text"}
//       name1={"Field"}
//       label1={"Field Name"}
//       name2={"FieldType"}
//       label2={"Field Type"}
//       options={defaultInputTypes}
//     />,
//   ]);
//   const [showButton, setShowButton] = React.useState(false);
//   const incrementInputs = () => {
//     setShowButton(true);
//     setInputElements((prevElements) => [
//       ...prevElements,
//       <InputFields
//         key={InputElements.length}
//         type={"text"}
//         name1={"Field"}
//         label1={"Field Name"}
//         name2={"FieldType"}
//         label2={"Field Type"}
//         options={defaultInputTypes}
//       />,
//     ]);
//   };
//   const decrementInputs = () => {
//     setInputElements((prevElements) => prevElements.slice(0, -1));
//     if (InputElements.length === 2) {
//       setShowButton(false);
//     }
//   };
//   return (
//     <Row>
//       <Col sm="9">
//         {InputElements.map((element) => (
//           <div key={element.key}>{element}</div>
//         ))}
//       </Col>
//       <Col sm="3">
//         <div>
//           <IncrementButton
//             incrementInputs={incrementInputs}
//             buttonStatus={showButton}
//             decrementInputs={decrementInputs}
//           />
//         </div>
//       </Col>
//     </Row>
//   );
// };
// export default InputGenerator;


//trial 3

import React, { useState } from 'react';
import {
  Container,
  Input,
  Button,
  Form,
  FormGroup,
  Col
} from 'reactstrap';

const Amenities = () => {
  const [inputFields, setInputFields] = useState(['']);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push('');
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Do something with inputFields data, for example:
    console.log(inputFields);
  };

  const handleCancel = () => {
    // Handle cancel action if needed
    setInputFields(['']); // Reset input fields
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
                  onChange={event => handleInputChange(index, event)}
                />
                <div className="input-group-append">
                  {index === inputFields.length - 1 ? (
                    <>
                      <Button color="primary" onClick={handleAddFields}>
                        +
                      </Button>
                      {index > 0 && (
                        <Button color="danger" onClick={() => handleRemoveFields(index)}>
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
            </Button>{' '}
            <Button color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default Amenities;

