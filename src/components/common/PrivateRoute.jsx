import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import FormContainer from "./layout/FormContainer";
import Layout from "./layout/Layout";
import SidebarMenu from "./layout/SidebarMenu";

const PrivateRoute = ({ element, title }) => {
  const { accessToken } = useSelector((store) => store.auth);
  const showSidebar = true;

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="">
      <div style={{ flex: 1, width: "100%" }}>
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <a className="navbar-brand" href="/">
                Apex Project
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <SidebarMenu />
        </>
        <div
          className={`page-layout-wrapper ${
            showSidebar ? " with-sidebar" : "without-sidebar"
          }`}
        >
          <Layout title={title}>
            <FormContainer>{element}</FormContainer>
          </Layout>
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute;
