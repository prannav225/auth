import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/roles.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // If no roles are required, allow access.
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!user || !user.role) {
      return false;
    }

    // Check if the user has at least one of the required roles.
    return requiredRoles.some((role) => user.role.includes(role));
  }
}
