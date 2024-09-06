import { Permission } from "./permissions.enums";

export enum Role {
    USER = "user",
    ADMIN = "admin",
    EDITOR = "editor"
}

export const RolePermissions = {
    [Role.ADMIN]: [
      Permission.CREATE_USER,
      Permission.EDIT_USER,
      Permission.DELETE_USER,
      Permission.VIEW_USER,
    ],
    [Role.EDITOR]: [
      Permission.EDIT_USER,
      Permission.VIEW_USER,
    ],
    [Role.USER]: [
      Permission.VIEW_USER,
    ],
  };