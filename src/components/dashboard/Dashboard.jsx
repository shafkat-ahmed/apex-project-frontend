import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDashboardData } from "../../services/api";
import { ROLE_USER } from "../../utils/constants/Roles";
import { TaskStatusOptions } from "../../utils/constants/Task";
import BarChart from "../common/charts/BarChart";
import DashboardTopCards from "./DashboardTopCards";
import UpdateLogs from "./UpdateLogs";

const Dashboard = () => {
  const { role } = useSelector((store) => store.auth);

  const [taskData, setTaskData] = useState(null);
  const [ownChartData, setOwnChartData] = useState(null);
  const [assignedChartData, setAssignedChartData] = useState(null);

  const getTaskData = async () => {
    try {
      const response = await getDashboardData();
      setTaskData(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Oops!",
        error?.response?.data?.message || "Fetch Failed",
        "error"
      );
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  useEffect(() => {
    console.log(taskData);
    if (taskData) {
      setOwnChartData({
        labels: TaskStatusOptions.map((item) => item.name),
        datasets: [
          {
            label: "Own Tasks",
            data: [
              taskData?.pendingTasks,
              taskData?.ongoingTasks,
              taskData?.completedTasks,
            ],
            backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
      setAssignedChartData({
        labels: TaskStatusOptions.map((item) => item.name),
        datasets: [
          {
            label: "Assigned Tasks",
            data: [
              taskData?.pendingAssignedTasks,
              taskData?.ongoingAssignedTasks,
              taskData?.completedAssignedTasks,
            ],
            backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [taskData]);

  return (
    <div className="col col-lg-12">
      <div className="col col-lg-12 mb-4">
        <div className="row mb-2">
          <h4 className="mb-3 mt-2 ml-2 fw-semibold">Own Task Overview</h4>
          <DashboardTopCards type="own" typeData={taskData} />
        </div>

        {role == ROLE_USER && (
          <div className="row mb-2">
            <h4 className="mb-3 mt-2 ml-2 fw-semibold">
              Assigned Task Overview
            </h4>
            <DashboardTopCards type="assigned" typeData={taskData} />
          </div>
        )}
      </div>
      <div className="row col-lg-12 mb-2 justify-content-center">
        <div className="col-lg-6">
          <Card className="shadow-sm p-2 border-0 rounded-3">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title className="text-center fw-bold text-danger mb-2"></Card.Title>
              <div className="col-lg-12" style={{ minHeight: "450px" }}>
                {ownChartData && <BarChart chartData={ownChartData} />}
              </div>
            </Card.Body>
          </Card>
        </div>
        {role == ROLE_USER && (
          <div className="col-lg-6">
            <Card className="shadow-sm p-2 border-0 rounded-3">
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="text-center fw-bold text-danger mb-2"></Card.Title>
                <div className="col-lg-12" style={{ minHeight: "450px" }}>
                  {assignedChartData && (
                    <BarChart chartData={assignedChartData} />
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
      <div className="row col-lg-12 mb-2">
        <UpdateLogs />
      </div>
    </div>
  );
};

export default Dashboard;
