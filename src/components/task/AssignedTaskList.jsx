import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAssignedTasksPaginated,
  updateStatusToNext,
} from "../../services/api";
import {
  TaskPriority,
  TaskPriorityOptions,
  TaskStatus,
  TaskStatusOptions,
} from "../../utils/constants/Task";
import { formatDateToIsoInput } from "../../utils/dateUtils";
import ActionsColumn from "../common/ActionsColumn";
import CustomSelect from "../common/CustomSelect";
import CustomTableServer from "../common/CustomTableServer";

const AssignedTaskList = () => {
  const { role } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const modalRef = useRef();

  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);
  const [priority, setPriority] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchTaskList = async () => {
    try {
      const response = await getAssignedTasksPaginated({
        status,
        priority,
        keyword,
        pageNumber: pageNumber - 1,
        pageLength,
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Oops!",
        error?.response?.data?.message || "Fetch Failed",
        "error"
      );
    }
  };

  const updateStatus = async (row) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to update status of Task - ${row?.title}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, carry on!",
        cancelButtonText: "No!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateStatusToNext(row?.id);
          Swal.fire("Updated!", "The task status has been updated.", "success");
          fetchTaskList();
        }
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      Swal.fire("Oops!", error?.response?.data?.message, "error");
    }
  };

  const StatusSelect = () => {
    return (
      <div className="col-lg-3">
        <CustomSelect
          label="Task Status"
          placeholder="Select a status"
          options={TaskStatusOptions || []}
          values={TaskStatusOptions?.filter(
            (item) => TaskStatus[item.id] === TaskStatus[status]
          )}
          onChangeHandler={(value) => {
            setStatus(value.id);
          }}
        />
      </div>
    );
  };

  const PrioritySelect = () => {
    return (
      <div className="col-lg-3">
        <CustomSelect
          label="Task Priority"
          placeholder="Select a priority"
          options={TaskPriorityOptions || []}
          values={TaskPriorityOptions?.filter(
            (item) => TaskPriority[item.id] === TaskPriority[priority]
          )}
          onChangeHandler={(value) => {
            setPriority(value.id);
          }}
        />
      </div>
    );
  };

  const onFilterChange = (filterText) => setKeyword(filterText);

  let columns = [
    {
      name: "Assigned By",
      sortable: true,
      selector: (row) => row.assignedBy?.name,
      wrap: true,
    },
    {
      name: "Title",
      sortable: true,
      selector: (row) => row.title,
      wrap: true,
    },
    {
      name: "Description",
      sortable: true,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: "Priority",
      sortable: true,
      cell: (row) => {
        const val = row.priority || "";
        const cls = `tm-badge priority-${val.toString().toLowerCase()}`;
        return <span className={cls}>{val}</span>;
      },
      wrap: true,
      width: "150px",
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => {
        const key = row.status || "";
        const text = TaskStatus[key] || key;
        const cls = `tm-badge status-${key
          .toString()
          .toLowerCase()
          .replace(/_/g, "-")}`;
        return <span className={cls}>{text}</span>;
      },
      wrap: true,
      width: "150px",
    },
    {
      name: "Start Date",
      sortable: true,
      selector: (row) => row.startDate,
      wrap: true,
      width: "150px",
    },
    {
      name: "Due Date",
      sortable: true,
      selector: (row) => row.dueDate,
      wrap: true,
      width: "150px",
    },
    {
      name: "Creation Date",
      sortable: true,
      selector: (row) => formatDateToIsoInput(row.projectCreationDate),
      wrap: true,
      width: "150px",
    },
    {
      name: "Action",
      cell: (row) => (
        <ActionsColumn
          refetch={fetchTaskList}
          {...(TaskStatus[row.status] !== TaskStatus.COMPLETED && {
            moreOptions: [
              {
                label: "Update Status",
                onClick: () => updateStatus(row),
                icon: "bi-arrow-right-circle",
              },
            ],
          })}
        />
      ),
      wrap: true,
      center: true,
    },
  ];

  useEffect(() => {
    fetchTaskList();
  }, [status, priority, keyword, pageNumber, pageLength]);

  return (
    <div className="container-fluid">
      <div className="col-lg-12">
        <CustomTableServer
          onPageChange={(pageNumber) => setPageNumber(pageNumber)}
          onRowsPerPageChange={(pageLength) => setPageLength(pageLength)}
          columns={columns}
          data={data?.data || []}
          totalRows={data?.totalNumberOfElements}
          filterOptions={[
            <StatusSelect key="status-select" />,
            <PrioritySelect key="priority-select" />,
          ]}
          filterPlaceholder="Search By Title"
          onFilterChange={onFilterChange}
        />
      </div>
    </div>
  );
};

export default AssignedTaskList;
