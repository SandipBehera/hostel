// import React from 'react';
// import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';

// const StudentDashboard = () => {
//   // Simulated data (you'll fetch this data from API/backend)
//   const studentInfo = {
//     daysPresent: 65,
//     daysAbsent: 15,
//     outingInfo: {
//       planned: 5,
//       unplanned: 2,
//     },
//     feeData: {
//       totalFees: 5000,
//       feesPaid: 4000,
//       feesPending: 1000,
//     },
//     complaints: 3,
//     academicInfo: {
//       grade: 'A',
//       rank: 5,
//     },
//   };

//   const healthInfo = {
//     bloodPressure: '120/80',
//     heartRate: '72 bpm',
//     temperature: '98.6°F',
//     weight: '65 kg',
//     height: '175 cm',
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col lg="6" className="mb-4">
//           <Card>
//             <CardHeader>Student Information </CardHeader>
//             <CardBody>
//               <h5>Attendance Information</h5>
//               <p>Present: {studentInfo.daysPresent} days</p>
//               <p>Absent: {studentInfo.daysAbsent} days</p>

//               <h5>Outing Information</h5>
//               <p>Planned: {studentInfo.outingInfo.planned}</p>
//               <p>Unplanned: {studentInfo.outingInfo.unplanned}</p>

//               <h5>Fee Data</h5>
//               <p>Total Fees: ${studentInfo.feeData.totalFees}</p>
//               <p>Fees Paid: ${studentInfo.feeData.feesPaid}</p>
//               <p>Fees Pending: ${studentInfo.feeData.feesPending}</p>

//               <h5>Complaints Status</h5>
//               <p>Total Complaints: {studentInfo.complaints}</p>

//               <h5>Academic Information</h5>
//               <p>Grade: {studentInfo.academicInfo.grade}</p>
//               <p>Rank: {studentInfo.academicInfo.rank}</p>
//             </CardBody>
//           </Card>
//         </Col>

//         <Col lg="6" className="mb-4">
//           <Card>
//             <CardHeader>Health Information</CardHeader>
//             <CardBody>
//               <p>Blood Pressure: {healthInfo.bloodPressure}</p>
//               <p>Heart Rate: {healthInfo.heartRate}</p>
//               <p>Temperature: {healthInfo.temperature}</p>
//               <p>Weight: {healthInfo.weight}</p>
//               <p>Height: {healthInfo.height}</p>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default StudentDashboard;


import React from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { H5 } from '../../AbstractElements';
import ActivityCard from '../../pages/Dashboard/ActivityCard';

const StudentDashboard = () => {
  // Simulated data (you'll fetch this data from API/backend)
  const studentInfo = {
    daysPresent: 65,
    daysAbsent: 15,
    outingInfo: {
      planned: 5,
      unplanned: 2,
    },
    feeData: {
      totalFees: 5000,
      feesPaid: 4000,
      feesPending: 1000,
    },
    complaints: {
        totalComplaints: 10,
        pendingIssues: 5,
        issueResolved : 10,
    
    },
    
    academicInfo: {
      grade: 'A',
      rank: 5,
    },
  };

  const healthInfo = {
    bloodPressure: '120/80',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    weight: '65 kg',
    height: '175 cm',
  };

  const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    borderRadius: '10px',
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.4)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.3)';
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col lg="12" className="mb-4">
          <Card>
            <CardHeader><H5>Student Information</H5></CardHeader>
            <CardBody>
              <Row>
                <Col lg="6" className="mb-4">
                  <Card
                    style={{ ...cardStyle, backgroundColor: 'whitesmoke' }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <CardHeader><H5>Attendance Information</H5></CardHeader>
                    <CardBody>
                      <p>Present: {studentInfo.daysPresent} days</p>
                      <p>Absent: {studentInfo.daysAbsent} days</p>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="6" className="mb-4">
                  <Card
                    style={{ ...cardStyle, backgroundColor: 'whitesmoke' }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <CardHeader><H5>Outing Information</H5></CardHeader>
                    <CardBody>
                      <p>Planned: {studentInfo.outingInfo.planned}</p>
                      <p>Unplanned: {studentInfo.outingInfo.unplanned}</p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col lg="6" className="mb-4">
                  <Card
                    style={{ ...cardStyle, backgroundColor: 'whitesmoke' }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <CardHeader><H5>Fee Data</H5></CardHeader>
                    <CardBody>
                      <p>Total Fees: ${studentInfo.feeData.totalFees}</p>
                      <p>Fees Paid: ${studentInfo.feeData.feesPaid}</p>
                      <p>Fees Pending: ${studentInfo.feeData.feesPending}</p>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="6" className="mb-4" >
                  <Card
                    style={{ ...cardStyle, backgroundColor: 'whitesmoke' }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <CardHeader><H5>Complaints Status</H5></CardHeader>
                    <CardBody>
                      <p>Total Complaints: {studentInfo.complaints.totalComplaints}</p>
                      <p>Pending Issues: {studentInfo.complaints.pendingIssues}</p>
                      <p>Issues Resolved: {studentInfo.complaints.issueResolved}</p>
                    </CardBody>
                   
                  </Card>
                </Col>
              </Row>
              

              <Row>
                <Col lg="6" className="mb-4">
                  <Card
                    style={{ ...cardStyle, backgroundColor: 'whitesmoke' }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <CardHeader><H5>Academic Information</H5></CardHeader>
                    <CardBody>
                      <p>Grade: {studentInfo.academicInfo.grade}</p>
                      <p>Rank: {studentInfo.academicInfo.rank}</p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {/* Health Management Section */}
      <Row>
        <Col lg="6" className="mt-4" backgroundColor="white">
          <Card
            style={{ ...cardStyle, backgroundColor: 'whitesmoke' }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <CardHeader><H5>Health Information</H5></CardHeader>
            <CardBody>
              <p>Blood Pressure: {healthInfo.bloodPressure}</p>
              <p>Heart Rate: {healthInfo.heartRate}</p>
              <p>Temperature: {healthInfo.temperature}</p>
              <p>Weight: {healthInfo.weight}</p>
              <p>Height: {healthInfo.height}</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      
    </Container>
  );
};

export default StudentDashboard;


 