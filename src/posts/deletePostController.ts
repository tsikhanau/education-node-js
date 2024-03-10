import {postRepository} from "./postRepository";
import {Request, Response} from 'express';
import {OutputVideoType} from "../input-output-types/video-types";

export const deletePostController =  async (req: Request<any, any, {id: string}>, res: Response) => {
    const result = await postRepository.delete(req.params.id);

    if(result?.error === 'not found') {
        res.status(404).json({});
        return;
    }

    res
        .status(204)
        .json({})
}