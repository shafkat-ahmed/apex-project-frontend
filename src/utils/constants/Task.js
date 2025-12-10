export const TaskStatus = {
  NEW: "NEW",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
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
