import React, { Fragment } from 'react'
import { Breadcrumbs, H5 } from '../../AbstractElements'
import GreetingCard from '../Dashboard/GreetingCard'
import { Card, CardBody, CardHeader, Container, Row, Table } from 'reactstrap'
import FineWrapper from './FineWrapper'

const ViewCollection = () => {
  return (
    <Fragment>
      <Breadcrumbs
        parent="Fine"
        mainTitle="Total Fine Collection"
        subParent="Total Fine Collection "
        title="Total Fine Collection"
      />
       <FineWrapper/>
      <Container fluid={true}>
        <Row>
          <Card>
            <CardHeader>
              <H5>All collection</H5>
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>xyz</td>
                    <td>abxavb</td>
                    <td>bed</td>
                    <td>abc</td>
                    <td>abc</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Card>
        </Row>
      </Container>
    </Fragment>
  );
}

export default ViewCollection
