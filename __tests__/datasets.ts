// import {VideoDBType} from '../src/db/video-db-type'
// import {Resolutions} from '../src/input-output-types/video-types'
import {DBType} from '../src/db/db'
import {Resolutions} from "../src/input-output-types/video-types";
import moment from "moment";

const createdAt = moment();
const publicationDate = createdAt.clone().add(1, 'days');

export const video1: any /*VideoDBType*/ = {
    id: Date.now() + Math.floor(Math.random() * 100),
    title: 't' + Date.now() + Math.floor(Math.random() * 100),
    author: 'a' + Date.now() + Math.floor(Math.random() * 100),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: createdAt.toISOString(),
    publicationDate: createdAt.toISOString(),
    availableResolutions: [Resolutions.P240],
}

// ...

export const dataset1: DBType = {
    videos: [video1],
}

// ...