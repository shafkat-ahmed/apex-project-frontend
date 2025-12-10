import { useState } from "react";
import Select from "react-dropdown-select";

export default function CustomSelect({
  label,
  options = [],
  defaultValue,
  className = "",
  error,
  labelField = "name",
  ...props
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-100" style={{ textAlign: "left" }}>
      {label && (
        <label className="form-label fw-bold text-secondary">{label}</label>
      )}

      <div
        className={`custom-select-wrapper ${error ? "border-danger" : ""} ${
          open ? "active" : ""
        }`}
      >
        <i className="bi bi-search custom-select-icon"></i>
        <Select
          className="custom-select-dropdown"
          options={options}
          searchable
          separator
          values={defaultValue ? [{ ...defaultValue }] : []}
          onDropdownOpen={() => setOpen(true)}
          onDropdownClose={() => setOpen(false)}
          onChange={(values) => {
            if (values.length > 0) {
              props.multi
                ? props.onChangeHandler(values)
                : props.onChangeHandler(values[0]);
            } else {
              props.multi
                ? props.onChangeHandler([])
                : props.onChangeHandler({});
            }
          }}
          valueField="id"
          labelField={labelField}
          searchBy={labelField}
          {...props}
        />
      </div>

      {error && <div className="text-danger mt-1 small">{error}</div>}

      <style>{`
        .custom-select-wrapper {
          position: relative;
          width: 100%;
          transition: 0.25s ease;
          border: 1px solid #ced4da;
          border-radius: 0.55rem;
          padding-left: 2.2rem;
          background: #fff;
        }

        .custom-select-wrapper.active {
          border-color: #0d6efd !important;
          box-shadow: 0 0 0 0.15rem rgba(13,110,253,0.25);
        }

        .custom-select-wrapper:hover {
          border-color: #0d6efd;
        }

        .custom-select-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-80%);
          width: 1.1rem;
          height: 1.1rem;
          color: #6c757d;
          z-index: 10;
          flex-shrink: 0;
        }

        .custom-select-dropdown {
          background: transparent !important;
        }

        .react-dropdown-select {
          border: none !important;
          background: transparent !important;
          font-size: 15px;
          min-height: 52px;
          padding: 6px 10px;
          cursor: pointer;
        }

        .react-dropdown-select-control {
          border: none !important;
        }

        .react-dropdown-select-input {
          margin-left: 6px !important;
        }

        .react-dropdown-select-dropdown {
          border-radius: 0.5rem !important;
          box-shadow: 0 5px 20px rgba(0,0,0,0.12) !important;
          animation: dropdownFade 0.2s ease forwards;
        }

        @keyframes dropdownFade {
          0% { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* MULTI SELECT BADGES */
        .react-dropdown-select-item-selected {
          background: #0d6efd !important;
          color: #fff !important;
          border-radius: 20px !important;
          font-size: 13px !important;
          padding: 4px 10px !important;
        }
      `}</style>
    </div>
  );
}
