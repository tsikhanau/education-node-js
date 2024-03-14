import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {BlogDBType} from "./blogs-db-types";
import {PostDBType} from "./posts-db-types";
import {InsertPostType} from "../input-output-types/post-types";

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL as string);

export const db: Db = client.db(SETTINGS.DB_NAME);

export const blogCollection = db.collection(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection = db.collection(SETTINGS.POST_COLLECTION_NAME)

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

