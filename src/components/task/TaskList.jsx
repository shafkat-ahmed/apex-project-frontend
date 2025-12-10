import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  assignTaskToUser,
  deleteTask,
  getTasksPaginated,
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
import CustomModal from "../common/CustomModal";
import CustomSelect from "../common/CustomSelect";
import CustomTableServer from "../common/CustomTableServer";
import UserAssignForm from "../user/UserAssignForm";

const TaskList = () => {
  const { role } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const modalRef = useRef();

  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);
  const [priority, setPriority] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [userList, setUserList] = useState([]);
  const [upcomingStatus, setUpcomingStatus] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchTaskList = async () => {
    try {
      const response = await getTasksPaginated({
        status,
        priority,
        keyword,
        pageNumber: pageNumber - 1,
        pageLength,
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Oops!", error?.message, "error");
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

  const onAssign = async (user) => {
    console.log(selectedRow, user);
    try {
      const response = await assignTaskToUser(selectedRow?.id, user?.id);
      Swal.fire(
        "Success",
        `${user.name} assigned to ${selectedRow.title}`,
        "success"
      );
      fetchTaskList();
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Oops!",
        error?.response?.data?.message || "Assign Failed",
        "error"
      );
    }
  };

  let columns = [
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
      selector: (row) => row.priority,
      wrap: true,
      width: "150px",
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
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
          onEditClick={() => navigate(`/task/edit/${row.id}`)}
          onDeleteClick={() => deleteTask(row.id)}
          refetch={fetchTaskList}
          moreOptions={[
            {
              label: "Update Status",
              onClick: () => updateStatus(row),
            },
            {
              label: "Assign User",
              onClick: () => {
                setSelectedRow(row);
                modalRef.current?.open();
              },
            },
          ]}
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
      <div className="col-lg-6 ms-auto mb-2">
        <div className="my_profile_setting_input">
          <button
            className="create-btn-custom float-end"
            onClick={() => navigate("/task/create")}
          >
            Create Task
          </button>
        </div>
      </div>
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
      <CustomModal title="Assign User" ref={modalRef}>
        <UserAssignForm modalRef={modalRef} onAssign={onAssign} />
      </CustomModal>
    </div>
  );
};

export default TaskList;
