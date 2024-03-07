import {postRepository} from "./postRepository";
import {InputPostType} from "../input-output-types/post-types";
import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";

export const updatePostController = async (req: Request<any, any, InputPostType,{id: string}>, res: Response<PostDBType | {}>) => {
    const result = await  postRepository.update(+req.params.id, req.body);
    if(result?.error === 'not found') {
        res.status(404).json({});
        return;
    }

    res
        .status(204)
        .json({})
}