import {db} from "../db/db";
import {InputBlogType} from "../input-output-types/blog-types";
import {BlogDBType} from "../db/blogs-db-types";

export const blogRepository = {
    async create(input: InputBlogType): Promise<{error?: string, id?: string}> {
        const newBlog: BlogDBType = {
            ...input,
            id: Date.now() + Math.floor(Math.random() * 100) + "",
        }

        try {
            db.blogs = [...db.blogs, newBlog]
        } catch (e: any) {
            return {error: e?.message}
        }

        return {id: newBlog.id}
    },
    async find(id: string): Promise<BlogDBType| undefined> {
        return db.blogs.find(p => p.id === id)
    },
    async delete(id: string): Promise<{error?: string}> {
        const blogIndex: number = db.blogs.findIndex(v => v.id === id);
        if(blogIndex < 0) {
            return {error: "not found"}
        }

        db.blogs.splice(blogIndex, 1);
        return {};
    },
    async update(id: string, data: InputBlogType): Promise<{error?: string}> {
        const blog = await this.find(id);
        if(!blog) {
            return {error: "not found"}
        }

        db.blogs = db.blogs.map(p => {
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
    // async findForOutput(id: number): Promise<null | BlogOut> {
    //     const post = await this.find(id)
    //     if (!post) { return null }
    //     return this.mapToOutput(post)
    //
    // },
    // mapToOutput(post: PostDBType): PostOutputType {
    //     return {
    //         id: post.id,
    //         title: post.title,
    //     }
    // }
}