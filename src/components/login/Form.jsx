import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginAction } from "../../store/actions/authAction";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((store) => store.auth);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const { username, password } = data;
    const result = await dispatch(loginAction(username, password));

    if (result.success) {
      console.log("Logged in! User:", auth.user);
      navigate("/about");
    } else {
      console.log("Failed:", result.error);
      Swal.fire("Error", result.error?.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="heading text-center">
        <h3>Login to your account</h3>
        <p className="text-center">
          Don’t have an account?{" "}
          <Link to="/user/register" className="text-thm">
            Sign Up!
          </Link>
        </p>
      </div>

      {/* Email Input */}
      <div className="my_profile_setting_input form-group">
        <input
          {...register("username", { required: "Email is required" })}
          type="email"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          placeholder="User Name or Email"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

      {/* Password Input */}
      <div className="my_profile_setting_input form-group">
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          placeholder="Password"
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-log w-100 btn-thm">
        Log In
      </button>
    </form>
  );
};

export default Form;
