import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService} from '@nestjs/jwt';

type authPayload = {
    username: string,
    password: string
};

type signInPayload = {
    userId: number,
    username: string
};
type authResponse = {
    accessToken: string,
    userId: number,
    username:string
};

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async authenticate(input: authPayload):Promise<authResponse> {
        const user = await this.validateUser(input);

        if(!user){
            throw new UnauthorizedException();
        }

        return this.signIn(user)
    }

    async validateUser(input: authPayload): Promise<signInPayload | null> {
        const user = await this.usersService.findUserByName(input.username);
        
        if(user && user.password === input.password) {
            return {
                userId: user.userId,
                username: user.username
            };
        }
        return null;
    }

    async signIn(user: signInPayload): Promise<authResponse> {
        const tokenPayload = {
            sub: user.userId,
            username:user.username
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken,
            username: user.username,
            userId: user.userId
        }
    }
}