import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";
import {postCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";

export const findPostController = async (req: Request<any, any, {id: string}>, res: Response<PostDBType | {}>) => {
    const post = await postCollection.findOne({_id: new ObjectId(req.params.id)});
    if(!post) {
        res.status(404).json({});
        return;
    }

    res.status(200).json(post);
}