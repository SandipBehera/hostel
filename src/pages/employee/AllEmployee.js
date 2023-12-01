import React, { Fragment, useContext } from 'react';
import { Col, Card, CardHeader, Table, Button, Row } from 'reactstrap';

import { Btn, H5, Image } from '../../AbstractElements';
import TableContext from '../../_helper/Table';
import { useNavigate} from 'react-router-dom';
import { Grid } from 'react-feather';


const AllEmployee = () => {
  const { data } = useContext(TableContext);
  const navigate = useNavigate(); // Get the history object

  const handleCreateEmployee = () => {
    // Navigate to the create employee page when the button is clicked
    navigate('/create-employee'); // Replace '/create-employee' with the actual route to your create employee page
  };
// console.log(data);
  return (
    <Fragment>
       <div className="page-wrapper" id="pageWrapper">
        
      <Col sm='12'>
        <Card>
          <CardHeader>
           <Row className="align-items-center justify-content-between">
                <Col xs="auto" className="px-4">
                  <H5 className="mb-0">All Employee</H5>
                </Col>
                <Col xs="auto" className="px-4">
                  <Button onClick={handleCreateEmployee} className="py-2">Create Employee</Button>
                </Col>
              </Row>
              </CardHeader>
          <div className='table-responsive'>
            <Table>
              <thead>
                <tr className='border-bottom-primary'>
                  <th scope='col'>{'Id'}</th>
                  <th scope='col'>{'First Name'}</th>
                  <th scope='col'>{'Last Name'}</th>
                  <th scope='col'>{'Email'}</th>
                  <th scope='col'>{'Designation'}</th>
                  <th scope='col'>{'Contact No.'}</th>
                  <th scope='col'>{'Language'}</th>
                  <th scope='col'>{'Country'}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className={`border-bottom-${item.color}`}>
                    <th scope='row'>{item.id}</th>
                    <td>
                      <Image attrImage={{ className: 'img-30 me-2', src: require(`../../assets/images/user/${item.image}`), alt: 'user' }} />
                      {item.first_name}
                    </td>
                    <td>{item.last_name}</td>
                    <td>{item.user_name}</td>
                    <td>{item.role}</td>
                    <td>{item.company}</td>
                    <td>
                      <span className={`badge badge-light-${item.badgeColor}`}>{item.language}</span>
                    </td>
                    <td>{item.country}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Col>
      </div>
    </Fragment>
  );
};

export default AllEmployee;
