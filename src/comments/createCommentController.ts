import {Request, Response} from 'express';
import { InputCommentUpdateType} from "../input-output-types/comment-types";
import {jwtService} from "../helpers/jwt.service";
import {commentRepository} from "./commentRepository";
import {userRepository} from "../users/userReposetory";
import {ObjectId} from "mongodb";

export const createCommentController = async (req: Request<any, any, InputCommentUpdateType,  {id: string}>, res: Response) => {
    const authHeader = req.headers.authorization as string
    const auth= authHeader.split(" ");
    const token = auth[1];
    const result = await jwtService.verifyToken(token);
    if(result) {
        const user = await userRepository.find(new ObjectId(result.userId))
        const createdInfo = await commentRepository.create({
            content: req.body.content,
            commentatorInfo: {
                userId: user?.id as string,
                userLogin: user?.login as string
            }
        }, req.params.id)
    }
}