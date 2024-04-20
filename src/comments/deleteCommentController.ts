import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {commentRepository} from "./commentRepository";

export const deleteCommentController =  async (req: Request<any, any, {id: string}>, res: Response) => {
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

    const result = await commentRepository.delete(new ObjectId(req.params.id));

    res
        .status(204)
        .json({})
}