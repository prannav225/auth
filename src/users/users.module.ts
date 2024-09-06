import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommentService } from 'src/comment/comment.service';

@Module({
    providers: [UsersService,CommentService],
    exports: [UsersService, CommentService],
    controllers: [UsersController],
})
export class UsersModule {}
