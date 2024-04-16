import {Request, Response} from 'express';
import { InputCommentUpdateType} from "../input-output-types/comment-types";
import {commentRepository} from "./commentRepository";
import {userRepository} from "../users/userReposetory";
import {ObjectId} from "mongodb";

export const createCommentController = async (req: Request<any, any, InputCommentUpdateType,  {id: string}>, res: Response) => {
    if(!req.body.content || req.body.content.length < 20 || req.body.content.length > 300 ) {
        res.status(400).json({})
    }
    //@ts-ignore
    const user = await userRepository.find(new ObjectId(res.userId))
    const createdInfo = await commentRepository.create({
        content: req.body.content,
        commentatorInfo: {
            userId: user?.id.toString() as string,
            userLogin: user?.login as string
        }}, req.params.id)
    if(createdInfo.error === 'not found') {
        res.status(404).json({})
    }
    const comment = await commentRepository.find(new ObjectId(createdInfo.id))
    if(comment) {
        res.status(201).json(comment)
    }
}