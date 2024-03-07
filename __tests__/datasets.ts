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
    publicationDate: publicationDate.toISOString(),
    availableResolutions: [Resolutions.P240],
}

export const post1: any /*VideoDBType*/ = {
    content: "content",
    blogId: 'b' + Date.now() + Math.floor(Math.random() * 100),
    blogName: "blogName",
    id: Date.now() + Math.floor(Math.random() * 100),
    title: 't' + Date.now() + Math.floor(Math.random() * 100),
    shortDescription: 'd' + Date.now() + Math.floor(Math.random() * 100),
}
// ...

export const dataset1: DBType = {
    videos: [video1],
    posts: [post1],
}

// ...