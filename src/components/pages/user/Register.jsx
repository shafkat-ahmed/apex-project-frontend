import Layout from "../../common/layout/Layout";
import RegistrationForm from "../../user/RegistrationForm";

const Register = () => {
  return (
    <Layout>
      <div className="login_form inner_page col-lg-6 m-auto p-5 rounded-3 shadow-lg">
        <RegistrationForm />
      </div>
    </Layout>
  );
};

export default Register;
