import { fi } from "date-fns/locale";
import { WebApi } from "../api";

const branchId = localStorage.getItem("branchId");

export const myComplaints = async () => {
  const response = await fetch(`${WebApi}/get_complaints`, {
    method: "GET",
  });
  const res = await response.json();

  const filter_data = res.data.filter(
    (item) =>
      item.branch_id === parseInt(localStorage.getItem("branchId")) &&
      item.issued_by === localStorage.getItem("userId")
  );

  return filter_data;
};
export const fetchHealthData = async () => {
  try {
    const response = await fetch(`${WebApi}/getAllPatient`);
    const respData = await response.json();
    console.log(respData.data);

    const data = respData.data
      ?.filter((key) => key.branch_id === parseInt(branchId))
      .map((item) => ({
        date: item.date,
        doc: item.doctorname,
        hostel: item.hostelid,
        floor: item.floorid,
        room: item.roomno,
        time: item.time,
        name: item.patientname,
        pres: item.upload_preception,

        // Add other properties as needed
      }));
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
