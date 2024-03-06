import {db} from "../db/db";
import {Request, Response} from 'express';
import { OutputVideoType } from "../input-output-types/video-types";

export const deleteVideoController = (req: Request<any, any, {id: string}>, res: Response<OutputVideoType  | {}>) => {
    const videoIndex = db.videos.findIndex(v => v.id === +req.params.id);

    if(videoIndex < 0) {
        res.status(404).json({})
    }

    db.videos.splice(videoIndex, 1);

    res
        .status(204)
        .json({})
}