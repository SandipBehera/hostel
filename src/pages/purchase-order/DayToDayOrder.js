import React, { Fragment, useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Col, Row, Button, CardHeader, Card, Breadcrumb } from 'reactstrap';
import { Breadcrumbs, H5 } from '../../AbstractElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const DayToDayOrder = () => {
  const [items, setItems] = useState([{ itemName: '', itemQuantity: '' }]);
  const [selectedOption, setSelectedOption] = useState('');
  const [itemNameOptions, setItemNameOptions] = useState([]);

  useEffect(() => {
    // Fetching "Item Name" options from the API endpoint
    fetch('your-api-endpoint-for-item-names')
      .then(response => response.json())
      .then(data => {
        // Assuming the API response returns an array of item names
        setItemNameOptions(data);
      })
      .catch(error => {
        console.error('Error fetching item names:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleOptionSelect = event => {
    setSelectedOption(event.target.value);
  };

  const handleAddItem = () => {
    const newItems = [...items, { itemName: '', itemQuantity: '' }];
    setItems(newItems);
  };

  const handleItemNameChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].itemName = value;
    setItems(updatedItems);
  };

  const handleItemQuantityChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].itemQuantity = value;
    setItems(updatedItems);
  };

  const handleDeleteItem = indexToDelete => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updatedItems);
  };
  
  const handleSubmit = () => {
    // Perform actions with the collected data, e.g., send it to an API
    console.log('Collected Data:', items);
    // Add your logic here to handle the submitted data
  };


  return (
    <Fragment>
        <Breadcrumbs
             parent="Purchase Order"
             mainTitle="Day To Day Order"
             title="Day To Day Order"
             />
      <Card>
       
        <div>
          <Row className="justify-content-center mb-4 mt-4">
            <Col md="8">
              <InputGroup>
              <InputGroupText>
                        Choose Stock For:
              </InputGroupText>
                <Input 
                  type="select"
                  placeholder="Select an option"
                  value={selectedOption}
                  onChange={handleOptionSelect}
                >
                  <option value="Mess">Mess</option>
                  <option value="Hostel">Hostel</option>
                </Input>
              </InputGroup>
            </Col>
          </Row>

          <Row className="justify-content-center ">
            <Col md="8">
              {items.map((item, index) => (
                <Row key={index} className="mb-3 align-items-center">
                  <Col md="5" className="mb-2">
                    <InputGroup>
                      <InputGroupText>
                        Item Name:
                      </InputGroupText>
                      <Input 
                        type="select"
                        value={item.itemName}
                        onChange={e => handleItemNameChange(index, e.target.value)}
                      >
                        <option value="">Select an option</option>
                        {itemNameOptions.map((itemName, idx) => (
                          <option key={idx} value={itemName}>{itemName}</option>
                        ))}
                      </Input>
                    </InputGroup>
                  </Col>
                  <Col md="5" className="mb-2">
                    <InputGroup>
                      <InputGroupText>
                        Item Quantity:
                      </InputGroupText>
                      <Input 
                        type="text"
                        value={item.itemQuantity}
                        onChange={e => handleItemQuantityChange(index, e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                 
                  <Col md="1" className="d-flex align-items-center">
                   {index === items.length - 1 && ( // Render add icon for the last row
                   <Button color="primary" onClick={handleAddItem} className="p-2 me-2">
                   <FontAwesomeIcon icon={faPlus} />
                   </Button>
                    )}
                    {index !== 0 && ( // Render subtract icon for all rows except the first one
                    <Button color="danger" onClick={() => handleDeleteItem(index)} className="p-2">
                    <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    )}
                   </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </div>
        <Row className="justify-content-center mb-4">
          <Col md="8">
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default DayToDayOrder;
