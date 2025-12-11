import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import { useState } from "react";
import Swal from "sweetalert2";

const ITEM_HEIGHT = 48;

export default function ActionsColumn({
  onEditClick,
  onDeleteClick,
  onViewClick,
  refetch,
  moreOptions = [],
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const options = [
    ...(onEditClick
      ? [
          {
            label: "Edit",
            onClick: onEditClick,
            icon: "bi-pencil",
          },
        ]
      : []),
    ...(onViewClick
      ? [
          {
            label: "View",
            onClick: onViewClick,
            icon: "bi-eye",
          },
        ]
      : []),
    ...(onDeleteClick
      ? [
          {
            label: "Delete",
            onClick: handleDelete,
            icon: "bi-trash",
          },
        ]
      : []),
    ...moreOptions,
  ];

  function handleDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to delete this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClick()
          .then(() => {
            Swal.fire("Deleted!", "Your record has been deleted.", "success");
            refetch && refetch();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Oops!", "Failed to delete record", "error");
          });
      }
    });
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <BsThreeDotsVertical />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        <div>
          {options.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleClose();
                option.onClick && option.onClick();
              }}
            >
              <span className="d-flex align-items-center gap-1">
                {option.icon && <i className={`bi ${option.icon}`}></i>}
                {option.label || option.name}
              </span>
            </MenuItem>
          ))}
        </div>
      </Menu>
    </div>
  );
}
