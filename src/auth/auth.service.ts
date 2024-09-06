import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/roles.enums';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { Permission } from './enums/permissions.enums';

type authPayload = {
    username: string,
    password: string
};

type signInPayload = {
    userId: number,
    username: string,
    // role: Role[],
    permission: Permission[]
};
type authResponse = {
    accessToken: string,
    userId: number,
    username: string,
    // role: Role[],
    password: string,
    permission: Permission[]
};

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async authenticate(input: authPayload): Promise<authResponse> {
        const user = await this.validateUser(input);
        const iv = randomBytes(16);
        const key = (await promisify(scrypt)(input.password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv)
        

        const textToEncrypt = 'Nest';
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);

        const decipher = createDecipheriv('aes-256-ctr', key, iv);
        const decryptedText = Buffer.concat([
            decipher.update(encryptedText),
            decipher.final(),
        ]);
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(decryptedText, saltOrRounds)
        if (!user) {
            throw new UnauthorizedException();
        }

        return this.signIn(user, hash)
    }

    async validateUser(input: authPayload): Promise<signInPayload | null> {
        const user = await this.usersService.findUserByName(input.username);


        if (user && user.password === input.password) {
            return {
                userId: user.userId,
                username: user.username,
                // role: user.role,
                permission: user.permission
            };
        }
        return null;
    }

    async signIn(user: signInPayload, hash: string): Promise<authResponse> {
        const tokenPayload = {
            sub: user.userId,
            username: user.username,
            // role: user.role,
            permission: user.permission
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken,
            username: user.username,
            userId: user.userId,
            // role: user.role,
            password: hash,
            permission: user.permission
        }
    }
}