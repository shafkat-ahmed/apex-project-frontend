import React, { Fragment } from "react";

const Loader = () => {
  return (
    <Fragment>
      <div className={`loader-wrapper`} style={{ backgroundColor: "white" }}>
        <div className="loader bg-transparent">
          <div className="whirly-loader"> </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Loader;
