import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorators';
import { Role } from './enums/roles.enums';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { requirePermissions } from './decorators/permissions.decorator';
import { Permission } from './enums/permissions.enums';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input: {username: string; password: string}) {
        return this.authService.authenticate(input);
    }
    
    @Get('me')
    @requirePermissions(Permission.CREATE_USER, Permission.EDIT_USER)
    // @Roles(Role.ADMIN, Role.EDITOR)
    @UseGuards(AuthGuard, RolesGuard)
    getUserInfo(@Request() request) {
       return request.user
    }
}
