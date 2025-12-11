import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import FormContainer from "./layout/FormContainer";
import Header from "./layout/Header";
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
          <Header />
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
