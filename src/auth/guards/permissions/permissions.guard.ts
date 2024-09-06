import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSIONS_KEY } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permissions.enums';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requirePermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(!requirePermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if(!user || !user.permissions) {
      throw new ForbiddenException('You dont have the permissions to view this');
    }

    return true;
  }
}
