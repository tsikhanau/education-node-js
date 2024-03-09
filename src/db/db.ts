import {VideoDBType} from "./video-db-types";
import {PostDBType} from "./posts-db-types";
import {BlogDBType} from "./blogs-db-types";

export type DBType = {
    videos: VideoDBType[];
    posts: PostDBType[];
    blogs: BlogDBType[];
}

export const db: DBType = {
    videos: [],
    posts: [],
    blogs: [],
}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.videos = []
        db.posts = []
        db.blogs = []
        return
    }

    db.videos = dataset.videos || db.videos
    db.posts = dataset.posts || db.posts
    db.blogs = dataset.blogs || db.blogs
}