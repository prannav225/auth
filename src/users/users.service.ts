import { Injectable } from '@nestjs/common';


export type User = {
    userId: number;
    username: string;
    password: string;
}

const users: User[] = [
    {
        userId: 1,
        username: 'John',
        password: 'sena'
    },
    {
        userId: 2,
        username: 'Doe',
        password: 'guess',
    },
]
@Injectable()
export class UsersService {
    async findUserByName(username: string): Promise<User | undefined> {
        return users.find((user) => user.username === username);
    };
};
