import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {postRepository} from "./postRepository";

export const deletePostController =  async (req: Request<any, any, {id: string}>, res: Response) => {
    const result = await postRepository.delete(new ObjectId(req.params.id));

    if(result?.error === 'not found') {
        res.status(404).json({});
        return;
    }

    res
        .status(204)
        .json({})
}