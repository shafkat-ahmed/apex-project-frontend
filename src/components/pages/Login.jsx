import React from "react";
import Form from "../login/Form";

const Login = () => {
  return (
    <>
      <section className="d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12 col-lg-6">
              <div className="text-center mb-4">
                {/* <img
                  src="/assets/images/ALC_LOGO.png"
                  alt="Logo"
                  style={{ maxWidth: "250px", height: "auto" }}
                /> */}
              </div>
              <div className="login_form inner_page">
                <Form />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
