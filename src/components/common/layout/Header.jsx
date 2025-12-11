import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const openCloseSidebar = () => {
    setSidebar(!sidebar);

    document.querySelector(".header-nav").classList.toggle("open");
    document.querySelector(".sidebar-menu").classList.toggle("open");

    const layoutWrapper = document.querySelector(".page-layout-wrapper");
    if (sidebar) {
      layoutWrapper.classList.remove("full-page");
      layoutWrapper.classList.add("with-sidebar");
    } else {
      layoutWrapper.classList.remove("with-sidebar");
      layoutWrapper.classList.add("full-page");
    }
  };

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : "hidden"
      }`}
    >
      <div className="container-fluid p0">
        <div className="row">
          <div className="col-6">
            <Link to="/">
              <a className="navbar_brand float-start dn-smd">
                <img
                  className="logo1 img-fluid"
                  src="https://cdn-icons-png.flaticon.com/512/11743/11743656.png"
                  style={{ width: "50px", height: "65px" }}
                  alt="header-logo.png"
                />
              </a>
            </Link>
            {/* site logo brand */}
            <div className="mobile-sidebar mobile-sidebar-toggle">
              <div className="mobile-sidebar-toggle-wrapper">
                <label className="switch">
                  <a href="#javascript" onClick={() => openCloseSidebar()}>
                    <i className="fa fa-align-left"></i>
                  </a>
                </label>
              </div>
            </div>
          </div>
          <div className="col-1 ms-auto">
            <nav className="navbar navbar navbar">
              <div className="container">
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
                      <Link className="nav-link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">
                        About
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* <!-- Ace Responsive Menu --> */}

        {/* End .navbar */}
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
