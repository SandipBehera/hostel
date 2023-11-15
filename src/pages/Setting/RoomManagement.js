import React, { Fragment, useState } from "react";
// import Registration from "../../Components/Forms/FormLayout/FormWizard1/Registration";
// import Email from "../../Components/Forms/FormLayout/FormWizard1/Email";
// import Birthdate from "../../Components/Forms/FormLayout/FormWizard1/Birthdate";

import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FormWizardWithIcon } from "../../Constant";
import { Breadcrumbs } from "../../AbstractElements";
import CreateRoom from "./Component/RoomComponent/CreateRoom";
import FloorConfig from "./Component/RoomComponent/FloorConfig";
import RoomAmmenities from "./Component/RoomComponent/RoomAmmenities";
const RoomManagement = () => {
  const [steps, setSteps] = useState(1);
  const [formdata, setFormdata] = useState({});
  return (
    <Fragment>
      <Breadcrumbs
        parent="Forms"
        mainTitle="Form Wizard"
        subParent="Form Layout"
        title="Form Wizard"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                {steps === 1 && (
                  <CreateRoom
                    setSteps={setSteps}
                    setFormdata={setFormdata}
                    formdata={formdata}
                  />
                )}

                {steps === 2 && (
                  <FloorConfig
                    setSteps={setSteps}
                    setFormdata={setFormdata}
                    formdata={formdata}
                  />
                )}

                {steps === 3 && (
                  <RoomAmmenities
                    setSteps={setSteps}
                    setFormdata={setFormdata}
                    formdata={formdata}
                  />
                )}
                <div className="text-center">
                  <span
                    className={`step ${steps > 1 ? "finish" : ""} ${
                      steps === 1 ? "active" : ""
                    }`}
                  />
                  <span
                    className={`step ${steps > 2 ? "finish" : ""} ${
                      steps === 2 ? "active" : ""
                    }`}
                  />
                  <span
                    className={`step ${steps > 3 ? "finish" : ""} ${
                      steps === 3 ? "active" : ""
                    }`}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default RoomManagement;

// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Input } from 'reactstrap';
// const RoomManagement = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [inputs, setInputs] = useState(['Block Name', 'No of floor']);

//   const handleNext = () => {
//     if (currentStep < 3) {
//       const newInput = String.fromCharCode(inputs.length + 97); // Convert index to alphabet
//       setInputs([...inputs, newInput]);
//       setCurrentStep(currentStep + 1);
//     }
//   };
//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       const newInputs = [...inputs];
//       newInputs.pop();
//       setInputs(newInputs);
//       setCurrentStep(currentStep - 1);
//     }
//   };
//   return (
//     <Container>
//     <Row>
//       {inputs.map((input, index) => (
//         <Col key={index} md={12}>
//           <Input type="text" name={input} placeholder={` ${input.toUpperCase()}`} />
//         </Col>
//       ))}
//     </Row>
//     <Row className="mt-3">
//       <Col>
//         {currentStep > 1 && (
//           <Button onClick={handlePrevious} color="secondary" className="mr-2">
//             Previous
//           </Button>
//         )}
//         {currentStep < 3 && (
//           <Button onClick={handleNext} color="primary">
//             Next
//           </Button>
//         )}
//         </Col>
//         </Row>
//       </Container>
//   )
// }

// export default RoomManagement

// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Input } from 'reactstrap';

// const RoomManagement = () => {
//   const [steps, setSteps] = useState([
//     { id: 'a', value: '' },
//     { id: 'b', value: '' },
//   ]);
//   const [currentStep, setCurrentStep] = useState(0);

//   const handleInputChange = (id, value) => {
//     const updatedSteps = [...steps];
//     updatedSteps[currentStep] = { id, value };
//     setSteps(updatedSteps);
//   };

//   const handleNext = () => {
//     if (steps[currentStep].value !== '') {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col md={4}>
//           <Input
//             type="text"
//             name={steps[0].id}
//             placeholder={`Input ${steps[0].id.toUpperCase()}`}
//             value={steps[0].value}
//             onChange={(e) => handleInputChange(steps[0].id, e.target.value)}
//           />
//         </Col>
//         {currentStep >= 1 && (
//           <Col md={4}>
//             <Input
//               type="text"
//               name={steps[1].id}
//               placeholder={`Input ${steps[1].id.toUpperCase()}`}
//               value={steps[1].value}
//               onChange={(e) => handleInputChange(steps[1].id, e.target.value)}
//             />
//           </Col>
//         )}
//         {currentStep >= 2 && (
//           <Col md={4}>
//             <Input
//               type="text"
//               name={steps[2].id}
//               placeholder={`Input ${steps[2].id.toUpperCase()}`}
//               value={steps[2].value}
//               onChange={(e) => handleInputChange(steps[2].id, e.target.value)}
//             />
//           </Col>
//         )}
//       </Row>
//       <Row className="mt-3">
//         <Col>
//           {currentStep > 0 && (
//             <Button onClick={handlePrevious} color="secondary" className="mr-2">
//               Previous
//             </Button>
//           )}
//           {currentStep < steps.length - 1 && (
//             <Button onClick={handleNext} color="primary" disabled={steps[currentStep].value === ''}>
//               Next
//             </Button>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default RoomManagement;

// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

// const RoomManagement = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     blockName: '',
//     noOfFloors: '',
//     roomConfiguration: '',
//   });

//   const handleNext = () => {
//     setStep(step + 1);
//   };

//   const handlePrevious = () => {
//     setStep(step - 1);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <FormGroup>
//             <Label for="blockName">Block Name</Label>
//             <Input
//               type="text"
//               name="blockName"
//               id="blockName"
//               placeholder="Enter Block Name"
//               value={formData.blockName}
//               onChange={handleChange}
//             />
//           </FormGroup>
//         );
//       case 2:
//         return (
//           <FormGroup>
//             <Label for="noOfFloors">Number of Floors</Label>
//             <Input
//               type="number"
//               name="noOfFloors"
//               id="noOfFloors"
//               placeholder="Enter Number of Floors"
//               value={formData.noOfFloors}
//               onChange={handleChange}
//             />
//           </FormGroup>
//         );
//       case 3:
//         return (
//           <FormGroup>
//             <Label for="roomConfiguration">Room Configuration</Label>
//             <Input
//               type="text"
//               name="roomConfiguration"
//               id="roomConfiguration"
//               placeholder="Enter Room Configuration"
//               value={formData.roomConfiguration}
//               onChange={handleChange}
//             />
//           </FormGroup>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <Form>
//             {renderStepContent()}
//             <div className="mt-3">
//               {step > 1 && (
//                 <Button color="secondary" className="mr-2" onClick={handlePrevious}>
//                   Previous
//                 </Button>
//               )}
//               {step < 3 ? (
//                 <Button color="primary" onClick={handleNext}>
//                   Next
//                 </Button>
//               ) : (
//                 <Button color="success">Submit</Button>
//               )}
//             </div>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default RoomManagement;
