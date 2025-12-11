import React from "react";

const OverviewCard = ({ title, value, iconClass, color,bgColor }) => {
  return (
    <div
      className="d-flex align-items-center rounded "
      style={{
        color: "#fff",
        minWidth: "130px",
        padding: "8px",
        border: `1.5px solid ${color}`,
        boxSizing: "border-box",
       
      }}
    >
     <div style={{

    backgroundColor: bgColor, 
    padding:" 4px 7px 4px 7px",
    borderRadius:"5px"
  }}>
  <i
    className={`${iconClass} `}
    style={{
      fontSize: "1rem", 
      color: color,
      textAlign:"center"
    }}
  ></i>
</div>

      <div style={{marginLeft:"10px"}}>
        <h6 style={{ color: "#656565", margin: 0, fontSize: "0.9rem" }}>
          {title}
        </h6>
        <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold" }}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default OverviewCard;
