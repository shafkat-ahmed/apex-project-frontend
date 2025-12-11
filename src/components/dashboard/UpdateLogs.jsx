import moment from "moment";
import { useEffect, useState } from "react";
import { Card, Dropdown, Table } from "react-bootstrap";
import { getRecentlyUpdatedTasks } from "../../services/api";
import { getToDate } from "../../utils/dateUtils";

const sortOptions = [
  { label: "Newest First", value: "desc" },
  { label: "Oldest First", value: "asc" },
];

const UpdateLogs = () => {
  const [logs, setLogs] = useState([]);
  const [sortType, setSortType] = useState(sortOptions[0]);

  const fetchLogs = async () => {
    try {
      const response = await getRecentlyUpdatedTasks(
        getToDate(new Date()),
        sortType?.value
      );
      setLogs(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "Failed to fetch update logs. Please try again later.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [sortType]);

  return (
    <div className="container mt-4">
      <Card className="shadow-lg border-0 rounded-3">
        <Card.Body>
          {/* <Card.Title className="mb-4">Recent Update Logs</Card.Title> */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title text-primary">
              Recent Update Logs (Last 2 days)
            </h5>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-primary"
                className="text-nowrap"
              >
                {sortType?.label || `Select Warehouse`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {sortOptions?.map((item) => (
                  <Dropdown.Item
                    key={item.value}
                    onClick={() => setSortType(item)}
                    className="text-truncate"
                  >
                    {item?.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Last Updated Time</th>
              </tr>
            </thead>
            <tbody>
              {logs?.length > 0 ? (
                logs.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.title || "N/A"}</td>
                    <td>{item?.status || 0}</td>
                    <td>{item?.priority || 0}</td>
                    <td>
                      {moment(item?.lastUpdatedDateTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No logs available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateLogs;
