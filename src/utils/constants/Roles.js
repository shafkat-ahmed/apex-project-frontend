export const ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN";
export const ROLE_MANAGER = "ROLE_MANAGER";
export const ROLE_USER = "ROLE_USER";

export const isEligableForAssigning = (role) => role === ROLE_MANAGER;
