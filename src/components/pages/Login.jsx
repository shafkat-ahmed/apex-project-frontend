import Form from "../login/Form";

const Login = () => {
  return (
    <>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(120deg, #f5f7ff 0%, #eef7ff 100%)",
          padding: "40px 0",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-8">
              <div className="d-flex text-center align-items-center gap-4 justify-content-center mb-4">
                <div>
                  <h2 className="mb-0">Welcome back</h2>
                  <p className="text-muted mb-0">
                    Sign in to continue to your dashboard
                  </p>
                </div>
              </div>

              <div className="login_form inner_page d-flex justify-content-center">
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
