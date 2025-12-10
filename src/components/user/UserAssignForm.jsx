import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getUsersByRoleName } from "../../services/api";
import { isEligableForAssigning, ROLE_USER } from "../../utils/constants/Roles";
import CustomSelect from "../common/CustomSelect";

const UserAssignForm = ({ modalRef, onAssign }) => {
  const { role } = useSelector((store) => store.auth);
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

  const [user] = watch(["user"]);

  const getUserListForAssigning = async () => {
    try {
      const response = await getUsersByRoleName(ROLE_USER);
      setUserList(response.data);
    } catch (error) {
      Swal.fire("Error", "User Fetch Failed", "error");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    onAssign && onAssign(data?.user);
    modalRef.current?.close();
  };

  useEffect(() => {
    (isEligableForAssigning(role) || true) && getUserListForAssigning();
  }, [role]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-12">
          <Controller
            name="user"
            control={control}
            rules={{ required: "User is required" }}
            render={({ field }) => (
              <CustomSelect
                label="User"
                placeholder="Select a user"
                options={userList || []}
                values={userList?.filter((item) => item.id === user?.id)}
                onChangeHandler={(value) => {
                  setValue("user", value);
                }}
                error={errors.user?.message}
              />
            )}
          />
        </div>
        <div className="col-lg-12 mx-auto mt-4">
          <div className="my_profile_setting_input d-flex justify-content-center gap-2">
            <button
              className="cancel-btn-custom"
              type="button"
              onClick={() => {
                modalRef && modalRef.current?.close();
              }}
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

export default UserAssignForm;
