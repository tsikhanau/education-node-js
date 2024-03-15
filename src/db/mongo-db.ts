import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {BlogDBType} from "./blogs-db-types";
import {PostDBType} from "./posts-db-types";
import {InsertPostType} from "../input-output-types/post-types";
import {InsertBlogType} from "../input-output-types/blog-types";

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL as string);

export const db: Db = client.db(SETTINGS.DB_NAME);

export const blogCollection: Collection<InsertBlogType> = db.collection<InsertBlogType>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<InsertPostType> = db.collection<InsertPostType>(SETTINGS.POST_COLLECTION_NAME)

export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}

