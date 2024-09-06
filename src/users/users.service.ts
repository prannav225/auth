import { Injectable } from '@nestjs/common';
import { Permission } from 'src/auth/enums/permissions.enums';
import { Role, RolePermissions } from 'src/auth/enums/roles.enums';
import { createUserDto } from './dto/createUserDto';


export type User = {
    userId: number;
    username: string;
    password: string;
    // role: Role[];
    permission: Permission[];
}

const users: User[] = [
    {
        userId: 1,
        username: 'John',
        password: 'sena',
        // role: [Role.ADMIN],
        permission: RolePermissions[Role.ADMIN]
    },
    {
        userId: 2,
        username: 'Doe',
        password: 'guess',
        // role: [Role.EDITOR],
        permission: RolePermissions[Role.EDITOR]
    },
    {
        userId: 3,
        username: 'Tom',
        password: 'jerry',
        // role: [Role.EDITOR],
        permission: RolePermissions[Role.USER]
    },
]
@Injectable()
export class UsersService {
    async findUserByName(username: string): Promise<User | undefined> {
        return users.find((user) => user.username === username);
    };

    findOne(id: string) {
        return ({
            id: id
        });
    }

    create(createUserDto: createUserDto){
        return "USER CREATED"
    }
};
