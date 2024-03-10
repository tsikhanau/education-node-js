import {InputPostType, PostOutputType} from "../input-output-types/post-types";
import {PostDBType} from "../db/posts-db-types";
import {db} from "../db/db";
import {blogRepository} from "../blogs/blogRepository";

export const postRepository = {
    async create(input: InputPostType): Promise<{error?: string, id?: string}> {
        const blog = await blogRepository.find(input.blogId);
        const newPost: PostDBType = {
            ...input,
            blogName: blog?.name ?? '',
            id: Date.now() + Math.floor(Math.random() * 100) + '',
        }

        db.posts = [...db.posts, newPost]

        return {id: newPost.id}
    },
    async find(id: string): Promise<PostDBType | undefined> {
        return db.posts.find(p => p.id === id)
    },
    async delete(id: string): Promise<{error?: string}> {
        const postIndex: number = db.posts.findIndex(v => v.id === id);
        if(postIndex < 0) {
            return {error: "not found"}
        }

        db.posts.splice(postIndex, 1);
        return {};
    },
    async update(id: string, data: InputPostType): Promise<{error?: string}> {
        const post = await this.find(id);
        if(!post) {
            return {error: "not found"}
        }

        db.posts = db.posts.map(p => {
            if(p.id === id) {
                return {
                    ...p,
                    ...data
                }
            }
            return p;
        });
        return {};
    },
    mapToOutput(post: PostDBType): PostOutputType {
        return {
            id: post.id,
            title: post.title,
        }
    }
}