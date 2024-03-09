import {DBType} from '../src/db/db'
import {Resolutions} from "../src/input-output-types/video-types";
import moment from "moment";
import {PostDBType} from "../src/db/posts-db-types";
import {VideoDBType} from "../src/db/video-db-types";
import {BlogDBType} from "../src/db/blogs-db-types";

const createdAt = moment();
const publicationDate = createdAt.clone().add(1, 'days');

export const video1: VideoDBType = {
    id: Date.now() + Math.floor(Math.random() * 100),
    title: 't' + Date.now() + Math.floor(Math.random() * 100),
    author: 'a' + Date.now() + Math.floor(Math.random() * 100),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: createdAt.toISOString(),
    publicationDate: publicationDate.toISOString(),
    availableResolutions: [Resolutions.P240],
}

export const blog1: BlogDBType = {
    id: Date.now() + Math.floor(Math.random() * 100),
    name: 't' + Date.now() + Math.floor(Math.random() * 100),
    description: 'd' + Date.now() + Math.floor(Math.random() * 100),
    websiteUrl: 'url'
}

export const post1: PostDBType = {
    content: "content",
    blogId: blog1.id,
    blogName: "blogName",
    id: Date.now() + Math.floor(Math.random() * 100),
    title: 't' + Date.now() + Math.floor(Math.random() * 100),
    shortDescription: 'd' + Date.now() + Math.floor(Math.random() * 100),
}
// ...

export const dataset1: DBType = {
    videos: [video1],
    posts: [post1],
    blogs: [blog1]
}

// ...