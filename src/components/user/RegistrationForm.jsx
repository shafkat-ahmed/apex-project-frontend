import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUser } from "../../services/api";
import { loginAction } from "../../store/actions/authAction";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((store) => store.auth);

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const register = await registerUser(data);
      const { username, password } = data;
      const result = await dispatch(loginAction(username, password));
      if (result.success) {
        console.log("Logged in! User:", auth.user);
        navigate("/");
      } else {
        console.log("Failed:", result.error);
        Swal.fire("Error", result.error?.message, "error");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Oops!", error?.response?.data?.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="heading text-center">
        <h3>Register User</h3>
      </div>

      <div className="my_profile_setting_input form-group">
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="Name"
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>

      <div className="my_profile_setting_input form-group">
        <input
          {...register("phone", {
            required: "Mobile No is required",
            pattern: {
              value: /^\d+$/,
              message: "Phone must contain numbers only",
            },
          })}
          type="tel"
          inputMode="numeric"
          pattern="\d*"
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          placeholder="Mobile"
        />
        {errors.phone && (
          <div className="invalid-feedback">{errors.phone.message}</div>
        )}
      </div>

      {/* Email Input */}
      <div className="my_profile_setting_input form-group">
        <input
          {...register("username", { required: "Email is required" })}
          type="email"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          placeholder="User Name or Email"
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

      {/* Password Input */}
      <div className="my_profile_setting_input form-group">
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          placeholder="Password (Min 6 characters)"
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-log w-100 btn-thm">
        Register
      </button>

      <div className="text-center mt-3">
        <small className="text-muted">
          Have an account? <Link to="/login">Sign In</Link>
        </small>
      </div>
    </form>
  );
};

export default RegistrationForm;
