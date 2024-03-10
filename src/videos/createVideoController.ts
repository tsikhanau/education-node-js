import {db} from "../db/db";
import {Request, Response} from 'express';
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output-types/video-types";
import {OutputErrorsType} from "../input-output-types/output-errors-types";
import {VideoDBType} from "../db/video-db-types";
import moment from "moment";

const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }
// ...
    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolutions'
        })
    }
    if (!video.title || video?.title?.length > 40) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'title'
        })
    }

    if (!video.author  || video?.author?.length > 20) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'author'
        })
    }
    return errors;
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<OutputVideoType  | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }

    const createdAt = moment();
    const publicationDate = createdAt.clone().add(1, 'days');
    const newVideo: VideoDBType = {
        ...req.body,
        id: Date.now() + Math.floor(Math.random() * 100) + "",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
    }

    db.videos = [...db.videos, newVideo]

    res
        .status(201)
        .json(newVideo)
}