import React, { Fragment } from "react";
import CreateHostelConfig from "./Hostel-Config/CreateHostelConfig";

export default function HostelConfig() {
  const data = [
    { title: "Ammenities", config_type: "ammenities" },
    { title: "Room Type", config_type: "room_type" },
    { title: "Designation", config_type: "designation" },
  ];
  return (
    <Fragment>
      {data.map((key) => (
        <CreateHostelConfig title={key.title} config_type={key.config_type} />
      ))}
    </Fragment>
  );
}
