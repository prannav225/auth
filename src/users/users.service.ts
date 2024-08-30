import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/roles.enums';


export type User = {
    userId: number;
    username: string;
    password: string;
    role: Role[];
}

const users: User[] = [
    {
        userId: 1,
        username: 'John',
        password: 'sena',
        role: [Role.ADMIN]
    },
    {
        userId: 2,
        username: 'Doe',
        password: 'guess',
        role: [Role.USER]
    },
    {
        userId: 3,
        username: 'Tom',
        password: 'jerry',
        role: [Role.EDITOR]
    },
]
@Injectable()
export class UsersService {
    async findUserByName(username: string): Promise<User | undefined> {
        return users.find((user) => user.username === username);
    };
};
