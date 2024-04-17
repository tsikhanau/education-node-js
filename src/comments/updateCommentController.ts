import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";
import {ObjectId} from "mongodb";
import {InputCommentUpdateType} from "../input-output-types/comment-types";
import {commentRepository} from "./commentRepository";

export const updateCommentController = async (req: Request<any, any, InputCommentUpdateType,{id: string}>, res: Response<PostDBType | {}>) => {
    const result = await commentRepository.update(new ObjectId(req.params.id), req.body);
    if(result?.error === 'not found') {
        res.status(404).json({});
        return;
    }

    res
        .status(204)
        .json({})
}