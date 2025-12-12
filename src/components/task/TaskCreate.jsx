import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  createTask,
  getTaskById,
  getUsersByRoleName,
  updateTask,
} from "../../services/api";
import { ROLE_USER } from "../../utils/constants/Roles";
import { TaskPriorityOptions } from "../../utils/constants/Task";
import CustomSelect from "../common/CustomSelect";

const TaskCreate = ({ id }) => {
  const { role } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const [singleData, setSingleData] = useState(null);
  const [userList, setUserList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
    getValues,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    data.name = data.title.trim();
    console.log(data);
    try {
      const response = data.id
        ? await updateTask(data)
        : await createTask(data);
      console.log("task created :", response);
      Swal.fire(
        "Success",
        data.id ? "Updated successfully" : "Created successfully",
        "success"
      );
      navigate("/task/list");
    } catch (error) {
      console.log("Error:", error);
      Swal.fire(
        "Oops!",
        data.id ? "Task update failed" : "Task create failed",
        "error"
      );
    }
  };

  const getTask = async () => {
    try {
      const response = await getTaskById(id);
      setSingleData(response.data);
    } catch (error) {
      Swal.fire("Error", "Fetch Failed", "error");
    }
  };

  const getUserListForAssigning = async () => {
    try {
      const response = await getUsersByRoleName(ROLE_USER);
      setUserList(response.data);
    } catch (error) {
      Swal.fire("Error", "User Fetch Failed", "error");
    }
  };

  useEffect(() => {
    singleData &&
      Object.entries(singleData).forEach(([key, value]) => {
        setValue(key, value);
      });
  }, [singleData]);

  useEffect(() => {
    id && getTask();
  }, [id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-6">
          <Controller
            name="priority"
            control={control}
            rules={{ required: "Priority is required" }}
            render={({ field }) => (
              <CustomSelect
                label="Priority"
                placeholder="Select a priority"
                options={TaskPriorityOptions || []}
                values={TaskPriorityOptions?.filter(
                  (item) => item.id === getValues("priority")
                )}
                onChangeHandler={(value) => {
                  setValue("priority", value.id);
                }}
                error={errors.priority?.message}
              />
            )}
          />
        </div>
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="propertyTitle">Task Title *</label>
            <input
              type="text"
              placeholder="Title"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title.message}</div>
            )}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="propertyTitle">Description</label>
            <textarea
              rows={3}
              type="text"
              placeholder=""
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              id="description"
              {...register("description", { required: "Description Required" })}
            />
            {errors.description && (
              <div className="invalid-feedback">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input
              type="date"
              className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
              {...register("startDate", {
                required: "Start date is required",
              })}
              name="startDate"
            />
            {errors.startDate && (
              <div className="invalid-feedback">{errors.startDate.message}</div>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="dueDate">Due Date *</label>
            <input
              type="date"
              className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
              {...register("dueDate", {
                required: "Due date is required",
              })}
              name="dueDate"
            />
            {errors.dueDate && (
              <div className="invalid-feedback">{errors.dueDate.message}</div>
            )}
          </div>
        </div>

        <div className="col-lg-12 mx-auto mt-4">
          <div className="my_profile_setting_input d-flex justify-content-center gap-2">
            <button
              className="cancel-btn-custom"
              type="button"
              onClick={() => navigate("/task/list")}
            >
              Cancel
            </button>
            <button className="submit-btn-custom" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskCreate;
