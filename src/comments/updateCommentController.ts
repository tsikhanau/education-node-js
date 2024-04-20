import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";
import {ObjectId} from "mongodb";
import {InputCommentUpdateType} from "../input-output-types/comment-types";
import {commentRepository} from "./commentRepository";

export const updateCommentController = async (req: Request<any, any, InputCommentUpdateType,{id: string}>, res: Response<PostDBType | {}>) => {
    const comment = await commentRepository.find(new ObjectId(req.params.id));

    if(!comment) {
        res.status(404);
        return;
    }
    //@ts-ignore
    if(comment?.commentatorInfo?.userId !== res?.userId) {
        res.status(403);
        return;
    }

    const result = await commentRepository.update(new ObjectId(req.params.id), req.body);
    if(result?.error === 'not found') {
        res.status(404).json({});
        return;
    }

    res
        .status(204)
        .json({})
}