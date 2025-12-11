export const TaskStatus = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export const TaskStatusOptions = Object.entries(TaskStatus).map(
  ([id, name]) => ({ id, name })
);

export const TaskPriority = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
};

export const TaskPriorityOptions = Object.entries(TaskPriority).map(
  ([id, name]) => ({ id, name })
);
