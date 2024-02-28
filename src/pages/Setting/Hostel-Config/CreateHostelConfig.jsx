import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Container,
  Input,
  Button,
  Form,
  FormGroup,
  Col,
  Row,
  CardHeader,
} from "reactstrap";
import { H5, H6 } from "../../../AbstractElements";
import { LocalApi, WebApi } from "../../../api";
import { toast } from "react-toastify";

const CreateHostelConfig = (props) => {
  const [inputFields, setInputFields] = useState([""]);
const [designation, setDesignation] = useState([]);
const [roomType, setRoomType] = useState([]);
const [aminites, setAminities] = useState([]);
  const handleInputChange = (index, event) => {
    const inputValue = event.target.value;
    // Only update the input field if it contains alphabets
    if (/^[A-Za-z\s]*$/.test(inputValue)) {
      const values = [...inputFields];
      values[index] = inputValue;
      setInputFields(values);
    }
};

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
  fetchDesignation("designation").then((data) => {
    setDesignation(data[0]?.config_type_name.data);
  });
}, []);
useEffect(() => {
  fetchDesignation("room_type").then((data) => {
    setRoomType(data[0]?.config_type_name.data);
  });
}, []);
useEffect(() => {
  fetchDesignation("ammenities").then((data) => {
    setAminities(data[0]?.config_type_name.data);
  });
}, []);


console.log(designation)
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
  

  const handleSubmit = async (event) => {

    event.preventDefault();
    console.log(props.config_type)
    let flag = false;
    let repeat = "";

    inputFields.map((item)=>{
      if(props.config_type==="ammenities")
      {
        const filterData = aminites.filter((i)=>i===item)
        if(filterData.length>0){
          flag = true;
          repeat = filterData[0];
          return
        }

      }
      if(props.config_type==="room_type")
      {
        const filterData = roomType.filter((i)=>i===item)
        if(filterData.length>0){
          flag = true;
          repeat = filterData[0];
          return
        }

      }
      if(props.config_type==="designation")
      {
        const filterData = designation.filter((i)=>i===item)
        if(filterData.length>0){
          flag = true;
          repeat = filterData[0];
          return
        }

      }

     
    })
    if(flag)
    {
      toast.warning("Config Already Exists")
      console.log("first", repeat)
      return;
    }
    // Do something with inputFields data, for example:
    if (
      inputFields.length === 0 ||
      inputFields.some((field) => field.trim() === "")
    ) {
      toast.warning("Cannot Add Empty Field");
    } else {
      console.log(inputFields);
      const data = {
        config_type: props.config_type,
        config_type_name: inputFields,
        branch_id: parseInt(localStorage.getItem("branchId")),
      };
      data.config_type_name = JSON.stringify({ data: data.config_type_name });
      const response = await fetch(`${WebApi}/addConfig`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          cookie: document.cookie,
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.status === "success") {
        toast.success(res.message);
        setInputFields([""]);
      } else {
        toast.success(res.message);
      }
    }
  };

  const handleCancel = () => {
    // Handle cancel action if needed
    setInputFields([""]); // Reset input fields
  };

  return (
    <Fragment>
      <Container>
        <Row className="justify-content-center">
          <Col sm="12">
            <Card>
              <CardHeader>
                <H5>{props.title}</H5>
              </CardHeader>
              <span className="text-danger p-2 m-2 text-center">
                To create multiple {props.title} you need to click + icon
              </span>
              <Form onSubmit={handleSubmit}>
                {inputFields.map((inputField, index) => (
                  <FormGroup key={index} row>
                    <Col sm={{ size: 8, offset: 2 }}>
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
                      Create
                    </Button>
                    &nbsp;
                    <Button color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CreateHostelConfig;
