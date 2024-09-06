import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
import { CommentService } from 'src/comment/comment.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService, private readonly commentService: CommentService){}

    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto:createUserDto){
        return this.userService.create(createUserDto);
    }

    @Get(':id/comments')
    getUserComments(@Param("id") id:string){
        return this.commentService.findUserComments(id);
    }
}
