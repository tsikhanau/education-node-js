import {commentCollection, postCollection} from "../db/mongo-db";
import {
    CommentOutputType,
    InputCommentType,
    InputCommentUpdateType,
    InsertCommentType
} from "../input-output-types/comment-types";
import {ObjectId} from "mongodb";
import {postRepository} from "../posts/postRepository";
import {CommentDBType} from "../db/comments-db-types";

export const commentRepository = {
    async drop() {
        const res = await commentCollection.drop()
    },
    async create(input: InputCommentType, id: string): Promise<{error?: string, id?: ObjectId}> {
        const post = await postRepository.find(new ObjectId(id));
        if(!post) {
            return {error: "not found"}
        }
        const newComment: InsertCommentType = {
            content: input.content,
            postId: post.id,
            commentatorInfo: input.commentatorInfo,
            createdAt: new Date().toISOString(),
        }

        try {
            const insertedInfo = await commentCollection.insertOne(newComment);
            return {id: insertedInfo.insertedId}
        } catch (e) {
            return {error: 'Error'}
        }
    },
    async find(id: ObjectId): Promise<CommentOutputType | undefined> {
        const comment = await commentCollection.findOne({_id: id}) as unknown as CommentDBType;
        if(comment?._id) {
            const mappedComment = {
                id: comment._id.toString(),
                content: comment.content,
                commentatorInfo: comment.commentatorInfo,
                createdAt: comment.createdAt,
            };
            return mappedComment;
        }
        return undefined;
    },
    async delete(id: ObjectId): Promise<{error?: string}> {
        try {
            const result = await commentCollection.deleteOne({_id: id});
            if(result.deletedCount === 0) {
                return {error: "not found"}
            }
            return {};
        } catch (e) {
            return {error: e as string}
        }
    },
    async update(id: ObjectId, data: InputCommentUpdateType): Promise<{error?: string}> {
        try {
            const result = await commentCollection.updateOne({_id: id}, {$set: {...data}});
            if (result.modifiedCount === 0) {
                return {error: "not found"}
            }

            return {};
        } catch (e) {
            return {error: e as string}
        }
    },
}