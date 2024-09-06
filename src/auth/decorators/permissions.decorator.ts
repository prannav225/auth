import { SetMetadata } from "@nestjs/common";
import { Permission } from "../enums/permissions.enums";

export const PERMISSIONS_KEY ='permissions';
export const requirePermissions = (...permissions: Permission[]) => SetMetadata(PERMISSIONS_KEY, permissions);