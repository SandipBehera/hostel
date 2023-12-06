import React, { useState } from 'react';
import { Button, Input, Table } from 'reactstrap';
import { H5 } from '../../AbstractElements';
import Papa from 'papaparse';

export default function MonthlyAttendanceReport() {
  const [hostel, setHostel] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [studentData, setStudentData] = useState([]);

  const generateDummyData = () => {
    const dummyData = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      regNo: `100${index + 1}`,
      name: `Student ${index + 1}`,
      hostel: `Hostel ${index % 2 === 0 ? 'A' : 'B'}`,
      roomNo: `10${index + 1}`,
      status: index % 2 === 0 ? 'Present' : 'Absent',
      date: `2023-01-${index + 1}`, // Assuming a date field in your data
    }));

    const filteredData = dummyData.filter(
      (student) =>
        student.hostel === hostel &&
        student.date >= dateFrom &&
        student.date <= dateTo
    );

    setStudentData(filteredData);
  };

  const handleSubmit = () => {
    // Here you can fetch and display the student data based on the selected inputs
    console.log('Hostel:', hostel);
    console.log('Date From:', dateFrom);
    console.log('Date To:', dateTo);

    // For now, generate dummy data
    generateDummyData();
  };

  const exportToCSV = () => {
    const csvData = [
      ['S.No.', 'St. Reg. No.', 'St. Name', 'H-Name', 'Room No', 'Present/Absent', 'Action'],
      ...studentData.map(({ id, regNo, name, hostel, roomNo, status }) => [
        id, regNo, name, hostel, roomNo, status, 'Action Placeholder'
      ]),
    ];

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'attendance_report.csv';
    link.click();
  };

  return (
    <div>
      <H5>Monthly Attendance Report</H5>
      <div className='d-flex justify-content-end align-items-end'>
        <Button onClick={exportToCSV}>Export</Button>
      </div>

      {/* Select Hostel */}
      <Table>
        <thead className='text-center'>
          <tr>
            <th>
              <label htmlFor='hostelSelect'>Select Hostel</label>
            </th>
            <th>
              <label htmlFor='dateFromSelect'>Select Date From</label>
            </th>
            <th>
              <label htmlFor='dateToSelect'>Select Date To</label>
            </th>
          </tr>
        </thead>
        <tbody>
          <td>
            <Input
              id='hostelSelect'
              type='select'
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
            >
              <option value=''>-- Select Hostel --</option>
              <option value='Hostel A'>Hostel A</option>
              <option value='Hostel B'>Hostel B</option>
              {/* Add more hostel options as needed */}
            </Input>
          </td>
          <td>
            <Input
              id='dateFromSelect'
              type='select'
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            >
              <option value=''>-- Select Date From --</option>
              <option value='2023-01-01'>2023-01-01</option>
              <option value='2023-02-01'>2023-02-01</option>
              {/* Add more date options as needed */}
            </Input>
          </td>
          <td>
            <Input
              type='select'
              id='dateToSelect'
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            >
              <option value=''>-- Select Date To --</option>
              <option value='2023-01-31'>2023-01-31</option>
              <option value='2023-02-28'>2023-02-28</option>
              {/* Add more date options as needed */}
            </Input>
          </td>
          <td>
            <Button color='primary ' onClick={handleSubmit} disabled={!hostel || !dateFrom || !dateTo}>
              Submit
            </Button>
          </td>
        </tbody>
      </Table>

      {/* Display Student Data */}
      {studentData.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>St. Reg. No.</th>
              <th>St. Name</th>
              <th>H-Name</th>
              <th>Room No</th>
              <th>Present/Absent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map(({ id, regNo, name, hostel, roomNo, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{regNo}</td>
                <td>{name}</td>
                <td>{hostel}</td>
                <td>{roomNo}</td>
                <td>{status}</td>
                <td>Action </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
