import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";
import {ObjectId} from "mongodb";
import {InputCommentUpdateType} from "../input-output-types/comment-types";
import {commentRepository} from "./commentRepository";

export const updateCommentController = async (req: Request<any, any, InputCommentUpdateType,{id: string}>, res: Response<PostDBType | {}>) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(404).json({});
        return;
    }

    const comment = await commentRepository.find(new ObjectId(req.params.id));

    if(!comment) {
        res.status(404).json({});
        return;
    }
    //@ts-ignore
    if(comment?.commentatorInfo?.userId !== res?.userId) {
        res.status(403).json({});
        return;
    }
    await commentRepository.update(new ObjectId(req.params.id), req.body);

    res
        .status(204)
        .json({})
}