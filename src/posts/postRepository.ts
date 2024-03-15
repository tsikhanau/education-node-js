import {InputPostType, InsertPostType, PostType} from "../input-output-types/post-types";
import {PostDBType} from "../db/posts-db-types";
import {blogCollection, postCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";

export const postRepository = {
    async create(input: InputPostType): Promise<{error?: string, id?: ObjectId}> {
        const blog = await blogCollection.findOne({_id: new ObjectId(input.blogId)});
        const newPost: InsertPostType = {
            ...input,
            blogName: blog?.name ?? '',
            createdAt: new Date().toISOString(),
        }
        try {
            const insertedInfo = await postCollection.insertOne(newPost);
            return {id: insertedInfo.insertedId}
        } catch (e) {
            return {error: 'Error'}
        }
    },
    async find(id: ObjectId): Promise<PostType | undefined> {
        const post = await postCollection.findOne({_id: id}) as unknown as PostDBType;
        if(post?._id) {
            const mappedPost = {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt,
            };
            return mappedPost;
        }
        return undefined;
    },
    async delete(id: ObjectId): Promise<{error?: string}> {
        try {
            const result = await postCollection.deleteOne({_id: id});
            if(result.deletedCount === 0) {
                return {error: "not found"}
            }
            return {};
        } catch (e) {
            return {error: e as string}
        }
    },
    async update(id: ObjectId, data: InputPostType): Promise<{error?: string}> {
        try {
            const result = await postCollection.updateOne({_id: id}, {$set: {...data}});
            if (result.modifiedCount === 0) {
                return {error: "not found"}
            }

            return {};
        } catch (e) {
            return {error: e as string}
        }
    },
}