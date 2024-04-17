import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {CommentOutputType} from "../input-output-types/comment-types";
import {commentRepository} from "./commentRepository";

export const findCommentController = async(req: Request<any, any, {id: string}>, res: Response<CommentOutputType | {}>) => {
    const comment = await commentRepository.find(new ObjectId(req.params.id));

    if(!comment) {
        res.status(404).json({});
        return;
    }

    res.status(200).json(comment);
}