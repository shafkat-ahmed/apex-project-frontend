import { useNavigate } from "react-router-dom";
import OverviewCard from "./OverviewCard";

const DashboardTopCards = ({ type = "own", typeData = {} }) => {
  const navigate = useNavigate();

  const cardsData =
    type === "own"
      ? [
          {
            title: "Total Tasks",
            value: typeData?.totalTasks,
            iconClass: "bi bi-database-fill-add",
            color: "#F0951B",
            bgColor: "#FFEAD3",
            redirectUrl: "/task/list",
          },
          {
            title: "Pending Tasks",
            value: `${typeData?.pendingTasks}`,
            iconClass: "bi bi-clipboard",
            color: "#0303D1",
            bgColor: "#D3D2FF",
            redirectUrl: "/task/list",
          },
          {
            title: "Ongoing Tasks",
            value: typeData?.ongoingTasks,
            iconClass: "bi bi-stopwatch",
            color: "#6C2287",
            bgColor: "#F9DEFF",
            redirectUrl: "/task/list",
          },

          {
            title: "Completed Tasks",
            value: typeData?.completedTasks,
            iconClass: "bi bi-stop-circle",
            color: "#6C2287",
            bgColor: "#F9DEFF",
            redirectUrl: "/task/list",
          },
        ]
      : [
          {
            title: "Total Tasks",
            value: typeData?.totalAssignedTasks,
            iconClass: "bi bi-database-fill-add",
            color: "#1D69C4",
            bgColor: "#DEEEFF",
            redirectUrl: "/task/assigned/list",
          },
          {
            title: "Pending Tasks",
            value: typeData?.pendingAssignedTasks,
            iconClass: "bi bi-clipboard",
            color: "#D6141D",
            bgColor: "#FFD5D7",
            redirectUrl: "/task/assigned/list",
          },
          {
            title: "Ongoing Tasks",
            value: typeData?.ongoingAssignedTasks,
            iconClass: "bi bi-stopwatch",
            color: "#6C2287",
            bgColor: "#F9DEFF",
            redirectUrl: "/task/assigned/list",
          },
          {
            title: "Completed Tasks",
            value: typeData?.completedAssignedTasks,
            iconClass: "bi bi-stop-circle",
            color: "#2FA62F",
            bgColor: "#DDFFDD",
            redirectUrl: "/task/assigned/list",
          },
        ];

  console.log(cardsData);

  return (
    <div className="row col-lg-12">
      {cardsData.map((card, index) => (
        <div
          key={index}
          onClick={() => card.redirectUrl && navigate(card.redirectUrl)}
          className="col-lg-3 justify-content-center"
          style={{ cursor: card.redirectUrl ? "pointer" : "default" }}
        >
          <div
            className="transition-transform transform-hover"
            style={{ transition: "transform 0.3s ease-in-out" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <OverviewCard {...card} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardTopCards;
