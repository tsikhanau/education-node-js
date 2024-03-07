import {VideoDBType} from "./video-db-types";
import {PostDBType} from "./posts-db-types";

export type DBType = {
    videos: VideoDBType[];
    posts: PostDBType[]
}

export const db: DBType = {
    videos: [],
    posts: []
}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.videos = []
        db.posts = []
        return
    }

    db.videos = dataset.videos || db.videos
    db.posts = dataset.posts || db.posts
}