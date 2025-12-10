import React from "react";
import { useParams } from "react-router-dom";
import TaskCreate from "../../task/TaskCreate";

const Edit = () => {
  const { id } = useParams();
  return (
    <div className="col-lg-12">
      <TaskCreate id={id} />
    </div>
  );
};

export default Edit;
