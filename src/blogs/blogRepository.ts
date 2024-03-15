import {BlogType, InputBlogType, InsertBlogType} from "../input-output-types/blog-types";
import {BlogDBType} from "../db/blogs-db-types";
import {blogCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";

export const blogRepository = {
    async create(input: InputBlogType): Promise<{error?: string, id?: ObjectId}> {
        try {
            const insertedInfo = await blogCollection.insertOne({...input, createdAt: new Date().toISOString(), isMembership: false});
            return {id: new ObjectId(insertedInfo.insertedId)}
        } catch (e) {
            return {error: 'Error'}
        }
    },
    async find(id: ObjectId): Promise<BlogType | undefined> {
        const blog = await blogCollection.findOne({_id: id}) as unknown as BlogDBType;
        if(blog?._id) {
            const mappedBlog = {
                id: blog._id,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            };
            return mappedBlog;
        }
        return undefined;
    },
    async delete(id: ObjectId): Promise<{error?: string}> {
        try {
            const result = await blogCollection.deleteOne({_id: id});
            if(result.deletedCount === 0) {
                return {error: "not found"}
            }
            return {};
        } catch (e) {
            return {error: e as string}
        }
    },
    async update(id: ObjectId, data: InputBlogType): Promise<{error?: string}> {
        try {
            const result = await blogCollection.updateOne({_id: id}, {$set: {...data}});

            if (result.modifiedCount === 0) {
                return {error: "not found"}
            }

            return {};
        } catch (e) {
            return {error: e as string}
        }
    },
}