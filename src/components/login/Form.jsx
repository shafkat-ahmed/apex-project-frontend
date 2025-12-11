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
    const { username, password } = data;
    const result = await dispatch(loginAction(username, password));

    if (result.success) {
      navigate("/");
    } else {
      Swal.fire("Error", result.error?.message, "error");
    }
  };

  return (
    <div className="tm-login-card">
      <form onSubmit={handleSubmit(onSubmit)} className="tm-login-form">
        <div className="form-group">
          <label className="small text-secondary">Email</label>
          <div className="input-with-icon">
            <input
              {...register("username", { required: "Email is required" })}
              type="email"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="you@company.com"
            />
          </div>
          {errors.username && (
            <div className="invalid-feedback d-block">
              {errors.username.message}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="small text-secondary">Password</label>
          <div className="input-with-icon">
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
            />
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Log In
        </button>

        <div className="text-center mt-3">
          <small className="text-muted">
            Don’t have an account? <Link to="/user/register">Sign Up</Link>
          </small>
        </div>
      </form>

      <style>{`
        .tm-login-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(17,24,39,0.08);
          min-width: 400px;
          margin: 24px auto;
        }
        .btn-block { width: 100%; padding: 10px 12px; border-radius:8px }
      `}</style>
    </div>
  );
};

export default Form;
