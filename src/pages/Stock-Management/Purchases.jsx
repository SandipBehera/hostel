import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { useNavigate } from "react-router-dom";
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
  Toast,
} from "reactstrap";
import "./stock.css";
import { LocalApi, WebApi } from "../../api";
import { toast } from "react-toastify";
// import { C } from "@fullcalendar/core/internal-common";

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
  const [itemPrice, setItemPrice] = useState(0); // New state to store price per item
  const [itemList, setItemList] = useState([]);
  const [isMarketPlace, setIsMarketPlace] = useState();
  const [file, setFile] = useState("");

  const branchId = localStorage.getItem("branchId");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
    setItemPrice(0); // Reset the price per item when the modal is toggled
  };
  const fetchItems = async () => {
    const response = await fetch(WebApi + "/get_items", {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: document.cookie,
      },
    });
    const data = await response.json();
    setItemList(
      data.data.filter((item) => item.branch_id === parseInt(branchId))
    );
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const handleInputChange = (e, type) => {
    let value;

    if (type === "dropdown") {
      value = parseInt(e.target.value, 10);
      setSelectedItemId(value);
      setItemPrice(0); // Reset the price per item when a new item is selected
    } else if (type === "quantity") {
      value = parseInt(e.target.value, 10);
      setSelectedQuantity(value);
    } else if (type === "price") {
      value = parseFloat(e.target.value);
      setItemPrice(value);
    } else {
      value = e.target.value;
    }
  };

  const handleItemClick = () => {
    if (selectedItemId !== null) {
      const selectedItem = itemList.find((item) => item.id === selectedItemId);

      const existingItem = selectedItems.find(
        (item) => item.id === selectedItemId
      );

      if (existingItem) {
        const updatedItems = selectedItems.map((item) =>
          item.id === selectedItemId
            ? {
                ...item,
                quantity: item.quantity + selectedQuantity,
                price: itemPrice,
              }
            : item
        );
        toast.success("Item");

        const updatedTotalPrice = totalPrice + itemPrice * selectedQuantity;

        setSelectedItems(updatedItems);
        setTotalPrice(updatedTotalPrice);
      } else {
        const updatedItems = [
          ...selectedItems,
          {
            ...selectedItem,
            quantity: selectedQuantity,
            price: itemPrice,
          },
        ];

        const updatedTotalPrice = totalPrice + itemPrice * selectedQuantity;

        setSelectedItems(updatedItems);
        setTotalPrice(updatedTotalPrice);
      }

      setSelectedItemId(null);
      setSelectedQuantity(1);
      setItemPrice(0); // Reset the price per item after adding to the list
    }
  };

  const handleCreateItem = async () => {
    if (newItem === "" || itemFor === "") {
      toast.warning("All Fields Required");
    } else {
      const response = await fetch(WebApi + "/create_item", {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
          "Content-Type": "application/json",
        },
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          item_name: newItem,
          item_for: itemFor,
          branch_id: branchId,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        toast.success(data.message);
        fetchItems();
        setModal(!modal);
      } else {
        toast.error(data.message);
      }
    }
  };
  console.log("selectedItems", selectedItems);

  const handleSubmit = async () => {
    console.log(selectedItems);
    console.log(file, isMarketPlace);
    if (buyerName === "" || totalPrice === 0) {
      toast.warning("Please Select Items");
    } else {
      {
        const data = {
          total_price: totalPrice,
          purchased_from: buyerName,
          branch_id: branchId,
          allItems: selectedItems,
        };

        await fetch(`${WebApi}/add_stock`, {
          method: "POST",
          credentials: "include",
          headers: {
            Cookie: document.cookie,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          // headers: {
          //   "Content-type": "Application/json",
          // },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            toast.success(data.message);
            navigate(`/admin/${userId}/all-item-purchases`);
          })
          .catch((e) => {
            console.log(e);
            toast.error("Faild to add stocks");
          });
      }
    }
  };
  return (
    <Fragment>
      <Breadcrumbs
        parent="Setings"
        subParent="Item Management"
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
              <Button color="primary" onClick={handleCreateItem}>
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
                >
                  <option value="">Select an item</option>
                  {itemList &&
                    itemList.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        selected={selectedItemId === item.id}
                      >
                        {item.item_name}
                      </option>
                    ))}
                </Input>
              </div>
              {selectedItemId !== null ? (
                <div className="mr-3" style={{ width: "100px" }}>
                  <Label className="col-form-label font-weight-bold mb-2">
                    Quantity:
                  </Label>
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
              {selectedItemId !== null ? (
                <div className="mr-3" style={{ width: "100px" }}>
                  <Label className="col-form-label font-weight-bold mb-2">
                    Price per Item:
                  </Label>
                  <Input
                    className="form-control form-control-secondary-fill btn-square"
                    type="number"
                    min="0"
                    step="0.01"
                    value={itemPrice}
                    onChange={(e) => handleInputChange(e, "price")}
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
                  {selectedItems !== undefined &&
                    selectedItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.item_name}</td>
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
            <Label className="col-form-label font-weight-bold mb-2">
              Available for market place
            </Label>
            <Input
              type="select"
              className="form-control form-control-secondary-fill btn-square"
              onChange={(e) => {
                setIsMarketPlace(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </Input>
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
                <Input
                  id="exampleFile"
                  name="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
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
