import {db} from "../db/db";
import {Request, Response} from 'express';
import { OutputVideoType } from "../input-output-types/video-types";

export const findVideoController = (req: Request<any, any, {id: string}>, res: Response<OutputVideoType  | {}>) => {
    const video = db.videos.find(v => v.id === +req.params.id);

    if(!video) {
        res.status(404).json({})
    }

    res
        .status(200)
        .json(video)
}