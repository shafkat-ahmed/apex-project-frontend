import axios from "axios";
import { logout } from "../store/actions/authAction";
import { getToDate } from "../utils/dateUtils";
import { loadingManager } from "../utils/loadingManager";

const dev = "http://localhost:8080";
const prod = "http://localhost:8080";

const CLIENT_ID = "client-id";
const CLIENT_SECRET = "client-secret";

const authHeader = "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

const baseURL = process.env.NODE_ENV === "development" ? dev : prod;

let globalStore = null;

export const setStore = (store) => {
  globalStore = store;
};

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Start loading when request is made
    loadingManager.start();

    console.log(config);

    // Get token from Redux store instead of localStorage
    const token = localStorage.getItem("accessToken");
    if (
      token &&
      config.url != "/oauth/token" &&
      !config.url?.includes("/all")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Stop loading on request error
    loadingManager.stop();
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Stop loading when response is received
    loadingManager.stop();
    return response;
  },
  (error) => {
    // Stop loading on response error
    loadingManager.stop();

    // Handle common errors here
    if (
      (error.response?.status === 401 || error.response?.status === 401) &&
      globalStore
    ) {
      // Handle unauthorized access - logout user

      console.error("Unauthorized access");
      globalStore.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export async function login(username, password) {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", username);
  params.append("password", password);

  const response = await api.post("/oauth/token", params, {
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
}

export async function refreshToken() {
  const token = localStorage.getItem("refreshToken");

  if (!token) {
    throw new Error("No refresh token available");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", token);

  const response = await api.post("/oauth/token", params, {
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
}
// ===========================
//        User APIs
// ===========================

export async function registerUser(userDto) {
  const response = await api.post("/all/user", userDto);
  return response;
}

/**
 * Create a new user (Admin endpoint)
 * @param {Object} userDto - User data object
 * @returns {Promise} - Axios response with created user
 */
export async function createUser(userDto) {
  if (userDto == null) {
    throw new Error("User DTO is null");
  }
  const response = await api.post("/api/admin/user", userDto);
  return response;
}

/**
 * Update an existing user (Admin endpoint)
 * @param {Object} userDto - Updated user data object
 * @returns {Promise} - Axios response with updated user
 */
export async function updateUser(userDto) {
  if (userDto == null) {
    throw new Error("User DTO is null");
  }
  const response = await api.put("/api/admin/user", userDto);
  return response;
}

/**
 * Get user by ID (Admin endpoint)
 * @param {number} id - User ID
 * @returns {Promise} - Axios response with user data
 */
export async function getUserById(id) {
  if (id == null) {
    throw new Error("User id is null");
  }
  const response = await api.get(`/api/admin/user/${id}`);
  return response;
}

/**
 * Get users by role ID and status (Admin endpoint)
 * @param {number} roleId - Role ID
 * @param {string} status - User status
 * @returns {Promise} - Axios response with list of users
 */
export async function getUsersByRoleId(roleId, status) {
  if (roleId == null) {
    throw new Error("Role id is null");
  }
  const queryParams = new URLSearchParams();
  queryParams.append("roleId", roleId.toString());
  queryParams.append("status", status);
  const response = await api.get(
    `/api/admin/user/get/by/role-id?${queryParams.toString()}`
  );
  return response;
}

/**
 * Get users by role name (Admin endpoint)
 * @param {string} roleName - Role name
 * @returns {Promise} - Axios response with list of users
 */
export async function getUsersByRoleName(roleName) {
  if (roleName == null) {
    throw new Error("Role name is null");
  }
  const queryParams = new URLSearchParams();
  queryParams.append("roleName", roleName);
  const response = await api.get(
    `/api/admin/user/get/by/role?${queryParams.toString()}`
  );
  return response;
}

// ===========================
//        TASK APIs
// ===========================

/**
 * Create a new task
 * @param {Object} taskDto - Task data object
 * @returns {Promise} - Axios response with created task
 */
export async function createTask(taskDto) {
  const response = await api.post("/api/task", taskDto);
  return response;
}

/**
 * Update an existing task
 * @param {number} id - Task ID
 * @param {Object} taskDto - Updated task data object
 * @returns {Promise} - Axios response with updated task
 */
export async function updateTask(taskDto) {
  const response = await api.put(`/api/task`, taskDto);
  return response;
}

/**
 * Delete a task
 * @param {number} id - Task ID
 * @returns {Promise} - Axios response (204 No Content)
 */
export async function deleteTask(id) {
  const response = await api.delete(`/api/task/${id}`);
  return response;
}

/**
 * Get all tasks
 * @returns {Promise} - Axios response with all tasks
 */
export async function getAllTasks() {
  const response = await api.get("/api/task");
  return response;
}

/**
 * Get a task by ID
 * @param {number} id - Task ID
 * @returns {Promise} - Axios response with task data
 */
export async function getTaskById(id) {
  if (id == null) {
    throw new Error("Task id is null");
  }
  const response = await api.get(`/api/task/${id}`);
  return response;
}

/**
 * Get paginated and filtered tasks
 * @param {Object} params - Filter and pagination parameters
 * @param {string} [params.status] - Filter by status
 * @param {string} [params.priority] - Filter by priority
 * @param {string} [params.keyword] - Search keyword
 * @param {number} [params.pageNumber=0] - Page number (0-indexed)
 * @param {number} [params.pageLength=10] - Number of items per page
 * @returns {Promise} - Axios response with paginated task data
 */
export async function getTasksPaginated(params = {}) {
  const { status, priority, keyword, pageNumber = 0, pageLength = 10 } = params;

  const queryParams = new URLSearchParams();
  if (status) queryParams.append("status", status);
  if (priority) queryParams.append("priority", priority);
  if (keyword) queryParams.append("keyword", keyword);
  queryParams.append("pageNumber", pageNumber.toString());
  queryParams.append("pageLength", pageLength.toString());

  const response = await api.get(
    `/api/task/by/filters/paginated?${queryParams.toString()}`
  );
  return response;
}

/**
 * Get paginated assigned tasks with filters
 * @param {Object} params - Filter and pagination parameters
 * @param {string} [params.status] - Filter by status
 * @param {string} [params.priority] - Filter by priority
 * @param {string} [params.keyword] - Search keyword
 * @param {number} [params.pageNumber=0] - Page number (0-indexed)
 * @param {number} [params.pageLength=10] - Number of items per page
 * @returns {Promise} - Axios response with paginated assigned task data
 */
export async function getAssignedTasksPaginated(params = {}) {
  const { status, priority, keyword, pageNumber = 0, pageLength = 10 } = params;

  const queryParams = new URLSearchParams();
  if (status) queryParams.append("status", status);
  if (priority) queryParams.append("priority", priority);
  if (keyword) queryParams.append("keyword", keyword);
  queryParams.append("pageNumber", pageNumber.toString());
  queryParams.append("pageLength", pageLength.toString());

  const response = await api.get(
    `/api/task/assigned?${queryParams.toString()}`
  );
  return response;
}

/**
 * Update task status to next
 * @param {number} id - Task ID
 * @returns {Promise} - Axios response with updated task
 */
export async function updateStatusToNext(id) {
  const response = await api.patch(`/api/task/update/status/next/${id}`);
  return response;
}

/**
 * Get dashboard data
 * @returns {Promise} - Axios response with dashboard data
 */
export async function getDashboardData() {
  const response = await api.get("/api/task/dashboard");
  return response;
}

/**
 * Assign a task to a user (Manager endpoint)
 * @param {number} taskId - Task ID
 * @param {number} userId - User ID
 * @returns {Promise} - Axios response with updated task DTO
 */
export async function assignTaskToUser(taskId, userId) {
  if (taskId == null) {
    throw new Error("Task id is null");
  }
  if (userId == null) {
    throw new Error("User id is null");
  }

  const queryParams = new URLSearchParams();
  queryParams.append("taskId", taskId.toString());
  queryParams.append("userId", userId.toString());

  const response = await api.patch(
    `/api/manager/assign/user/to/task?${queryParams.toString()}`
  );
  return response;
}

/**
 * Get recently updated tasks (sortable)
 * @param {string} toDate - ISO datetime string (e.g. 2025-12-11T00:00:00)
 * @param {string} sortType - Sort type string expected by backend
 * @returns {Promise} - Axios response with list of TaskDto
 */
export async function getRecentlyUpdatedTasks(
  toDate = getToDate(new Date()),
  sortType = "desc"
) {
  if (!toDate) {
    throw new Error("toDate is required");
  }
  if (!sortType) {
    throw new Error("sortType is required");
  }

  const queryParams = new URLSearchParams();
  queryParams.append("toDate", toDate);
  queryParams.append("sortType", sortType);

  const response = await api.get(
    `/api/task/by/recent/update/sortable?${queryParams.toString()}`
  );
  return response;
}

export default api;
