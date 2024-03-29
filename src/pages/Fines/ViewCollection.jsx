import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import GreetingCard from "../Dashboard/GreetingCard";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
} from "reactstrap";
import FineWrapper from "./FineWrapper";
import { WebApi } from "../../api";
import { addNumbers } from "../../Hooks/sumFunction";
import { Action } from "../../Constant";
import ViewDetails from "./components/modal/viewDetails";
import { studentFineData } from "../../Hooks/fetch_student_data";

const ViewCollection = () => {
  const [FineData, setFineData] = useState([]);
  const [TotalFine, setTotalFine] = useState(0);
  const [TotalCollected, setTotalCollected] = useState(0);
  const [TotalRemains, setTotalRemains] = useState(0);
  const branch_id = parseInt(localStorage.getItem("branchId"));
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isViewOpen, setViewOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  const toggleView = () => setViewOpen(!isViewOpen);
  const toggleEdit = () => setEditOpen(!isEditOpen);
  const togglePayment = () => setPaymentOpen(!isPaymentOpen);
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const getFineData = async () => {
      if (userType === "student") {
        const data = await studentFineData(userId);
        setFineData(data.data);
        setTotalFine(data.FineCalac.totalAmount || 0);
        setTotalCollected(data.FineCalac.paidAmount || 0);
        setTotalRemains(data.FineCalac.remainingAmount || 0);
      } else {
        const response = await fetch(`${WebApi}/get_fine/${branch_id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            cookie: document.cookie,
          },
        });
        const data = await response.json();
        setFineData(data.data);
        setTotalFine(data.FineCalac.totalAmount || 0);
        setTotalCollected(data.FineCalac.paidAmount || 0);
        setTotalRemains(data.FineCalac.remainingAmount || 0);
      }
    };

    getFineData();
  }, []);

  return (
    <Fragment>
      <Breadcrumbs parent="Fine" mainTitle="Fine Dashboard" title="Dashboard" />
      <FineWrapper
        totalAmount={TotalFine}
        CollectedAmount={TotalCollected}
        remains={TotalRemains}
      />
      <Container fluid={true}>
        <Row>
          <Card>
            <CardHeader>
              <H5>All Fines</H5>
            </CardHeader>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>fine date</th>
                    <th>Damaged item name</th>
                    <th>Person Name</th>
                    <th>Fine Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {FineData.length > 0 ? (
                    FineData.map((fine, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{fine.created_at}</td>
                        <td>{fine.reason.broken_item}</td>
                        <td>{fine.name}</td>
                        <td>{fine.fine}</td>
                        <td>
                          <Dropdown
                            isOpen={activeDropdown === fine.studentid}
                            toggle={() => toggleDropdown(fine.studentid)}
                          >
                            <DropdownToggle caret>{Action}</DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={toggleView}>
                                View
                              </DropdownItem>
                              {userType !== "student" && (
                                <DropdownItem>Edit</DropdownItem>
                              )}
                              <DropdownItem>Make A Payment</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                        <ViewDetails
                          isViewOpen={isViewOpen}
                          onclick={toggleView}
                          header="View Details"
                          key={index}
                          data={fine}
                        />
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr>
                        <td colSpan="6" align="center" style={{ color: "red" }}>
                          No Data Found
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ViewCollection;
