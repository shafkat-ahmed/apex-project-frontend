import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./components/common/Loader";
import PrivateRoute from "./components/common/PrivateRoute";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import AssignedList from "./components/pages/task/AssignedList";
import Create from "./components/pages/task/Create";
import Edit from "./components/pages/task/Edit";
import List from "./components/pages/task/List";
import Register from "./components/pages/user/Register";
import { navigateTo } from "./services/navigationService";
import { logout } from "./store/actions/authAction";
import store from "./store/store";

function About() {
  const { role } = useSelector((store) => store.auth);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-4">About</h1>
          <p className="lead">This is the about page. {role}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "accessToken" && !event.newValue) {
        // user logged out in another tab
        store.dispatch(logout());
        navigateTo("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Provider store={store}>
      <Loader />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route
            path="/"
            element={<PrivateRoute title="Dashboard" element={<Home />} />}
          />
          <Route
            path="/task/list"
            element={<PrivateRoute title="Task List" element={<List />} />}
          />
          <Route
            path="/task/create"
            element={<PrivateRoute title="Create Task" element={<Create />} />}
          />
          <Route
            path="/task/edit/:id"
            element={<PrivateRoute title="Edit Task" element={<Edit />} />}
          />
          <Route
            path="/task/assigned/list"
            element={
              <PrivateRoute
                title="Assigned Task List"
                element={<AssignedList />}
              />
            }
          />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
