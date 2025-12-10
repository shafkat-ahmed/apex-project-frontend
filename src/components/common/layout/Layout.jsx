import React from "react";

const Layout = ({ title = "", children }) => {
  return (
    <section className="dashbord bgc-f7 pb50">
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12 maxw100flex-992">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb_content style2 text-center">
                  <h2 className="breadcrumb_title">{title}</h2>
                </div>
                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
