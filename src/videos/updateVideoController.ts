import {db} from "../db/db";
import {Request, Response} from 'express';
import {InputVideoType, OutputVideoType, Resolutions, UpdateInputVideoType} from "../input-output-types/video-types";
import {OutputErrorsType} from "../input-output-types/output-errors-types";

const inputValidation = (video: UpdateInputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolutions'
        })
    }

    if (!video.title|| video?.title?.length > 40) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'title'
        })
    }

    if (!video.author || video?.author?.length > 20) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'author'
        })
    }

    if (typeof video.canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'canBeDownloaded'
        })
    }

    if (video.minAgeRestriction !== null && (typeof video.minAgeRestriction === 'string' || video.minAgeRestriction < 1 || video.minAgeRestriction > 18)) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'minAgeRestriction'
        })
    }

    if (typeof video.publicationDate !== 'string') {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'publicationDate'
        })
    }

    return errors;
}

export const updateVideoController = (req: Request<any, any, UpdateInputVideoType, {id: string}>, res: Response<OutputVideoType  | {}>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }

    const video = db.videos.find(v => v.id === +req.params.id);

    if(!video) {
        res.status(404).json({})
    }

    db.videos = db.videos.map(v => {
        if(v.id === +req.params.id) {
            return {
                ...v,
                ...req.body,
            }
        }
        return v;
    })

    res
        .status(204)
        .json({})
}