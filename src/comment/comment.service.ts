import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {

    findUserComments(userId: string) {
        return "COMMENTS OF THE USER"
    }
}
