import React from "react";

const FormContainer = (props) => {
  return (
    <div className="col-lg-12">
      <div className="my_dashboard_review">
        <div className="row">{props.children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
