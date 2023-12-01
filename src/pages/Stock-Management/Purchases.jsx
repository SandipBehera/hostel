import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import {
  Button,
  Card,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Table,
} from "reactstrap";
import "./stock.css";
import { WebApi } from "../../api";

export default function Purchases() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [buyerName, setBuyerName] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [modal, setModal] = useState(false);
  const [itemFor, setItemFor] = useState("");
  const [quantity, setQuantity] = useState();
  const [newItem, setNewItem] = useState("");

  const toggleModal = () => setModal(!modal);

  const items = [
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 15 },
    { id: 3, name: "Item 3", price: 20 },
  ];

  const handleInputChange = (e, type) => {
    let value;

    if (type === "dropdown") {
      value = parseInt(e.target.value, 10);
      setSelectedItemId(value);
    } else if (type === "quantity") {
      value = parseInt(e.target.value, 10);
      setSelectedQuantity(value);
    } else {
      value = e.target.value;
    }
  };

  const handleItemClick = () => {
    if (selectedItemId !== null) {
      const selectedItem = items.find((item) => item.id === selectedItemId);

      // Check if the item is already in the list
      const existingItem = selectedItems.find(
        (item) => item.id === selectedItemId
      );

      if (existingItem) {
        // Item already exists, update the quantity
        const updatedItems = selectedItems.map((item) =>
          item.id === selectedItemId
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        );

        const updatedTotalPrice =
          totalPrice + selectedItem.price * selectedQuantity;

        setSelectedItems(updatedItems);
        setTotalPrice(updatedTotalPrice);
      } else {
        // Item doesn't exist, add it to the list
        const updatedItems = [
          ...selectedItems,
          { ...selectedItem, quantity: selectedQuantity },
        ];

        const updatedTotalPrice =
          totalPrice + selectedItem.price * selectedQuantity;

        setSelectedItems(updatedItems);
        setTotalPrice(updatedTotalPrice);
      }

      setSelectedItemId(null); // Reset selected item after adding to the list
      setSelectedQuantity(1); // Reset quantity to 1
    }
  };

  const handleSubmit = async () => {
    // ... (existing handleSubmit logic)

    // Example code for sending data to a server (uncomment and modify as needed)
    // try {
    //   const data = {
    //     // ... (your data structure)
    //   };

    //   const response = await fetch("http://example.com/api/submit", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     // Handle success
    //   } else {
    //     // Handle error
    //   }
    // } catch (error) {
    //   console.error("An error occurred:", error);
    // }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Stock Management"
        mainTitle="Stock Entry"
        title="Stock Entry"
      />
      <Card className="p-5">
        <div>
          <div className="total-price">
            <Button color="success" onClick={toggleModal}>
              Add New Items
            </Button>
          </div>

          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Add New Item</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="itemDropdown">Enter Item:</Label>
                <Input
                  type="text"
                  name="itemDropdown"
                  id="itemDropdown"
                  onChange={(e) => setNewItem(e.target.value)}
                ></Input>
              </FormGroup>

              <div className="mb-2">
                <Label className="col-form-label">Item For:</Label>
                <Input
                  className="form-control form-control-secondary-fill btn-square"
                  name="select"
                  type="select"
                  onChange={(e) => {
                    setItemFor(e.target.value);
                  }}
                >
                  <option value="">Select Item for</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Mess">Mess</option>
                  <option value="Both">Both</option>
                </Input>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleItemClick}>
                Add Item
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <div className="items-list">
            <div className="d-flex align-items-end">
              <div className="mr-3" style={{ flex: 1 }}>
                <Label className="col-form-label font-weight-bold mb-2">
                  Available Items:
                </Label>
                <Input
                  className="form-control form-control-secondary-fill btn-square"
                  name="select"
                  type="select"
                  onChange={(e) => handleInputChange(e, "dropdown")}
                  value={selectedItemId !== null ? selectedItemId : ""}
                >
                  <option value="">Select an item</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} - ₹{item.price}
                    </option>
                  ))}
                </Input>
              </div>
              {selectedItemId !== null ? (
                <div className="mr-3" style={{ width: "100px" }}>
                  <Label className="col-form-label font-weight-bold mb-2">
                    Quantity:
                  </Label>
                  {/* Replace quantity dropdown with input field */}
                  <Input
                    className="form-control form-control-secondary-fill btn-square"
                    type="number"
                    min="1"
                    value={selectedQuantity}
                    onChange={(e) => handleInputChange(e, "quantity")}
                  />
                </div>
              ) : (
                ""
              )}
              <Button onClick={handleItemClick}>Add Item</Button>
            </div>
          </div>

          <div>
            <Label className="font-weight-bold mt-3">Selected Items:</Label>
            {selectedItems.length !== 0 ? (
              <Table className="table text-center">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.price * item.quantity}</td>{" "}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              ""
            )}
          </div>

          <div>
            <Label className="font-weight-bold mt-3" htmlFor="buyerName">
              Purchased From:
            </Label>
            <Input
              type="text"
              id="buyerName"
              value={buyerName}
              onChange={(e) => {
                setBuyerName(e.target.value);
              }}
            />

            <div>
              <FormGroup>
                <Label for="exampleFile" className="mt-3">
                  Upload Bill
                </Label>
                <Input id="exampleFile" name="file" type="file" />
              </FormGroup>
            </div>
            <p className="font-weight-bold total-price">
              Total Stock Price: ₹{totalPrice}/-
            </p>
          </div>

          <div>
            <Button color="primary" className="mt-2" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </Fragment>
  );
}
